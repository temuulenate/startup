import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LookupPage from './pages/LookupPage.jsx';
import TopUpPage from './pages/TopUpPage.jsx';
import TransferPage from './pages/TransferPage.jsx';
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link className="brand" to="/">P2P</Link>
        <div className="links">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/lookup">Lookup</NavLink>
          <NavLink to="/topup">Top-Up</NavLink>
          <NavLink to="/transfer">Transfer</NavLink>
        </div>
      </nav>
      <div className="wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lookup" element={<LookupPage />} />
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="/transfer" element={<TransferPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
