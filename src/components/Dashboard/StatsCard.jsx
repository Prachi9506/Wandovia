import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, subtitle }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-content">
        <div className="stats-card-info">
          <h3>{title}</h3>
          <div className="value">{value}</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
        <div className={`stats-card-icon ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;