import React, { useState } from "react";
import classnames from "classnames";
import Button from "./GradeButton";
import style from "./styles/Course.module.css";

export default function Course(props) {
  const gradeButtons = [
    { name: "F", id: 0, style: [style.btn_F, true] },
    { name: "E", id: 1, style: [style.btn_E, true] },
    { name: "D", id: 2, style: [style.btn_D, true] },
    { name: "C", id: 3, style: [style.btn_C, true] },
    { name: "B", id: 4, style: [style.btn_B, true] },
    { name: "A", id: 5, style: [style.btn_A, true] },
  ];
  const boolButtons = [
    { name: "Ikke Bestått", id: 0, style: [style.btn_F, true] },
    { name: "Bestått", id: 1, style: [style.btn_A, true] },
  ];

  const [toggleBtn, setToggleBtn] = useState(false);
  const [buttons, setButtons] = useState(gradeButtons);

  const grades = {
    5: "A",
    4: "B",
    3: "C",
    2: "D",
    1: "E",
    0: "F",
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
  };

  const round = (int, decimals = 0) => {
    return Math.round(int * 10 ** decimals) / 10 ** decimals;
  };

  const changeButtons = (e) => {
    toggleBtn ? setButtons(gradeButtons) : setButtons(boolButtons);
    setToggleBtn((prev) => !prev);
    const duration = 300;
    e.target.style = `transform: rotate(360deg); transition: ${duration}ms;`;
    setTimeout(() => {
      e.target.style = "transform: rotate(0deg); transition: 0ms;";
    }, duration);
  };

  const handleButton = (e) => {
    setButtons((prev) => {
      let arr = [...prev];
      arr.map((elem, i) => (elem.style[1] = false));
      arr[e.target.id].style[1] = true;
      return arr;
    });
  };

  return (
    <div className={style.course}>
      <div>
        <button onClick={changeButtons} className={style.flip}>
          &#8635;
        </button>
        <button onClick={props.delete} className={style.delete}>
          &#10060;
        </button>
      </div>
      <h3 className={style.heading}>{props.code || "KODE"}</h3>
      <span className={classnames(style.span, style.mg0)}>
        Poeng: {props.points || 0}
      </span>
      <span className={style.span}>{props.name || "NAVN"}</span>
      <div className={style.btn_container}>
        {buttons
          .map((button) => (
            <Button
              id={button.id}
              key={button.id}
              name={button.name}
              style={button.style[1] ? button.style[0] : ""}
              onClick={handleButton}
            />
          ))
          .reverse()}
      </div>
      <span className={style.span}>
        Snitt: {`${grades[round(props.average)]} (${round(props.average, 2)})`}
      </span>
    </div>
  );
}
