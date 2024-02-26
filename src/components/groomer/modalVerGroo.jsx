import React, { useState, useEffect } from "react";
import Boton from "../dash/boton";
import { EyeIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";

// Establecemos la referencia al elemento raíz de la aplicación para React Modal
Modal.setAppElement("#root");

export default function AlertaVer(props) {
  const { idSeleccionado, tooltip, rows } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [datosMostrados, setDatosMostrados] = useState([]);
  const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0);

  const customStyles = {
    content: {
      top: "20%", // Ajustar la posición vertical del modal
      left: "50%",
      transform: "translateX(-50%)", // Centrar horizontalmente
      width: "90%", // Ajustar el ancho del modal
      maxWidth: "900px", // Ancho máximo del modal
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden", // Quitar la barra de desplazamiento del modal
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  // Actualizar el estado 'desabilitado' cuando cambie 'idSeleccionado'
  useEffect(() => {
    setDesabilitado(idSeleccionado.length === 0);
  }, [idSeleccionado]);

  const handleMensajeClick = () => {
    const datosFiltrados = rows.filter((dato) => dato.id === idSeleccionado);
    if (datosFiltrados.length > 0) {
      setDatosMostrados(datosFiltrados);
      setModalIsOpen(true);
    }
  };

  return (
    <>
      <Boton
        bgColor="secondary"
        icon={<EyeIcon className="w-6 h-6" />}
        tooltip={tooltip}
        onClick={handleMensajeClick}
        disable={desabilitado} 
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{ color: "#333", textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Información del registro seleccionado</h2>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Agregar barra de desplazamiento aquí */}
          <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={styles.tableHeader}>Nombre Dueño</th>
                <th style={styles.tableHeader}>Nombre Mascota</th>
                <th style={styles.tableHeader}>Fecha Aplicación</th>
                <th style={styles.tableHeader}>Servicio</th>
                <th style={styles.tableHeader}>Tipo Mascota</th>
                <th style={styles.tableHeader}>Descripción Estado</th>
              </tr>
            </thead>
            <tbody>
              {datosMostrados.map((dato) => (
                <tr key={dato.id} style={styles.tableRow}>
                  <td style={styles.tableData}>{dato.nombreDueno}</td>
                  <td style={styles.tableData}>{dato.nombreMascota}</td>
                  <td style={styles.tableData}>{dato.fechaAplicacion}</td>
                  <td style={styles.tableData}>{dato.servicio}</td>
                  <td style={styles.tableData}>{dato.tipomascota}</td>
                  <td style={styles.tableData}>{dato.descripcionEstado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "20px" }}>
          <strong>Nota de Servicio:</strong>
          <p style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px", marginTop: "5px", width: "100%" }}>
            {datosMostrados.length > 0 && datosMostrados[0].notaServicio}
          </p>
        </div>
        <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </>
  );
}

const styles = {
  tableHeader: {
    padding: "12px 8px",
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "1px solid #ccc",
  },
  tableRow: {
    borderBottom: "1px solid #ccc",
  },
  tableData: {
    padding: "12px 8px",
    borderBottom: "1px solid #ccc",
  },
};
