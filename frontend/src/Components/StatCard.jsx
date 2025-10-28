import React from "react";

export const StatCard = ({ title, value, icon, button, colorClass }) => (
  <div className="col-md-4 mb-3">
    <div className="card stat-card">
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <p className="text-muted mb-1">{title}</p>
          <h3 className={`mb-0 ${colorClass}`}>{value}</h3>
        </div>
        {icon && <div className="stat-icon">{icon}</div>}
        {button && button}
      </div>
    </div>
  </div>
);
