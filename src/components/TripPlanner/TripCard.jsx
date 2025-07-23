import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { Calendar, MapPin, Edit, Trash2, DollarSign, Clock } from 'lucide-react';

const TripCard = ({ trip, onEdit, onDelete }) => {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const duration = differenceInDays(endDate, startDate) + 1;
  const today = new Date();
  const isUpcoming = startDate > today;
  const isActive = startDate <= today && endDate >= today;
  
  const getStatusBadge = () => {
    if (isActive) {
      return <span className="badge badge-success">Active</span>;
    } else if (isUpcoming) {
      return <span className="badge badge-primary">Upcoming</span>;
    } else {
      return <span className="badge badge-warning">Completed</span>;
    }
  };

  return (
    <div className="trip-card">
      <div className="trip-card-header">
        <div className="trip-image-placeholder">
          <MapPin size={32} />
        </div>
        <div className="trip-actions">
          <button className="action-btn edit-btn" onClick={onEdit}>
            <Edit size={16} />
          </button>
          <button className="action-btn delete-btn" onClick={onDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="trip-card-content">
        <div className="trip-header">
          <h3 className="trip-title">{trip.destination}</h3>
          {getStatusBadge()}
        </div>
        
        <p className="trip-country">{trip.country}</p>
        
        {trip.description && (
          <p className="trip-description">{trip.description}</p>
        )}
        
        <div className="trip-meta">
          <div className="trip-dates">
            <Calendar size={14} />
            <span>
              {format(startDate, 'MMM dd')} - {format(endDate, 'MMM dd, yyyy')}
            </span>
          </div>
          
          <div className="trip-duration">
            <Clock size={14} />
            <span>{duration} day{duration !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        {trip.budget > 0 && (
          <div className="trip-budget">
            <DollarSign size={14} />
            <span>${trip.budget.toLocaleString()}</span>
          </div>
        )}
        
        {trip.activities && trip.activities.length > 0 && (
          <div className="trip-activities">
            <h4>Planned Activities:</h4>
            <ul>
              {trip.activities.slice(0, 3).map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
              {trip.activities.length > 3 && (
                <li className="more-activities">
                  +{trip.activities.length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .trip-card {
          background-color: var(--bg-primary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
        }
        
        .trip-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--color-primary);
        }
        
        .trip-card-header {
          position: relative;
          height: 150px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .trip-image-placeholder {
          opacity: 0.7;
        }
        
        .trip-actions {
          position: absolute;
          top: var(--spacing-1);
          right: var(--spacing-1);
          display: flex;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .action-btn {
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: var(--radius-md);
          padding: var(--spacing-1);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .action-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
        
        .delete-btn:hover {
          background-color: rgba(239, 68, 68, 0.8);
        }
        
        .trip-card-content {
          padding: var(--spacing-3);
        }
        
        .trip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-1);
        }
        
        .trip-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0;
          line-height: var(--line-height-tight);
        }
        
        .trip-country {
          color: var(--text-secondary);
          font-size: var(--font-size-base);
          margin: 0 0 var(--spacing-2) 0;
          font-weight: var(--font-weight-medium);
        }
        
        .trip-description {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          margin: 0 0 var(--spacing-2) 0;
          line-height: var(--line-height-normal);
        }
        
        .trip-meta {
          display: flex;
          flex-direction: column;
          gap: calc(var(--spacing-1) / 2);
          margin-bottom: var(--spacing-2);
        }
        
        .trip-dates,
        .trip-duration,
        .trip-budget {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
        }
        
        .trip-budget {
          color: var(--color-success);
          font-weight: var(--font-weight-medium);
        }
        
        .trip-activities {
          margin-top: var(--spacing-2);
          padding-top: var(--spacing-2);
          border-top: 1px solid var(--border-light);
        }
        
        .trip-activities h4 {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-1) 0;
        }
        
        .trip-activities ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .trip-activities li {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          padding: 2px 0;
          position: relative;
          padding-left: var(--spacing-1);
        }
        
        .trip-activities li:before {
          content: '•';
          color: var(--color-primary);
          position: absolute;
          left: 0;
        }
        
        .trip-activities .more-activities {
          color: var(--color-primary);
          font-weight: var(--font-weight-medium);
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default TripCard;