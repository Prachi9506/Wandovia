import React, { useState } from 'react';
import { useTravelPlanner } from '../../contexts/TravelPlannerContext';
import { Plus, Calendar, MapPin, Edit, Trash2, Download } from 'lucide-react';
import TripForm from './TripForm';
import TripCard from './TripCard';
import './TripPlanner.css';

const TripPlanner = () => {
  const { state, actions } = useTravelPlanner();
  const { trips } = state;
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const handleAddTrip = () => {
    setEditingTrip(null);
    setShowForm(true);
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleDeleteTrip = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      actions.deleteTrip(tripId);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  const handleFormSubmit = (tripData) => {
    if (editingTrip) {
      actions.updateTrip({ ...tripData, id: editingTrip.id });
    } else {
      actions.addTrip(tripData);
    }
    handleFormClose();
  };

  return (
    <div className="trip-planner fade-in">
      <div className="trip-planner-header">
        <div>
          <h1 className="page-title">Trip Planner</h1>
          <p className="page-subtitle">Plan and organize your perfect travel adventures</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddTrip}>
          <Plus size={20} />
          New Trip
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <TripForm
              trip={editingTrip}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}

      {trips.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <Calendar size={64} color="var(--color-gray-400)" />
            <h3>No trips planned yet</h3>
            <p>Start planning your next adventure by creating your first trip</p>
            <button className="btn btn-primary btn-lg" onClick={handleAddTrip}>
              <Plus size={20} />
              Plan Your First Trip
            </button>
          </div>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onEdit={() => handleEditTrip(trip)}
              onDelete={() => handleDeleteTrip(trip.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripPlanner;