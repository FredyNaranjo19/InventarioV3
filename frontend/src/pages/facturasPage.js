import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/sidebar/Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Facturas() {
  return (
    <>
    <div>
      <Navbar/>
      <div className='menu'>
      <h1 style={{textAlign: 'center'}}>Facturas</h1>
    </div>
    <div>
      
    </div>
    </div>
    </>
  );
}

export default Facturas;