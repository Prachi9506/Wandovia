import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TravelPlannerContext = createContext();

export const useTravelPlanner = () => {
  const context = useContext(TravelPlannerContext);
  if (!context) {
    throw new Error('useTravelPlanner must be used within a TravelPlannerProvider');
  }
  return context;
};

const initialState = {
  trips: [],
  visitedPlaces: [],
  wishlistPlaces: [],
  packingLists: [],
  budgets: [],
  photos: [],
  currentTrip: null,
  loading: false,
  error: null
};

const travelPlannerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'ADD_TRIP':
      return { ...state, trips: [...state.trips, action.payload] };
    
    case 'UPDATE_TRIP':
      return {
        ...state,
        trips: state.trips.map(trip => 
          trip.id === action.payload.id ? action.payload : trip
        )
      };
    
    case 'DELETE_TRIP':
      return {
        ...state,
        trips: state.trips.filter(trip => trip.id !== action.payload)
      };
    
    case 'SET_CURRENT_TRIP':
      return { ...state, currentTrip: action.payload };
    
    case 'ADD_VISITED_PLACE':
      return { ...state, visitedPlaces: [...state.visitedPlaces, action.payload] };
    
    case 'ADD_WISHLIST_PLACE':
      return { ...state, wishlistPlaces: [...state.wishlistPlaces, action.payload] };
    
    case 'REMOVE_WISHLIST_PLACE':
      return {
        ...state,
        wishlistPlaces: state.wishlistPlaces.filter(place => place.id !== action.payload)
      };
    
    case 'REMOVE_VISITED_PLACE':
      return {
        ...state,
        visitedPlaces: state.visitedPlaces.filter(place => place.id !== action.payload)
      };
    
    case 'ADD_PACKING_LIST':
      return { ...state, packingLists: [...state.packingLists, action.payload] };
    
    case 'UPDATE_PACKING_LIST':
      return {
        ...state,
        packingLists: state.packingLists.map(list => 
          list.id === action.payload.id ? action.payload : list
        )
      };
    
    case 'ADD_BUDGET':
      return { ...state, budgets: [...state.budgets, action.payload] };
    
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget => 
          budget.id === action.payload.id ? action.payload : budget
        )
      };
    
    case 'ADD_PHOTO':
      return { ...state, photos: [...state.photos, action.payload] };
    
    case 'UPDATE_PHOTO':
      return {
        ...state,
        photos: state.photos.map(photo => 
          photo.id === action.payload.id ? action.payload : photo
        )
      };
    
    case 'DELETE_PHOTO':
      return {
        ...state,
        photos: state.photos.filter(photo => photo.id !== action.payload)
      };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

export const TravelPlannerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(travelPlannerReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('travel-planner-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      trips: state.trips,
      visitedPlaces: state.visitedPlaces,
      wishlistPlaces: state.wishlistPlaces,
      packingLists: state.packingLists,
      budgets: state.budgets,
      photos: state.photos
    };
    localStorage.setItem('travel-planner-data', JSON.stringify(dataToSave));
  }, [state.trips, state.visitedPlaces, state.wishlistPlaces, state.packingLists, state.budgets, state.photos]);

  const actions = {
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    
    addTrip: (trip) => dispatch({ type: 'ADD_TRIP', payload: { ...trip, id: Date.now() } }),
    updateTrip: (trip) => dispatch({ type: 'UPDATE_TRIP', payload: trip }),
    deleteTrip: (tripId) => dispatch({ type: 'DELETE_TRIP', payload: tripId }),
    setCurrentTrip: (trip) => dispatch({ type: 'SET_CURRENT_TRIP', payload: trip }),
    
    addVisitedPlace: (place) => dispatch({ type: 'ADD_VISITED_PLACE', payload: { ...place, id: Date.now() } }),
    addWishlistPlace: (place) => dispatch({ type: 'ADD_WISHLIST_PLACE', payload: { ...place, id: Date.now() } }),
    removeWishlistPlace: (placeId) => dispatch({ type: 'REMOVE_WISHLIST_PLACE', payload: placeId }),
    removeVisitedPlace: (placeId) => dispatch({ type: 'REMOVE_VISITED_PLACE', payload: placeId }),
    
    addPackingList: (packingList) => dispatch({ type: 'ADD_PACKING_LIST', payload: { ...packingList, id: Date.now() } }),
    updatePackingList: (packingList) => dispatch({ type: 'UPDATE_PACKING_LIST', payload: packingList }),
    
    addBudget: (budget) => dispatch({ type: 'ADD_BUDGET', payload: { ...budget, id: Date.now() } }),
    updateBudget: (budget) => dispatch({ type: 'UPDATE_BUDGET', payload: budget }),
    
    addPhoto: (photo) => dispatch({ type: 'ADD_PHOTO', payload: { ...photo, id: Date.now(), timestamp: Date.now() } }),
    updatePhoto: (photo) => dispatch({ type: 'UPDATE_PHOTO', payload: photo }),
    deletePhoto: (photoId) => dispatch({ type: 'DELETE_PHOTO', payload: photoId })
  };

  return (
    <TravelPlannerContext.Provider value={{ state, actions }}>
      {children}
    </TravelPlannerContext.Provider>
  );
};