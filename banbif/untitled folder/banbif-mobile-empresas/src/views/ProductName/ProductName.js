import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import ProductNameComponent from "../../components/ProductNameComponent";
import styles from "./Styles";
import { default as axios } from "../../services/api";
import ModalErrorComponent from "../../components/ModalErrorComponent/ModalErrorComponent";
import colors from "../../assets/colors"
import { SpinnerSize } from "../../utils/spinnerSize";
import { StorageService } from "../../services/storage";
import typeComponent from "../../enum/enum";
import strings from "../../assets/strings";
import Spinner from 'react-native-loading-spinner-overlay';
import { enviroment } from '../../utils/enviroments'
import qs from 'querystring'

export default class ProductName extends Component {
  constructor(props) {
    super(props);
    this.title = this.props.route.params.title;

    this.state = {
      tipo1e2: false,
      productsPage: 1,
      spinner: false,
      size: 0,
      messages: [],
      filteredProducts: [],
      semRegistros: false,
      load: false
    };
  }

  messageOk() {
    this.state.messages.pop();
    this.forceUpdate();
    if (this.state.messages.length == 0) {
      this.props.navigation.navigate("MainMenu");
    }
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

  async getProducts() {
    this.setState({ spinner: true, size: SpinnerSize.get(), tipo1e2: this.props.route.params.tipo1e2 });

    if (this.state.productsPage > 1) {

      this.setState({ spinner: false });
      this.setState({ load: true });
    }

    try {
      const tokenClient = await StorageService.getItem('token');
      const user = await StorageService.getItem('user');
      console.log('this.props.route.params.codigo', this.props.route.params.codigo)
      const response = await axios.get(
        "/api-banca-movil-empresas/v1/productosEmpresa/productos?tipoProducto=" + this.props.route.params.codigo,
        {
          headers: {
            'entidad': user.entidad,
            'numeroPagina': this.state.productsPage,
            'codigoIBS': user.userId,
            'nombreUsuario': user.nombreLogin,
            'tokenClient': tokenClient
          }
        }
      );
      const products = response.data.datos.map(product => {
        const { entityId } = product
        return {
          ...product,
          entidad: entityId?.toUpperCase()
        }
      })
      // const ids = [...new Set(products.map(product => product.productBankIdentifier.split('|')[0]))];
      // const flagGrupo = await StorageService.getItem('flagGrupo')
      // console.log('flagGrupo!!!: ', flagGrupo)


// console.log("response tipoProductoooooo: ", products);
// console.log("ids: ", ids);

      // Si flagGrupo es false, obtener el nombre de la Entidad para mostrarlo
      // if(!flagGrupo) {
      // // get token
      //   const payloadtoken = qs.stringify({
      //     client_id: "b52932c9",
      //     client_secret: "010a5dd1-f19c-4159-89e8-0f5e3729a7bb",
      //     grant_type: 'client_credentials'
      //   });
      //   console.log("payloadtoken: ", payloadtoken)
      //   const response = (await axios.post(
      //     `https://rh-sso-rhsso.uatapps.banbifapimarket.com.pe/auth/realms/Banbif-API-External/protocol/openid-connect/token`,
      //     payloadtoken,
      //     {
      //       timeout: 30000,
      //       headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded'
      //       }
      //     }
      //   ))
      //   // const { access_token } = response.data
      //   console.log("response access_token: ", response.data)
      // // get token
      //



      // console.log("flagGrupo es FALSE");
      // console.log("token: ", tokenClient);

        // const payload = {
        //   "codigoIBS": "40834",
        //   "usuarioBancaInternet": "BANCA_POR_INTERNET"
        // };
        // const access_token_conf = await StorageService.getItem('access_token_conf');
        // const refreshToken = await StorageService.getItem('refreshToken');
        // const token = await StorageService.getItem('token');
        //
        // console.log("");
        // console.log("access_token_conf: ", access_token_conf);
        // console.log("");
        // console.log("refreshToken: ", refreshToken);
        // console.log("");
        // console.log("token: ", token);
        // console.log("");



      //   const responseCliente = await axios.post(
      //     `https://api-3scale-crm-staging.uatapps.banbifapimarket.com.pe/api-cliente/v1/consultas/clientes`, payload,
      //     {
      //       headers: {
      //         "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnd3RBLTVKMHJONXNRYVNmNnVUV2R0SUNETWJTdk9LZ0FXZHZxams1TDU0In0.eyJleHAiOjE2NzgxMjg1MDksImlhdCI6MTY3ODEyODIwOSwianRpIjoiZmEyZmQ3MDYtM2EyMy00NDhjLWJhZjctZjVmYTBkYTQ4NjlhIiwiaXNzIjoiaHR0cHM6Ly9yaC1zc28tcmhzc28udWF0YXBwcy5iYW5iaWZhcGltYXJrZXQuY29tLnBlL2F1dGgvcmVhbG1zL0JhbmJpZi1BUEktRXh0ZXJuYWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzEyNTkwZjQtOWYwYS00ZjM1LWJkZjgtYzMyZmVmNzAzZWJiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYjUyOTMyYzkiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmFuYmlmLWFwaS1leHRlcm5hbCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJiNTI5MzJjOSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjEwLjIwMC4xMDQuNSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJiNTI5MzJjOSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1iNTI5MzJjOSIsImNsaWVudEFkZHJlc3MiOiIxMC4yMDAuMTA0LjUifQ.nOyIW5Vljx8amt74O2cvmaeVZMXMLn8Aff40aNY6pwZHqPIdhZKud_RAuPrRgqKhMXGw-k8sHkycN4DQEyca_qsjvyUWB9xYZ7V_ELF3hvqY5cCiblT8JU8_l76l1RCDcG1PQRoFQOygmAZBHsRJximspUf0x4uL03h5EZ5eVAkcrqCdMTsRk7_HpWlm4Z8kWXp4MPw0bs0YOK6KJFG17JzljrghTP0n5FCA4X-O2AJH239ciVzsOl0otLhPfq3HCo2UrH7XyohyoWskTegftRcNgdk_xdbngVnlpRbnheykiXD5wWi97K2yzcZyaZDoXqzrlShBS95oWJJInqBY1g`,
      //         "Content-Type": 'application/json',
      //         'codigoCanal': 'BRANCH_AGENCIAS'
      //       }
      //     }
      //   )
      //   console.log("responseCliente: ", responseCliente);
      // }

      this.state.messages = [];
      this.setNextPage(response);
      let newProducts = this.state.filteredProducts;

      newProducts.push(...products);

      this.setState({ filteredProducts: [] })
      this.setState({ filteredProducts: newProducts, spinner: false, size: 0 });
      newProducts = [];

      this.state.filteredProducts.length == 0 ? this.setState({ semRegistros: true }) : this.setState({ semRegistros: false })
    } catch (err) {
      console.log("api: ", err)
      this.handleMessages(err);
    }
    this.setState({ spinner: false, size: 0, load: false });
  }
  handleMessages(err) {
    if (this.hasMessage(err)) {
      this.state.messages = err.response.data.meta.mensajes;
      this.forceUpdate();
    } else {
      this.state.messages = [
        {
          mensaje:
            strings.messages.error
        }
      ];
    }
  }

  onNextPage() {
    this.getProducts();
  }

  setNextPage(response) {
    var nextPage = null;
    console.log('PAGINA SIGUIENTE???', response.data?.meta, response?.data?.meta?.numeroPaginaSiguiente)
    if (this.state.productsPage != null && response && response.data.meta && response.data.meta.numeroPaginaSiguiente && this.state.productsPage < response.data.meta.numeroPaginaSiguiente) {
      nextPage = response.data.meta.numeroPaginaSiguiente;
    }
    this.setState({
      productsPage: nextPage
    })
  }



  async UNSAFE_componentWillMount() {
    await this.getProducts();
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
        <Spinner
          visible={this.state.load}
          textContent={"Cargando..."}
          textStyle={{ color: "#FFF" }}
        />
        {!this.state.spinner && !this.state.semRegistros &&
          <FlatList
            data={this.state.filteredProducts}
            keyExtractor={(item, index) => item.numeroCuenta}
            renderItem={({ item, index }) => {
              return(
                <ProductNameComponent
                  onPress={() => {
                    this.props.navigation.navigate(this.title, {
                      NrAccount: item.numero,
                      NrCCI: item.cuentaCCI,
                      ProductBankIdentifier: item.productBankIdentifier.toUpperCase(),
                      Currency: item.monedaIdentificacion,
                      Product: item,
                      ProductType: this.props.route.params,
                      SaldoDisponible: item.montoDisponible,
                      SaldoActual: item.saldoActual,
                      LineaAprobada: item.lineaAprobada,
                      DisponibleLinea: item.disponibleLinea,
                      LineaUsada: item.lineaUsada,
                      entidad: item.entidad
                    })
                  }}
                  key={item.numero}
                  NrAccount={item.numero}
                  NrCCI={item.cuentaCCI}
                  ProductType={typeComponent.tipoProducto[this.title]}
                  SaldoDisponible={item.saldoCuentaDisponible}
                  SaldoActual={item.saldoActual}
                  montoDisponivel={item.montoDisponivel}
                  moneda={item.monedaIdentificacion}
                  lineaAprobada={item.lineaAprobada}
                  disponibleLinea={item.disponibleLinea}
                  lineaUsada={item.lineaUsada}
                  semRegistros={this.state.semRegistros}
                  entidad={item.entidad}

                />


              )
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.ConditionalFooter()}
          />
        }
        {
          !this.state.spinner && this.state.semRegistros &&
          <View style={styles.textNotFound}>
            <Text style={{ fontSize: 15 }}>Sin registros</Text>
          </View>
        }
        <ActivityIndicator
          style={{ paddingTop: 30 }}
          animating={this.state.spinner}
          size={this.state.size}
          color={colors.lightBlue}
        />
        {messageViews}
      </View>
    );
  }

  ConditionalFooter = () => {
    if (this.state.productsPage && this.state.productsPage > 1) {
      return (
        <TouchableOpacity onPress={this.onNextPage.bind(this)}>
          <View style={styles.pageContainer}>
            <View style={styles.pageIcon}>
              <Text style={styles.pageIconText}>
                ...
              </Text>
            </View>
            <Text style={styles.pageText}>
              Ver más
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (<View style={{ height: 100 }}></View>)
    }
  };
}
