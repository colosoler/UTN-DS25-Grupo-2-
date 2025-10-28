import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const PieChartMaterials = ({ data, colors }) => (
  <div className="chart-container">
    <h5 className="mb-3">Materiales por Carrera</h5>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ career, percentage }) => `${career} ${percentage}%`}
          outerRadius={100}
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "white", border: "1px solid #e0e0e0", borderRadius: "8px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
