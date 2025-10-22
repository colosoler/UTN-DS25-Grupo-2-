import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const BarChartUsers = ({ data }) => (
  <div className="chart-container">
    <h5 className="mb-3">Usuarios Registrados por Mes</h5>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="month" stroke="#666666" />
        <YAxis stroke="#666666" />
        <Tooltip
          contentStyle={{ backgroundColor: "white", border: "1px solid #e0e0e0", borderRadius: "8px" }}
        />
        <Bar dataKey="users" fill="#4a90e2" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
