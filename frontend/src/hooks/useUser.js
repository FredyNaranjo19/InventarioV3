import { useCallback, useContext,useState } from 'react';
import Context from "../context/UserContext";
import loginService from "../services/login";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);
  const [state,setState] = useState({loading:false,error:false});
  
  
  const login = useCallback(({correoUsuario, passwordUsuario}) => {
      setState({loading: true, error:false});
      loginService({
        correoUsuario,
        passwordUsuario,
      }).then((jwt) => {
        window.sessionStorage.setItem('jwt', jwt.jwt);
        window.sessionStorage.setItem('userId', jwt.usuario.id_Usuario)
        window.sessionStorage.setItem('userFoto', jwt.usuario.fotoUsuario);
        window.sessionStorage.setItem('userName',jwt.usuario.nombreUsuario);
        window.sessionStorage.setItem('userApellido',jwt.usuario.apellidoPUsuario);
        setState({loading: false, error:false});
        setJWT("jwt");
      })
      .catch((err,jwt) => {
        window.sessionStorage.clear();
        setState({loading: false, error:true});
        console.error(err)
      })
    },[setJWT])

  const logout = useCallback(() => {
    window.sessionStorage.clear();
    setJWT(null);
  }, [setJWT]);

  return {
    token:  jwt,
    isLoggedIn: Boolean(jwt),
    isLoginLoading : state.loading,
    isLoginError : state.error,
    login,
    logout,
  };
}
