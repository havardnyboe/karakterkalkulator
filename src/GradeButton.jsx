import React from "react";
import classnames from "classnames";
import style from "./styles/Button.module.css";

export default function GradeButton(props) {
  return (
    <button
      className={classnames(style.btn, props.style)}
      onClick={props.onClick}
      name={props.name}
    >
      {props.name}
    </button>
  );
}
