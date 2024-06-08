 import {darshanaApi} from "@api/darshanaApi";
import {useTranslation} from "next-i18next";

const usePostData = <T,>() => {
  const [t, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  const executePost = async(url: string, postData: {} ): Promise<{data: {}, hasError: boolean; message?: string}> => {
    try {
      const { data: response } = await darshanaApi.post(url, postData);
      if( !response.status ){
        return {
          data: {},
          hasError: true,
          message: lang === 'es' ? 'Error al guardar los daros, por favor vuelva a intentar.' : 'Something went wrong, please try again.'
        };
      }

      return {
        data: response,
        hasError: false,
        message: lang === 'es' ? 'Datos guardados correctamente' : 'Data saved successfully'
      };
    } catch (error) {
      console.error({error});
      return {
        data: {},
        hasError: true,
        message: lang === 'es' ? 'Error al guardar los daros, por favor vuelva a intentar.' : 'Something went wrong, please try again.'
      };
    }
  }

  return {
    executePost
  }

}

export default usePostData;
