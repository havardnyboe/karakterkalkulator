import style from "./styles/Footer.module.css";
import githubLogo from "./img/GitHub-Mark-Light-64px.png";

export default function Footer() {
  return (
    <footer>
      <div className={style.v_line}></div>
      <a href="https://github.com/havardnyboe/karakterkalkulator">
        <img src={githubLogo} alt="GitHub Logo" />
      </a>
      <code>
        Laget med ❤️ av <a href="https://github.com/havardnyboe">havardnyboe</a>
      </code>
    </footer>
  );
}
