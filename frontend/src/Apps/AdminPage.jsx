import React, { useState, useEffect } from "react";
import { Users, FileText, Flag } from "lucide-react";
import { StatCard } from "../Components/StatCard";
import { BarChartUsers } from "../Components/BarChartUsers";
import { PieChartMaterials } from "../Components/PieChartMaterials";
import { ReportedMaterialsModal } from "../Components/ReportedMaterialsModal";
import { DeleteConfirm } from "../Components/DeleteConfirm";
import { Alert } from "../Components/Alert"; 
import { useFetch } from "../Hooks/useFetch";
import { getToken } from "../Helpers/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AdminPage.css";

export const AdminPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { data: users, loading: loadingUsers } = useFetch(
    `${API_URL}/users/`,
    {},
    { requireAuth: true }
  );

  const { data: materialsResponse, loading: loadingMaterials } = useFetch(
    `${API_URL}/materials/`,
    {},
    { requireAuth: true }
  );

  const { data: carrerasResponse, loading: loadingCarreras } = useFetch(
    `${API_URL}/carreras/`,
    {},
    { requireAuth: true }
  );

  const [stats, setStats] = useState({
    totalMaterials: 0,
    reportedMaterialsCount: 0
  });
  const [reportedMaterials, setReportedMaterials] = useState([]);
  const [usersByMonth, setUsersByMonth] = useState([]);
  const [materialsByCareer, setMaterialsByCareer] = useState([]);
  const [showReportedModal, setShowReportedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const COLORS = ["#4a90e2", "#50e3c2", "#f5a623", "#e94b3c", "#9013fe", "#bd10e0"];

  const handleDeleteMaterial = (material) => {
    setSelectedMaterial(material);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedMaterial) return;

    try {
      const response = await fetch(`${API_URL}/materials/${selectedMaterial.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el material");
      }

      // Actualizamos el estado local
      setReportedMaterials((prev) => prev.filter((m) => m.id !== selectedMaterial.id));
      setStats((prev) => ({
        ...prev,
        reportedMaterialsCount: prev.reportedMaterialsCount - 1,
        totalMaterials: prev.totalMaterials - 1,
      }));

      setAlertMessage("Material eliminado correctamente");
      setShowAlert(true);

    } catch (error) {
      console.error("Error al eliminar el material:", error);
      alert("No se pudo eliminar el material. Intenta nuevamente.");
    } finally {
      setShowDeleteModal(false);
      setSelectedMaterial(null);
    }
  };

  useEffect(() => {
    if (!users) return;

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const monthsCount = monthNames.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});

    users.forEach(user => {
      const date = new Date(user.createdAt);
      const month = monthNames[date.getMonth()];
      monthsCount[month] += 1;
    });

    const chartData = monthNames.map(month => ({
      month,
      users: monthsCount[month]
    }));

    setUsersByMonth(chartData);
  }, [users]);

  useEffect(() => {
    if (!materialsResponse?.data || !carrerasResponse) return;

    const materialsArray = materialsResponse.data;
    const totalMaterials = materialsArray.length;

    const byCareer = carrerasResponse.map(carrera => {
      const count = materialsArray.filter(m => m.carreraId === carrera.id).length;
      return {
        career: carrera.nombre,
        count,
        percentage: totalMaterials > 0 ? ((count / totalMaterials) * 100).toFixed(2) : 0
      };
    });

    setMaterialsByCareer(byCareer);
    setStats(prev => ({ ...prev, totalMaterials }));
  }, [materialsResponse, carrerasResponse]);

  useEffect(() => {
    if (!materialsResponse?.data) return;

    const reported = materialsResponse.data.filter(m => m.cantidadReportes > 0);
    setReportedMaterials(reported);
    setStats(prev => ({ ...prev, reportedMaterialsCount: reported.length }));
  }, [materialsResponse]);

  const totalUsers = users?.length || 0;

  return (
    <div className="admin-page">
      <div className="container-fluid">
        <h1 className="mb-4 admin-title">Panel de Administrador</h1>

        <div className="row mb-4">
          <StatCard
            title="Usuarios Totales"
            value={loadingUsers ? "Cargando..." : totalUsers.toLocaleString()}
            icon={<Users size={24} className="icon-primary" />}
            colorClass="text-primary-color"
          />

          <StatCard
            title="Materiales Totales"
            value={stats.totalMaterials.toLocaleString()}
            icon={<FileText size={24} className="icon-secondary" />}
            colorClass="text-secondary-color"
          />

          <StatCard
            title="Materiales Reportados"
            value={stats.reportedMaterialsCount}
            button={
              <button className="btn-danger-small" onClick={() => setShowReportedModal(true)}>
                <Flag size={12} className="me-2" />
                Ver Reportes
              </button>
            }
            colorClass="text-danger"
          />
        </div>

        <div className="row">
          <div className="col-lg-7 mb-4">
            <BarChartUsers data={usersByMonth} />
          </div>
          <div className="col-lg-5 mb-4">
            <PieChartMaterials
              data={materialsByCareer.filter(item => item.count > 0)}
              colors={COLORS}
            />
          </div>
        </div>
      </div>

      {showReportedModal && (
        <ReportedMaterialsModal
          materials={reportedMaterials}
          onClose={() => setShowReportedModal(false)}
          onDelete={handleDeleteMaterial}
        />
      )}

      <DeleteConfirm
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        materialTitle={selectedMaterial?.titulo}
        message={"¿Estás seguro de que queres eliminar este material?"}
      />

      <Alert
        show={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};
