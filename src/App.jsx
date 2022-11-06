import React, { useState } from "react";
import Course from "./Course";
import style from "./styles/App.module.css";

export default function App() {
  const [courses, setCourses] = useState([]);

  const addCourse = (courseCode) => {
    fetch(`https://grades.no/api/v2/courses/${courseCode.toUpperCase()}/`)
      .then((res) => res.json())
      .then((json) => {
        const { norwegian_name, code, credit, average, detail } = json;
        setCourses((prev) => {
          const arr = [...prev];
          if (detail === "Not found.") return arr;
          let elem = {
            name: norwegian_name,
            id: code,
            points: credit,
            average: average,
          };
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === code) elem = null;
          }
          if (elem) arr.push(elem);
          return arr;
        });
      });
  };

  const deleteCourse = (e) => {
    const code =
      e.target.parentElement.parentElement.firstChild.nextSibling.innerText;
    setCourses((prev) => {
      const arr = [...prev];
      arr.forEach((elem, i) => {
        if (elem.id === code) arr.splice(i, 1);
      });
      return arr;
    });
  };

  return (
    <div className={style.app}>
      <h1 className={style.heading}>Karakterkalkulator</h1>
      <code>Work in progress...</code>
      <code>Snitt: {0.0}</code>
      <input
        type="text"
        id="getCourse"
        placeholder="Emnekode"
        className={style.getCourse}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            addCourse(document.querySelector("#getCourse").value);
        }}
      />
      <div className={style.course_container}>
        {courses.length ? (
          courses.map((course) => (
            <Course
              key={course.id}
              code={course.id}
              name={course.name}
              points={course.points}
              average={course.average}
              delete={(e) => {
                deleteCourse(e);
              }}
            />
          ))
        ) : (
          <code>Ingen emner er lagt til...</code>
        )}
      </div>
    </div>
  );
}
