import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SessionContextProvider } from './context/session-context';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth"/>}/>
        <Route
          path="auth"
          element={<Login/>}
          />
        <Route
          path="home"
          element={
            <SessionContextProvider>
              <Home/>
            </SessionContextProvider>}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
