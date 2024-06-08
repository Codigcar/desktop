import Image from 'next/image';
import React from 'react'
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}  >
        <Image src={'/imgs/bml-footer.png'} width={40} height={40} objectFit='contain' alt="imagen"/>
        <h3 style={{marginLeft:20}} >BML Controls - Mide la madurez de tus tecnologias</h3>
    </footer>
  )
}
