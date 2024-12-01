"use client"
import { getData } from "@/lib/firebase";
import React, { useEffect, useState } from "react";
import Loading from "../loading";


function Sheet() {

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        async function dataFetching() {
            const users = await getData();
            setData(users);
        }

        dataFetching();

    }, []);

    if (data.length == 0) return <Loading />


    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        //     <button onClick={() => console.log(data)}>get data</button>
        //     <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        //         <h1 className="text-2xl font-bold text-gray-800 mb-4">User Payments</h1>
        //         <table className="min-w-full table-auto border-collapse border border-gray-200">
        //             <thead>
        //                 <tr className="bg-gray-200 text-gray-600 text-left">
        //                     <th className="px-6 py-3 border-b border-gray-300">User ID</th>
        //                     {months.map((month) => (
        //                         <th key={month} className="px-6 py-3 border-b border-gray-300">
        //                             {month}
        //                         </th>
        //                     ))}
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {userData.map((user) => (
        //                     <UserDetail
        //                         key={user.userId}
        //                         userId={user.userId}
        //                         payments={user.payments}
        //                     />
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>


        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-md">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-3 px-6 text-left font-semibold">User ID</th>
                        <th className="py-3 px-6 text-left font-semibold">Month</th>
                        <th className="py-3 px-6 text-left font-semibold">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: any, index: number) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-blue-50 transition-colors`}
                        >
                            <td className="py-3 px-6">{row.userId}</td>
                            <td className="py-3 px-6">{row.month}</td>
                            <td className="py-3 px-6">{row.userPayment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sheet;
