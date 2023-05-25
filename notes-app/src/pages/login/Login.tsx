import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserContext } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserName = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate("/home/");
    } else {
      toast.error("Hubieron problemas con el logueo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log("Inicio de sesión fallido");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="username"
              autoComplete="username"
              label="usuario"
              value={username}
              onChange={handleUserName}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="contraseña"
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="recuerdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/register" className="link">
                  olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" className="link">
                  {"¿No tienes una cuenta? creala"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>{" "}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </Container>
    </>
  );
};
