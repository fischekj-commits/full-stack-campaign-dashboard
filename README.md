# Campaign Dashboard

A full-stack web application for managing and tracking marketing campaigns with real-time analytics and performance metrics.

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** - RESTful API framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Zod** - Runtime validation
- **bcryptjs** - Password hashing

### Frontend
- **React** with **TypeScript**
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Features

- User authentication (register/login)
- Campaign CRUD operations
- Dashboard with performance metrics
- Campaign status management (draft, active, paused, completed)
- Budget tracking and spending analytics
- Impression, click, and conversion tracking
- Responsive design

## Project Structure

```
full-stack-campaign-dashboard/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── stores/        # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   ├── styles/        # CSS styles
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   └── vite.config.ts
├── server/                # Backend Express application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Entry point
│   ├── schema.sql        # Database schema
│   └── package.json
├── docker-compose.yml    # Docker services
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ (or use Docker)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd full-stack-campaign-dashboard
```

### 2. Database Setup

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432 and automatically run the schema.

#### Option B: Using Local PostgreSQL

1. Install PostgreSQL
2. Create a database:
   ```bash
   createdb campaign_dashboard
   ```
3. Run the schema:
   ```bash
   psql -d campaign_dashboard -f server/schema.sql
   ```

### 3. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and configure your database connection if needed.

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 4. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Campaigns (Protected)
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign by ID
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `GET /api/campaigns/stats` - Get campaign statistics

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique user email
- `name` - User's name
- `password_hash` - Hashed password
- `created_at`, `updated_at` - Timestamps

### Campaigns Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `name` - Campaign name
- `description` - Campaign description
- `budget` - Total budget
- `spent` - Amount spent
- `start_date`, `end_date` - Campaign duration
- `status` - Campaign status (draft/active/paused/completed)
- `target_audience` - Target audience description
- `impressions` - Total impressions
- `clicks` - Total clicks
- `conversions` - Total conversions
- `created_at`, `updated_at` - Timestamps

## Development Scripts

### Backend
```bash
npm run dev       # Start dev server with hot reload
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run typecheck # Type check without emitting
```

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # Type check without emitting
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campaign_dashboard
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

## Production Deployment

### Backend
1. Build the application: `npm run build`
2. Set environment variables
3. Run migrations: `psql -d <database> -f schema.sql`
4. Start server: `npm start`

### Frontend
1. Update API base URL in production
2. Build: `npm run build`
3. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
