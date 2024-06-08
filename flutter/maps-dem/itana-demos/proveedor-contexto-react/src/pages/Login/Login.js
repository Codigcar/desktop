import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";

const Login = () => {

  const navigate = useNavigate();
  const [usuario, setUsuario] =  useState('');
  const [password, setPassword] =  useState('');

  const handleChangeUsuario= (event) => {
    setUsuario(event.target.value);
  };

  const handleChangePassword= (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    AuthService
      .login(usuario, password)
      .then(response => navigate('../home'))
      .catch(error => console.error(error))
      .finally();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ width: '500px', height: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb:3, fontSize: '25px', fontWeight: 'bold'}}>React context</Box>
          <TextField sx={{ mb: 1 }} label="Usuario" onChange={handleChangeUsuario} >
          </TextField>
          <TextField sx={{ mb: 1 }} label="Contraseña" type="password" onChange={handleChangePassword}>
          </TextField>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Login;