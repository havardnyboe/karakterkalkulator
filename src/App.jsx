import Course from "./Course";
import style from "./styles/App.module.css";

export default function App() {
  return (
    <div className={style.app}>
      <h1>Karakterkalkulator</h1>
      <code>Work in progress...</code>
      <div className={style.course_container}>
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
      </div>
    </div>
  );
}
