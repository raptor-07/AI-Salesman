import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from "./components/inventory";
import Buyer from "./components/Buyer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/buyer" element={<Buyer />} />
      </Routes>
    </Router>
  );
}

export default App;