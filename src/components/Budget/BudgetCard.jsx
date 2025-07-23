import React, { useState } from 'react';
import { Edit, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const BudgetCard = ({ budget, onEdit, onUpdate }) => {
  const [categories, setCategories] = useState(budget.categories || {});

  const updateCategorySpent = (category, spent) => {
    const updatedCategories = {
      ...categories,
      [category]: {
        ...categories[category],
        spent: parseFloat(spent) || 0
      }
    };
    setCategories(updatedCategories);
    onUpdate({ ...budget, categories: updatedCategories });
  };

  const totalBudgeted = Object.values(categories).reduce((sum, cat) => sum + (cat.budgeted || 0), 0);
  const totalSpent = Object.values(categories).reduce((sum, cat) => sum + (cat.spent || 0), 0);
  const remainingBudget = totalBudgeted - totalSpent;
  const progressPercentage = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

  const getProgressColor = () => {
    if (progressPercentage <= 50) return 'var(--color-success)';
    if (progressPercentage <= 80) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const categoryLabels = {
    accommodation: 'Accommodation',
    transportation: 'Transportation',
    food: 'Food & Dining',
    activities: 'Activities & Tours',
    shopping: 'Shopping',
    miscellaneous: 'Miscellaneous'
  };

  const categoryIcons = {
    accommodation: '🏨',
    transportation: '✈️',
    food: '🍽️',
    activities: '🎯',
    shopping: '🛍️',
    miscellaneous: '📦'
  };

  return (
    <div className="budget-card">
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">{budget.name}</h3>
          <div className="budget-overview">
            <div className="budget-total">
              <DollarSign size={16} />
              <span>${totalBudgeted.toLocaleString()} budgeted</span>
            </div>
            <div className="progress-info">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${Math.min(progressPercentage, 100)}%`,
                    backgroundColor: getProgressColor()
                  }}
                />
              </div>
              <span className="progress-text">
                ${totalSpent.toLocaleString()} spent
              </span>
            </div>
          </div>
        </div>
        
        <button className="edit-btn" onClick={onEdit}>
          <Edit size={16} />
        </button>
      </div>

      <div className="card-content">
        <div className="budget-summary">
          <div className="summary-item">
            <TrendingUp size={16} />
            <div>
              <span className="summary-label">Remaining</span>
              <span className={`summary-value ${remainingBudget < 0 ? 'over-budget' : ''}`}>
                ${Math.abs(remainingBudget).toLocaleString()}
                {remainingBudget < 0 && ' over'}
              </span>
            </div>
          </div>
          
          {remainingBudget < 0 && (
            <div className="budget-warning">
              <AlertCircle size={16} />
              <span>Over budget!</span>
            </div>
          )}
        </div>

        <div className="categories-list">
          {Object.entries(categories).map(([category, values]) => {
            const categoryProgress = values.budgeted > 0 ? (values.spent / values.budgeted) * 100 : 0;
            const isOverBudget = values.spent > values.budgeted;
            
            return (
              <div key={category} className="category-item">
                <div className="category-header">
                  <div className="category-info">
                    <span className="category-emoji">{categoryIcons[category]}</span>
                    <span className="category-name">{categoryLabels[category]}</span>
                  </div>
                  <div className="category-amounts">
                    <input
                      type="number"
                      value={values.spent}
                      onChange={(e) => updateCategorySpent(category, e.target.value)}
                      className="spent-input"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                    <span className="budget-amount">/ ${values.budgeted}</span>
                  </div>
                </div>
                
                <div className="category-progress">
                  <div className="category-progress-bar">
                    <div 
                      className="category-progress-fill" 
                      style={{ 
                        width: `${Math.min(categoryProgress, 100)}%`,
                        backgroundColor: isOverBudget ? 'var(--color-error)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className={`category-percentage ${isOverBudget ? 'over-budget' : ''}`}>
                    {categoryProgress.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .budget-card {
          background-color: var(--bg-primary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
        }
        
        .budget-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: var(--spacing-3);
          border-bottom: 1px solid var(--border-light);
          background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
        }
        
        .card-title-section {
          flex: 1;
        }
        
        .card-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-1) 0;
        }
        
        .budget-overview {
          display: flex;
          flex-direction: column;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .budget-total {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }
        
        .progress-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }
        
        .progress-bar {
          flex: 1;
          height: 6px;
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }
        
        .progress-text {
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
          white-space: nowrap;
        }
        
        .edit-btn {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: var(--spacing-1);
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }
        
        .edit-btn:hover {
          color: var(--color-primary);
          background-color: rgba(37, 99, 235, 0.1);
        }
        
        .card-content {
          padding: var(--spacing-3);
        }
        
        .budget-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2);
          padding-bottom: var(--spacing-2);
          border-bottom: 1px solid var(--border-light);
        }
        
        .summary-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }
        
        .summary-item div {
          display: flex;
          flex-direction: column;
        }
        
        .summary-label {
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
        }
        
        .summary-value {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-success);
        }
        
        .summary-value.over-budget {
          color: var(--color-error);
        }
        
        .budget-warning {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
          color: var(--color-error);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
        }
        
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }
        
        .category-item {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          padding: var(--spacing-2);
        }
        
        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-1);
        }
        
        .category-info {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .category-emoji {
          font-size: var(--font-size-base);
        }
        
        .category-name {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
        }
        
        .category-amounts {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .spent-input {
          width: 80px;
          padding: 4px 8px;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-size: var(--font-size-xs);
          text-align: right;
        }
        
        .spent-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        
        .budget-amount {
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
        }
        
        .category-progress {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }
        
        .category-progress-bar {
          flex: 1;
          height: 4px;
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .category-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }
        
        .category-percentage {
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
          min-width: 35px;
          text-align: right;
        }
        
        .category-percentage.over-budget {
          color: var(--color-error);
          font-weight: var(--font-weight-medium);
        }
      `}</style>
    </div>
  );
};

export default BudgetCard;