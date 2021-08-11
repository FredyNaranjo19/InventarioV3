import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useUser from "../../hooks/useUser";
import Spinner from 'react-bootstrap/Spinner'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const classes = useStyles();
  const { login, isLoggedIn, isLoginLoading, isLoginError } = useUser();
  const history = useHistory();


  useEffect(() => {
    if (isLoggedIn) history.push('/menu')
  }, [isLoggedIn,history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ correoUsuario, passwordUsuario });
  };

  

  return (
    <>
    {isLoginLoading && <div> <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="sr-only">Loading...</span>
  </Button>{' '}
  <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button></div> }
    {!isLoginLoading &&
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Correo Electronico"
            placeholder="correoUsuario"
            onChange={(e) => setCorreoUsuario(e.target.value)}
            value={correoUsuario}
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="passwordUsuario"
            value={passwordUsuario}
            onChange={(e) => setPasswordUsuario(e.target.value)}
            label="Contraseña"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesion
          </Button>
        </form>
      </div>
      
    </Container>
    }
    {isLoginError && <strong>Usuario/Contrasena Invalidos  Intentelo nuevamente</strong>}
    </>
  );
}
