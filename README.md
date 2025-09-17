# CodePilot Frontend

A modern, gamified learning platform for mastering Data Structures and Algorithms.

## Features

- 🎮 **Gamified Learning**: Earn XP, levels, and maintain streaks
- 💻 **Interactive Code Editor**: Multi-language support with real-time execution
- 📊 **Analytics Dashboard**: Track progress and identify improvement areas
- 🏆 **Leaderboard**: Compete with other learners
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔐 **Secure Authentication**: JWT-based auth with protected routes

## Tech Stack

- **React 18**: Modern React with hooks
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **React Context**: State management
- **Monaco Editor**: VS Code editor for code editing
- **Recharts**: Data visualization
- **React Hot Toast**: Toast notifications
- **Framer Motion**: Animations

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running (algo-duo-backend)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd algo-duo-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the \`.env\` file with your API URL:
\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm start
\`\`\`

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

\`\`\`
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── context/         # React Context providers
├── services/        # API service functions
├── utils/           # Helper functions and constants
└── styles/          # Global styles
\`\`\`

## Available Scripts

- \`npm start\` - Start development server
- \`npm build\` - Build for production
- \`npm test\` - Run tests
- \`npm eject\` - Eject from Create React App

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api |
| REACT_APP_ENV | Environment | development |

## Features Overview

### Authentication
- JWT token storage in localStorage
- Protected routes with automatic redirects
- Persistent login sessions

### Learning Modules
- Browse categorized DSA topics
- Track progress per module
- Difficulty-based progression

### Problem Solving
- Interactive code editor with syntax highlighting
- Multiple language support (Python, C++, Java, JavaScript)
- Real-time code execution
- Test case validation

### Gamification
- XP system with levels
- Daily streaks
- Achievement badges
- Global and module-specific leaderboards

### Analytics
- Progress tracking over time
- Topic-wise performance analysis
- Accuracy metrics
- Time spent analytics

## Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the \`build\` folder.

### Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Deploy to Netlify

1. Build the project
2. Drag and drop the \`build\` folder to Netlify

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@codepilot.com or join our Discord server.
\`\`\`

---

## Setup Instructions

1. **Create the project folder structure** as shown above
2. **Install dependencies** using \`npm install\`
3. **Configure environment variables** in \`.env\`
4. **Ensure backend is running** on the specified port
5. **Start the development server** with \`npm start\`

The frontend is now ready to connect with your backend API and provide a complete gamified DSA learning experience!