import React, { useState, useEffect } from "react";
import Boton from "../dash/boton";
import { EyeIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";
import axios from "axios";
import dayjs from 'dayjs'
// Establecemos la referencia al elemento raíz de la aplicación para React Modal

export default function AlertaVer(props) {
  const { idSeleccionado, tooltip } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [datosMostrados, setDatosMostrados] = useState(null);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "90%",
      maxWidth: "100%",
      padding: "10px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };



  useEffect(() => {
    setDeshabilitado(!(idSeleccionado !== null && idSeleccionado));
  }, [idSeleccionado]);

  const handleMensajeClick = async () => {
    try {
      const result = await axios.get(`http://localhost:4321/groomer/${idSeleccionado}`);

      setDatosMostrados(result.data);
      setModalIsOpen(true);
    } catch (error) {
      console.log('Error' + error.message);
      // Manejar el error adecuadamente, mostrar un mensaje al usuario, etc.
    }
  };



  return (
    <>
      <>
        <Boton
          bgColor="secondary"
          icon={<EyeIcon className="w-6 h-6" />}
          tooltip={tooltip}
          onClick={handleMensajeClick}
          desable={deshabilitado}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {datosMostrados && (
            <div>
              <h2 className="text-gray-700 text-center text-3xl mb-8">Información del registro seleccionado</h2>
              <div className="max-h-80 overflow-y-auto mb-4">
                <table className="w-full rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4">Nombre cliente</th>
                      <th className="py-2 px-4">Fecha</th>
                      <th className="py-2 px-4">Servicio Finalizado</th>
                      <th className="py-2 px-4">Nombre Mascota</th>
                      <th className="py-2 px-4">Servicio</th>
                      <th className="py-2 px-4">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 max-w-xs">{datosMostrados.primer_nombre_cliente} {datosMostrados.primer_apellido_cliente}</td>
                      <td className="py-2 px-4 max-w-xs">{dayjs(datosMostrados.fecha_servicio_groomer).format('MM-DD-YYYY')}</td>
                      <td className="py-2 px-4 max-w-xs">{datosMostrados.servicio_finalizado_groomer === 1 ? 'Finalizado' : 'En proceso'}</td>
                      <td className="py-2 px-4 max-w-xs">{datosMostrados.nombre_mascota}</td>
                      <td className="py-2 px-4 max-w-xs">{datosMostrados.descripcion_servicio}</td>
                      <td className="py-2 px-4 max-w-sm">
                        <ul className="list-none p-0 h-36 overflow-auto">
                          {datosMostrados.contenido_servicio_groomer.split("\n").map((nota, index, line) => {
                            const notasSeparadas = nota.split(/(\d{2}-\d{2}-\d{4}):/).filter(Boolean);
                            return notasSeparadas.map((notaSeparada, i) => (
                              <li key={`${index}-${i}`} className="my-2 py-2 px-4 bg-gray-200 rounded">
                                {i % 2 === 0 ? <strong>{notaSeparada.trim()}</strong> : notaSeparada.trim()}
                              </li>
                            ));
                          })}
                        </ul>
                      </td>



                    </tr>
                  </tbody>
                </table>
              </div>
            </div>


          )}
          <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => setModalIsOpen(false)}>Cerrar</button>
        </Modal>
      </>
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
