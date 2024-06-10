import React, { Component } from "react";
import { View } from "react-native";
import styles from "./Styles"
import strings from "../../assets/strings";
import DetailsComponent from "../../components/DetailsComponent/DetailsComponent";
import BlueLineWithTextComponent from "../../components/BlueLineWithTextComponent/BlueLineWithTextComponent";
import { default as axios } from "../../services/api";
import ModalErrorComponent from "../../components/ModalErrorComponent/ModalErrorComponent";
import monetaryType from "../../monetaryType/monetaryType";
import { SpinnerSize } from "../../utils/spinnerSize";
import { DateFormat } from "../../utils/dateFormat";
import { Monetary } from "../../utils/monetary";
import DollarIconNrAccountLoansComponent from "../../components/DollarIconNrAccountLoansComponent";
import { StorageService } from "../../services/storage";
import EntidadNombre from '../../components/EntidadNombre'

export default class Loans extends Component {
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
      entidad: this.props.route.params.entidad,
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

  async getLoansDetails() {
    this.setState({ spinner: true, size: SpinnerSize.get(), list: !this.state.list });
    try {
      const user = await StorageService.getItem('user');
      const tokenClient = await StorageService.getItem('token');
      console.log('Api | Prestamos-Loans.js: api-banca-movil-empresas/v1/consultaCuenta/consultas/detalle/descuentos', this.state.ProductType.codigo, this.state.ProductBankIdentifier)
      const response = await axios.post(
        "api-banca-movil-empresas/v1/consultaCuenta/consultas/detalle/descuentos",
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
            text: "Fecha de inicio",
            value: DateFormat.format(
              response.data.fechaInicio
            )
          },
          {
            key: "2",
            text: "Saldo de crédito",
            value:
              monetaryType[this.state.Currency] +
              Monetary.format(
                this.state.SaldoActual
              )
          },
          {
            key: "3",
            text: "Monto Atrasado",
            value:
              Monetary.format(
                response.data.montoAtrasado
              )
          },
          {
            key: "4",
            text: "Vencimiento del crédito",
            value: DateFormat.format(
              response.data.fechaVencimiento
            )
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
    await this.getLoansDetails();
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

        <DollarIconNrAccountLoansComponent
          NrAccount={this.state.NrAccount}
          moneda={this.state.Currency}
        />
        <EntidadNombre entidad={this.state.entidad}/>
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
