import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCompany from "./pages/AddCompany";
import Companies from "./pages/Companies";
import UpdateCompany from "./pages/UpdateCompany";
import GetCompany from "./pages/GetCompany";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Companies />} />
          <Route path="/search/:id" element={<GetCompany />} />
          <Route path="/add" element={<AddCompany />} />
          <Route path="/update/:id" element={<UpdateCompany />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;