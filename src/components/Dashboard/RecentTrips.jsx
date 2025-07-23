import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Eye } from 'lucide-react';

const RecentTrips = ({ trips }) => {
  if (trips.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Trips</h3>
          <p className="card-subtitle">Your travel history</p>
        </div>
        <div className="empty-state">
          <MapPin size={48} color="var(--color-gray-400)" />
          <p>No trips recorded yet</p>
          <p className="text-sm text-tertiary">Create your first trip to get started!</p>
        </div>
        <style jsx>{`
          .empty-state {
            text-align: center;
            padding: var(--spacing-6) var(--spacing-4);
            color: var(--text-secondary);
          }
          
          .empty-state p:first-of-type {
            margin: var(--spacing-2) 0 var(--spacing-1) 0;
            font-weight: var(--font-weight-medium);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Trips</h3>
        <p className="card-subtitle">Your latest adventures</p>
      </div>
      
      <div className="recent-trips-grid">
        {trips.map((trip) => (
          <div key={trip.id} className="recent-trip-card">
            <div className="trip-image-placeholder">
              <MapPin size={24} />
            </div>
            <div className="trip-content">
              <div className="trip-header">
                <h4 className="trip-title">{trip.destination}</h4>
                <button className="trip-view-btn">
                  <Eye size={16} />
                </button>
              </div>
              <p className="trip-country">{trip.country}</p>
              <div className="trip-date">
                <Calendar size={12} />
                <span>{format(new Date(trip.startDate), 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .recent-trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-2);
        }
        
        .recent-trip-card {
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          background-color: var(--bg-secondary);
        }
        
        .recent-trip-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
        }
        
        .trip-image-placeholder {
          height: 120px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .trip-content {
          padding: var(--spacing-2);
        }
        
        .trip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-1);
        }
        
        .trip-title {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0;
          line-height: var(--line-height-tight);
        }
        
        .trip-view-btn {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
        }
        
        .trip-view-btn:hover {
          color: var(--color-primary);
          background-color: rgba(37, 99, 235, 0.1);
        }
        
        .trip-country {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          margin: 0 0 var(--spacing-1) 0;
        }
        
        .trip-date {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-tertiary);
          font-size: var(--font-size-xs);
        }
        
        @media (max-width: 768px) {
          .recent-trips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default RecentTrips;