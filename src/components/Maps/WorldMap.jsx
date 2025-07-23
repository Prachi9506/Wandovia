import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTravelPlanner } from '../../contexts/TravelPlannerContext';
import { MapPin, Heart, Plus, X, List, Map, Trash2, Edit } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WorldMap.css';

// Fix default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WorldMap = () => {
  const { state, actions } = useTravelPlanner();
  const { visitedPlaces, wishlistPlaces } = state;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const [modalType, setModalType] = useState('visited'); // 'visited' or 'wishlist'
  const [newPlace, setNewPlace] = useState({
    name: '',
    country: '',
    latitude: '',
    longitude: '',
    notes: ''
  });

  // Custom icons
  const visitedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const wishlistIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleAddPlace = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  const handleSubmitPlace = (e) => {
    e.preventDefault();
    const placeData = {
      ...newPlace,
      latitude: parseFloat(newPlace.latitude),
      longitude: parseFloat(newPlace.longitude)
    };

    if (modalType === 'visited') {
      actions.addVisitedPlace(placeData);
    } else {
      actions.addWishlistPlace(placeData);
    }

    setNewPlace({
      name: '',
      country: '',
      latitude: '',
      longitude: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleRemoveFromWishlist = (placeId) => {
    actions.removeWishlistPlace(placeId);
  };

  const handleDeleteVisitedPlace = (placeId) => {
    if (window.confirm('Are you sure you want to remove this place from visited?')) {
      actions.removeVisitedPlace(placeId);
    }
  };

  const toggleView = () => {
    setShowListView(!showListView);
  };

  return (
    <div className="world-map-container fade-in">
      <div className="map-header">
        <div>
          <h1 className="page-title">World Map</h1>
          <p className="page-subtitle">Explore the world and track your adventures</p>
        </div>
        <div className="map-controls">
          <button 
            className={`btn ${showListView ? 'btn-outline' : 'btn-secondary'}`}
            onClick={toggleView}
          >
            {showListView ? <Map size={16} /> : <List size={16} />}
            {showListView ? 'Map View' : 'List View'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleAddPlace('visited')}
          >
            <MapPin size={16} />
            Add Visited
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => handleAddPlace('wishlist')}
          >
            <Heart size={16} />
            Add to Wishlist
          </button>
        </div>
      </div>

      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-marker visited"></div>
          <span>Visited Places ({visitedPlaces.length})</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker wishlist"></div>
          <span>Wishlist ({wishlistPlaces.length})</span>
        </div>
      </div>

      {showListView ? (
        <div className="places-list-view">
          <div className="places-section">
            <h3 className="section-title">
              <div className="legend-marker visited"></div>
              Visited Places ({visitedPlaces.length})
            </h3>
            {visitedPlaces.length === 0 ? (
              <div className="empty-section">
                <p>No visited places yet. Start exploring!</p>
              </div>
            ) : (
              <div className="places-grid">
                {visitedPlaces.map((place) => (
                  <div key={place.id} className="place-card visited-card">
                    <div className="place-header">
                      <h4 className="place-name">{place.name}</h4>
                      <div className="place-actions">
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteVisitedPlace(place.id)}
                          title="Remove from visited"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="place-country">{place.country}</p>
                    {place.notes && <p className="place-notes">{place.notes}</p>}
                    <div className="place-coordinates">
                      <MapPin size={12} />
                      <span>{place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="places-section">
            <h3 className="section-title">
              <div className="legend-marker wishlist"></div>
              Wishlist ({wishlistPlaces.length})
            </h3>
            {wishlistPlaces.length === 0 ? (
              <div className="empty-section">
                <p>No wishlist places yet. Add some dream destinations!</p>
              </div>
            ) : (
              <div className="places-grid">
                {wishlistPlaces.map((place) => (
                  <div key={place.id} className="place-card wishlist-card">
                    <div className="place-header">
                      <h4 className="place-name">{place.name}</h4>
                      <div className="place-actions">
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleRemoveFromWishlist(place.id)}
                          title="Remove from wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="place-country">{place.country}</p>
                    {place.notes && <p className="place-notes">{place.notes}</p>}
                    <div className="place-coordinates">
                      <MapPin size={12} />
                      <span>{place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="map-wrapper">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '600px', width: '100%' }}
            className="world-map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {visitedPlaces.map((place) => (
              <Marker
                key={place.id}
                position={[place.latitude, place.longitude]}
                icon={visitedIcon}
              >
                <Popup>
                  <div className="map-popup">
                    <h3>{place.name}</h3>
                    <p><strong>Country:</strong> {place.country}</p>
                    {place.notes && <p><strong>Notes:</strong> {place.notes}</p>}
                    <div className="popup-actions">
                      <div className="popup-badge visited-badge">Visited</div>
                      <button 
                        className="remove-btn"
                        onClick={() => handleDeleteVisitedPlace(place.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {wishlistPlaces.map((place) => (
              <Marker
                key={place.id}
                position={[place.latitude, place.longitude]}
                icon={wishlistIcon}
              >
                <Popup>
                  <div className="map-popup">
                    <h3>{place.name}</h3>
                    <p><strong>Country:</strong> {place.country}</p>
                    {place.notes && <p><strong>Notes:</strong> {place.notes}</p>}
                    <div className="popup-actions">
                      <div className="popup-badge wishlist-badge">Wishlist</div>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromWishlist(place.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add {modalType === 'visited' ? 'Visited' : 'Wishlist'} Place</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitPlace} className="place-form">
              <div className="form-group">
                <label className="form-label">Place Name</label>
                <input
                  type="text"
                  value={newPlace.name}
                  onChange={(e) => setNewPlace(prev => ({...prev, name: e.target.value}))}
                  className="form-input"
                  placeholder="e.g., Eiffel Tower, Times Square"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  value={newPlace.country}
                  onChange={(e) => setNewPlace(prev => ({...prev, country: e.target.value}))}
                  className="form-input"
                  placeholder="e.g., France, United States"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={newPlace.latitude}
                    onChange={(e) => setNewPlace(prev => ({...prev, latitude: e.target.value}))}
                    className="form-input"
                    placeholder="e.g., 48.8566"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={newPlace.longitude}
                    onChange={(e) => setNewPlace(prev => ({...prev, longitude: e.target.value}))}
                    className="form-input"
                    placeholder="e.g., 2.3522"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  value={newPlace.notes}
                  onChange={(e) => setNewPlace(prev => ({...prev, notes: e.target.value}))}
                  className="form-textarea"
                  placeholder="Add any notes or memories about this place..."
                  rows={3}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;