"use client";

import { useState } from "react";
import '../styles/globals.css';
import {useRouter} from "next/router";

export default function SignupForm() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Perform input validation
        if (!email || !email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        // Send user data to the API
        const res = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.status === 201) {
            router.push("/login");
        } else {
            alert(data.error);
        }
    };


    const handleReturn = () => {
        router.push("/")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-96 bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        <button
                            onClick={handleReturn}
                            className="text-blue-600 hover:underline"
                        >
                            Return to login page
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
