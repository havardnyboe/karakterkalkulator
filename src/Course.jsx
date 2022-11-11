import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import Button from "./GradeButton";
import style from "./styles/Course.module.css";

export default function Course(props) {
  const gradeButtons = [
    {
      name: "F",
      id: 0,
      style: style.btn_F,
      selected: true,
    },
    {
      name: "E",
      id: 1,
      style: style.btn_E,
      selected: true,
    },
    {
      name: "D",
      id: 2,
      style: style.btn_D,
      selected: true,
    },
    {
      name: "C",
      id: 3,
      style: style.btn_C,
      selected: true,
    },
    {
      name: "B",
      id: 4,
      style: style.btn_B,
      selected: true,
    },
    {
      name: "A",
      id: 5,
      style: style.btn_A,
      selected: true,
    },
  ];
  const boolButtons = [
    {
      name: "Ikke Bestått",
      id: 0,
      style: style.btn_F,
      selected: true,
    },
    {
      name: "Bestått",
      id: 1,
      style: style.btn_A,
      selected: true,
    },
  ];

  const [toggleBtn, setToggleBtn] = useState(false);
  const [buttons, setButtons] = useState(gradeButtons);
  const btnFlip = useRef(0);

  useEffect(() => {
    setButtons((prev) => {
      [...prev].forEach((btn) => {
        if (btn.id === Number(props.grade)) btn.selected = true;
        else if (props.grade === null) btn.selected = true;
        else btn.selected = false;
      });
      return [...prev];
    });
  }, [props.grade]);

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
    props.updateGrade(e, props.code, true);
    toggleBtn ? setButtons(gradeButtons) : setButtons(boolButtons);
    setToggleBtn((prev) => !prev);
    const duration = 300;
    e.target.style = `transform: rotate(360deg); transition: ${duration}ms;`;
    setTimeout(() => {
      e.target.style = "transform: rotate(0deg); transition: 0ms;";
    }, duration);
  };

  const handleButton = (e) => {
    props.updateGrade(e, props.code);
  };

  return (
    <div className={style.course}>
      <div>
        <button onClick={changeButtons} className={style.flip} ref={btnFlip}>
          &#8635;
        </button>
        <button
          onClick={() => props.delete(props.code)}
          className={style.delete}
        >
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
              style={button.selected ? button.style : ""}
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
