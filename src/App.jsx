import React, { useEffect, useRef, useState } from "react";
import Course from "./Course";
import { grades, round } from "./grades";
import style from "./styles/App.module.css";

const COURSES_KEY = "YAFn!!aB3u$U7r3";

export default function App() {
  const [courses, setCourses] = useState([]);
  const [average, setAverage] = useState(0);
  const [credit, setCredit] = useState(0);
  const getCourse = useRef();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem(COURSES_KEY));
    if (storedCourses) setCourses((prev) => [...prev, ...storedCourses]);
  }, []);

  useEffect(() => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    setAverage(
      sumGradesArray(courses.map((course) => [course.grade, course.points]))
    );
    setCredit(
      sumCreditArray(courses.map((course) => [course.grade, course.points]))
    );
  }, [courses]);

  function sumGradesArray(arr) {
    let sum = 0;
    let credit = 0;
    for (let i = 0; i < arr.length; i++) {
      if (![null, "PASS", "FAIL"].includes(arr[i][0])) {
        sum += Number(arr[i][0]) * Number(arr[i][1]);
        credit += Number(arr[i][1]);
      }
    }
    return sum / credit;
  }

  function sumCreditArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (![null, "0", "FAIL"].includes(arr[i][0])) {
        sum += Number(arr[i][1]);
      }
    }
    return sum;
  }

  const addCourse = () => {
    if (getCourse.current.value === "") return alert("Kan ikke være null");
    fetch(
      `http://grades.no/api/v2/courses/${getCourse.current.value.toUpperCase()}/`
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            alert(`Fant ikke emne ${getCourse.current.value.toUpperCase()}`);
          } else {
            alert(`${res.status}: ${res.statusText}}`);
          }
        }
        return res.json();
      })
      .then((json) => {
        const { norwegian_name, code, credit, average, detail } = json;
        getCourse.current.value = "";
        setCourses((prev) => {
          const arr = [...prev];
          if (detail === "Not found.") return arr;
          let elem = {
            name: norwegian_name,
            id: code,
            points: credit,
            average: average,
            grade: null,
          };
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === code) elem = null;
          }
          if (elem) arr.push(elem);
          return arr;
        });
      });
  };

  const deleteCourse = (code) => {
    setCourses((prev) => {
      const arr = [...prev];
      arr.forEach((elem, i) => {
        if (elem.id === code) arr.splice(i, 1);
      });
      return arr;
    });
  };

  function changeCourseGrade(e, code, reset = false) {
    setCourses((prev) => {
      const arr = [...prev];
      arr.forEach((course) => {
        if (course.id === code && !reset) course.grade = e.target.id;
        if (course.id === code && reset) course.grade = null;
      });
      return arr;
    });
  }

  return (
    <div className={style.app}>
      <h1 className={style.heading}>Karakterkalkulator</h1>
      <p className={style.subText}>
        Regn ut karaktersnitt for emner ved{" "}
        <a className={style.link} href="https://www.ntnu.no/studier/emner">
          NTNU
        </a>
      </p>
      <div className={style.gradeContainer}>
        <div className={style.grade}>{grades[round(average)]}</div>
        <div className={style.average}>
          {round(average, 2) ? "(" + round(average, 2) + ")" : ""}
        </div>
        <div className={style.credit}>{credit} stp</div>
      </div>
      <input
        type="text"
        ref={getCourse}
        placeholder="Emnekode"
        className={style.getCourse}
        onKeyDown={(e) => {
          if (e.key === "Enter") addCourse();
        }}
      />
      <input
        type="button"
        value="Legg til emne"
        className={style.addCourse}
        onClick={addCourse}
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
              grade={course.grade}
              updateGrade={changeCourseGrade}
              delete={deleteCourse}
            />
          ))
        ) : (
          <code>Ingen emner er lagt til...</code>
        )}
      </div>
    </div>
  );
}
