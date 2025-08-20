import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TravelPlannerProvider } from './contexts/TravelPlannerContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import TripPlanner from './components/TripPlanner/TripPlanner';
import WorldMap from './components/Maps/WorldMap'; 
import PackingList from './components/PackingList/PackingList'; 
import BudgetCalculator from './components/Budget/BudgetCalculator';
import WeatherWidget from './components/Weather/WeatherWidget'; 
import PhotoJournal from './components/PhotoJournal/PhotoJournal';
import CurrencyConverter from './components/Currency/CurrencyConverter'; 
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TravelPlannerProvider>
        <Router>
          <div className="app">
            <Header />
            <div className="app-content">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/trip-planner" element={<TripPlanner />} />
                  <Route path="/map" element={<WorldMap />} />
                  <Route path="/packing" element={<PackingList />} />
                  <Route path="/budget" element={<BudgetCalculator />} />
                  <Route path="/weather" element={<WeatherWidget />} />
                  <Route path="/photos" element={<PhotoJournal />} />
                  <Route path="/currency" element={<CurrencyConverter />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </TravelPlannerProvider>
    </ThemeProvider>
  );
}

export default App;
