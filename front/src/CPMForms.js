import { useState, useEffect } from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";

const CPMForms = () => {
  const [amount, setAmount] = useState(1);
  const [data, setData] = useState([
    {
      id: 0,
      name: "",
      cost: "",
      dependencies: "",
    },
  ]);

const navigate = useNavigate();

  useEffect(() => {
    //console.log(data);
  }, [data]);

  let forms = data.map((form) => {
    return <Form key={form.id} id={form.id} data={data} setData={setData} />;
  });

  const plus = () => {
    setAmount((prev) => prev + 1);
    setData((prev) => {
      //console.log(amount)
      return [...prev, { id: amount, name: "", cost: "", dependencies: "" }];
    });
  };

  const minus = () => {
    if (amount > 0) {
      setAmount((prev) => prev - 1);
      setData((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/cpm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((dat) =>{
        navigate("/cpm/results", {
              state: {
                calc: dat,
                form: data
              }})
        console.log(data)
      } 
        
      )
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="pt-10 pb-10 flex flex-row">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={plus}
        >
          +
        </button>
        <span className="text-lg pl-5 pr-5">{amount}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={minus}
        >
          -
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="justify-center flex-col align-middle"
      >
        <div className="ml-10 mr-10 pb-5 grid grid-rows-3 grid-flow-col gap-4">
          {forms}
        </div>
        <div className="mb-10 mt-5 flex justify-center">
          
            <button
              type="submit"
              value="Submit"
              className="w-24 align-middle bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Oblicz
            </button>
          
        </div>
      </form>
    </div>
  );
};

export default CPMForms;
