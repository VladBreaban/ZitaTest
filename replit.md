# Zitamine B2B Portal - React Frontend

## Overview
This is a modern React TypeScript application for the Zitamine B2B Doctor Portal. It allows doctors to manage clients and create supplement recommendations through an intuitive web interface.

**Status**: Configured for Replit environment (Last updated: November 09, 2025)

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 19+ with TypeScript
- **Build Tool**: Vite 7.2+
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v3.4 (downgraded from v4 for compatibility)
- **State Management**: React Context API

### Project Structure
```
b2b-portal-web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout/       # Sidebar, Header, Layout wrapper
│   │   ├── PrivateRoute.tsx
│   │   └── Toast.tsx
│   ├── contexts/         # React Context providers
│   │   └── AuthContext.tsx
│   ├── pages/            # Route page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Recommendations.tsx
│   │   ├── Clients.tsx
│   │   ├── Payouts.tsx
│   │   ├── Settings.tsx
│   │   └── AdminDoctors.tsx
│   ├── services/         # API service layer
│   │   ├── api.ts        # Base API client with interceptors
│   │   ├── authService.ts
│   │   ├── dashboardService.ts
│   │   ├── recommendationService.ts
│   │   ├── clientService.ts
│   │   └── productService.ts
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main app component with routes
├── public/               # Static assets and design reference images
└── vite.config.ts        # Vite configuration
```

### Key Features
- **Authentication System**: JWT-based login with token management
- **Dashboard**: Statistics overview with active clients, commissions, orders
- **Recommendations**: Create and manage supplement recommendations for clients
- **Client Management**: Search and view Shopify customers
- **Settings**: Profile management, payment info, discount codes

## Replit Configuration

### Development Server
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows external access)
- **HMR**: Configured for Replit's proxy environment

### Workflow
The project uses a single workflow called "dev" that runs `npm run dev` to start the Vite development server on port 5000.

### Environment Variables
The application requires:
- `VITE_API_URL`: Backend API endpoint URL (format: https://your-backend-url/api)

**Important**: This frontend expects a separate backend API. The API URL needs to be configured through Replit Secrets.

## Backend Integration

### API Service Layer
All API calls go through `src/services/api.ts` which:
- Adds JWT tokens to requests automatically
- Handles 401 unauthorized responses
- Redirects to login on authentication failures

### Expected Backend Endpoints
- `POST /api/auth/login/doctor` - Doctor authentication
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/recommendations` - List recommendations
- `POST /api/recommendations` - Create recommendation
- `GET /api/clients` - List clients
- `GET /api/clients/search` - Search Shopify customers
- `GET /api/products` - List Shopify products

## Design System

### Colors
- **Primary Orange**: #FF9933
- **Peach Tones**: #FFF4E6, #FFE4CC
- **Cream**: #FFF5EB

### Typography
- Font Family: Inter (sans-serif)

### UI Patterns
- Card-based layouts
- Rounded corners with soft shadows
- Consistent spacing system
- Clean, modern interface

## Development Notes

### Authentication Flow
1. User enters credentials on login page
2. JWT token received and stored in localStorage
3. Token automatically added to all API requests via interceptor
4. Protected routes use PrivateRoute wrapper component
5. Invalid tokens redirect to login page

### State Management
- Authentication state managed via AuthContext
- Component-level state for UI interactions
- No global state management library (Redux, etc.)

## Recent Changes
- **2025-11-09 (Evening)**: Fixed critical Tailwind CSS issue
  - **Problem**: Tailwind v4 was installed but all code written for v3, causing styles not to load
  - **Solution**: Downgraded to Tailwind CSS v3.4.17
  - Updated postcss.config.js to use v3 syntax
  - Updated index.css with proper v3 directives (@tailwind base/components/utilities)
  - Fixed Layout component structure to prevent content overlap
  - Updated Dashboard typography and spacing to match Figma design
  - Added quick-action background images
  
- **2025-11-09 (Earlier)**: Configured for Replit environment
  - Updated Vite config to use port 5000 with 0.0.0.0 host
  - Configured HMR for Replit's proxy environment
  - Removed local backend proxy (backend should be separate service)
  - Set up dev workflow for automatic startup

## Known Requirements

### Backend Dependency
This is a **frontend-only** application. It requires a separate backend API service to function properly. The backend should:
- Be accessible via HTTPS
- Implement the API endpoints listed above
- Support JWT authentication
- Handle CORS for the Replit frontend domain

### Missing Features (From Original TODO)
- Registration page implementation
- Recommendation wizard (3-step process)
- Product selection from Shopify
- Payouts page with charts
- Image upload for profile photo
- Real-time notifications
- PDF export for recommendations
- Email recommendations to clients

## User Preferences
None documented yet.
