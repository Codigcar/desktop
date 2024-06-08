import Identity from '@arc-publishing/sdk-identity'
import { UserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { getProfileUpdate } from './arc'
import { newTrace } from './suscription'

type SocialProvider = 'facebook' | 'google'
type Provider = SocialProvider | 'email'

export async function signIn(category: string, provider: Provider) {
  const isSocialProvider = provider === 'facebook' || provider === 'google'
  const user = (await Identity.getUserProfile()) as UserProfile
  if (!user.displayName && !user.attributes) {
    const update = getProfileUpdate(
      user,
      provider,
      category === 'swh',
      isSocialProvider,
    )
    const _profile = {
      firstName: user.firstName,
      lastName: user.lastName,
      ...update,
    }
    // @ts-expect-error Cuando se envía la propiedad emailVerified el servicio falla
    const userUpdate: UserProfile = await Identity.updateUserProfile(_profile)
    if (!userUpdate.displayName && !user.attributes) {
      newTrace.custom(userUpdate, {
        category,
        action: `pwa_sw_login_o_registro_btn_${provider}`,
      })
    } else if (isSocialProvider) {
      newTrace.registerWithProvider(provider as SocialProvider, userUpdate, {
        category,
      })
    } else {
      newTrace.registerWithEmail(user, { category })
    }
    return userUpdate
  } else if (!user.displayName && user.attributes) {
    const { attributes } = getProfileUpdate(
      user,
      provider,
      category === 'swh',
      isSocialProvider,
    )

    const combinedAttributes = [...user.attributes, ...attributes].reduce(
      (acc, el) => {
        acc[el.name] = el
        return acc
      },
      {},
    )

    // @ts-ignore
    const updatedOldUser = await Identity.updateUserProfile({
      attributes: Object.values(combinedAttributes),
      firstName: user.firstName,
      lastName: user.lastName,
    })
    newTrace.loginWithProvider(provider as SocialProvider, user, { category })

    return updatedOldUser
  }
  if (isSocialProvider) {
    newTrace.loginWithProvider(provider as SocialProvider, user, { category })
  } else {
    newTrace.loginWithEmail(user, { category })
  }
  return user
}
