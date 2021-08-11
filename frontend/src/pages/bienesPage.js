import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/sidebar/Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";
import {Link} from "react-router-dom"

function Bienes() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [bienes, setBienes] = useState([]);
  const [conac, setConac] = useState([]);
  const [image, setImage] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [depreciacion, setDepreciacion] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [proyecto, setProyecto] = useState([]);
  const [bienSelected, setBienSelected] = useState({
    nombreBien: "",
    descripcionBien: "",
    claveControl: "",
    numeroInventarioAnterior: "",
    numeroInventarioArmonizado: "",
    clasificacionAdicional: "",
    numeroSerie: "",
    fechaAlta: "",
    estatusBien: "",
    tratamientoAdministrativo: "",
    numeroResguardo: "",
    costoBien: "",
    costoContable: "",
    tipoBien: "",
    montoDepreciacion: "",
    mesesDepreciacion: "",
    id_clasificacionConac: "",
    id_Proyecto: "",
    id_Departamento: "",
    id_catalogoDepreciacion: "",
    id_Modelo: "",
    id_Factura: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBienSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //? Control de efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("bienes")
        .then((response) => {
          setBienes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
    fetchDepartamento();
    fetchConac();
    fetchDepreciacion();
    fetchModelo();
    fetchProyecto();
  }, []);

  //* Funciones de obtencion de datos , hacia la base de datos.
 
  const fetchConac = async () => {
    await axios
      .get("conac")
      .then((response) => {
        setConac(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDepartamento = async () => {
    await axios
      .get("departamentos")
      .then((response) => {
        setDepartamentos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchDepreciacion = async () => {
    await axios
      .get("depreciacion")
      .then((response) => {
        setDepreciacion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchModelo = async () => {
    await axios
      .get("modelos")
      .then((response) => {
        setModelo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchProyecto = async () => {
    await axios
      .get("proyectos")
      .then((response) => {
        setProyecto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //*Funciones de insercion y eliminacion 
  const uploadImage=e=>{
    setImage(e.target.files[0]);
    console.log(image)
  }
  const insertBien = async () => {
    bienSelected.montoDepreciacion = 350;
    console.log(bienSelected.montoDepreciacion);
    let formdata = new FormData();
    formdata.append('image',image);
    formdata.append('nombreBien',bienSelected.nombreBien);
    formdata.append('descripcionBien',bienSelected.descripcionBien);
    formdata.append('claveControl',bienSelected.claveControl);
    formdata.append('numeroInventarioAnterior',bienSelected.numeroInventarioAnterior);
    formdata.append('numeroInventarioArmonizado', bienSelected.numeroInventarioArmonizado);
    formdata.append('clasificacionAdicional', bienSelected.clasificacionAdicional);
    formdata.append('numeroSerie', bienSelected.numeroSerie);
    formdata.append('fechaAlta', bienSelected.fechaAlta);
    formdata.append('estatusBien', bienSelected.estatusBien);
    formdata.append('tratamientoAdministrativo', bienSelected.tratamientoAdministrativo);
    formdata.append('numeroResguardo', bienSelected.numeroResguardo);
    formdata.append('costoBien', bienSelected.costoBien);
    formdata.append('costoContable', bienSelected.costoContable);
    formdata.append('tipoBien', bienSelected.tipoBien);
    formdata.append('motivoBaja', bienSelected.motivoBaja);
    formdata.append('fechaBaja', bienSelected.fechaBaja);
    formdata.append('fechaBaja', bienSelected.fechaBaja);
    formdata.append('montoDepreciacion', bienSelected.montoDepreciacion);
    formdata.append('mesesDepreciacion', bienSelected.mesesDepreciacion);
    formdata.append('id_clasificacionConac', bienSelected.id_clasificacionConac);
    formdata.append('id_Proyecto', bienSelected.id_Proyecto);
    formdata.append('id_Departamento', bienSelected.id_Departamento);
    formdata.append('id_Modelo', bienSelected.id_Modelo);
    formdata.append('id_catalogoDepreciacion',bienSelected.id_catalogoDepreciacion);
    await axios.post('http://localhost:4000/api/bienes',formdata)
    .then(response=>
      setBienes(bienes.concat(response.data)), 
      OpenCloseModalInsert()
      )
  }
  //TODO: Control de modales.
  const OpenCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };
  const OpenCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const OpenCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };
  const deleteBien = async()=>{
    await axios
    .delete("bienes/" + bienSelected.id_Bien)
    .then((response) => {
      setBienes(bienes.filter((bienes) => bienes.id_Bien !== bienSelected.id_Bien));
      setBienSelected(null);
      OpenCloseModalDelete();
    });
  }

  const selectBien = (bien,caso) => {
    setBienSelected(bien);
    caso === "Editar" ? OpenCloseModalEdit():OpenCloseModalDelete()
  }
  return (
    <>
      <div>
        <Navbar />
        <div className="menu">
          <h1 style={{ textAlign: "center" }}>Bienes</h1>
          <div>
            <Button onClick={OpenCloseModalInsert} variant="primary">
              Agregar Nuevo Bien
            </Button>
          </div>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Bien</th>
              <th>Descripcion</th>
              <th>Numero Inventario Armonizado</th>
              <th>Numero Inventario Anterior</th>
              <th>Fecha de Alta</th>
              <th>Estatus del Bien</th>
              <th>Numero de Resguardo</th>
              <th>Tipo de bien</th>
              <th>Clave de control</th>
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody>
            {bienes.map((bienes) => (
              <tr key={bienes.id_Bien}>
                <td>{bienes.id_Bien}</td>
                <td>
                  <Link to={`bienes-info/${bienes.id_Bien}`}>
                  {bienes.nombreBien}
                  </Link>
                </td>
                <td>{bienes.descripcionBien}</td>
                <td>{bienes.numeroInventarioArmonizado}</td>
                <td>{bienes.numeroInventarioAnterior}</td>
                <td>{bienes.fechaAlta}</td>
                <td>{bienes.estatusBien}</td>
                <td>{bienes.numeroResguardo}</td>
                <td>{bienes.tipoBien}</td>
                <td>{bienes.claveControl}</td>
                <td>
                  <Button variant="success" onClick={()=>selectBien(bienes,"Editar")} >Editar</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={()=>selectBien(bienes,"Eliminar")}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={modalInsert} onHide={OpenCloseModalInsert}>
        <Modal.Header>
          <Modal.Title>Insertar Un Nuevo Bien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del Bien</Form.Label>
              <Form.Control name="nombreBien" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion del Bien</Form.Label>
              <Form.Control
                name="descripcionBien"
                type="textarea"
                size="lg"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Clave de Control</Form.Label>
              <Form.Control name="claveControl" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numero de Inventario Armonizado</Form.Label>
              <Form.Control
                name="numeroInventarioArmonizado"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numero de inventario Anterior</Form.Label>
              <Form.Control
                name="numeroInventarioAnterior"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Clasificacion Adicional</Form.Label>
              <Form.Control
                name="clasificacionAdicional"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numero de Serie</Form.Label>
              <Form.Control name="numeroSerie" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fotografia del Bien</Form.Label>
              <Form.File name="image" onChange={uploadImage} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Alta</Form.Label>
              <Form.Control
                type="date"
                name="fechaAlta"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estatus del Bien</Form.Label>
              <Form.Control
                as="select"
                name="estatusBien"
                onChange={handleChange}
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tratamiento Administrativo</Form.Label>
              <Form.Control
                as="select"
                name="tratamientoAdministrativo"
                onChange={handleChange}
              >
                <option>Si</option>
                <option>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero de Resguardo</Form.Label>
              <Form.Control name="numeroResguardo" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Costo del Bien</Form.Label>
              <Form.Control name="costoBien" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Costo Contable</Form.Label>
              <Form.Control name="costoContable" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo de Bien</Form.Label>
              <Form.Control name="tipoBien" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Meses de Depreciacion</Form.Label>
              <Form.Control name="mesesDepreciacion" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Clasificacion de Conac</Form.Label>
              <Form.Control
                as="select"
                name="id_clasificacionConac"
                onChange={handleChange}
              >
                {conac.map((conac) => (
                  <option value={conac.id_clasificacionConac}>
                    Nombre: {conac.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Proyecto</Form.Label>
              <Form.Control
                as="select"
                name="id_Proyecto"
                onChange={handleChange}
              >
                {proyecto.map((proyecto) => (
                  <option value={proyecto.id_Proyecto}>
                    Nombre: {proyecto.nombrProyecto} Clave:{" "}
                    {proyecto.claveProyecto}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                as="select"
                name="id_Departamento"
                onChange={handleChange}
              >
                {departamentos.map((departamentos) => (
                  <option value={departamentos.id_Departamento}>
                    {departamentos.nombreDepartamento}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tratamiento Administrativo</Form.Label>
              <Form.Control
                as="select"
                name="tratamientoAdministrativo"
                onChange={handleChange}
              >
                <option>PATRIMONIO</option>
                <option>SUJETO A CONTROL</option>
                <option>N/A</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Catalogo de Depreciacion</Form.Label>
              <Form.Control
                as="select"
                name="id_catalogoDepreciacion"
                onChange={handleChange}
              >
                {depreciacion.map((depreciacion) => (
                  <option value={depreciacion.id_CatalogoDepreciacion}>
                    Concepto: {depreciacion.concepto} Vida util:{" "}
                    {depreciacion.vidaUtil} años
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                as="select"
                name="id_Modelo"
                onChange={handleChange}
              >
                {modelo.map((modelo) => (
                  <option value={modelo.id_Modelo}>
                    Marca: {modelo.marca} Submarca: {modelo.submarca} Modelo:{" "}
                    {modelo.modelo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>insertBien()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={OpenCloseModalInsert}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={() => OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Eliminar Bien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este bien ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteBien()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => OpenCloseModalDelete()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Bienes;
