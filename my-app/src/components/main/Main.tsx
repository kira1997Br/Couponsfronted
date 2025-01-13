/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../header/Header";
import Login from "../login/Login";
import About from "../about/About";
import Register from "../signUp/SignUp";
import Home from "../home/Home";
import Coupon from "../coupon/Coupon";
import CouponsContainer from "../couponsContainer/CouponsContainer";
import SingleCoupon from "../singleCoupon/SingleCoupon";
import SignUp from "../signUp/SignUp";



function Main(){
   
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/coupon" element={<Coupon id={0} title={""} description={""} price={0} startDate={""} endDate={""} amount={0} companyName={""} categoryName={""} />} /> 
            <Route path="/couponsContainer" element={<CouponsContainer coupons={[]} />} />
            <Route path="/coupon/coupondetails/:id" element={<SingleCoupon />} />

          </Routes>
      
      </Router>
    )
}
export default Main;*/


import React from "react";
import Home from "../home/Home";
import { Routes, Route } from "react-router-dom";

import About from "../about/About";

import Coupon from "../coupon/Coupon";
import SingleCoupon from "../singleCoupon/SingleCoupon";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import CouponsContainer from "../couponsContainer/CouponsContainer";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/coupon" element={<Coupon id={0} title={""} description={""} price={0} startDate={""} endDate={""} amount={0} companyName={""} categoryName={""} imageUrl={""} companyId={undefined} />} />
            <Route path="/couponsContainer" element={<CouponsContainer coupons={[]} />} />
            <Route path="/coupon/coupondetails/:id" element={<SingleCoupon />} />
        </Routes>
    );
}