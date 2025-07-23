import React, { useState } from 'react';
import { useTravelPlanner } from '../../contexts/TravelPlannerContext';
import { Plus, Camera, MapPin, Calendar, Edit, Trash2, Upload } from 'lucide-react';
import './PhotoJournal.css';

const PhotoJournal = () => {
  const { state, actions } = useTravelPlanner();
  const { photos, trips } = state;
  const [showForm, setShowForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    tripId: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: ''
  });

  const handleAddPhoto = () => {
    setEditingPhoto(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      tripId: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: ''
    });
    setShowForm(true);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title || '',
      description: photo.description || '',
      location: photo.location || '',
      tripId: photo.tripId || '',
      date: photo.date || new Date().toISOString().split('T')[0],
      imageUrl: photo.imageUrl || ''
    });
    setShowForm(true);
  };

  const handleDeletePhoto = (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      actions.deletePhoto(photoId);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPhoto(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const photoData = {
      ...formData,
      id: editingPhoto ? editingPhoto.id : Date.now(),
      createdAt: editingPhoto ? editingPhoto.createdAt : new Date().toISOString()
    };

    if (editingPhoto) {
      actions.updatePhoto(photoData);
    } else {
      actions.addPhoto(photoData);
    }
    handleFormClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to a service like Cloudinary or AWS S3
      // For demo purposes, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getRelatedTrip = (tripId) => {
    return trips.find(trip => trip.id === parseInt(tripId));
  };

  return (
    <div className="photo-journal fade-in">
      <div className="journal-header">
        <div>
          <h1 className="page-title">Photo Journal</h1>
          <p className="page-subtitle">Capture and preserve your travel memories</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddPhoto}>
          <Plus size={20} />
          Add Photo
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="photo-form">
              <div className="form-header">
                <h2 className="form-title">
                  {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
                </h2>
                <button className="close-btn" onClick={handleFormClose}>
                  ×
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="form">
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Photo Upload</label>
                    <div className="image-upload-area">
                      {formData.imageUrl ? (
                        <div className="image-preview">
                          <img src={formData.imageUrl} alt="Preview" />
                          <button
                            type="button"
                            className="change-image-btn"
                            onClick={() => document.getElementById('image-upload').click()}
                          >
                            Change Image
                          </button>
                        </div>
                      ) : (
                        <div className="upload-placeholder" onClick={() => document.getElementById('image-upload').click()}>
                          <Upload size={48} />
                          <p>Click to upload photo</p>
                          <p className="upload-hint">Or use a sample image URL</p>
                        </div>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Or enter image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Give your photo a title"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Where was this taken?"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Related Trip (Optional)</label>
                      <select
                        name="tripId"
                        value={formData.tripId}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select a trip</option>
                        {trips.map(trip => (
                          <option key={trip.id} value={trip.id}>
                            {trip.destination} - {trip.country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="Share the story behind this photo..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={handleFormClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingPhoto ? 'Update Photo' : 'Add Photo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {photos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <Camera size={64} color="var(--color-gray-400)" />
            <h3>No photos yet</h3>
            <p>Start building your travel photo journal by adding your first memory</p>
            <button className="btn btn-primary btn-lg" onClick={handleAddPhoto}>
              <Plus size={20} />
              Add Your First Photo
            </button>
          </div>
        </div>
      ) : (
        <div className="photos-grid">
          {photos.map((photo) => {
            const relatedTrip = getRelatedTrip(photo.tripId);
            return (
              <div key={photo.id} className="photo-card">
                <div className="photo-image">
                  {photo.imageUrl ? (
                    <img src={photo.imageUrl} alt={photo.title} />
                  ) : (
                    <div className="photo-placeholder">
                      <Camera size={48} />
                    </div>
                  )}
                  <div className="photo-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEditPhoto(photo)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="photo-content">
                  <h3 className="photo-title">{photo.title}</h3>
                  
                  <div className="photo-meta">
                    {photo.location && (
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span>{photo.location}</span>
                      </div>
                    )}
                    
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {relatedTrip && (
                    <div className="related-trip">
                      <span className="trip-badge">
                        {relatedTrip.destination}
                      </span>
                    </div>
                  )}
                  
                  {photo.description && (
                    <p className="photo-description">{photo.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PhotoJournal;