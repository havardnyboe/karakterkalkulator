import style from "./styles/Course.module.css";

export default function Course(props) {
  return (
    <div className={style.course}>
      <h3 className={style.heading}>{props.code || "KODE"}</h3>
      <span className={(style.mg0, style.span)}>Poeng: {0}</span>
      <span className={style.span}>{props.name || "NAVN"}</span>
      <div className={style.btn_container}>
        <button className={style.btn}>A</button>
        <button className={style.btn}>B</button>
        <button className={style.btn}>C</button>
        <button className={style.btn}>D</button>
        <button className={style.btn}>E</button>
        <button className={style.btn}>F</button>
      </div>
      <span className={style.span}>Snitt: {0.0}</span>
    </div>
  );
}
