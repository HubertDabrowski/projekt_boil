import { useState } from "react";
import SupplierTab from "./posrednik/tables/SupplierTab";
import RecipientTab from "./posrednik/tables/RecipientTab";
import TranportCostTab from "./posrednik/tables/TransportCostTab";
import UnitProfitTab from "./posrednik/tables/UnitProfitTab";
import OptimalTransportTab from "./posrednik/tables/OptimalTransportTab";
import ParametersTab from "./posrednik/tables/ParametersTab";
import { compute } from "./posrednik/logic";

function PosForms() {
  let [unitProfitTab, setUnitProfitTab] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  let [optimalTransportTab, setOptimalTransportTab] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  let [parametersTab, setParametersTab] = useState([0, 0, 0, 0, 0]);

  const setCompute = () => {
    compute(setUnitProfitTab, setOptimalTransportTab, setParametersTab);
  };
  return (
    <div>
      <h1 className="ml-8 pt-4 mb-4">Podaj dane:</h1>
      <div className="border-double border-4 border-gray-600 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
        <div className="flex items-center justify-left">
          <SupplierTab />
        </div>
        <div className="flex items-center justify-left">
          <RecipientTab />
        </div>
        <div className="flex items-center justify-left">
          <TranportCostTab />
        </div>
        <div className="flex items-center justify-center">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={setCompute}
          >
            Oblicz
          </button>
        </div>
      </div>
      <h1 className="ml-8 mt-4 mb-4">Obliczenia:</h1>
      <div className="border-double border-4 border-gray-600 grid grid-flow-row-dense grid-cols-3 grid-rows-1 pt-20">

        <div className="flex items-center justify-left">
          <UnitProfitTab props={unitProfitTab} />
        </div>
        <div className="flex items-center justify-left">
          <OptimalTransportTab props={optimalTransportTab} />
        </div>
        <div className="flex items-center justify-left">
          <ParametersTab props={parametersTab} />
        </div>
      </div>
    </div>
  );
}

export default PosForms;
