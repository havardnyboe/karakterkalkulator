import React from "react";
import Course from "./Course";
import style from "./styles/App.module.css";

export default function App() {
  const courses = [
    {
      id: "TDT4109",
      name: "Informasjonsteknologi grunnkurs",
      points: 7.5,
      average: 3.2343,
    },
    { id: "IT2805", name: "Webteknologi", points: 7.5, average: 4.45234 },
    {
      id: "TDT4102",
      name: " Prosedyre- og objektorientert programmering",
      points: 7.5,
      average: 3.16234,
    },
    {
      id: "MA0301",
      name: "Elementær diskret matematikk",
      points: 7.5,
      average: 3.3548,
    },
  ];

  return (
    <div className={style.app}>
      <h1 className={style.heading}>Karakterkalkulator</h1>
      <code>Work in progress...</code>
      <div className={style.course_container}>
        {courses.map((course) => (
          <Course
            key={course.id}
            code={course.id}
            name={course.name}
            points={course.points}
            average={course.average}
          />
        ))}
      </div>
    </div>
  );
}
