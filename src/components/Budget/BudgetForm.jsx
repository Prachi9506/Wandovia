import React, { useState, useEffect } from 'react';
import { X, DollarSign, Plus, Minus } from 'lucide-react';

const BudgetForm = ({ budget, trips, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    tripId: '',
    totalAmount: '',
    categories: {
      accommodation: { budgeted: 0, spent: 0 },
      transportation: { budgeted: 0, spent: 0 },
      food: { budgeted: 0, spent: 0 },
      activities: { budgeted: 0, spent: 0 },
      shopping: { budgeted: 0, spent: 0 },
      miscellaneous: { budgeted: 0, spent: 0 }
    }
  });

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget.name || '',
        tripId: budget.tripId || '',
        totalAmount: budget.totalAmount || '',
        categories: budget.categories || {
          accommodation: { budgeted: 0, spent: 0 },
          transportation: { budgeted: 0, spent: 0 },
          food: { budgeted: 0, spent: 0 },
          activities: { budgeted: 0, spent: 0 },
          shopping: { budgeted: 0, spent: 0 },
          miscellaneous: { budgeted: 0, spent: 0 }
        }
      });
    }
  }, [budget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [field]: parseFloat(value) || 0
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      totalAmount: parseFloat(formData.totalAmount) || 0
    };
    onSubmit(cleanedData);
  };

  const categoryLabels = {
    accommodation: 'Accommodation',
    transportation: 'Transportation',
    food: 'Food & Dining',
    activities: 'Activities & Tours',
    shopping: 'Shopping',
    miscellaneous: 'Miscellaneous'
  };

  return (
    <div className="budget-form">
      <div className="form-header">
        <h2 className="form-title">
          {budget ? 'Edit Budget' : 'Create Budget'}
        </h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <div className="form-section-header">
            <DollarSign size={20} />
            <h3>Budget Details</h3>
          </div>
          
          <div className="form-group">
            <label className="form-label">Budget Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Paris Trip Budget"
              required
            />
          </div>
          
          <div className="form-row">
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
            
            <div className="form-group">
              <label className="form-label">Total Budget ($)</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-header">
            <h3>Budget Categories</h3>
          </div>
          
          <div className="categories-grid">
            {Object.entries(formData.categories).map(([category, values]) => (
              <div key={category} className="category-group">
                <h4 className="category-title">{categoryLabels[category]}</h4>
                <div className="category-inputs">
                  <div className="form-group">
                    <label className="form-label">Budgeted ($)</label>
                    <input
                      type="number"
                      value={values.budgeted}
                      onChange={(e) => handleCategoryChange(category, 'budgeted', e.target.value)}
                      className="form-input"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Spent ($)</label>
                    <input
                      type="number"
                      value={values.spent}
                      onChange={(e) => handleCategoryChange(category, 'spent', e.target.value)}
                      className="form-input"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {budget ? 'Update Budget' : 'Create Budget'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .budget-form {
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
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-3);
        }
        
        .category-group {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2);
          border: 1px solid var(--border-light);
        }
        
        .category-title {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-1) 0;
        }
        
        .category-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-1);
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
          
          .categories-grid {
            grid-template-columns: 1fr;
          }
          
          .category-inputs {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .budget-form {
            padding: var(--spacing-2);
          }
        }
      `}</style>
    </div>
  );
};

export default BudgetForm;