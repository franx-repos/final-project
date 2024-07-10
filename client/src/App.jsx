import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaxMax from "./components/TaxMax";
import Dashboard from "./components/user-area/Dashboard";
import Chat from "./components/user-area/Chat";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ResetPassword from "./components/ResetPassword";
import Modalsignin from "./components/signinmodal/Modalsignin";
import NotFound from "./components/NotFound";
import About from "./components/user-area/taxmaxheader/About";
import Contact from "./components/user-area/taxmaxheader/Contact";

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
        <Route path="/modalsignin" element={<Modalsignin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
