import Course from "./Course";
import style from "./styles/App.module.css";

export default function App() {

  const courses = {
    0: { id: "TDT4109", name: "Informasjonsteknologi grunnkurs" },
    1: { id: "IT2805", name: "Webteknologi" },
    2: { id: "TDT4102", name: " Prosedyre- og objektorientert programmering" },
    3: { id: "MA0301", name: "Elementær diskret matematikk" },
  };

  return (
    <div className={style.app}>
      <h1 className={style.heading}>Karakterkalkulator</h1>
      <code>Work in progress...</code>
      <div className={style.course_container}>
        <Course code={courses[0].id} name={courses[0].name} />
        <Course code={courses[1].id} name={courses[1].name} />
        <Course code={courses[2].id} name={courses[2].name} />
        <Course code={courses[3].id} name={courses[3].name} />
        <Course />
      </div>
    </div>
  );
}
