import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaxMax from "./components/TaxMax";
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  return (
    <>
      <ParticlesBackground />
      <Routes>
        <Route path="/" element={<TaxMax />} />
      </Routes>
    </>
  );
}

export default App;
