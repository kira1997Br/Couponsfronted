import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Coupon.css";

export interface ICoupon {
    companyId: any;
    id: number;
    title: string;
    description: string;
    price: number;
    startDate: Date | string;
    endDate: Date | string;
    amount: number;
    imageUrl?: string;
    companyName: string;
    categoryName: string;
}

export default function Coupon(props: ICoupon) {
    const navigate = useNavigate(); // Initialize navigate

    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);

    function handleCouponClick() {
        const { id, title, description, price, companyName, categoryName, startDate, endDate, amount, imageUrl } = props;

        // Navigate to details page and pass state
        navigate(`/coupon/coupondetails/${props.id}`, {
            state: { id, title, description, price, companyName, categoryName, startDate, endDate, amount, imageUrl }
        });
    }

    return (
        <div className="coupon" onClick={handleCouponClick}>
            {props.imageUrl && (
                <img
                    src={props.imageUrl}
                    alt={props.title}
                    className="coupon-image"
                />
            )}
            <div className="coupon-details">
                <h3 className="coupon-title">{props.title}</h3>
                <p className="coupon-description">{props.description}</p>
                <p className="coupon-price">Price: ₪{props.price}</p>
            </div>
        </div>
    );
}
