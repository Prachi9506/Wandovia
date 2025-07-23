import React, { useState } from 'react';
import { Edit, Package, CheckSquare, Square, Trash2 } from 'lucide-react';

const PackingListCard = ({ packingList, onEdit, onUpdate }) => {
  const [items, setItems] = useState(packingList.items || []);

  const toggleItemPacked = (itemId) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    setItems(updatedItems);
    onUpdate({ ...packingList, items: updatedItems });
  };

  const packedCount = items.filter(item => item.packed).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'general';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    const icons = {
      documents: '📄',
      clothing: '👕',
      toiletries: '🧴',
      electronics: '🔌',
      health: '💊',
      accessories: '👜',
      general: '📦'
    };
    return icons[category] || '📦';
  };

  const getCategoryName = (category) => {
    const names = {
      documents: 'Documents',
      clothing: 'Clothing',
      toiletries: 'Toiletries',
      electronics: 'Electronics',
      health: 'Health & Medicine',
      accessories: 'Accessories',
      general: 'General'
    };
    return names[category] || 'General';
  };

  return (
    <div className="packing-list-card">
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">{packingList.name}</h3>
          <div className="progress-info">
            <span className="progress-text">
              {packedCount} of {totalCount} packed
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <button className="edit-btn" onClick={onEdit}>
          <Edit size={16} />
        </button>
      </div>

      <div className="card-content">
        {totalCount === 0 ? (
          <div className="empty-list">
            <Package size={32} color="var(--color-gray-400)" />
            <p>No items added yet</p>
          </div>
        ) : (
          <div className="categories-list">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="category-section">
                <h4 className="category-title">
                  <span className="category-emoji">{getCategoryIcon(category)}</span>
                  {getCategoryName(category)}
                  <span className="category-count">({categoryItems.length})</span>
                </h4>
                
                <div className="items-grid">
                  {categoryItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`item-row ${item.packed ? 'packed' : ''}`}
                    >
                      <button
                        className="check-btn"
                        onClick={() => toggleItemPacked(item.id)}
                      >
                        {item.packed ? (
                          <CheckSquare size={16} className="checked" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                      <span className="item-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .packing-list-card {
          background-color: var(--bg-primary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
        }
        
        .packing-list-card:hover {
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
        
        .progress-info {
          margin-bottom: var(--spacing-1);
        }
        
        .progress-text {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          display: block;
          margin-bottom: calc(var(--spacing-1) / 2);
        }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
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
        
        .empty-list {
          text-align: center;
          padding: var(--spacing-4);
          color: var(--text-secondary);
        }
        
        .empty-list p {
          margin: var(--spacing-1) 0 0 0;
          font-size: var(--font-size-sm);
        }
        
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }
        
        .category-section {
          border-radius: var(--radius-md);
          background-color: var(--bg-secondary);
          padding: var(--spacing-2);
        }
        
        .category-title {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-1) 0;
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .category-emoji {
          font-size: var(--font-size-base);
        }
        
        .category-count {
          font-weight: var(--font-weight-normal);
          color: var(--text-tertiary);
          font-size: var(--font-size-xs);
        }
        
        .items-grid {
          display: flex;
          flex-direction: column;
          gap: calc(var(--spacing-1) / 2);
        }
        
        .item-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          padding: calc(var(--spacing-1) / 2);
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
        }
        
        .item-row:hover {
          background-color: var(--bg-tertiary);
        }
        
        .item-row.packed {
          opacity: 0.7;
        }
        
        .item-row.packed .item-name {
          text-decoration: line-through;
          color: var(--text-tertiary);
        }
        
        .check-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 2px;
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
        }
        
        .check-btn:hover {
          color: var(--color-success);
        }
        
        .check-btn .checked {
          color: var(--color-success);
        }
        
        .item-name {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PackingListCard;