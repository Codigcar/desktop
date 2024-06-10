import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, BackHandler, Dimensions } from "react-native";
import ViewContainer from "../../components/ViewContainer";
import IconTextInput from "../../components/IconTextInput";
import Icon from "../../components/Icon";
import ProductListItem from "../../components/ProductListItem";
import strings from "../../assets/strings";
import styles from "./Styles";
import colors from "../../assets/colors"
import { default as axios } from "../../services/api";
import ModalErrorComponent from "../../components/ModalErrorComponent/ModalErrorComponent";
import { SpinnerSize } from "../../utils/spinnerSize";
import { StorageService } from "../../services/storage";

const height = Dimensions.get("window").height;

export default class ConsolidatedPosition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      messages: [],
      size: 0,
      tipo1e2: false,
      allProducts: [
        {
          key: "1,2",
          agrupation: [1, 2, 21, 22, 23],
          text: "Cuentas Corrientes y de Ahorros",
          route: "ProductName",
          params: {
            title: "CheckingAccountDetails"
          }
        },
        {
          key: "24",
          agrupation: [24],
          text: "Depósitos a Plazo Fijo",
          route: "ProductName",
          params: {
            title: "TimeDeposits"
          }
        },
        {
          key: "12",
          agrupation: [12],
          text: "Cartas de Crédito",
          route: "ProductName",
          params: {
            title: "CreditLetters"
          }
        },
        {
          key: "11",
          agrupation: [11],
          text: "Carta Fianza",
          route: "ProductName",
          params: {
            title: "DepositsOfDeposit"
          }
        },
        {
          key: "10",
          agrupation: [10, 41],
          text: "Cobranzas",
          route: "ProductName",
          params: {
            title: "Collections"
          }
        },
        {
          key: "42",
          agrupation: [42],
          text: "Cobranzas Importación - Exportación",
          route: "ProductName",
          params: {
            title: "InternationalCollections"
          }
        },
        {
          key: "5",
          agrupation: [5],
          text: "Descuentos",
          route: "ProductName",
          params: {
            title: "Discounts"
          }
        },
        {
          key: "7",
          agrupation: [7],
          text: "Factoring Eletrónico",
          route: "ProductName",
          params: {
            title: "Factoring"
          }
        },
        {
          key: "8",
          agrupation: [8],
          text: "Leasing",
          route: "ProductName",
          params: {
            title: "Leasing"
          }
        },
        {
          key: "6",
          agrupation: [6],
          text: "Préstamos",
          route: "ProductName",
          params: {
            title: "Loans"
          }
        },
        {
          key: "4",
          agrupation: [4],
          text: "Tarjetas de Crédito",
          route: "ProductName",
          params: {
            title: "CreditCard"
          }
        }
      ],
      productTypes: [],
      filteredProducts: []
    };
  }

  checkVisibility = productType => {
    return (
      this.state.productTypes.filter(p =>
        productType.agrupation.includes(parseInt(p.codigo))
        && (parseInt(p.cantSoles) + parseInt(p.cantDolares) + parseInt(p.cantEuro)) > 0
      ).length > 0
    );
  };

  navigationProducts(item) {
    this.props.navigation.navigate(item.route, {
      codigo: item.key,
      descripcion: item.text,
      title: item.params.title,
      tipo1e2: this.state.tipo1e2
    });
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

  async getConsolidaterPosition() {
    this.setState({ spinner: true, size: SpinnerSize.get() });

    try {
      const user = await StorageService.getItem('user');
      const tokenClient = await StorageService.getItem('token');
      const response = await axios.get(
        "/api-banca-movil-empresas/v1/productosEmpresa/tiposProductos?codigoIBS=" + user.userId.trim(),
        {
          headers: {
            'numeroPagina': '1',
            'tokenClient': tokenClient,
            'entidad': user.entidad,
            'nombreUsuario': user.nombreLogin
          }
        }
      );
      this.tirandoValorRepetido(response.data.datos);
      await this.setState({ productTypes: response.data.datos, spinner: false, size: 0 });
      this.state.messages = [];
    } catch (err) {
      this.handleMessages(err);
    }
    this.setState({ spinner: false, size: 0 });
  }
  tirandoValorRepetido(response) {

    var tipo1 = "9999123123123";
    var tipo2 = "999991231231231313123123";
    for (var i = 0; response.length > i; i++) {

      if (response[i].codigo == "01") {
        tipo1 = response[i].codigo
      }
      if (response[i].codigo == "02") {
        tipo2 = response[i].codigo
      }
      if (tipo1 == tipo2 - 1) {
        this.setState({ tipo1e2: true })
        response[i].codigo = "--"
        tipo2 = "999991231231231313123123"

      }
    }


  }
  handleMessages(err) {
    if (this.hasMessage(err)) {
      this.state.messages = err.response.data.meta.mensajes;
    } else {
      this.state.messages = [
        {
          mensaje:
            strings.messages.error
        }
      ];
    }
  }
  handleBackButtonPressAndroid = () => {
    this.setState({ modalVisible: true })
    return true
  }

  async UNSAFE_componentWillMount() {
    await this.getConsolidaterPosition();
    const allProducts = this.state.allProducts.filter(this.checkVisibility);
    await this.setState({ allProducts, filteredProducts: allProducts });
  }

  render() {
    const searchIcon = {
      family: Icon.IONICONS,
      name: "md-search",
      size: 35,
      style: styles.searchIcon
    };

    const textInput = {
      placeholder: strings.consolidatedPosition.searchBarPlaceholder,
      style: styles.searchInput,
      onChangeText: text => this.filterProducts(text)
    };

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
      <ViewContainer style={styles.flex1}>
        <View style={styles.searchInputContainer}>
          <View style={styles.searchBarContainer}>
            <IconTextInput icon={searchIcon} input={textInput} />
          </View>

        </View>
        <View style={{ height: height - 185 }}>
          {(Platform.OS !== "ios") &&
            <ActivityIndicator
              style={{ paddingBottom: this.state.spinner ? 10 : 0 }}
              animating={this.state.spinner}
              size={this.state.size}
              color={colors.lightBlue}
            >
            </ActivityIndicator>
          }
          <FlatList
            styles={{ flex: 1 }}
            data={this.state.filteredProducts}
            renderItem={({ item }) => (
              <ProductListItem
                key={item.text}
                onPress={() => {
                  this.navigationProducts(item);
                }}
              >
                {item.text}
              </ProductListItem>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
        {messageViews}
      </ViewContainer>
    );
  }

  filterProducts(text) {
    const array = this.state.allProducts.filter(item => {
      return item.text.toLowerCase().includes(text.toLowerCase());
    });

    this.setState({ filteredProducts: array });
  }
}
