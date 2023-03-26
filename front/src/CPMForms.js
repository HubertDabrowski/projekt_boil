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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="pt-10 pb-10 flex flex-row">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={plus}>+</button>
        <span className="text-lg pl-5 pr-5">{amount}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={minus}>-</button>
      </div>
      <div className="ml-10 mr-10 pb-10 grid grid-rows-3 grid-flow-col gap-4">
        {forms}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <Link to="/cpm/results">Oblicz</Link>
      </button>
    </div>
  );
};

export default CPMForms;
