"use client"
import { loginUser } from "@/lib/firebase";
import React, { useState } from "react";



function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        loginUser(email, password);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-slate-100">
            <form className="flex items-center flex-col h-80 w-80 border gap-6 py-6 bg-white rounded-2xl shadow-md " onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">Login</h1>

                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleEmail}
                        type="email"
                        id="email"
                        className="border w-60 h-10 px-4"
                        placeholder="Enter your Email"
                        value={email}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handlePassword}
                        type="password"
                        id="password"
                        className="border w-60 h-10 px-4"
                        placeholder="Enter your Password"
                        value={password}
                    />
                </div>

                <button className="px-4 py-1 bg-blue-500 text-white rounded text-xl flex items-center">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
