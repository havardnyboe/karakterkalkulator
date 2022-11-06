import React, { useState } from "react";
import classnames from "classnames";
import Button from "./GradeButton";
import style from "./styles/Course.module.css";

export default function Course(props) {
  const [buttons, setButtons] = useState([
    { name: "A", style: style.btn_A, state: true },
    { name: "B", style: style.btn_B, state: true },
    { name: "C", style: style.btn_C, state: true },
    { name: "D", style: style.btn_D, state: true },
    { name: "E", style: style.btn_E, state: true },
    { name: "F", style: style.btn_F, state: true },
  ]);

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

  const handleButton = (e) => {
    const index = grades[String(e.target.name)];
    console.log(index);
    setButtons((prev) => {
      let arr = [...prev];
      for (let i = 0; i < prev.length; i++) {
        if (i === index) arr.at(i).state = true;
        else arr.at(i).state = false;
      }
      return arr;
    });
    console.log(buttons);
  };

  return (
    <div className={style.course}>
      <h3 className={style.heading}>{props.code || "KODE"}</h3>
      <span className={classnames(style.span, style.mg0)}>
        Poeng: {props.points || 0}
      </span>
      <span className={style.span}>{props.name || "NAVN"}</span>
      <div className={style.btn_container}>
        {buttons.map((button) => (
          <Button
            key={button.name}
            name={button.name}
            style={buttons[grades[button.name]].state ? button.style : ""}
            onClick={handleButton}
          />
        ))}
      </div>
      <span className={style.span}>
        Snitt: {`${grades[round(props.average)]} (${round(props.average, 2)})`}
      </span>
    </div>
  );
}
