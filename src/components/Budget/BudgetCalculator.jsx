import React, { useState } from 'react';
import { useTravelPlanner } from '../../contexts/TravelPlannerContext';
import { Plus, DollarSign, TrendingUp, PieChart, Calculator, Edit, Trash2 } from 'lucide-react';
import BudgetForm from './BudgetForm';
import BudgetCard from './BudgetCard';
import './BudgetCalculator.css';

const BudgetCalculator = () => {
  const { state, actions } = useTravelPlanner();
  const { budgets, trips } = state;
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const handleAddBudget = () => {
    setEditingBudget(null);
    setShowForm(true);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleDeleteBudget = (budgetId) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      // Remove budget from state (you'll need to add this action to your context)
      const updatedBudgets = budgets.filter(budget => budget.id !== budgetId);
      // This would need to be implemented in your context
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  const handleFormSubmit = (budgetData) => {
    if (editingBudget) {
      actions.updateBudget({ ...budgetData, id: editingBudget.id });
    } else {
      actions.addBudget(budgetData);
    }
    handleFormClose();
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + (budget.totalAmount || 0), 0);
  const totalSpent = budgets.reduce((sum, budget) => {
    const spent = budget.categories ? 
      Object.values(budget.categories).reduce((catSum, cat) => catSum + (cat.spent || 0), 0) : 0;
    return sum + spent;
  }, 0);

  const budgetStats = [
    {
      title: 'Total Budget',
      value: `$${totalBudget.toLocaleString()}`,
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toLocaleString()}`,
      icon: TrendingUp,
      color: 'secondary'
    },
    {
      title: 'Remaining',
      value: `$${(totalBudget - totalSpent).toLocaleString()}`,
      icon: Calculator,
      color: totalBudget - totalSpent >= 0 ? 'success' : 'error'
    },
    {
      title: 'Active Budgets',
      value: budgets.length,
      icon: PieChart,
      color: 'accent'
    }
  ];

  return (
    <div className="budget-calculator fade-in">
      <div className="budget-header">
        <div>
          <h1 className="page-title">Budget Calculator</h1>
          <p className="page-subtitle">Plan and track your travel expenses</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddBudget}>
          <Plus size={20} />
          New Budget
        </button>
      </div>

      <div className="budget-stats">
        {budgetStats.map((stat, index) => (
          <div key={index} className={`stats-card ${stat.color}`}>
            <div className="stats-card-content">
              <div className="stats-card-info">
                <h3>{stat.title}</h3>
                <div className="value">{stat.value}</div>
              </div>
              <div className={`stats-card-icon ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <BudgetForm
              budget={editingBudget}
              trips={trips}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}

      {budgets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <DollarSign size={64} color="var(--color-gray-400)" />
            <h3>No budgets created yet</h3>
            <p>Start planning your travel expenses by creating your first budget</p>
            <button className="btn btn-primary btn-lg" onClick={handleAddBudget}>
              <Plus size={20} />
              Create Your First Budget
            </button>
          </div>
        </div>
      ) : (
        <div className="budgets-grid">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={() => handleEditBudget(budget)}
              onDelete={() => handleDeleteBudget(budget.id)}
              onUpdate={(updatedBudget) => actions.updateBudget(updatedBudget)}
            />
          ))}
        </div>
      )}

      <div className="budget-tips">
        <h3>Smart Budgeting Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>50/30/20 Rule</h4>
            <p>Allocate 50% for accommodation, 30% for activities, 20% for food and miscellaneous.</p>
          </div>
          <div className="tip-card">
            <h4>Emergency Buffer</h4>
            <p>Always add 10-15% extra to your budget for unexpected expenses.</p>
          </div>
          <div className="tip-card">
            <h4>Track Daily</h4>
            <p>Monitor your spending daily to stay within budget and adjust as needed.</p>
          </div>
          <div className="tip-card">
            <h4>Local Currency</h4>
            <p>Research local prices and currency exchange rates before traveling.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;