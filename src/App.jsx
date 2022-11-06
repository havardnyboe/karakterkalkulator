import React, { useEffect, useRef, useState } from "react";
import Course from "./Course";
import style from "./styles/App.module.css";

const COURSES_KEY = "YAFn!!aB3u$U7r3";

export default function App() {
  const [courses, setCourses] = useState([]);
  const getCourse = useRef();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem(COURSES_KEY));
    if (storedCourses) setCourses((prev) => [...prev, ...storedCourses]);
  }, []);

  useEffect(() => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  }, [courses]);

  const addCourse = () => {
    if (getCourse.current.value === "") return alert("Kan ikke være null");
    fetch(
      `https://grades.no/api/v2/courses/${getCourse.current.value.toUpperCase()}/`
    )
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
        ref={getCourse}
        placeholder="Emnekode"
        className={style.getCourse}
        onKeyDown={(e) => {
          if (e.key === "Enter") addCourse();
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
