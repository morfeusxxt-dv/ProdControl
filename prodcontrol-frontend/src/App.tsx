
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Materials from './pages/Materials';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
