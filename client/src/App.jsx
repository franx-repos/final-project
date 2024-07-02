import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaxMax from "./components/TaxMax";
import Dashboard from "./components/user-area/Dashboard";
import Chat from "./components/user-area/Chat";
import ParticlesBackground from "./components/ParticlesBackground";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ResetPassword from "./components/ResetPassword";
import AuftragÜbersicht from "./components/Aufträge/AuftragÜbersicht";
import Modalsignin from "./components/signinmodal/Modalsignin";
import Taskoverview from "./components/Aufträge/Taskoverview";
import MatchingPage from "./components/Aufträge/MatchingPage";

function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<TaxMax />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="Chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset-pass" element={<ResetPassword />} />
        <Route path ="/order" element={<AuftragÜbersicht />} />
        <Route path="/modalsignin" element={<Modalsignin />} />
        <Route path="/Match" element={<MatchingPage /> }/>
      </Routes>
    </>
  );
}

export default App;
