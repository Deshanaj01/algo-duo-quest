import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/firestore';

const Leaderboard = () => {
  interface Leader {
    userId: string;
    name: string;
    photoURL: string | null;
    xp: number;
    streak: number;
  }

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await getLeaderboard(10);
        setLeaders(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top Learners</h2>
      <div className="space-y-2">
        {leaders.map((user, index) => (
          <div key={user.userId} className="flex items-center gap-4 p-3 bg-gray-800 rounded">
            <span className="text-xl font-bold">{index + 1}</span>
            <img src={user.photoURL || '/default-avatar.png'} className="w-8 h-8 rounded-full" />
            <span>{user.name}</span>
            <span className="ml-auto">{user.xp} XP</span>
            <span>🔥 {user.streak}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;