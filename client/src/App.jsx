import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaxMax from "./components/TaxMax";
import ParticlesBackground from "./components/ParticlesBackground";
import Signup from "./components/Signup";
import Register from "./components/Signup";
import Signin from "./components/Signin";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
    {/* <Signup /> */}
  {/* <Signin /> */}
  {/* <ResetPassword /> */}
      <ParticlesBackground />
      <Routes>
        <Route path="/" element={<TaxMax />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset-pass" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
