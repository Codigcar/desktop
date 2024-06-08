import type { NextPage } from 'next';
import styles from './index.module.scss';
import * as yup from 'yup';
import Image from 'next/image';
import adminImg from '../public/imgs/admin-image.png';
import Link from 'next/link';
import { fetchCustom } from '../utils/fetchCustom';
import { useRef } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { useRouter } from 'next/router';
import { messageError, messageSuccess } from '../utils/messages';
import jwt from 'jsonwebtoken';


const Home: NextPage = () => {
  const router = useRouter();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [token, setToken] = useLocalStorage('token', null);

  const handleSubmit = (email: any, password: any) => {
    fetchCustom('/users/login', { email, password }, 'POST').then((tkn) => {
      if (tkn?.statusCode) {
        setToken(null);
        messageError('Usuario o contraseña incorrectos');
        return;
      }
      setToken(tkn);
      const decodeToken:any = jwt.decode(tkn);
      
      localStorage.setItem('id', decodeToken.id);
      localStorage.setItem('name', decodeToken.name);
      localStorage.setItem('lastName', decodeToken.lastName);
      localStorage.setItem('role', decodeToken.role);

      messageSuccess('Bienvenido');
      push('/darshboard/home');
    });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['container__left']}>
        <div className={styles['title']}>INICIO DE SESIÓN</div>
        <div className={styles['description']}>
          LOGUEATE CON TUS DATOS INGRESADOS AL MOMENTO DEL REGISTRO
        </div>
        <div>
          <div className={styles['form__label']}>CORREO ELECTRÓNICO</div>
          <input
            type="text"
            className={styles['form__input']}
            placeholder="CORREO ELECTRONICO"
            ref={emailInput}
          />
        </div>
        <div>
          <div className={styles['form__label']}>CONTRASEÑA</div>
          <input
            type="password"
            className={styles['form__input']}
            placeholder="CONTRASEÑA"
            ref={passwordInput}
          />
        </div>
        <div>
          <label className={styles['form__label']}>
            <input type="checkbox" className={styles['form__checkbox']} />{' '}
            MANTENME CONECTADO
          </label>
        </div>
        <div>
          <button
            className={styles['form__button']}
            onClick={() => {
              handleSubmit(
                emailInput.current?.value,
                passwordInput.current?.value
              );
            }}
          >
            INICIAR SESIÓN
          </button>
        </div>
        <div className={styles['container__links']}>
          <div className={styles['text--blue']}>
            ¿No tienes cuenta? &nbsp;
            <Link href="/register">
              <a className={styles['text--orange']}>Inscríbete aquí</a>
            </Link>
          </div>
          <div className={styles['text--orange']}>
            <a>¿Olvidaste tu contraseña?</a>
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

export default Home;
