import { useEffect, useState } from 'react';
import './App.css';

function Form() {
  const [model, setModel] = useState({});
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [reply, setReply] = useState('');
  const addHistory = (item) => {
    setHistory(...history, item);
    console.log(history)
  };
  useEffect(() => {
    setAi();
  }, []);

  async function setAi() {
    const newModel = await window.ai.createTextSession();
    setModel(newModel);
  }

  const onSubmit = async (form) => {
    form.preventDefault();
    const aiReply = await model.prompt(inputValue);
    setReply(aiReply);
    addHistory(aiReply);
    setInputValue('');
  };

  return (
    <>
      <form
        className="form"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e);
          }
        }}
        onSubmit={(form) => {
          onSubmit(form);
        }}
      >
        <h1>{reply}</h1>
        <div className="input">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button type="submit">Ввести</button>
        </div>
      </form>
      {!history.length && history.map((item, index) => (
        <p key={index} className='card'>{item}</p>
      ))}
    </>
  );
}

export default Form;
