import React from "react";
import ReactDOM from "react-dom";
import { UserContextProvider } from "./context/UserContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./pages/menuPage";
//import pages 
import Areas from "./pages/areasPage";
import Bienes from './pages/bienesPage';
import Conac from './pages/conacPage';
import Departamentos from './pages/departamentosPage';
import Depreciacion from './pages/depreciacionPage';
import Facturas from './pages/facturasPage';
import Modelos from './pages/modelosPage';
import Proveedores from './pages/proveedoresPage';
import Proyectos from './pages/proyectosPage';
import Trimestres from './pages/trimestresPage';
import Usuarios from './pages/usuariosPage';
import Profile from './components/ProfileIndividual/profileIndividual';
import BienIndividual from './components/Bienes/bienIndividual';
import EtiquetaVisualizer from './components/Bienes/etiquetaVisualicer';
ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/menu" component={Menu} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/areas" component={Areas} />
          <Route path="/bienes" component={Bienes} />
          <Route path="/conac" component={Conac} />
          <Route path="/departamentos" component={Departamentos} />
          <Route path="/depreciacion" component={Depreciacion} />
          <Route path="/facturas" component={Facturas} />
          <Route path="/modelos" component={Modelos} />
          <Route path="/proveedores" component={Proveedores} />
          <Route path="/proyectos" component={Proyectos} />
          <Route path="/trimestres" component={Trimestres} />
          <Route path="/usuarios" component={Usuarios} />
          <Route path="/user-info/:id" component={Profile} />
          <Route path="/bienes-info/:id" component={BienIndividual} />
          <Route path="/pdf/:data" component={EtiquetaVisualizer} />
          <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


