import React, { useState } from 'react';
import { useTravelPlanner } from '../../contexts/TravelPlannerContext';
import { Plus, Package, Check, X, Edit } from 'lucide-react';
import PackingListForm from './PackingListForm';
import PackingListCard from './PackingListCard';
import './PackingList.css';

const PackingList = () => {
  const { state, actions } = useTravelPlanner();
  const { packingLists, trips } = state;
  const [showForm, setShowForm] = useState(false);
  const [editingList, setEditingList] = useState(null);

  const handleAddList = () => {
    setEditingList(null);
    setShowForm(true);
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingList(null);
  };

  const handleFormSubmit = (listData) => {
    if (editingList) {
      actions.updatePackingList({ ...listData, id: editingList.id });
    } else {
      actions.addPackingList(listData);
    }
    handleFormClose();
  };

  const getDefaultPackingItems = (tripType = 'general') => {
    const baseItems = [
      'Passport/ID',
      'Travel documents',
      'Phone charger',
      'Underwear',
      'Socks',
      'T-shirts',
      'Pants/Jeans',
      'Toothbrush',
      'Toothpaste',
      'Shampoo',
      'Deodorant',
      'Sunglasses',
      'Sunscreen',
      'Medications',
      'First aid kit'
    ];

    const beachItems = [
      'Swimsuit',
      'Beach towel',
      'Flip flops',
      'Sun hat',
      'Beach bag',
      'Waterproof phone case'
    ];

    const businessItems = [
      'Dress shirt',
      'Business suit',
      'Dress shoes',
      'Belt',
      'Tie',
      'Laptop',
      'Business cards'
    ];

    const adventureItems = [
      'Hiking boots',
      'Rain jacket',
      'Quick-dry clothes',
      'Water bottle',
      'Backpack',
      'Headlamp',
      'Multi-tool'
    ];

    switch (tripType.toLowerCase()) {
      case 'beach':
        return [...baseItems, ...beachItems];
      case 'business':
        return [...baseItems, ...businessItems];
      case 'adventure':
      case 'hiking':
        return [...baseItems, ...adventureItems];
      default:
        return baseItems;
    }
  };

  return (
    <div className="packing-list-container fade-in">
      <div className="packing-header">
        <div>
          <h1 className="page-title">Packing Lists</h1>
          <p className="page-subtitle">Smart packing for stress-free travel</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddList}>
          <Plus size={20} />
          New Packing List
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <PackingListForm
              packingList={editingList}
              trips={trips}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
              getDefaultItems={getDefaultPackingItems}
            />
          </div>
        </div>
      )}

      {packingLists.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <Package size={64} color="var(--color-gray-400)" />
            <h3>No packing lists yet</h3>
            <p>Create your first packing list to organize your travel essentials</p>
            <button className="btn btn-primary btn-lg" onClick={handleAddList}>
              <Plus size={20} />
              Create Your First List
            </button>
          </div>
        </div>
      ) : (
        <div className="packing-lists-grid">
          {packingLists.map((list) => (
            <PackingListCard
              key={list.id}
              packingList={list}
              onEdit={() => handleEditList(list)}
              onUpdate={(updatedList) => actions.updatePackingList(updatedList)}
            />
          ))}
        </div>
      )}

      <div className="packing-tips">
        <h3>Smart Packing Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Roll, Don't Fold</h4>
            <p>Rolling clothes saves 30% more space than folding and reduces wrinkles.</p>
          </div>
          <div className="tip-card">
            <h4>Check Weather</h4>
            <p>Always check the weather forecast before packing to avoid overpacking.</p>
          </div>
          <div className="tip-card">
            <h4>Essential Documents</h4>
            <p>Keep copies of important documents in separate bags for safety.</p>
          </div>
          <div className="tip-card">
            <h4>One Week Rule</h4>
            <p>Pack for one week max, then do laundry - even for longer trips.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingList;