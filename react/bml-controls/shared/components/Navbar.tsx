import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import { AiOutlinePoweroff } from "react-icons/ai";
export const Navbar = () => {
  // const idFromLocalStorage = localStorage.getItem("id" || "");
  const router = useRouter();
  const [navbarItems, setNavbarItems] = useState<any>([]);


  useEffect(() => {
    setNavbarItems([
      {
        label: "Acerca de Nosotros",
        to: "/darshboard/about",
      },
      {
        label: "Indicadores",
        to: "/darshboard/controlBML",
      },
      {
        label: "Control BML",
        to: "/darshboard/form",
      },
      {
        label: "Resultados",
        to: `/darshboard/${localStorage.getItem("id") || ""}`,
      },
      {
        label: "Repositorio",
        to: "/darshboard/repository",
      },
    ]);
  }, []);

  if (navbarItems.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__items}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={"/imgs/bml-footer.png"}
            width={40}
            height={40}
            objectFit="cover"
            alt="imagen"
            onClick={() => {
              router.push("/darshboard/home");
            }}
            style={{ cursor: "pointer" }}
          />
          {navbarItems.map((item: any, index: number) => {
            return (
              <span key={index}>
                <Link href={item.to}>
                  <a style={{ marginLeft: 20 }}>{item.label}</a>
                </Link>
              </span>
            );
          })}
        </div>
        <div className={styles.navbar__profile}>
          <span>{localStorage.getItem("name")}</span>
          <span> {localStorage.getItem("lastName")}</span>
          <div onClick={() => {
            router.replace('/');
            localStorage.clear();
          } } > <AiOutlinePoweroff size={25} color={'red'} style={{marginLeft:10, cursor:'pointer' }} /> </div>
        </div>
      </div>
    </div>
  );
};
