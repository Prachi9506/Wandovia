import React from 'react';
import { useTravelPlanner } from '../../contexts/TravelPlannerContext';
import { 
  MapPin, 
  Calendar, 
  Camera, 
  DollarSign, 
  Plane, 
  Clock,
  TrendingUp,
  Globe
} from 'lucide-react';
import StatsCard from './StatsCard';
import RecentTrips from './RecentTrips';
import QuickActions from './QuickActions';
import UpcomingTrips from './UpcomingTrips';
import './Dashboard.css';

const Dashboard = () => {
  const { state } = useTravelPlanner();
  const { trips, visitedPlaces, photos, budgets } = state;

  const totalBudget = budgets.reduce((sum, budget) => sum + (budget.totalAmount || 0), 0);
  const upcomingTrips = trips.filter(trip => {
    const tripDate = new Date(trip.startDate);
    const today = new Date();
    return tripDate > today;
  });

  const completedTrips = trips.filter(trip => {
    const endDate = new Date(trip.endDate);
    const today = new Date();
    return endDate < today;
  });

  const stats = [
    {
      title: 'Total Trips',
      value: trips.length,
      icon: Plane,
      color: 'primary',
      subtitle: `${upcomingTrips.length} upcoming`
    },
    {
      title: 'Places Visited',
      value: visitedPlaces.length,
      icon: MapPin,
      color: 'secondary',
      subtitle: 'Across the globe'
    },
    {
      title: 'Photos Captured',
      value: photos.length,
      icon: Camera,
      color: 'accent',
      subtitle: 'Memories saved'
    },
    {
      title: 'Total Budget',
      value: `$${totalBudget.toLocaleString()}`,
      icon: DollarSign,
      color: 'success',
      subtitle: 'All trips combined'
    }
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Your Travel Dashboard</h1>
        <p className="dashboard-subtitle">
          Plan your adventures, track your journeys, and capture your memories
        </p>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <QuickActions />
        </div>
        
        <div className="dashboard-section">
          <UpcomingTrips trips={upcomingTrips} />
        </div>
        
        <div className="dashboard-section span-2">
          <RecentTrips trips={trips.slice(-5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;