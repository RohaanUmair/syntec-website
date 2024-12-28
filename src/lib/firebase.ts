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
async function addDataToDB(
  userId: string,
  userPayment: string,
  month: string,
  advance: boolean,
  slipNumber: string
) {
  try {
    const usersRef = collection(db, "users");

    const querySnapshot = await getDocs(usersRef);
    const userExists = querySnapshot.docs.some((doc) => {
      const data = doc.data();
      return data.userId === userId && data.month === month;
    });

    if (userExists) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Payment for this user and month already exists",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const docRef = await addDoc(usersRef, {
        userId,
        userPayment,
        month,
        advance,
        slipNumber,
        date: new Date().toISOString(),
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
  } catch (e) {
    console.error("Error adding data to DB:", e);
  }
}




interface Data {
  id?: string; // Make id optional
  userId: string;
  userPayment: number;
  month: string;
  date: string;
  advance?: boolean;
  slipNumber?: string;
}

async function getData() {
  const data: (Data & { id: string })[] = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({
      id: doc.id,
      userId: docData.userId,
      userPayment: docData.userPayment,
      month: docData.month,
      date: docData.date || "N/A",
      advance: docData.advance ?? null,
      slipNumber: docData.slipNumber || "N/A",
    });
  });

  return data;
}







import { deleteDoc, doc } from "firebase/firestore";

async function deleteData(docId: string) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await deleteDoc(doc(db, "users", docId)); // Wait for document deletion
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Entry deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      console.error("Error deleting document:", e);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to delete entry",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}






export {
  app,
  loginUser,
  addDataToDB,
  getData,
  deleteData
}