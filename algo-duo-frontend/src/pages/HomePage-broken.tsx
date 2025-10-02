import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Mock user data for now
  const userStats = {
    level: 2,
    totalXP: 145,
    streakDays: 3,
    lessonsCompleted: 2,
    rank: 'Learner'
  };
  
  const { level, totalXP, streakDays, lessonsCompleted, rank } = userStats;
  
  // Mock topics data
  const unlockedTopics = [
    {
      id: 'arrays',
      title: 'Arrays',
      description: 'Learn the fundamentals of arrays and basic operations.',
      totalLessons: 5,
      completedLessons: 2,
      unlocked: true
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Master dynamic data structures and pointer manipulation.',
      totalLessons: 4,
      completedLessons: 0,
      unlocked: true
    },
    {
      id: 'stacks',
      title: 'Stacks & Queues',
      description: 'Understand LIFO and FIFO data structures.',
      totalLessons: 3,
      completedLessons: 0,
      unlocked: false
    }
  ];
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a2e', 
      color: 'white', 
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#16213e', 
        padding: '15px', 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #6c5ce7'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, color: '#00ff88', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🚀 Code Pilot
          </h1>
        </Link>
        
        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/daily-challenge" style={{ color: '#74b9ff', textDecoration: 'none', fontWeight: 'bold' }}>
            🎯 Daily Challenge
          </Link>
          <Link to="/progress" style={{ color: '#74b9ff', textDecoration: 'none', fontWeight: 'bold' }}>
            📊 Progress
          </Link>
          <Link to="/achievements" style={{ color: '#74b9ff', textDecoration: 'none', fontWeight: 'bold' }}>
            🏆 Achievements
          </Link>
          <Link to="/playground" style={{ color: '#74b9ff', textDecoration: 'none', fontWeight: 'bold' }}>
            💻 Playground
          </Link>
        </div>
        
        {/* User Stats */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <span style={{ 
            backgroundColor: '#6c5ce7', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            ⭐ {totalXP} XP
          </span>
          <span style={{ 
            backgroundColor: '#fd79a8', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            🔥 {streakDays} days
          </span>
          <span style={{ 
            backgroundColor: '#00b894', 
            padding: '8px 16px', 
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            🎖️ Level {level} ({rank})
          </span>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <button
              style={{ 
                backgroundColor: '#6c5ce7', 
                padding: '8px 16px', 
                borderRadius: '20px',
                fontWeight: 'bold',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, background-color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#5f4ed6';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#6c5ce7';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              👤 Profile
            </button>
          </Link>
        </div>
      </nav>

      <div style={{ padding: '0 20px' }}>
        {/* Welcome Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            background: 'linear-gradient(45deg, #6c5ce7, #74b9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            Learn DSA the Fun Way! 🎯
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#b2bec3', maxWidth: '600px', margin: '0 auto' }}>
            Master data structures and algorithms with interactive lessons, gamification, and daily challenges.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{ 
            backgroundColor: '#2d3436', 
            padding: '25px', 
            borderRadius: '12px',
            border: '2px solid #6c5ce7',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#6c5ce7', marginBottom: '15px' }}>📚 Interactive Lessons</h3>
            <p style={{ color: '#ddd' }}>
              Learn step-by-step with hands-on examples and visual explanations.
            </p>
            <div style={{ marginTop: '15px' }}>
              <span style={{ 
                backgroundColor: '#6c5ce7', 
                color: 'white', 
                padding: '5px 15px', 
                borderRadius: '15px', 
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {lessonsCompleted} completed
              </span>
            </div>
          </div>


          <Link to="/playground" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              backgroundColor: '#2d3436', 
              padding: '25px', 
              borderRadius: '12px',
              border: '2px solid #00b894',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              height: '100%'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ color: '#00b894', marginBottom: '15px' }}>🏆 Daily Challenge</h3>
              <p style={{ color: '#ddd' }}>
                Test your skills with today's coding challenge and earn bonus points!
              </p>
              <div style={{ marginTop: '15px' }}>
                <span style={{ 
                  backgroundColor: '#00b894', 
                  color: 'white', 
                  padding: '5px 15px', 
                  borderRadius: '15px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  +50 XP Today
                </span>
              </div>
            </div>
          </Link>

          <Link to="/playground" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              backgroundColor: '#2d3436', 
              padding: '25px', 
              borderRadius: '12px',
              border: '2px solid #e17055',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              height: '100%'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ color: '#e17055', marginBottom: '15px' }}>⚡ Code Playground</h3>
              <p style={{ color: '#ddd' }}>
                Practice algorithms with our interactive code editor and visualizer.
              </p>
              <div style={{ marginTop: '15px' }}>
                <span style={{ 
                  backgroundColor: '#e17055', 
                  color: 'white', 
                  padding: '5px 15px', 
                  borderRadius: '15px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  Try Now
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Learning Topics */}
        <div style={{ 
          backgroundColor: '#2d3436', 
          padding: '30px', 
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #636e72'
        }}>
          <h2 style={{ marginBottom: '25px', color: '#74b9ff' }}>🎓 Learning Topics</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {unlockedTopics.map((topic) => (
              <Link 
                key={topic.id}
                to={topic.id === 'arrays' ? '/arrays' : `/topics/${topic.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ 
                  backgroundColor: '#636e72', 
                  padding: '20px', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: topic.completedLessons > 0 ? '2px solid #00b894' : '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#74b9ff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#636e72';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {topic.title}
                    {topic.completedLessons > 0 && <span style={{ fontSize: '0.8rem' }}>🎯</span>}
                  </h4>
                  <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#ddd' }}>
                    {topic.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      color: topic.completedLessons > 0 ? '#00b894' : '#74b9ff', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {topic.completedLessons > 0 ? `✅ ${topic.completedLessons}/${topic.totalLessons} completed` : '🎯 Start Learning'}
                    </span>
                    <span style={{ color: '#b2bec3', fontSize: '0.8rem' }}>
                      {topic.totalLessons} lessons
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    backgroundColor: '#444', 
                    borderRadius: '2px', 
                    marginTop: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${(topic.completedLessons / topic.totalLessons) * 100}%`, 
                      height: '100%', 
                      backgroundColor: '#00b894',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ color: '#74b9ff', marginBottom: '20px' }}>Ready to become an Algorithm Master? 🚀</h3>
          <Link to="/arrays" style={{ textDecoration: 'none' }}>
            <button 
              style={{ 
                background: 'linear-gradient(45deg, #6c5ce7, #74b9ff)',
                color: 'white',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.1rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.05)'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
            >
              🎯 Start with Arrays
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center', 
          color: '#b2bec3',
          borderTop: '1px solid #636e72',
          paddingTop: '20px'
        }}>
          <p>✨ Your journey to mastering algorithms starts here! ✨</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            Level {level} • {totalXP} XP • {streakDays} day streak 🔥
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
