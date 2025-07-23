import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map, Package, DollarSign } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Plan New Trip',
      description: 'Start planning your next adventure',
      icon: Plus,
      color: 'primary',
      path: '/trip-planner'
    },
    {
      title: 'Explore Map',
      description: 'Discover new destinations',
      icon: Map,
      color: 'secondary',
      path: '/map'
    },
    {
      title: 'Create Packing List',
      description: 'Pack smart for your trip',
      icon: Package,
      color: 'accent',
      path: '/packing'
    },
    {
      title: 'Plan Budget',
      description: 'Manage your travel expenses',
      icon: DollarSign,
      color: 'success',
      path: '/budget'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Quick Actions</h3>
        <p className="card-subtitle">Jump into your travel planning</p>
      </div>
      
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`quick-action-btn ${action.color}`}
            onClick={() => navigate(action.path)}
          >
            <div className="quick-action-icon">
              <action.icon size={20} />
            </div>
            <div className="quick-action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .quick-actions-grid {
          display: grid;
          gap: var(--spacing-2);
        }
        
        .quick-action-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-2);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }
        
        .quick-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        
        .quick-action-btn.primary:hover {
          border-color: var(--color-primary);
          background-color: rgba(37, 99, 235, 0.05);
        }
        
        .quick-action-btn.secondary:hover {
          border-color: var(--color-secondary);
          background-color: rgba(13, 148, 136, 0.05);
        }
        
        .quick-action-btn.accent:hover {
          border-color: var(--color-accent);
          background-color: rgba(234, 88, 12, 0.05);
        }
        
        .quick-action-btn.success:hover {
          border-color: var(--color-success);
          background-color: rgba(16, 185, 129, 0.05);
        }
        
        .quick-action-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background-color: var(--bg-tertiary);
        }
        
        .quick-action-btn.primary .quick-action-icon {
          background-color: rgba(37, 99, 235, 0.1);
          color: var(--color-primary);
        }
        
        .quick-action-btn.secondary .quick-action-icon {
          background-color: rgba(13, 148, 136, 0.1);
          color: var(--color-secondary);
        }
        
        .quick-action-btn.accent .quick-action-icon {
          background-color: rgba(234, 88, 12, 0.1);
          color: var(--color-accent);
        }
        
        .quick-action-btn.success .quick-action-icon {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--color-success);
        }
        
        .quick-action-content h4 {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          margin: 0 0 2px 0;
        }
        
        .quick-action-content p {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default QuickActions;