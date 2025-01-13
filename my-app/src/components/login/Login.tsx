import axios from "axios";
import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import { jwtDecode } from "jwt-decode";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [username, setUserName] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [showPassword, setShowPassword] = useState<boolean>(false);

  function updateUserName(event: any): void {
    setUserName(event.target.value);
  }

  function updatePassword(event: any): void {
    setPassword(event.target.value);
  }

  
  async function login() {
   
    try {
      const response = await axios.post("http://localhost:8080/users/login", { username: username, password });
      const serverResponse = response.data;
      let token = 'Bearer ' + serverResponse;

      const cleanedToken = token.replace('Bearer ', ''); // Remove "Bearer "
      axios.defaults.headers.common['Authorization'] = token;

      // Decode the JWT token
      const decoded: any = jwtDecode(cleanedToken);

      const parsedSub = typeof decoded.sub === "string" ? JSON.parse(decoded.sub) : decoded.sub;

const userId = parsedSub.id; // Здесь измените на `id`, если это соответствует вашей структуре данных.
const userType = parsedSub.userType;
const companyId = parsedSub.companyId;

      // Update the Redux store with user login details
      dispatch({ type: ActionType.updateUserLogin, payload: { token, userId, userType, companyId } });

      console.log("Dispatched updateUserLogin:", { token, userId, userType, companyId });

      // Navigate to the home page
      navigate('/');
    }
    catch (e) {
      console.error("Login error:", e);
      alert("We were unable to connect to the system with the provided username and password");
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <input type='email' placeholder='username' onChange={updateUserName} />
      <br />
      <input type={showPassword ? "text" : "password"} placeholder='password' onChange={updatePassword} />
      <br />
      <button className='buttonLogin' onClick={login}>login</button>
    </div>
  );
}

export default Login;
