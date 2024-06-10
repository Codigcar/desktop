import React, { Component } from "react";
import { View } from "react-native";
import strings from "../../assets/strings";
import DetailsComponent from "../../components/DetailsComponent/DetailsComponent";
import AccountMovementComponent from "../../components/AccountMovementComponent/AccountMovementComponent";
import BlueLineWithTextComponent from "../../components/BlueLineWithTextComponent/BlueLineWithTextComponent";
import { default as axios } from "../../services/api";
import ModalErrorComponent from "../../components/ModalErrorComponent/ModalErrorComponent";
import monetaryType from "../../monetaryType/monetaryType";
import { SpinnerSize } from "../../utils/spinnerSize";
import { OrderBy } from "../../utils/orderBy";
import { DateFormat } from "../../utils/dateFormat";
import { Monetary } from "../../utils/monetary";
import DollarIconNrAccountComponent from "../../components/DollarIconNrAccountComponent";
import { StorageService } from "../../services/storage";
import { any } from "prop-types";
import styles from "./Styles"
import EntidadNombre from '../../components/EntidadNombre'

/* Deposito a plazo fijo */
export default class TimeDeposits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenClient: "",
      blocked: false,
      movementsPage: 1,
      spinnerDetail: false,
      sizeDetail: 0,
      spinnerMovement: false,
      sizeMovement: 0,
      list: true,
      messages: [],
      toggleBody: true,
      Currency: this.props.route.params.Currency,
      NrAccount: this.props.route.params.NrAccount,
      NrCCI: this.props.route.params.NrCCI,
      ProductBankIdentifier: this.props.route.params
        .ProductBankIdentifier.toUpperCase(),
      SaldoActual: this.props.route.params.SaldoActual,
      SaldoDisponible: this.props.route.params.SaldoDisponible,
      detailProducts: [],
      movementProducts: [],
      user: any
    };
  }

  async getTimeDepositsDetails() {
    this.setState({ spinnerDetail: true, sizeDetail: SpinnerSize.get(), list: !this.state.list });
    try {
      console.log('Api | Deposito a plazo fijo-TimeDeposits.js: api-banca-movil-empresas/v1/cuentasAbiertas/consultas/depositos', this.state.ProductBankIdentifier)
      const response = await axios.post(
        "api-banca-movil-empresas/v1/cuentasAbiertas/consultas/depositos",
        {
          productBankIdentifier: this.state.ProductBankIdentifier
        },
        {
          headers: {
            'tokenClient': this.state.tokenClient,
            'nombreUsuario': this.state.user.nombreLogin,
            'entidad': this.state.user.entidad
          }
        }
      );

      await this.setState({
        detailProducts: [
          {
            key: "1",
            text: "Saldo de la cuenta",
            value:
              monetaryType[this.state.Currency] +
              Monetary.format(response.data.datos.saldoDeposito)
          },
          {
            key: "2",
            text: "Saldo de interés",
            value:
              monetaryType[this.state.Currency] +
              Monetary.format(response.data.datos.interesGanado)
          },
          {
            key: "3",
            text: "Interés al vencimiento",
            value: monetaryType[this.state.Currency] +
              Monetary.format(response.data.datos.saldoIntereses)
          },
          {
            key: "4",
            text: "Fecha de apertura",
            value: DateFormat.format(response.data.datos.fechaApertura)
          },
          {
            key: "5",
            text: "Fecha de vencimiento",
            value: DateFormat.format(response.data.datos.fechaVencimiento)
          },
          {
            key: "6",
            text: "Tasa de interés",
            value: Monetary.percentage(response.data.datos.tasaInteres) + "%"
          }
        ]
      });
    } catch (err) {
      this.handleMessages(err);
    }
    this.setState({ spinnerDetail: false, sizeDetail: 0, list: !this.state.list });
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

  setNextPage(response) {
    var nextPage = null;
    if (response && response.meta && response.meta.numeroPaginaSiguiente && this.state.movementsPage < response.meta.numeroPaginaSiguiente) {
      nextPage = response.meta.numeroPaginaSiguiente;
    }
    this.setState({
      movementsPage: nextPage
    })
  }

  setFirstPage() {
    this.setState({
      movementsPage: 1,
      movementProducts: []
    })
  }

  onNextPage() {
    this.getTimeDepositisMovements();
  }

  getTimeDepositisMovements() {
    let that = this;
    that.setState({ spinnerMovement: true, sizeMovement: SpinnerSize.get(), list: !this.state.list, blocked: true });
    axios
      .post("api-banca-movil-empresas/v1/cuentasAbiertas/consultas/depositos/estado", {
        productBankIdentifier: this.state.ProductBankIdentifier,
        ano: (new Date()).getFullYear().toString().slice(2, 4),
        mes: (new Date()).getMonth() + 1
      },
        {
          headers: {
            numeroPagina: this.state.movementsPage,
            tokenClient: this.state.tokenClient,
            nombreUsuario: this.state.user.nombreLogin
          }
        })
      .then(response => {
        if (that.hasError(response)) {
          that.mensajePersonalizado(err);
          that.setState({ spinnerMovement: false, sizeMovement: 0, list: !this.state.list });
        } else {
          that.setNextPage(response.data);
          const resposta = response.data.datos.map(element => {
            return {
              fechaMovimiento: element.fechaVencimiento,
              numeroOperacion: element.numeroDepositoPlazo,
              descripcion: element.descripcion,
              montoMovimiento: Monetary.format(element.monto)
            };
          });
          let newMovements = this.state.movementProducts;
          newMovements.push(...resposta);
          that.setState({ movementProducts: newMovements, spinnerMovement: false, sizeMovement: 0, list: !this.state.list, blocked: false });
        }
      })
      .catch(err => {
        that.setState({ spinnerMovement: false, sizeMovement: 0, list: !this.state.list, blocked: false });
        that.mensajePersonalizado(err);
      });
  }

  mensajePersonalizado(err) {
    if (this.hasMessage(err)) {
      if (err.response.data.meta.mensajes[0].mensaje === "¡Registro no encontrado!") {
        messages = [
          {
            mensaje: "No presenta movimientos en el mes actual"
          }
        ];
      }
      else {
        messages = err.response.data.meta.mensajes;
      }
      this.setState({ messages });
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

  async UNSAFE_componentWillMount() {
    const tokenClient = await StorageService.getItem('token');
    this.setState({ tokenClient: tokenClient });
    const user = await StorageService.getItem('user');
    this.setState({ user: user });
    await this.getTimeDepositsDetails();

  }
  BodyToggle = IsToggle => {
    if (IsToggle) {
      return (
        <DetailsComponent
          filteredProducts={this.state.detailProducts}
          Currency={this.state.Currency}
          size={this.state.sizeDetail}
          isvisible={this.state.spinnerDetail}
          list={this.state.list}
        />
      );
    } else {
      return (
        <AccountMovementComponent
          filteredProducts={this.state.movementProducts.sort(OrderBy.order('fechaMovimiento'))}
          Currency={this.state.Currency}
          size={this.state.sizeMovement}
          isvisible={this.state.spinnerMovement}
          list={this.state.list}
          nextPage={this.state.movementsPage}
          onNextPage={this.onNextPage.bind(this)}
        />
      );
    }
  };

  messageOk() {
    let _messages = this.state.messages;
    _messages.pop();
    this.setState({ messages: _messages });

    if (this.state.messages.length == 0 && this.state.toggleBody) {
      this.props.navigation.navigate("MainMenu");
    }
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
      <View style={styles.containerView}>
        <DollarIconNrAccountComponent
          NrAccount={this.state.NrAccount}
        />
        <EntidadNombre entidad={this.props.route.params.entidad}/>
        <BlueLineWithTextComponent Text={this.state.toggleBody == true ? strings.accountDetais.details : strings.accountDetais.movements} />
        {this.BodyToggle(this.state.toggleBody)}
        {messageViews}
      </View>
    );
  }
}


