import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const dailyStreakUpdate = functions.scheduler.onSchedule('every 24 hours', async (context) => {
    const db = admin.firestore();
    const usersRef = db.collection('users');
    const now = new Date();
    
    try {
      const snapshot = await usersRef.get();
      const batch = db.batch();

      snapshot.forEach(doc => {
        const userData = doc.data();
        const lastLogin = userData.lastLogin.toDate();
        const daysSinceLogin = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

        if (daysSinceLogin > 1) {
          // Reset streak if user missed a day
          batch.update(doc.ref, {
            'streak.current': 0
          });
        }
      });

      await batch.commit();
      console.log('Daily streak update completed');
      return;
    } catch (error) {
      console.error('Error updating streaks:', error);
      throw error;
    }
});