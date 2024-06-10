import React, { Component, useState } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import styles from './Style'
import colors from '../../assets/colors'
import Modal from 'react-native-modal'
import Icon from '../../components/Icon/Icon'
import { StorageService } from '../../services/storage'
import { StringUtils } from '../../utils/stringFormat'
import ShadowContainer from '../ShadowContainer'
import { navigate } from '../../services/navigation'
import { useFocusEffect } from '@react-navigation/native'
import { USER_ROLES } from '../../utils/constants'

const SideBarComponent = () => {

	const [state, setState] = useState({
		usuarioNombre: '',
		role: null,
		isSoftToken: null
	})
	const [isMenuOpen, setMenuOpen] = useState(false)

	useFocusEffect(
		React.useCallback(() => {
			loadStorageData()

		}, [])
	)

	// async UNSAFE_componentWillMount() {
	const loadStorageData = async () => {
		const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))
		const user = await StorageService.getItem('user')
		const isSoftToken = await StorageService.getItem('CLIENTTOKEN')
		setState(prevState => ({
			...prevState,
			usuarioNombre: 'Carlos',
			isSoftToken: isSoftToken,
			role: 'admin',
			hasSoftToken
		}))
	}

	return (
		<TouchableOpacity onPress={() => setMenuOpen(true)}>
			<View>
				<View style={{ flexDirection: 'row' }}>
					<Icon
						size={35}
						name="ios-menu"
						family={Icon.IONICONS}
						style={{ color: colors.white, paddingLeft: 15 }}
					/>
				</View>
				<Modal
					isVisible={isMenuOpen}
					animationIn="fadeInLeft"
					animationOut="fadeOutLeft"
					style={{ margin: 0 }}
				>
					<View style={{
						backgroundColor: colors.white,
						height: '105%',
						width: '70%',
					}}>
						<View style={{ flexDirection: 'column', height: 77, backgroundColor: colors.lightBlue }}></View>
						<View style={{ flexDirection: 'column' }}>
							<ShadowContainer style={styles.headerContainer}>
								<View style={{ flex: 1 }}>
									<Icon
										size={30}
										name="person-circle-outline"
										family={Icon.IONICONS}
										style={styles.blue}
									/>
								</View>
								<View style={[styles.headerOuterContainer, { flex: 4 }]}>
									<View style={styles.titleContainer}>
										<Text style={styles.titleFont}>{state.usuarioNombre}</Text>
									</View>
								</View>
								<View style={{ flex: 1 }}>
									<TouchableOpacity onPress={() => setMenuOpen(false)}>
										<Icon
											style={styles.blue}
											family={Icon.ENTYPO}
											name="chevron-small-left"
											size={45}
										/>
									</TouchableOpacity>

								</View>
							</ShadowContainer>
							{
								state.role !== USER_ROLES.ADMIN &&
								<TouchableOpacity onPress={() => {
									setMenuOpen(false)
									navigate('ConsolidatedPosition')
								}}>
									<View style={{ paddingLeft: 20, }}>
										<View style={{ paddingTop: 20, elevation: 1, flexDirection: 'row' }}>
											<Icon
												size={50}
												name="ios-grid"
												family={Icon.IONICONS}
												style={{ color: colors.lightBlue }}
											/>
											<Text style={{ paddingLeft: 20, alignSelf: 'center', flex: 1 }}>Mis Productos</Text>

										</View>
									</View>
								</TouchableOpacity>
							}
							<TouchableOpacity onPress={() => {
								navigate('EnrolamientoSoftToken')
								setMenuOpen(false)
							}}>
								{
									state.role !== '0' && !state.hasSoftToken && state.isSoftToken &&
									<View style={{ paddingLeft: 20 }}>
										<View style={{ paddingTop: 20, elevation: 1, flexDirection: 'row' }}>
											<Icon
												size={50}
												name="lock-closed"
												family={Icon.IONICONS}
												style={{ color: colors.lightBlue }}
											/>
											<Text style={{ paddingLeft: 20, alignSelf: 'center', flex: 1 }} ellipsizeMode="tail">Enrolamiento
												Al Token Digital</Text>

										</View>
									</View>
								}
							</TouchableOpacity>
							{
								state.role !== USER_ROLES.ADMIN &&
								<TouchableOpacity onPress={() => {
									navigate('PendingApprovals')
									setMenuOpen(false)
								}}>
									{
										state.role !== '0' &&
										<View style={{ paddingLeft: 20 }}>
											<View style={{ paddingTop: 20, elevation: 1, flexDirection: 'row' }}>
												<Icon
													size={50}
													name="ios-notifications"
													family={Icon.IONICONS}
													style={{ color: colors.lightBlue }}
												/>
												<Text style={{ paddingLeft: 20, alignSelf: 'center', flex: 1 }} ellipsizeMode="tail">Aprobaciones
													Pendientes</Text>

											</View>
										</View>
									}
								</TouchableOpacity>
							}
							<TouchableOpacity onPress={() => {
								navigate('FrequentQuestions')
								setMenuOpen(false)
							}}>
								<View style={{ paddingLeft: 20, }}>
									<View style={{ paddingTop: 15, elevation: 1, flexDirection: 'row' }}>
										<Icon
											size={50}
											name="help-outline"
											family={Icon.IONICONS}
											style={{ color: colors.lightBlue }}
										/>
										<Text style={{ paddingLeft: 20, alignSelf: 'center', flex: 1 }}>Preguntas Frecuentes</Text>

									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</TouchableOpacity>
	)
}

export default SideBarComponent
