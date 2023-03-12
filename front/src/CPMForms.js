import { useState } from "react";
import Form from "./Form";
import { Link } from "react-router-dom";

const CPMForms = () => {
  const [amount, setAmount] = useState(1);
  const [forms, setForms] = useState([<Form />]);

  const plus = () => {
    setAmount((prev) => prev + 1);
    setForms((prev) => [...prev, <Form />]);
  };
  const minus = () => {
    if (amount > 0) {
      setAmount((prev) => prev - 1);
      setForms((prev) => prev.slice(0, -1));
    }
  };
  return (
    <div>
      <button onClick={plus}>+</button>
      {amount}
      <button onClick={minus}>-</button>
      {forms}
      <button>
        <Link to="/cpm/results">Oblicz</Link>
      </button>
    </div>
  );
};

export default CPMForms;
