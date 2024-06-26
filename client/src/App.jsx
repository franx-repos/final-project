import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaxMax from "./components/TaxMax";
import Dashboard from "./components/user-area/Dashboard";
import Chat from "./components/user-area/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TaxMax />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
