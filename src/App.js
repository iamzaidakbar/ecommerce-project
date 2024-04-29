import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/Navbar/Navbar';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/") {
      navigate("/store")
    }
  }, [pathname])

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
