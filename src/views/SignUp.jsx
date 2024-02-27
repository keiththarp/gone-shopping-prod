import * as React from "react";
import { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import styled from "styled-components";

import { useAuth } from "../context/AuthContext.jsx";

const internals = {};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link href="#">Gone Shopping</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState();

  const { signUp, currentUser } = useAuth();

  const { SignUpAlert } = internals;

  const passwordCheck = () => {
    if (passwordRef.current.value !== confPasswordRef.current.value) {
      return setPasswordValidated(false);
    }
    return setPasswordValidated(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;

    if (password !== confPasswordRef.current.value) {
      return setError("Passwords must match.");
    }

    if (password.length < 8) {
      return setError("Password length must be at least 8 characters");
    }

    try {
      console.log(nameRef.current.value);
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, password, nameRef.current.value);
    } catch {
      setError("Failed to create new account.");
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <SignUpAlert
          severity="error"
          onClick={() => {
            setError("");
          }}
        >
          {error} X
        </SignUpAlert>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "disabled" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            inputRef={nameRef}
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="user-name"
            autoComplete="user-name"
            autoFocus
          />
          <TextField
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
          />
          <TextField
            inputRef={confPasswordRef}
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            onChange={passwordCheck}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            disabled={loading || !passwordValidated}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

internals.SignUpAlert = styled(Alert)`
  cursor: pointer;
`;
