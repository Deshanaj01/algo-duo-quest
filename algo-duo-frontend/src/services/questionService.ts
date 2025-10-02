import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface Question {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  hints: string[];
  solution: string;
  createdAt?: Date;
}

export async function addQuestion(question: Question) {
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      ...question,
      createdAt: new Date()
    });
    console.log("Question added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
}

// Example usage
export async function addMaxSubarrayQuestion() {
  await addQuestion({
    title: "Find maximum subarray sum",
    description: "Given an array of integers, find the contiguous subarray with the maximum sum.",
    difficulty: "medium",
    topic: "arrays",
    hints: [
      "Think about prefix sums.",
      "Can you solve it in O(n)?"
    ],
    solution: "Use Kadane's Algorithm"
  });
}

// Helper function to get questions
export async function getQuestions(topic?: string) {
  try {
    let q = collection(db, "questions");
    if (topic) {
      q = query(q, where("topic", "==", topic));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}