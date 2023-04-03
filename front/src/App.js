import { BrowserRouter, Routes, Route } from "react-router-dom";
import CPMForms from "./CPMForms";
import CPMResults from "./CPMResults";
import Home from "./Home";
import NoPage from "./NoPage";
import PosForms from "./PosForms"
import PosResults from "./PosResults"
import index from "./index.css"

function App() {
  return (
    <div className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cpm/forms" element={<CPMForms  />} />
          <Route path="/cpm/results" element={<CPMResults />} />
          <Route path="/pos/forms" element={<PosForms />} />
          <Route path="/pos/results" element={<PosResults />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
