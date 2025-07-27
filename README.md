# 🌍 Wandovia 🌍

A comprehensive, feature-rich travel planning application built with React.js that helps you organize, track, and manage all aspects of your travel adventures.


![Travel Planner Dashboard](https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg)
## ✨ Features

### 🗺️ Interactive World Map
- **Interactive Leaflet.js Map**: Click and explore countries worldwide
- **Visited Places Tracking**: Mark and manage places you've been to
- **Wishlist Management**: Save destinations for future trips
- **Custom Markers**: Green markers for visited places, red for wishlist
- **Place Management**: Add, edit, and delete places with detailed information
- **Responsive List View**: Toggle between map and list views on mobile

### 📅 Trip Planner
- **Complete Trip Management**: Create, edit, and delete trips
- **Date Planning**: Set start and end dates with duration calculation
- **Activity Planning**: Add and manage planned activities
- **Budget Integration**: Set estimated budgets for each trip
- **Status Tracking**: Automatic status updates (upcoming, active, completed)

### 🧳 Smart Packing Lists
- **Auto-Generated Lists**: Smart suggestions based on trip type
- **Customizable Categories**: Organize items by type (clothing, electronics, etc.)
- **Progress Tracking**: Visual progress bars and completion status
- **Trip Integration**: Link packing lists to specific trips
- **Interactive Checklists**: Check off items as you pack

### 💰 Advanced Budget Calculator
- **Category-Based Budgeting**: Track expenses by accommodation, food, activities, etc.
- **Real-time Tracking**: Update spent amounts and see remaining budget
- **Visual Progress**: Progress bars and over-budget warnings
- **Multiple Budgets**: Manage budgets for different trips
- **Smart Statistics**: Total budget overview and spending analytics

### ☁️ Weather Information
- **Current Weather**: Get weather data for any city
- **Detailed Metrics**: Temperature, humidity, wind speed, visibility
- **Travel Planning**: Weather-based packing and activity suggestions
- **Search Functionality**: Look up weather for any destination

### 📸 Photo Journal
- **Memory Preservation**: Upload and organize travel photos
- **Trip Association**: Link photos to specific trips
- **Location Tagging**: Add location information to photos
- **Story Telling**: Add descriptions and notes to photos
- **Date Organization**: Automatic date-based organization

### 🌐 Currency Converter
- **Real-time Conversion**: Convert between major world currencies
- **Popular Pairs**: Quick access to common currency conversions
- **Travel Tips**: Currency exchange advice and tips
- **Interactive Interface**: Easy-to-use conversion calculator

### 🎨 Modern UI/UX
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Micro-interactions and hover effects
- **Card-based Layout**: Clean, modern interface design
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prachi9506/Wandovia
   cd Wandovia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks and context
- **React Router DOM** - Client-side routing
- **Leaflet.js** - Interactive maps
- **React Leaflet** - React components for Leaflet
- **Lucide React** - Beautiful, customizable icons
- **Date-fns** - Modern date utility library

### Build Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting

### Styling
- **CSS3** - Custom CSS with CSS variables
- **CSS Grid & Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar navigation
- Touch-friendly interactions
- Optimized map controls
- Stacked layouts for better mobile viewing

## 🎯 Key Features Deep Dive

### Interactive World Map
- **Technology**: Leaflet.js with OpenStreetMap tiles
- **Markers**: Custom colored markers for different place types
- **Popups**: Rich information popups with actions
- **Responsive**: List view for mobile devices
- **Data Persistence**: Local storage for offline access

### Trip Planning System
- **CRUD Operations**: Full create, read, update, delete functionality
- **Date Management**: Smart date handling with duration calculations
- **Activity Planning**: Dynamic activity lists with add/remove functionality
- **Status System**: Automatic trip status based on dates

### Budget Management
- **Category System**: Pre-defined and custom expense categories
- **Real-time Updates**: Live budget tracking and calculations
- **Visual Feedback**: Progress bars and warning indicators
- **Multi-budget Support**: Separate budgets for different trips


**Made with ❤️ for travelers by travelers**

*Start planning your next adventure today!*
