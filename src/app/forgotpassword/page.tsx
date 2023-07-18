'use client'

import { sendEmail } from '@/helpers/mailer';
import React, { useState, useEffect} from 'react';
import axios from 'axios';


export default function forgottenPasword() {
    const [email, setEmail] = React.useState("")
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        if(email.length > 0) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true)
        }
      },[email])
 
      const emailConfirm = async() => {
        try {
            await axios.post('/api/users/forgotpassword', {email})
            console.log('email sent')

            setEmail('')
            
        } catch(error: any) {
            //Change error to toast once done
            setError(true)
            console.log(error.response.data)
        }
      }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Enter email to reset password</h1>
            
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                id="email"
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
            />

            <button 
                onClick={emailConfirm}
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >
            {buttonDisabled ? "Enter Email" : "Send reset link"}
            </button>

            
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}

        </div>
    )
}