import React, { useState } from "react";
import { Avatar, Box, Container, FormControl, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserName = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container>
        <FormControl fullWidth>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{/* <LockOutlinedIcon /> */}</Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField label="Username" value={username} onChange={handleUserName} margin="dense" />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePassword}
              margin="dense"
            />
            <Button variant="contained" type="submit">
              Login
            </Button>{" "}
          </Box>
        </FormControl>
      </Grid>
    </Container>
  );
};
