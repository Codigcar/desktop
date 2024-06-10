import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "../ProductNameComponent/Style";
import ShadowContainer from "../ShadowContainer";

import PropTypes from "prop-types";
import colors from "../../assets/colors";
import ProductTypeLeasing from "../ProductTypeLeasing/ProductTypeLeasing";
import ProductTypeCollection from "../ProductTypeCollection/ProductTypeCollections";
import ProductTypeDepositsOfDeposit from "../ProductTypeDepositsOfDeposit/ProductTypeDepositsOfDeposit";
import ProductTypeLoans from "../ProductTypeLoans/ProductTypeLoans";
import ProductTypeTimeDeposits from "../ProductTypeTimeDeposits/ProductTypeTimeDeposits";
import ProductTypeDiscounts from "../ProductTypeDiscounts/ProductTypeDiscounts";
import ProductTypeCheckingAccountDetails from "../ProductTypeCheckingAccountDetails/ProductTypeCheckingAccountDetails";
import ProductTypeCreditCard from "../ProductTypeCreditCard/ProductTypeCreditCard";
import ProductTypeFactoringComponent from "../ProductTypeFactoringComponent/ProductTypeFactoringComponent";
import ProductTypeInternationalCollectionsComponent from "../ProductTypeInternationalCollectionsComponent/ProductTypeInternationalCollectionsComponent";
import ProductTypeCreditLineComponent from "../ProductTypeCreditLineComponent/ProductTypeCreditLineComponent";
import ProductTypeCreditLettersComponent from "../ProductTypeCreditLettersComponent/ProductTypeCreditLettersComponent";

export default class ProductNameComponent extends Component {
  render() {

    return (
      <TouchableOpacity {...this.props}>
        <View>
          {/*<ShadowContainer>*/}
            <View style={styles.headerContainer}>
              {//Leasing
                this.props.ProductType == 1 &&
                <ProductTypeLeasing
                  cobranzaNumber={this.props.NrAccount}
                  monto={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//Factoring
                this.props.ProductType == 2 &&
                <ProductTypeFactoringComponent
                  cobranzaNumber={this.props.NrAccount}
                  monto={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//InternationalCollections
                this.props.ProductType == 3 &&
                <ProductTypeInternationalCollectionsComponent
                  cobranzaNumber={this.props.NrAccount}
                  monto={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//LetterCreditLine
                this.props.ProductType == 4 &&
                <ProductTypeCreditLineComponent
                  cobranzaNumber={this.props.NrAccount}
                  monto={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//Collections
                this.props.ProductType == 5 &&
                <ProductTypeCollection
                  nrCobranza={this.props.NrAccount}
                  monto={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//DepositsOfDeposit
                this.props.ProductType == 6 &&
                <ProductTypeDepositsOfDeposit
                  nrProducto={this.props.NrAccount}
                  monto={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//Loans
                this.props.ProductType == 7 &&
                <ProductTypeLoans
                  nrProducto={this.props.NrAccount}
                  saldo={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//TimeDeposits
                this.props.ProductType == 8 &&
                <ProductTypeTimeDeposits
                  nrProducto={this.props.NrAccount}
                  saldoDisponible={this.props.SaldoActual}
                  saldoInteres={this.props.SaldoActual + this.props.SaldoDisponible}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//Discounts
                this.props.ProductType == 9 &&
                <ProductTypeDiscounts
                  number={this.props.NrAccount}
                  saldo={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//CreditLetters
                this.props.ProductType == 10 &&
                <ProductTypeCreditLettersComponent
                  number={this.props.NrAccount}
                  saldo={this.props.SaldoActual}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//CheckingAccountDetails - cuentas corrientes y de ahorros
                this.props.ProductType == 11 &&
                <ProductTypeCheckingAccountDetails
                  nrProducto={this.props.NrAccount}
                  saldo={this.props.SaldoDisponible}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }
              {//CreditCard
                this.props.ProductType == 12 &&
                <ProductTypeCreditCard
                  nrProducto={this.props.NrAccount}
                  saldo={this.props.SaldoDisponible}
                  color={colors.lightBlue}
                  moneda={this.props.moneda}
                  entidad={this.props.entidad}
                />
              }

            </View>
          {/*</ShadowContainer>*/}
        </View>
      </TouchableOpacity>
    );
  }
}
ProductNameComponent.propTypes = {
  NrAccount: PropTypes.string,
  NrCCI: PropTypes.string
};
