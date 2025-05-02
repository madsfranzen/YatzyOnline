import React, { useRef } from 'react';
import bcrypt from 'bcryptjs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const passwordEncrypt = () => {
    const userNameRef = useRef();
    const passwordRef = useRef();

    const signUpForm = async (e) => {
        e.preventDefault();
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;

        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            // Save user to the database
            const response = await fetch(`${BACKEND_URL}/api/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, password: hashedPassword }),
            });

            if (response.ok) {
                console.log('User saved successfully');
            } else {
                console.error('Error saving user:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const loginForm = async (e) => {
        e.preventDefault();
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;

        try {
            // Retrieve user from the database
            const response = await fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
            } else {
                console.error('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="loginSystem">
            <form>
                <input type="text" placeholder="Username" ref={userNameRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button type="submit" onClick={(e) => signUpForm(e)}>Sign Up</button>
                <button type="button" onClick={(e) => loginForm(e)}>Login</button>
            </form>
        </div>
    );
};

export default passwordEncrypt;