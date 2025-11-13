import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.ts";

export async function testFirestore() {
  try {
    // Test writing to Firestore
    const testCollection = collection(db, "test");
    const docRef = await addDoc(testCollection, {
      message: "Hello Firestore!",
      timestamp: new Date()
    });
    console.log("Document written with ID:", docRef.id);

    // Test reading from Firestore
    const querySnapshot = await getDocs(testCollection);
    console.log("Documents in test collection:");
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Error testing Firestore:", error);
  }
}
