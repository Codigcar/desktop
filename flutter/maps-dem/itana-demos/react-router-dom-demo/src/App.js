import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/components/Users';
import Orders from './pages/components/Orders';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard />} >
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
