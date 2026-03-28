import React, { useEffect, useState } from "react";
import { Trash2, AlertTriangle, Eye } from "lucide-react";
import { useFetch } from "../Hooks/useFetch";

export const ReportedMaterialsModal = ({ materials, onClose, onDelete }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data: usersData, loading: usersLoading } = useFetch(`${API_URL}/users`);
  const [materialsWithUser, setMaterialsWithUser] = useState([]);

  useEffect(() => {
    if (!materials || !usersData) return;

    const enriched = materials.map((m) => {
      const user = usersData.find((u) => u.id === m.userId);
      return { ...m, userName: user ? user.username || user.nombre : "Desconocido" };
    });

    setMaterialsWithUser(enriched);
  }, [materials, usersData]);

  if (usersLoading) return null; // o spinner si querés

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <AlertTriangle size={20} className="me-2 text-danger" />
                Materiales Reportados
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Usuario</th>
                      <th className="text-center">Motivo</th>
                      <th className="text-center">Reportes</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialsWithUser.map((m) => {
                      const motivosArray = m.reportes ? m.reportes.map(r => r.motivo) : [];
                      const motivosUnicos = [...new Set(motivosArray)].join(' | '); 
                      const tooltipText = motivosUnicos || "Motivo no especificado";

                      return (
                        <tr key={m.id} className="align-middle">
                          <td>{m.titulo}</td>
                          <td className="text-secondary">{m.userName}</td>
                          
                          <td className="text-center">
                            {tooltipText}
                          </td>

                          <td className="text-center">
                            <span 
                            className="badge bg-danger rounded-pill"
                            style={{ cursor: 'help' }}>
                              {m.cantidadReportes}
                            </span>
                          </td>


                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <a
                                href={`/material/${m.id}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm"
                                title="Ver material en nueva pestaña"
                              >
                                <Eye size={16} />
                              </a>
                              <button
                                className="btn btn-danger-custom btn-sm"
                                onClick={() => onDelete(m)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )})}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
