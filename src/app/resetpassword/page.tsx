"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] =useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState('');


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
      }, []);


    const changePassword = async (e: any) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        const loadingToastId = toast.loading("Processing...");

        try {
            const response = await axios.patch('/api/users/resetpassword', {token, password})
            toast.success(response.data.message);

            router.push('/login')
            
        } catch(error: any) {
            toast.error(error.response.data.message);
        }

        toast.dismiss(loadingToastId);
    }



      

      return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Reset Password</h1>
            <div className="mb-8">
                <input
                    className="text-black w-full py-2 px-4 border border-gray-300 rounded"
                    type="password"
                    id="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-8">
                <input
                    className="text-black w-full py-2 px-4 border border-gray-300 rounded"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={changePassword}
                >
                    Reset
                </button>   

            <Toaster/>
        </div>
      )
}