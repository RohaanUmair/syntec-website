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


async function addDataToDB(userId: string, userPayment: string, month: string) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userId,
      userPayment,
      month,
    });

    console.log("Document written with ID: ", docRef.id);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Data has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error adding document: ", e.message);
    } else {
      console.error("An unknown error occurred: ", e);
    }
  }
}


    interface Data {
        userId: string
        userPayment: string
        month: string
    }

async function getData() {
  const data: Data[] = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as Data);
  });

  return data;
}



export {
  app,
  loginUser,
  addDataToDB,
  getData
}