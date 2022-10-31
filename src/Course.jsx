import style from "./styles/Course.module.css";

export default function Course() {
  return (
    <div className={style.course}>
      <h3>Kode</h3>
      <span>Navn</span>
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
