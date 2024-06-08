import './App.css';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import apiInstance from './ApiInstance';

const AuthService = {
  signIn: (email, password) => apiInstance.post("/ruta-incorrecta", { email: email, password: password }),
};

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBar, setSnackBar] = useState({ message: "", open: "", severity: "" });

  const onClick = async () => {
    AuthService
      .signIn(email, password)
      .then(response =>{
        setSnackBar({...snackBar, 
          open: true, 
          message: "Login exitoso", 
          severity: 'success'});
      })
      .catch(err => {
        setSnackBar({...snackBar, 
          open: true, 
          message: err.message, 
          severity: 'error'});
      })
  };

  const handleClose = () => {
    setSnackBar({...snackBar, open: false});
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "white"}}>
        <TextField type="email" value={email} label="Email" onChange={(event) => setEmail(event.target.value)}/>
        <br/>
        <TextField type="password" value={password} label="Password" onChange={(event) => setPassword(event.target.value)}/>
        <br/>
        <Button onClick={onClick} variant="contained">Sign In</Button>
      </header>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center"}} open={snackBar.open} onClose={handleClose} autoHideDuration={2000}>
        <Alert onClose={handleClose} severity={snackBar.severity} sx={{ width: '100%' }}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
