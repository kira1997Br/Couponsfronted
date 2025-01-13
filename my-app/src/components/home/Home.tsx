import React from "react";
import { Navigate } from "react-router-dom";
import CouponsContainer from "../couponsContainer/CouponsContainer";

export default function Home() {
    return (
        <div>
          <h1>Welcome to "Pet choice" shop!</h1>
          <p>Here are all the available coupons of any category :)</p>
          {/* Include the CouponsContainer component */}
          <CouponsContainer coupons={[]} />
        </div>
      );
}