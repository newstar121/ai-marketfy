import Land from "./components/land.component";
import './App.css';
import Base from './components/base.component'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/base" element={<Base />} />
        <Route path="/home" element={<Land />} />
        <Route path="/*" element={<Land />} />
      </Routes>
    </Router>
  );
}

export default App;
