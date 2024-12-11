"use client"

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";





const firebaseConfig = {
  apiKey: "AIzaSyCanIW8b8r4Eta_TJdKhqUU2Bu8HDF_bqo",
  authDomain: "syntec-96c68.firebaseapp.com",
  projectId: "syntec-96c68",
  storageBucket: "syntec-96c68.firebasestorage.app",
  messagingSenderId: "291279927138",
  appId: "1:291279927138:web:df767c61cd6133faec5e3b",
  measurementId: "G-DR49N9KG3R"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);



function loginUser(email: string, password: string) {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("logged in");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}


// async function addDataToDB(userId: string, userPayment: string, month: string, advance: boolean) {

//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       userId,
//       userPayment,
//       month,
//       advance,
//       date: new Date().toISOString()
//     });

//     console.log("Document written with ID: ", docRef.id);

//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Your Data has been saved",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.error("Error adding document: ", e.message);
//     } else {
//       console.error("An unknown error occurred: ", e);
//     }
//   }
// }
async function addDataToDB(userId: string, userPayment: string, month: string, advance: boolean) {
  try {
    // Reference the Firestore collection
    const usersRef = collection(db, "users");

    // Fetch existing data for the given `userId` and `month`
    const querySnapshot = await getDocs(usersRef);
    const userExists = querySnapshot.docs.some(doc => {
      const data = doc.data();
      return data.userId === userId && data.month === month;
    });

    if (userExists) {
      // Alert user if the same userId and month already exist
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Payment for this user and month already exists",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Add new entry to Firestore
      const docRef = await addDoc(usersRef, {
        userId,
        userPayment,
        month,
        advance,
        date: new Date().toISOString()
      });

      console.log("Document written with ID: ", docRef.id);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Data has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error adding data to DB:", e.message);
    }
  }
}



interface Data {
  userId: string
  userPayment: string
  month: string
  date: string
}

async function getData() {
  const data: Data[] = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({
      userId: docData.userId,
      userPayment: docData.userPayment,
      month: docData.month,
      date: docData.date || "N/A",
      advance: docData.advance ?? null,
    } as Data);
  });

  return data;
}



export {
  app,
  loginUser,
  addDataToDB,
  getData
}