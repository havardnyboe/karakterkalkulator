import style from "./styles/Course.module.css";

export default function Course(props) {
  return (
    <div className={style.course}>
      <h3>{props.code || "KODE"}</h3>
      <span className={style.mg0}>Poeng: {0}</span>
      <span>{props.name || "NAVN"}</span>
      <div className={style.btn_container}>
        <button>A</button>
        <button>B</button>
        <button>C</button>
        <button>D</button>
        <button>E</button>
        <button>F</button>
      </div>
      <span>Snitt: {0.0}</span>
    </div>
  );
}
