import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

export default function SignUp() {
    function onUsernameChange(event: any): void {
        setUsername(event.target.value);
    };
    function onPasswordChange(event: any): void {
        setPassword(event.target.value);
    };
    function onNameChange(event: any): void {
        setName(event.target.value);
    };
    function onAddressChange(event: any): void {
        setAddress(event.target.value);
    };
    function onPhoneChange(event: any): void {
        setPhone(event.target.value);
    };


    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [name, setName] = useState("");
    let [address, setAddress] = useState("");
    let [phone, setPhone] = useState("");

    const userType = "customer";

    async function onSignUpClicked() {
        try {
            const user = { username, password, userType };
            const response = await axios.post("http://localhost:8080/customers", { name, address, phone, user });
            const serverResponse = response.data;
            console.log(serverResponse);
            alert("WELCOME");
        }
        catch (e) {
            console.log(e);
            alert("Error signing up. Please try again");
        }

    }

    return (
        <div className="signUp-container">
            <h2>Sign up !</h2>
            <p>Create an account to get started!</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    placeholder=""
                    onChange={onNameChange}
                />

                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    placeholder=""
                    onChange={onAddressChange}
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    placeholder=""
                    onChange={onPhoneChange}
                />

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder=""
                    onChange={onUsernameChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder=""
                    onChange={onPasswordChange}
                />

                <button type="button" onClick={onSignUpClicked}>
                    Sign Up
                </button>
            </form>
            <div className="footer">
                <p>
                    Already have an account? <a href="/login">Log in here</a>
                </p>
            </div>
        </div>
    );

}
