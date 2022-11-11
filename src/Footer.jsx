import React from "react";
import style from "./styles/Footer.module.css";
import githubLogo from "./img/GitHub-Mark-Light-120px-plus.png";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <a href="https://github.com/havardnyboe/karakterkalkulator">
        <img className={style.img} src={githubLogo} alt="GitHub Logo" />
      </a>
      <code>
        Laget med ❤️ av{" "}
        <a className={style.link} href="https://github.com/havardnyboe">
          havardnyboe
        </a>
      </code>
    </footer>
  );
}
