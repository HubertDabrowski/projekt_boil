import { useState } from "react";
import SupplierTab from "./tables/SupplierTab";
import RecipientTab from "./tables/RecipientTab";
import TranportCostTab from "./tables/TransportCostTab"
import UnitProfitTab from "./tables/UnitProfitTab";
import OptimalTransportTab from "./tables/OptimalTransportTab"
import ParametersTab from "./tables/ParametersTab";
import {compute} from "./logic";

function App() {
  let [unitProfitTab,setUnitProfitTab]=useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  let [optimalTransportTab,setOptimalTransportTab]=useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  let [parametersTab,setParametersTab]=useState([0,0,0,0,0]);

  const setCompute = ()=>{compute(setUnitProfitTab,setOptimalTransportTab,setParametersTab)};
  return (
    <div>
      <div className="w-75 p-2">
        
      </div>
      <SupplierTab />
      <RecipientTab />
      <TranportCostTab />
      
      <div className="w-25 p-3" ><button className="btn btn-danger" onClick={setCompute}>Compute</button></div>

      <UnitProfitTab props={unitProfitTab} />
      <OptimalTransportTab props={optimalTransportTab}/>
      <ParametersTab props={parametersTab}/>

    </div>
  );
}

export default App;
