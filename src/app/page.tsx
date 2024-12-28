"use client"
import LoginForm from "@/components/ui/LoginForm";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDataToDB, app } from "@/lib/firebase";
import Swal from "sweetalert2";
import Link from "next/link";



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

  const [slipNumber, setSlipNumber] = useState<string>("");

  const handleInputSlipNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlipNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!slipNumber) {
      alert("Slip # is required");
      return;
    }

    if (userMonth === "Months") {
      alert("Choose a month");
      return;
    }

    setIsSubmitting(true);

    try {
      addDataToDB(userId, userPayment, userMonth, advance, slipNumber);

      setUserId("");
      setUserPayment("");
      setAdvance(false);
      setSlipNumber("");
    } catch (error) {
      console.error("Error adding data to DB:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  {
    return isLoggedIn ? (
      <div className="flex items-center justify-center min-h-screen bg-gray-100     relative">

        <Link href={'/sheet'}>
          <button className="absolute top-20 right-20 bg-orange-400 px-3 py-2 rounded-sm text-white">Go To Sheet</button>
        </Link>

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


          <div className="mb-4">
            <label htmlFor="slipNumber" className="block text-sm font-medium text-gray-700">
              Slip #
            </label>
            <input
              required
              onChange={handleInputSlipNumber}
              type="text"
              id="slipNumber"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter Slip # (e.g., 12345 or online)"
              name="slipNumber"
              value={slipNumber}
            />
          </div>


          <select required onChange={(e) => { handleUserMonth(e.target.value) }} className="border h-10 mb-6 flex items-center justify-center outline-none w-full px-3">
            {
              months.map((month, index) => {
                return <option key={index} value={month}>{month}</option>
              })
            }
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
