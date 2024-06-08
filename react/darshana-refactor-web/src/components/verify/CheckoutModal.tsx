import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CButton } from '@components/Atoms';

import styles from './verify.module.scss';

import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { darshanaApi } from '@api/darshanaApi';

interface ComponentProps {
  closeModal: () => void;
  tc: any;
}
export const CheckoutModal: FC<ComponentProps> = ({ closeModal, tc }) => {
  // Calcular la diferencia de tiempo y agregarla a cada objeto
  const [cards, setCards] = useState([]);
  const [selectProduct, setSelectProduct] = useState('personalizate');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const getPricesProducts = async () => {
    const response = await darshanaApi.get('/stripe/prices');
    setCards(response.data);
  };
  const selectCard = (id: string) => {
    setSelectProduct(id);
  };
  const onClickSelect = async () => {
    if (selectProduct === 'personalizate') {
      closeModal();
      return Router.push('/help-center');
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        priceId: selectProduct,
        domain: currentUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    window.location.href = data.url;
  };
  useEffect(() => {
    getPricesProducts();
  }, []);
  return (
    <div>
      <div>
        <h2 className={styles.title}>{tc('title-checkout')}</h2>
        <p className={styles.description}>{tc('body-checkout-1')}</p>
        <p className={styles.description2}>{tc('body-checkout-2')}</p>
      </div>
      <div className="flex flex-center" style={{ gap: '40px' }}>
        {cards.map((card: any) => (
          <div
            key={card.id}
            onClick={() => selectCard(card.id)}
            className={`${styles.card} ${
              selectProduct === card.id ? styles.active : ''
            }`}
          >
            <p className={styles.title2}>Plan Simple</p>
            <p className={styles.descriptioncard}></p>
            <p className={styles.benefits}>Beneficios:</p>
            <ul className={styles.list}>
              <li className={styles.descriptioncard}></li>
              <li className={styles.descriptioncard}>Pago Unico</li>
              <li className={styles.descriptioncard}>
                verificaciones sin vencimiento
              </li>
            </ul>
            <div>
              <p className={styles.benefits}>Pago unico de:</p>
              <p className={styles.price}>$ 25.00 USD</p>
            </div>
            <p className={`${styles.select} flex-center`}>
              {selectProduct === card.id ? 'Seleccionado' : ''}
            </p>
          </div>
        ))}
        <div
          className={`${styles.card} ${
            selectProduct === 'personalizate' ? styles.active : ''
          }`}
          onClick={() => selectCard('personalizate')}
        >
          <p className={styles.title2}>Plan Personalizado</p>
          <p className={styles.descriptioncard}>
            Consulta de 1 a 3 talentos con experiencias verificadas.
          </p>
          <p className={styles.benefits}>Beneficios:</p>
          <ul className={styles.list}>
            <li className={styles.descriptioncard}>Verificacion en 72 horas</li>
            <li className={styles.descriptioncard}>
              Nº verificaciones a medida
            </li>
            <li className={styles.descriptioncard}>Plan renovable</li>
          </ul>
          <div>
            <p className={styles.benefits}>Pago unico de:</p>
            <p className={styles.price}>$ 25.00 USD</p>
          </div>
          <p className={`${styles.select} flex-center`}>
            {selectProduct === 'personalizate' ? 'Seleccionado' : ''}
          </p>
        </div>
      </div>
      <div
        className={'flex flex-center'}
        style={{ marginTop: '24px', gap: '24px' }}
      >
        <CButton
          classNameButton={'btn btn--stroke'}
          //loading={methodsFormCheckout.formState.isSubmitting}
          label={'cancel'}
          onClick={closeModal}
          type="submit"
        />
        <CButton
          classNameButton={'btn btn--primary'}
          //loading={methodsFormCheckout.formState.isSubmitting}
          label={'Validate'}
          onClick={onClickSelect}
          type="submit"
        />
      </div>
    </div>
  );
};
