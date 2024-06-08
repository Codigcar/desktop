import type { NextPage } from 'next';
import styles from './register.module.scss';
import * as yup from 'yup';
import Image from 'next/image';
import adminImg from '../public/imgs/admin-image.png';
import Link from 'next/link';
import { useRef } from 'react';
import { fetchCustom } from '../utils/fetchCustom';
import { useRouter } from 'next/router';
import { messageError } from '../utils/messages';


const Register: NextPage = () => {
  const router = useRouter();
  const nameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async(
    name: any,
    lastName: any,
    email: any,
    password: any
  ) => {
    fetchCustom('/users', { name, lastName, email, password }, 'POST').then(
      (v) => {
        console.log(v);
      }
    ).catch((e) => {
      console.error({e});
      messageError('Error al registrar');
      return;
    });
    router.push('/');
  };

  return (
    <div className={styles['container']}>
      <div className={styles['container__left']}>
        <div className={styles['title']}>REGÍSTRATE</div>
        <div className={styles['description']}>INFORMACIÓN GENERAL</div>
        <div className={styles['form__row']}>
          <div className={styles['form__label']}>NOMBRES</div>
          <input
            type="text"
            className={styles['form__input']}
            placeholder="NOMBRES"
            ref={nameInput}
          />
        </div>
        <div className={styles['form__row']}>
          <div className={styles['form__label']}>APELLIDOS</div>
          <input
            type="text"
            className={styles['form__input']}
            placeholder="APELLIDOS"
            ref={lastNameInput}
          />
        </div>
        <div className={styles['form__row']}>
          <div className={styles['form__label']}>CORREO ELECTRÓNICO</div>
          <input
            type="text"
            className={styles['form__input']}
            placeholder="CORREO ELECTRONICO"
            ref={emailInput}
          />
        </div>
        <div className={styles['form__row']}>
          <div className={styles['form__label']}>CONTRASEÑA</div>
          <input
            type="password"
            className={styles['form__input']}
            placeholder="CONTRASEÑA"
            ref={passwordInput}
          />
        </div>
        <div>
          <button
            className={styles['form__button']}
            onClick={() => {
              handleSubmit(
                nameInput.current?.value,
                lastNameInput.current?.value,
                emailInput.current?.value,
                passwordInput.current?.value
              );
            }}
          >
            REGÍSTRATE
          </button>
        </div>
        <div className={styles['container__links']}>
          <div className={styles['text--blue']}>
            ¿Ya tienes una cuenta? &nbsp;
            <Link href="/">
              <a className={styles['text--orange']}>Logueate aquí</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles['container__right']}>
        <div className={styles['h2--blue']}>BML CONTROLS</div>
        <div className={styles['container__image']}>
          <Image src={adminImg} alt="admin-img" />
        </div>
      </div>
    </div>
  );
};

export default Register;
