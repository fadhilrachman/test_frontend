import "./App.css";
import Navbar from "./components/Navbar";
import ActivityModule from "./pages/ActivityModule";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import DetailActivity from "./pages/DetailActivity";

function App() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<ActivityModule />} />
        <Route path="/detail/:id" element={<DetailActivity />} />
      </Routes>
    </div>
  );
}

export default App;
