import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Proveedores() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSelected, setProveedorSelected] = useState({
    nombreProveedor: "",
    RFCproveedor: "",
    domicilioFiscalProveedor: "",
    telefonoProveedor: "",
    correoProveedor: "",
    giro: "",
  });
//Recepcion de datos , lectura en el estado.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//Consumo de la API //Todos los metodos
  const insertProveedor = async () => {
    await axios
      .post("http://localhost:4000/api/proveedores", proveedorSelected)
      .then(
        (response) => setProveedores(proveedores.concat(response.data)),
        OpenCloseModalInsert()
      );
  };

  


  const updateProveedor=async()=>{
    await axios.put(("http://localhost:4000/api/proveedores/"+proveedorSelected.id_Proveedor), proveedorSelected)
    .then(response=>{
      var dataNueva=proveedores;
      dataNueva.map(proveedores=>{
        if(proveedorSelected.id_Proveedor===proveedores.id_Proveedor){
          proveedores.nombreProveedor=proveedorSelected.nombreProveedor;
          proveedores.RFCproveedor=proveedorSelected.RFCproveedor;
          proveedores.domicilioFiscalProveedor=proveedorSelected.domicilioFiscalProveedor;
          proveedores.telefonoProveedor=proveedorSelected.telefonoProveedor;
          proveedores.correoProveedor=proveedorSelected.correoProveedor;
          proveedores.giro=proveedorSelected.giro;
        }
      })
      setProveedores(dataNueva);
      setProveedorSelected(null);
      OpenCloseModalEdit();
    })
  }

  const deleteProveedor = async () => {
    await axios.delete("http://localhost:4000/api/proveedores/"+proveedorSelected.id_Proveedor)
    .then(response =>{
      setProveedores(proveedores.filter(proveedores=>proveedores.id_Proveedor!==proveedorSelected.id_Proveedor));
      setProveedorSelected(null);
      abrirCerrarModalEliminar();
    })
  }
 
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/api/proveedores")
        .then((response) => {
          setProveedores(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const selectProveedor = (proveedor, caso) => {
    setProveedorSelected(proveedor);
    caso === "Editar" ? OpenCloseModalEdit() : abrirCerrarModalEliminar();
  };

//Control //Funcionamiento de los Modales

  const OpenCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };
  const OpenCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };


  

  return (
    <>
      <div>
        <Navbar />
        <div className="menu">
          <h1 style={{textAlign: 'center'}}>Proveedores</h1>
          <Button variant="primary" onClick={OpenCloseModalInsert}>
            Nuevo Proveedor
          </Button>
          <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Proveedor</th>
                <th>RFC</th>
                <th>Domicilio Fiscal</th>
                <th>Telefono</th>
                <th>Correo Electronico</th>
                <th>Giro</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id_Proveedor}>
                  <td>{proveedor.id_Proveedor}</td>
                  <td>{proveedor.nombreProveedor}</td>
                  <td>{proveedor.RFCproveedor}</td>
                  <td>{proveedor.domicilioFiscalProveedor}</td>
                  <td>{proveedor.telefonoProveedor}</td>
                  <td>{proveedor.correoProveedor}</td>
                  <td>{proveedor.giro}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => selectProveedor(proveedor, "Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => selectProveedor(proveedor, "Eliminar")}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={modalInsert} onHide={()=>OpenCloseModalInsert()}>
        <Modal.Header>
          <Modal.Title>Insertar Nuevo Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Proveedor</Form.Label>
              <Form.Control name="nombreProveedor" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>RFC del Proveedor </Form.Label>
              <Form.Control name="RFCproveedor" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Domicilio del Proveedor</Form.Label>
              <Form.Control
                name="domicilioFiscalProveedor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Telefono del Proveedor</Form.Label>
              <Form.Control name="telefonoProveedor" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                name="correoProveedor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Giro</Form.Label>
              <Form.Control name="giro" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() =>insertProveedor()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={()=>OpenCloseModalInsert()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() =>OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Proveedor</Form.Label>
              <Form.Control
                name="nombreProveedor"
                value={proveedorSelected && proveedorSelected.nombreProveedor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>RFC del Proveedor </Form.Label>
              <Form.Control
                value={proveedorSelected && proveedorSelected.RFCproveedor}
                name="RFCproveedor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Domicilio del Proveedor</Form.Label>
              <Form.Control
                name="domicilioFiscalProveedor"
                value={
                  proveedorSelected &&
                  proveedorSelected.domicilioFiscalProveedor
                }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Telefono del Proveedor</Form.Label>
              <Form.Control
                value={proveedorSelected && proveedorSelected.telefonoProveedor}
                name="telefonoProveedor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                value={proveedorSelected && proveedorSelected.correoProveedor}
                name="correoProveedor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Giro</Form.Label>
              <Form.Control
                value={proveedorSelected && proveedorSelected.giro}
                name="giro"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>updateProveedor()}>
            Modificar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={() =>OpenCloseModalEdit()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={modalEliminar} onHide={() =>abrirCerrarModalEliminar()}>
        <Modal.Header>
          <Modal.Title>Eliminar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este proveedor ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>deleteProveedor()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={()=>abrirCerrarModalEliminar()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Proveedores;
