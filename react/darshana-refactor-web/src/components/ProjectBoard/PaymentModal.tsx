import React, { FC, useState } from 'react';
import styles from './projectBoard.module.scss';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface Props {
  amount: number;
  translationCommon: any;
  translationBoard: any;
  paymentSuccess: () => void;
}

const PaymentModal: FC<Props> = ({
  amount,
  translationCommon,
  translationBoard,
  paymentSuccess,
}) => {
  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID: any) => {
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;
      paymentSuccess();
    });
  };
  //capture likely error
  const onError = (data: any, actions: any) => {};

  return (
    <div className={styles.modalCard}>
      <div className={styles.modalTitle}>
        {translationBoard('payment-title')}
      </div>
      <div className={styles.modalSubTitle}>
        {translationBoard('payment-sub-title')}
      </div>
      <div className={styles.modalSubTitle}>
        {translationBoard('payment-choose-method')}:
      </div>
      <PayPalScriptProvider
        options={{
          'client-id': `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
        }}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentModal;
