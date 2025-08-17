# Algo Duo Backend

A cloud-powered, gamified DSA (Data Structures & Algorithms) learning platform backend.

## 🚀 Features

- **Authentication System**: JWT-based auth with Firebase integration
- **Adaptive Learning**: Personalized problem recommendations based on skill level
- **Gamification**: XP system, levels, streaks, and leaderboards
- **Code Execution**: Secure Docker-based code execution for multiple languages
- **Real-time Analytics**: Track progress, accuracy, and performance
- **RESTful API**: Clean, well-documented API endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + Firebase Auth
- **Code Execution**: Docker containers
- **Languages Supported**: Python, JavaScript, C++, Java

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- MongoDB v6.0 or higher
- Docker (for code execution)
- Firebase project (optional, for Google auth)

### Local Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/algo-duo-backend.git
cd algo-duo-backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update `.env` with your configuration

5. Start MongoDB:
\`\`\`bash
mongod
\`\`\`

6. Run the server:
\`\`\`bash
npm run dev  # Development mode with nodemon
npm start    # Production mode
\`\`\`

### Docker Setup

1. Build and run with Docker Compose:
\`\`\`bash
docker-compose up -d
\`\`\`

2. Check logs:
\`\`\`bash
docker-compose logs -f backend
\`\`\`

3. Stop services:
\`\`\`bash
docker-compose down
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── models/          # MongoDB schemas
├── routes/          # API route definitions
├── controllers/     # Request handlers
├── services/        # Business logic
├── middleware/      # Custom middleware
├── utils/          # Helper functions
└── config/         # Configuration files
\`\`\`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/firebase` - Firebase authentication
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Modules & Problems
- `GET /api/modules` - Get all modules
- `GET /api/modules/:slug` - Get module details
- `GET /api/problems/:id` - Get problem details
- `GET /api/problems/recommended` - Get recommended problems

### Submissions
- `POST /api/submissions/submit` - Submit solution
- `POST /api/submissions/run` - Test run code
- `GET /api/submissions/my-submissions` - Get user submissions

### Leaderboard & Analytics
- `GET /api/leaderboard` - Get XP leaderboard
- `GET /api/leaderboard/streaks` - Get streak leaderboard
- `GET /api/analytics/stats` - Get user statistics
- `GET /api/analytics/progress` - Get learning progress

## 🎮 Gamification System

### XP Calculation
- **Base XP**: Easy (10), Medium (25), Hard (50)
- **Modifiers**: 
  - Difficulty multiplier
  - Hints used (-5 XP each)
  - Multiple attempts (10% reduction per attempt)
  - Time bonus (+20% for quick solutions)

### Levels
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 300 XP
- Level 4: 600 XP
- Level 5: 1000 XP
- And so on...

### Achievements
- **First Steps**: First problem solved
- **Problem Solver**: 10 problems solved
- **Week Warrior**: 7-day streak
- **Consistency King**: 30-day streak
- **Rising Star**: Reach Level 5
- **Expert Coder**: Reach Level 10

## 🧪 Testing

Run tests:
\`\`\`bash
npm test
\`\`\`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT | Yes |
| `FIREBASE_PROJECT_ID` | Firebase project ID | No |
| `CLIENT_URL` | Frontend URL for CORS | Yes |

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure code execution in Docker containers
- CORS configuration
- Helmet.js for security headers

## 🚀 Deployment

### Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### AWS EC2
1. Launch EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Configure PM2 for process management
5. Setup Nginx as reverse proxy

### Heroku
1. Create Heroku app
2. Add MongoDB Atlas addon
3. Set config vars
4. Deploy via GitHub integration

## 📚 API Documentation

For detailed API documentation, import the included Postman collection:
`algo-duo-api.postman_collection.json`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by LeetCode, Codewars, and other coding platforms
- Built with love for the developer community