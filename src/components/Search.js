import React, { useState } from 'react';

export default function Search({ setFilter }) {
  const [input, setInput] = useState('');
  return (
    <form className="form-input" onSubmit={onSubmitHandler}>
      <input type="text" value={input} onChange={onChangeHandler}></input>
      <button className="input-btn">Search</button>
    </form>
  );

  function onChangeHandler(e) {
    // setInput((prevValue) => prevValue + e.target.value);
    setInput(e.target.value);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    setFilter(input);
    setInput('');
  }
}
