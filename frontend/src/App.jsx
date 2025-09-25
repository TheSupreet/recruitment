import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">
            Recruitment
          </Link>
          <nav className="nav">
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="container page-wrap">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Recruitment • Built with ❤️</div>
      </footer>
    </Router>
  );
}
