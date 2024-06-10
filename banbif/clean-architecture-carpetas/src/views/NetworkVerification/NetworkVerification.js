import * as React from "react";
import { View, Text, BackHandler } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Icon from '../../components/Icon';
import colors from "../../assets/colors";
import ModalHandleError from "../../components/ModalHandleError";
import Button from "../../components/Button";
import strings from "../../assets/strings";

import Modal from "react-native-modal";
import ShadowContainer from "../../components/ShadowContainer";
import Style from "./Styles";
import { StorageService } from '../../services/storage';


export default class NetworkVerification extends ModalHandleError {
    constructor(props) {
        super(props);
        this.state = {
            hasSoftToken: false,
            modalIntermediate: null,
            iSConnected: null,
        };
    }

    async componentDidMount() {
        const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))
        this.setState({ hasSoftToken: hasSoftToken })

        NetInfo.isConnected.addEventListener("connectionChange", this._handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({ iSConnected: isConnected })
            if (isConnected === true) {
                this.props.navigation.navigate("Login", { isConnected: true });
            }
            if (isConnected === false) {
                this.setState({ modalIntermediate: true })
            }
        });

    }

    _handleConnectivityChange = (iSConnected) => {
        this.setState({ iSConnected: iSConnected });
    }

    _handleOpeninWebview = () => {
        if (this.state.iSConnected === true) {
            this.props.navigation.navigate("Login", { isConnected: true });
            return;
        }
        if (this.state.iSConnected === false) {
            this.setState({ modalIntermediate: true });
        }
    }

    _handleOpeninToken = () => {
        if (this.state.iSConnected === false) {

            this.props.navigation.navigate("Login", { isConnected: false });
            this.props.navigation.navigate("SoftTokenLogin", { isConnected: false })
            return;
        }
        if (this.state.iSConnected === true) {

            this.props.navigation.navigate("Login", { isConnected: true });
            this.props.navigation.navigate("SoftTokenLogin", { isConnected: true })
            return;
        }
    }



    render() {
        return (
            <View>
                <Modal onBackButtonPress={() => BackHandler.exitApp()} isVisible={this.state.modalIntermediate} style={{ alignItems: "center" }}>
                    <ShadowContainer style={Style.shadowContainerStyle}>
                        <View style={Style.mainViewStyle}>
                            <View style={Style.viewStyle}>
                                <Icon
                                    style={[colors.lightBlue]}
                                    family={Icon.IONICONS}
                                    name="alert-circle"
                                    size={70}
                                    color={colors.lightBlue}
                                />
                                <View style={Style.viewTextStyle}>
                                    <Text style={Style.modalTextAligin}>{strings.noInternet.noInternet}</Text>
                                </View>
                                <View>
                                    <Button
                                        color={colors.lightBlue}
                                        width={150}
                                        height={40}
                                        textButton={strings.networkVerification.texButtonReitentar}
                                        action={() => {
                                            this.setState({ modalIntermediate: false });
                                            this._handleOpeninWebview();
                                        }}
                                    />
                                </View>
                                {this.state.hasSoftToken && <View style={{ paddingTop: 10 }}>
                                    <Button
                                        color={colors.lightBlue}
                                        width={150}
                                        height={40}
                                        textButton={strings.networkVerification.texButtonSoftToken}
                                        action={() => {
                                            this.setState({ modalIntermediate: false });
                                            this._handleOpeninToken();
                                        }}
                                    />
                                </View>}

                            </View>
                        </View>
                    </ShadowContainer>
                </Modal>
            </View>
        );
    }
}
