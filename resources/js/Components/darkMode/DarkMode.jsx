import React, { useEffect, useState } from "react";
import Sun from "./Sun";
import Moon from "./Moon";
import "./DarkMode.css";

const DarkMode = () => {
  const htmlClasses = document.querySelector("html").classList;
  const checkTheme = localStorage.getItem("theme");
  const [checked, setChecked] = useState(
    checkTheme && checkTheme === "dark" ? true : false
  );

  const onChangeMode = (e) => {
    const checked = e.target.checked;

    if (checked) {
      localStorage.setItem("theme", "dark");
      htmlClasses.add("dark");
      htmlClasses.remove("light");
    } else {
      localStorage.setItem("theme", "light");
      htmlClasses.add("light");
      htmlClasses.remove("dark");
    }
    setChecked(checked);
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={checked}
        onChange={(e) => onChangeMode(e)}
      />
      <label className="dark_mode_label shadow-sm" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
