import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Package, Zap } from 'lucide-react';

const PackingListForm = ({ packingList, trips, onSubmit, onCancel, getDefaultItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    tripId: '',
    tripType: 'general',
    items: []
  });

  useEffect(() => {
    if (packingList) {
      setFormData({
        name: packingList.name || '',
        tripId: packingList.tripId || '',
        tripType: packingList.tripType || 'general',
        items: packingList.items || []
      });
    }
  }, [packingList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTripChange = (e) => {
    const tripId = e.target.value;
    const selectedTrip = trips.find(trip => trip.id === parseInt(tripId));
    setFormData(prev => ({
      ...prev,
      tripId,
      name: selectedTrip ? `${selectedTrip.destination} Packing List` : prev.name
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', packed: false, category: 'general' }]
    }));
  };

  const removeItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateItem = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const generateDefaultItems = () => {
    const defaultItems = getDefaultItems(formData.tripType);
    const items = defaultItems.map(itemName => ({
      id: Date.now() + Math.random(),
      name: itemName,
      packed: false,
      category: getCategoryForItem(itemName)
    }));
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, ...items]
    }));
  };

  const getCategoryForItem = (itemName) => {
    const categories = {
      'documents': ['passport', 'id', 'ticket', 'visa', 'insurance', 'documents'],
      'clothing': ['shirt', 'pants', 'dress', 'underwear', 'socks', 'jacket', 'shoes'],
      'toiletries': ['toothbrush', 'toothpaste', 'shampoo', 'soap', 'deodorant', 'razor'],
      'electronics': ['charger', 'phone', 'laptop', 'camera', 'headphones', 'adapter'],
      'health': ['medication', 'vitamins', 'first aid', 'sunscreen', 'glasses'],
      'accessories': ['watch', 'jewelry', 'belt', 'hat', 'bag', 'wallet']
    };

    const lowerItemName = itemName.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerItemName.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      items: formData.items.filter(item => item.name.trim() !== '')
    };
    onSubmit(cleanedData);
  };

  const tripTypes = [
    { value: 'general', label: 'General Travel' },
    { value: 'beach', label: 'Beach/Resort' },
    { value: 'business', label: 'Business Travel' },
    { value: 'adventure', label: 'Adventure/Hiking' },
    { value: 'city', label: 'City Break' },
    { value: 'winter', label: 'Winter Sports' }
  ];

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'documents', label: 'Documents' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'toiletries', label: 'Toiletries' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'health', label: 'Health & Medicine' },
    { value: 'accessories', label: 'Accessories' }
  ];

  return (
    <div className="packing-form">
      <div className="form-header">
        <h2 className="form-title">
          {packingList ? 'Edit Packing List' : 'Create Packing List'}
        </h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <div className="form-section-header">
            <Package size={20} />
            <h3>List Details</h3>
          </div>
          
          <div className="form-group">
            <label className="form-label">List Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Paris Trip Packing List"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Related Trip (Optional)</label>
              <select
                name="tripId"
                value={formData.tripId}
                onChange={handleTripChange}
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
            
            <div className="form-group">
              <label className="form-label">Trip Type</label>
              <select
                name="tripType"
                value={formData.tripType}
                onChange={handleChange}
                className="form-select"
              >
                {tripTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            type="button"
            className="generate-btn"
            onClick={generateDefaultItems}
          >
            <Zap size={16} />
            Generate Smart Suggestions
          </button>
        </div>

        <div className="form-section">
          <div className="form-section-header">
            <h3>Items</h3>
            <button type="button" className="add-item-btn" onClick={addItem}>
              <Plus size={16} />
              Add Item
            </button>
          </div>
          
          <div className="items-list">
            {formData.items.map((item) => (
              <div key={item.id} className="item-row">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="form-input item-name"
                  placeholder="Item name"
                />
                
                <select
                  value={item.category}
                  onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                  className="form-select item-category"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
          
          {formData.items.length === 0 && (
            <div className="empty-items">
              <p>No items added yet. Click "Add Item" or "Generate Smart Suggestions" to get started.</p>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {packingList ? 'Update List' : 'Create List'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .packing-form {
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
          justify-content: space-between;
          margin-bottom: var(--spacing-2);
        }
        
        .form-section-header h3 {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          margin: 0;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2);
        }
        
        .generate-btn {
          background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
          color: white;
          border: none;
          border-radius: var(--radius-md);
          padding: var(--spacing-1) var(--spacing-2);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          margin-top: var(--spacing-2);
        }
        
        .generate-btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
        
        .add-item-btn {
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          padding: calc(var(--spacing-1) / 2) var(--spacing-1);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: var(--font-size-sm);
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .add-item-btn:hover {
          background-color: var(--color-primary-hover);
        }
        
        .items-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }
        
        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr auto;
          gap: var(--spacing-1);
          align-items: center;
        }
        
        .item-name {
          grid-column: 1;
        }
        
        .item-category {
          grid-column: 2;
          font-size: var(--font-size-sm);
        }
        
        .remove-item-btn {
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
        
        .remove-item-btn:hover {
          background-color: #DC2626;
        }
        
        .empty-items {
          text-align: center;
          padding: var(--spacing-3);
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-medium);
        }
        
        .empty-items p {
          margin: 0;
          font-size: var(--font-size-sm);
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
          
          .item-row {
            grid-template-columns: 1fr;
            gap: calc(var(--spacing-1) / 2);
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .packing-form {
            padding: var(--spacing-2);
          }
        }
      `}</style>
    </div>
  );
};

export default PackingListForm;