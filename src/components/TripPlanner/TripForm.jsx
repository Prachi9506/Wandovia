import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, FileText, Globe } from 'lucide-react';

const TripForm = ({ trip, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    destination: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: '',
    activities: ['']
  });

  useEffect(() => {
    if (trip) {
      setFormData({
        destination: trip.destination || '',
        country: trip.country || '',
        startDate: trip.startDate || '',
        endDate: trip.endDate || '',
        description: trip.description || '',
        budget: trip.budget || '',
        activities: trip.activities || ['']
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleActivityChange = (index, value) => {
    const newActivities = [...formData.activities];
    newActivities[index] = value;
    setFormData(prev => ({
      ...prev,
      activities: newActivities
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, '']
    }));
  };

  const removeActivity = (index) => {
    if (formData.activities.length > 1) {
      const newActivities = formData.activities.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        activities: newActivities
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      activities: formData.activities.filter(activity => activity.trim() !== ''),
      budget: formData.budget ? parseFloat(formData.budget) : 0
    };
    onSubmit(cleanedData);
  };

  return (
    <div className="trip-form">
      <div className="form-header">
        <h2 className="form-title">
          {trip ? 'Edit Trip' : 'Plan New Trip'}
        </h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <div className="form-section-header">
            <MapPin size={20} />
            <h3>Destination Details</h3>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Paris, Tokyo, New York"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., France, Japan, USA"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-header">
            <Calendar size={20} />
            <h3>Travel Dates</h3>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-header">
            <FileText size={20} />
            <h3>Trip Details</h3>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe your trip plans, goals, or special occasions..."
              rows={4}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Estimated Budget ($)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-input"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-header">
            <Globe size={20} />
            <h3>Planned Activities</h3>
          </div>
          
          {formData.activities.map((activity, index) => (
            <div key={index} className="activity-input-group">
              <input
                type="text"
                value={activity}
                onChange={(e) => handleActivityChange(index, e.target.value)}
                className="form-input"
                placeholder={`Activity ${index + 1}`}
              />
              {formData.activities.length > 1 && (
                <button
                  type="button"
                  className="remove-activity-btn"
                  onClick={() => removeActivity(index)}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            className="add-activity-btn"
            onClick={addActivity}
          >
            Add Activity
          </button>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {trip ? 'Update Trip' : 'Create Trip'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .trip-form {
          padding: var(--spacing-4);
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
          padding-bottom: var(--spacing-2);
          border-bottom: 1px solid var(--border-light);
        }
        
        .form-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: var(--spacing-1);
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }
        
        .close-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-tertiary);
        }
        
        .form-section {
          margin-bottom: var(--spacing-4);
        }
        
        .form-section-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          margin-bottom: var(--spacing-2);
          color: var(--color-primary);
        }
        
        .form-section-header h3 {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          margin: 0;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2);
        }
        
        .activity-input-group {
          display: flex;
          gap: var(--spacing-1);
          margin-bottom: var(--spacing-1);
        }
        
        .activity-input-group .form-input {
          flex: 1;
        }
        
        .remove-activity-btn {
          background-color: var(--color-error);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          padding: var(--spacing-1);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-activity-btn:hover {
          background-color: #DC2626;
          transform: scale(1.05);
        }
        
        .add-activity-btn {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: var(--spacing-1) var(--spacing-2);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: var(--font-size-sm);
        }
        
        .add-activity-btn:hover {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
        
        .form-actions {
          display: flex;
          gap: var(--spacing-2);
          justify-content: flex-end;
          padding-top: var(--spacing-3);
          border-top: 1px solid var(--border-light);
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .trip-form {
            padding: var(--spacing-2);
          }
        }
      `}</style>
    </div>
  );
};

export default TripForm;