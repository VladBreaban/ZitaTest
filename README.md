# Zitamine B2B Portal - React Frontend

A modern React TypeScript application for the Zitamine B2B Doctor Portal, allowing doctors to manage clients and create supplement recommendations.

## Features

- **Authentication**: Login system with JWT tokens
- **Dashboard**: Overview with statistics and quick actions
- **Recommendations Management**: Create, view, and track recommendations
- **Client Management**: Search and manage Shopify customers
- **Settings**: Profile, payment info, and discount codes management
- **Responsive Design**: Built with Tailwind CSS matching Figma designs

## Technology Stack

- React 19+ with TypeScript
- Vite for build tooling
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## Project Structure

```
b2b-portal-web/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout/         # Layout components (Sidebar, Header)
│   │   └── PrivateRoute.tsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/              # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Recommendations.tsx
│   │   ├── Clients.tsx
│   │   └── Settings.tsx
│   ├── services/           # API service layer
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── dashboardService.ts
│   │   ├── recommendationService.ts
│   │   ├── clientService.ts
│   │   └── productService.ts
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .env                    # Environment variables
└── vite.config.ts          # Vite configuration
```

## Setup

### Prerequisites

- Node.js 18+ and npm
- Running B2B API at https://localhost:5001

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at http://localhost:3000

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://localhost:5001/api
```

## Pages

### Login Page
- Email/password authentication
- Google OAuth placeholder
- Links to registration and password recovery

### Dashboard
- Active clients count
- Total commissions (with monthly breakdown)
- Pending orders
- Total recommendations
- Quick action cards
- Recent activity table

### My Recommendations
- List all recommendations with filters
- Search functionality
- Status badges (draft, new, viewed, purchased)
- Commission tracking
- Create new recommendation

### My Clients
- Client list with search
- Statistics overview
- Recommendation count per client
- Commission per client
- Quick actions (view, create recommendation)

### Settings
- Personal Information tab
- Password change
- Discount codes (client & personal)
- Bank information (IBAN)
- Logout functionality

## API Integration

All API calls are handled through service layers:

- **authService**: Login, register, logout
- **dashboardService**: Dashboard statistics
- **recommendationService**: CRUD operations for recommendations
- **clientService**: Client management
- **productService**: Shopify products integration

### Authentication Flow

1. User logs in via `/login`
2. JWT token stored in localStorage
3. Token automatically added to all API requests
4. Protected routes check authentication status
5. Unauthorized requests redirect to login

## Styling

The app uses Tailwind CSS with custom theme:

```js
colors: {
  primary: {
    DEFAULT: '#FF9933',
    dark: '#E68A2E',
  },
  peach: {
    light: '#FFF4E6',
    DEFAULT: '#FFE4CC',
  }
}
```

## Key Components

### Layout
- **Sidebar**: Left navigation menu with icons
- **Header**: Top bar with search and user profile
- **Layout**: Wrapper combining sidebar and header

### PrivateRoute
- HOC for protecting routes
- Checks authentication status
- Redirects to login if not authenticated

### AuthContext
- Global authentication state
- Login/logout functions
- User information

## Development

### Running in Development

```bash
npm run dev
```

- Hot module replacement enabled
- API proxy configured for `/api` requests
- TypeScript type checking

### Building for Production

```bash
npm run build
```

- Optimized production build
- Code splitting
- Minification
- Gzip compression

## Features TODO

- [ ] Registration page implementation
- [ ] Recommendation wizard (3-step process)
- [ ] Product selection from Shopify
- [ ] Payouts/earnings page with charts
- [ ] Image upload for profile photo
- [ ] Real-time notifications
- [ ] Export recommendations to PDF
- [ ] Email recommendation to client

## Design Reference

The UI is based on Figma designs located at:
`C:\freelancing\B2BPortal\` (screen1.PNG through screen10.PNG)

Key design elements:
- Clean, modern interface with peach/orange accents
- Card-based layouts
- Rounded corners and soft shadows
- Inter font family
- Consistent spacing and typography

## API Endpoints Used

- `POST /api/auth/login/doctor` - Doctor login
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/recommendations` - List recommendations
- `POST /api/recommendations` - Create recommendation
- `GET /api/clients` - List clients
- `GET /api/clients/search` - Search Shopify customers
- `GET /api/products` - List Shopify products

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the API has CORS enabled for `http://localhost:3000`

### API Connection
- Verify the API is running at https://localhost:5001
- Check `.env` file has correct VITE_API_URL
- Ensure SSL certificate is trusted for localhost

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## License

Proprietary - Zitamine
