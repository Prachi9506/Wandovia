import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock } from 'lucide-react';

const UpcomingTrips = ({ trips }) => {
  if (trips.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Upcoming Trips</h3>
          <p className="card-subtitle">Your future adventures</p>
        </div>
        <div className="empty-state">
          <Calendar size={48} color="var(--color-gray-400)" />
          <p>No upcoming trips planned</p>
          <p className="text-sm text-tertiary">Start planning your next adventure!</p>
        </div>
        <style jsx>{`
          .empty-state {
            text-align: center;
            padding: var(--spacing-4);
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
        <h3 className="card-title">Upcoming Trips</h3>
        <p className="card-subtitle">{trips.length} planned</p>
      </div>
      
      <div className="upcoming-trips-list">
        {trips.slice(0, 3).map((trip) => (
          <div key={trip.id} className="upcoming-trip-item">
            <div className="trip-header">
              <h4 className="trip-title">{trip.destination}</h4>
              <div className="trip-dates">
                <Clock size={14} />
                <span>{format(new Date(trip.startDate), 'MMM dd')}</span>
              </div>
            </div>
            <p className="trip-description">{trip.description || 'No description'}</p>
            <div className="trip-meta">
              <div className="trip-location">
                <MapPin size={12} />
                <span>{trip.country || 'Location'}</span>
              </div>
              <div className="trip-duration">
                {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .upcoming-trips-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }
        
        .upcoming-trip-item {
          padding: var(--spacing-2);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }
        
        .upcoming-trip-item:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-sm);
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
        }
        
        .trip-dates {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-tertiary);
          font-size: var(--font-size-xs);
        }
        
        .trip-description {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          margin: 0 0 var(--spacing-1) 0;
          line-height: var(--line-height-normal);
        }
        
        .trip-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
        }
        
        .trip-location {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .trip-duration {
          background-color: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-weight: var(--font-weight-medium);
        }
      `}</style>
    </div>
  );
};

export default UpcomingTrips;