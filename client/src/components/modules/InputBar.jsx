import React, { useState } from "react";
import { post } from "../../utilities";

/**
 * InputBar is the input query + input bar for any edit popup
 *
 * Proptypes
 * @param {String} inputQuery is the input query text
 * @param {String} defaultText is the default text in the input bar
 * @param {CallableFunction} handleChange handles any change in the input bar.
 */

const InputBar = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleChange(event.target.value);
    console.log(`input contains ${event.target.value}`);
  };

  return (
    <div>
      {props.inputQuery} {/* TODO: add some CSS; make this bold */}
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="InputBar"
      />{" "}
    </div>
  );
};

export default InputBar;
