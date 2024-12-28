// "use client"
// import { app, getData } from "@/lib/firebase";
// import React, { useEffect, useState } from "react";
// import Loading from "../loading";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import LoginForm from "@/components/ui/LoginForm";


// function Sheet() {

//     interface Data {
//         userId: string
//         userPayment: string
//         month: string
//         date: string
//         advance?: boolean
//     }


//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//     useEffect(() => {
//         const auth = getAuth(app);

//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setIsLoggedIn(true);
//             } else {
//                 setIsLoggedIn(false);
//             }
//         });

//         return () => unsubscribe();
//     }, []);



//     const [data, setData] = useState<Data[]>([]);

//     useEffect(() => {
//         async function dataFetching() {
//             const users = await getData();
//             setData(users);
//         }

//         dataFetching();

//     }, []);


//     const [total, setTotal] = useState<number>(0);

//     useEffect(() => {
//         const calculatedTotal = data.reduce((sum, row) => sum + parseFloat(row.userPayment || "0"), 0);
//         setTotal(calculatedTotal);
//     }, [data]);

//     if (data.length == 0) return <Loading />

//     {
//         return isLoggedIn ? (
//             <div className="overflow-x-auto">
//                 <h1 className="text-4xl text-right pr-36">Total: {total}</h1>
//                 <table className="min-w-full border-collapse bg-white shadow-md rounded-md">
//                     <thead>
//                         <tr className="bg-blue-500 text-white">
//                             <th className="py-3 px-6 text-left font-semibold">#</th>
//                             <th className="py-3 px-6 text-left font-semibold">User ID</th>
//                             <th className="py-3 px-6 text-left font-semibold">Month</th>
//                             <th className="py-3 px-6 text-left font-semibold">Payment</th>
//                             <th className="py-3 px-6 text-left font-semibold">Date</th>
//                             <th className="py-3 px-6 text-left font-semibold">Advance</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((row: Data, index: number) => (
//                             <tr
//                                 key={index}
//                                 className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                                     } hover:bg-blue-50 transition-colors`}
//                             >
//                                 <td className="py-3 px-6">{index + 1}</td>
//                                 <td className="py-3 px-6">{row.userId}</td>
//                                 <td className="py-3 px-6">{row.month}</td>
//                                 <td className="py-3 px-6">{row.userPayment}</td>
//                                 <td className="py-3 px-6">{new Date(row.date).toLocaleString()}</td>
//                                 <td className="py-3 px-6">
//                                     {row.advance ? "Yes" : row.advance === false ? "No" : "Not Specified"}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         ) : (
//             <LoginForm />
//         )
//     }
// }

// export default Sheet;




"use client"
import { app, getData } from "@/lib/firebase";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginForm from "@/components/ui/LoginForm";

function Sheet() {

    interface Data {
        userId: string
        userPayment: string
        month: string
        date: string
        advance?: boolean
    }

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [data, setData] = useState<Data[]>([]);
    const [filteredData, setFilteredData] = useState<Data[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [selectedMonth, setSelectedMonth] = useState<string>("All");

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

    useEffect(() => {
        async function dataFetching() {
            const users = await getData();
            setData(users);
        }
        dataFetching();
    }, []);

    useEffect(() => {
        const filtered = selectedMonth === "All" ? data : data.filter(row => row.month === selectedMonth);
        setFilteredData(filtered);
        const calculatedTotal = filtered.reduce((sum, row) => sum + parseFloat(row.userPayment || "0"), 0);
        setTotal(calculatedTotal);
    }, [data, selectedMonth]);

    const months = [
        "All", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (data.length === 0) return <Loading />;

    return isLoggedIn ? (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl">Total: {total}</h1>
                <select
                    className="p-2 border rounded-md"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>
            <table className="min-w-full border-collapse bg-white shadow-md rounded-md">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-3 px-6 text-left font-semibold">#</th>
                        <th className="py-3 px-6 text-left font-semibold">User ID</th>
                        <th className="py-3 px-6 text-left font-semibold">Month</th>
                        <th className="py-3 px-6 text-left font-semibold">Payment</th>
                        <th className="py-3 px-6 text-left font-semibold">Date</th>
                        <th className="py-3 px-6 text-left font-semibold">Advance</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row: Data, index: number) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50 transition-colors`}
                        >
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{row.userId}</td>
                            <td className="py-3 px-6">{row.month}</td>
                            <td className="py-3 px-6">{row.userPayment}</td>
                            <td className="py-3 px-6">{new Date(row.date).toLocaleString()}</td>
                            <td className="py-3 px-6">
                                {row.advance ? "Yes" : row.advance === false ? "No" : "Not Specified"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <LoginForm />
    );
}

export default Sheet;
