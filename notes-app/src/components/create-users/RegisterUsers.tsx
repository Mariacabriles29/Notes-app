import React, { useState } from "react";
import { TextField, Button, Avatar, Typography, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const RegisterUsers = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/users", {
      ...userData,
    });

    if (response.statusText === "Created") {
      toast.success("Usuario creado", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Usuario no creada", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    navigate("/");
  };

  return (
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
        Registro
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="usuario"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="password"
          label="contraseña"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </form>
    </Box>
  );
};
