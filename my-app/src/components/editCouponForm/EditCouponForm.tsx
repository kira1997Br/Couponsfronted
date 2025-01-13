import React, { useState, useEffect } from "react";
import { ICoupon } from "../coupon/Coupon";
import axios from "axios";

interface EditCouponFormProps {
    coupon: ICoupon;
    onSave: (updatedCoupon: ICoupon) => void;
    onCancel: () => void;
    token: string;
}

const EditCouponForm: React.FC<EditCouponFormProps> = ({ coupon, onSave, onCancel, token }) => {
    const [editedCoupon, setEditedCoupon] = useState<ICoupon>(coupon);

    useEffect(() => {
        setEditedCoupon(coupon);
    }, [coupon]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedCoupon((prevCoupon) => ({
            ...prevCoupon,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Отправляем обновленные данные на сервер
            await axios.put("http://localhost:8080/coupons/byadmin", editedCoupon, {
                headers: { Authorization: token },
            });
            onSave(editedCoupon); // Вызываем onSave после успешного обновления
        } catch (error) {
            console.error("Error updating coupon:", error);
            alert("Failed to update coupon.");
        }
    };

    return (
        <div className="editCouponForm">
            <h3>Edit Coupon</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={editedCoupon.title}
                    onChange={handleChange}
                />
                <label>Description</label>
                <textarea
                    name="description"
                    value={editedCoupon.description}
                    onChange={handleChange}
                />
                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={editedCoupon.amount}
                    onChange={handleChange}
                />
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={editedCoupon.price}
                    onChange={handleChange}
                />
                <label>Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={editedCoupon.startDate ? editedCoupon.startDate.toString().split('T')[0] : ''}
                    onChange={handleChange}
                />
                <label>End Date</label>
                <input
                    type="date"
                    name="endDate"
                    value={editedCoupon.endDate ? editedCoupon.endDate.toString().split('T')[0] : ''} // Преобразование в строку формата "yyyy-mm-dd"
                    onChange={handleChange}
                />

                <label>Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={editedCoupon.imageUrl}
                    onChange={handleChange}
                />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditCouponForm;
