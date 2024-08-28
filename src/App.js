import "./App.css";
import ConnectionForm from "./pages/ConnectionForm";
import { Route, Routes } from "react-router-dom";
import SendMessage from "./pages/SendMessage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ConnectionForm />} />
        <Route path="/client" element={<SendMessage />} />
      </Routes>
    </div>
  );
}

export default App;
