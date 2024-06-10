import React, { Component } from "react";
import { View } from "react-native";
import styles from "./Styles"
import strings from "../../assets/strings";
import DetailsComponent from "../../components/DetailsComponent/DetailsComponent";
import BlueLineWithTextComponent from "../../components/BlueLineWithTextComponent/BlueLineWithTextComponent";
import { default as axios } from "../../services/api";
import ModalErrorComponent from "../../components/ModalErrorComponent/ModalErrorComponent";
import enumeration from "../../enum/enum";
import monetaryType from "../../monetaryType/monetaryType";
import IdCollectionComponent from "../../components/IdCollectionComponent/IdCollectionComponent";
import { SpinnerSize } from "../../utils/spinnerSize";
import { DateFormat } from "../../utils/dateFormat";
import { Monetary } from "../../utils/monetary";
import { StorageService } from "../../services/storage";
import EntidadNombre from '../../components/EntidadNombre'

/* Cobranzas importacion exportacion */
export default class InternationalCollections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      size: 0,
      list: true,
      Currency: this.props.route.params.Currency,
      NrAccount: this.props.route.params.NrAccount,
      NrCCI: this.props.route.params.NrCCI,
      Product: this.props.route.params.Product,
      ProductType: this.props.route.params.ProductType,
      SaldoActual: this.props.route.params.SaldoActual,
      SaldoDisponible: this.props.route.params.SaldoDisponible,
      ProductBankIdentifier: this.props.route.params.ProductBankIdentifier.toUpperCase(),
      filteredProducts: [],
      messages: []
    };
  }


  hasMessage(err) {
    return (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.meta &&
      err.response.data.meta.mensajes &&
      err.response.data.meta.mensajes.length > 0
    );
  }

  handleMessages(err) {
    if (this.hasMessage(err)) {
      this.setState({ messages: err.response.data.meta.mensajes });
    } else {
      this.setState({
        messages: [
          {
            mensaje:
              strings.messages.error
          }
        ]
      });
    }
  }

  hasError(err) {
    return err && err.status != 200 && err.status != 201;
  }

  messageOk() {
    let _messages = this.state.messages;
    _messages.pop();
    this.setState({ messages: _messages });

    if (this.state.messages.length == 0) {
      this.props.navigation.navigate("MainMenu");
    }
  }

  async getInternationalCollectionsDetails() {
    this.setState({ spinner: true, size: SpinnerSize.get(), list: !this.state.list });
    try {
      const user = await StorageService.getItem('user');
      const tokenClient = await StorageService.getItem('token');
      console.log('Api | Cobranza importacion exportacion-InternationalCollections.js: api-banca-movil-empresas/v1/consultaCuenta/consultas/cobranzas/detalle/producto', this.state.ProductType.codigo, this.state.ProductBankIdentifier)
      const response = await axios.post(
        "api-banca-movil-empresas/v1/consultaCuenta/consultas/cobranzas/detalle/producto",
        {
          productBankIdentifier: this.state.ProductBankIdentifier,
          tipo: {
            codigo: this.state.ProductType.codigo
          }
        },
        {
          headers: {
            'tokenClient': tokenClient,
            'nombreUsuario': user.nombreLogin,
            'entidad': user.entidad
          }
        }
      );
      await this.setState({
        filteredProducts: [
          {
            key: "1",
            text: "Fecha de apertura",
            value: DateFormat.format(response.data.fechaApertura)
          },
          {
            key: "2",
            text: "Fecha expiración",
            value: DateFormat.format(response.data.fechaExpiracion)
          },
          {
            key: "3",
            text: "Tipo de cobranza",
            value: enumeration.tipoCobranza[response.data.tipoCobranza]
          },
          {
            key: "4",
            text: "Monto",
            value:
              monetaryType[this.state.Currency] +
              Monetary.format(this.state.SaldoActual)
          },
          {
            key: "5",
            text: "Estado",
            value: enumeration.estado[response.data.estado]
          },
          {
            key: "6",
            text: "Moneda",
            value: this.state.Currency
          },
          {
            key: "7",
            text: "Número de referencia",
            value: response.data.numeroReferencia
          },
          {
            key: "8",
            text: "Cedente",
            value: response.data.cedente
          },
          {
            key: "9",
            text: "Beneficiario",
            value: response.data.beneficiario
          },
          {
            key: "10",
            text: "Entrega de documentos",
            value:
              enumeration.entregaDocumentos[
              response.data.entregaDocumentos
              ]
          }
        ]
      });
      this.state.messages = [];
    } catch (err) {
      this.handleMessages(err);
    }
    this.setState({ spinner: false, size: 0, list: !this.state.list });
  }

  async UNSAFE_componentWillMount() {
    await this.getInternationalCollectionsDetails();
  }

  render() {

    let messageViews = this.state.messages.map((message, i) => {
      return (
        <ModalErrorComponent
          key={message.mensaje}
          TextError={message.mensaje}
          Visibility={
            this.state.messages.length > 0 &&
            i == this.state.messages.length - 1
          }
          Callback={this.messageOk.bind(this)}
        />
      );
    });
    return (
      <View style={styles.container}>
        <IdCollectionComponent
          NrAccount={this.state.NrAccount}
        />
        <EntidadNombre entidad={this.props.route.params.entidad}/>
        <BlueLineWithTextComponent Text={strings.accountDetais.details} />
        <DetailsComponent
          filteredProducts={this.state.filteredProducts}
          isvisible={this.state.spinner}
          size={this.state.size}
          list={this.state.list}
        />
        {messageViews}
      </View>
    );
  }
}
