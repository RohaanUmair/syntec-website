"use client"
import LoginForm from "@/components/ui/LoginForm";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDataToDB, app } from "@/lib/firebase";
import Swal from "sweetalert2";



const PaymentForm: React.FC = () => {

  const [userId, setUserId] = useState<string>('');
  const [userPayment, setUserPayment] = useState<string>('');
  const [userMonth, setUserMonth] = useState<string>('Months');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [advance, setAdvance] = useState<boolean>(false);

  const months = ['Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUserMonth = (month: string) => {
    setUserMonth(month);
  }

  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }

  const handleInputPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPayment(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (userMonth == "Months") {
      e.preventDefault();
      alert("Choose a month");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Data has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      e.preventDefault();

      setIsSubmitting(true);

      try {
        addDataToDB(userId, userPayment, userMonth, advance);

        setUserId("");
        setUserPayment("");
        setAdvance(false);
      } catch (error) {
        console.error("Error adding data to DB:", error);
      } finally {
        setIsSubmitting(false);
      }
    }

  }

  {
    return isLoggedIn ? (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          autoComplete="off"
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Payment Form
          </h2>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              required
              onChange={handleInputId}
              type="text"
              id="userId"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your user ID"
              name="userId"
              value={userId}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="userPayment"
              className="block text-sm font-medium text-gray-700"
            >
              Payment
            </label>
            <input
              required
              onChange={handleInputPayment}
              type="number"
              id="userPayment"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter payment amount"
              name="userPayment"
              value={userPayment}
            />

            <div className="mb-6">
              <label htmlFor="advance" className="block text-sm font-medium text-gray-700">
                Advance Payment?
              </label>
              <input
                type="checkbox"
                id="advance"
                checked={advance}
                onChange={(e) => setAdvance(e.target.checked)}
                className="mt-1 h-5 w-5"
              />
            </div>
          </div>


          <select required onChange={(e) => { handleUserMonth(e.target.value) }} className="border h-10 mb-6 flex items-center justify-center outline-none w-full px-3">
            {
              months.map((month, index) => {
                return <option key={index} value={month}>{month}</option>
              })
            }



            {/* <option value='Months'>Months</option>
            <option value='January'>January</option>
            <option value='Feburary'>Feburary</option>
            <option value='March'>March</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='August'>August</option>
            <option value='September'>September</option>
            <option value='October'>October</option>
            <option value='November'>November</option>
            <option value='December'>December</option> */}
          </select>



          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg focus:ring-4 focus:ring-blue-500"
          >
            {
              isSubmitting ? "Submitting" : "Submit"
            }
          </button>
        </form>
      </div>
    ) : (
      <LoginForm />
    )
  }

};

export default PaymentForm;
