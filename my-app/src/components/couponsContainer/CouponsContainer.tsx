/*import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Coupon, { ICoupon } from "../coupon/Coupon";
import "./CouponsContainer.css";

interface Category {
    id: number;
    name: string;
}

export interface ICouponContainer {
    coupons: ICoupon[];
}

export default function CouponsContainer(props: ICouponContainer) {
    const [pageNumber, setPageNumber] = useState(0);
    const couponsNumberOnPage = 3;
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const userType = useSelector((state: any) => state.userLogin.userType);
    const token = useSelector((state: any) => state.userLogin.token);

    useEffect(() => {
        getCategories();
        if (selectedCategory) {
            getCouponsByCategory(pageNumber);
        } else {
            getCoupons(pageNumber);
        }
    }, [pageNumber, selectedCategory]);

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data.content);
        } catch (e) {
            console.error(e);
        }
    };

    const getCoupons = async (pageNumber: number) => {
        try {
            let url = `http://localhost:8080/coupons?page=${pageNumber}&size=${couponsNumberOnPage}`;
            const response = await axios.get(url);
            setCoupons(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const getCouponsByCategory = async (pageNumber: number) => {
        try {
            const url = `http://localhost:8080/coupons/bycategoryname?page=${pageNumber}&size=${couponsNumberOnPage}&categoryName=${selectedCategory}`;
            const response = await axios.get(url);
            setCoupons(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setPageNumber(0);
    };

    const goToNextPage = () => {
        if (pageNumber < totalPages - 1) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleDeleteCoupon = async (couponId: number) => {
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            try {
                await axios.delete(`http://localhost:8080/coupons/admin/${couponId}`, {
                    headers: { Authorization: token },
                });
                alert("Coupon deleted successfully.");
                if (selectedCategory) {
                    getCouponsByCategory(pageNumber);
                } else {
                    getCoupons(pageNumber);
                }
            } catch (e) {
                console.error("Error deleting coupon:", e);
                alert("Failed to delete coupon.");
            }
        }
    };

    const handleUpdateCoupon = async (updatedCoupon: ICoupon) => {
        try {
            await axios.put("http://localhost:8080/coupons/byadmin", updatedCoupon, {
                headers: { Authorization: token },
            });
            alert("Coupon updated successfully!");
            if (selectedCategory) {
                getCouponsByCategory(pageNumber);
            } else {
                getCoupons(pageNumber);
            }
        } catch (error) {
            console.error("Error updating coupon:", error);
            alert("Failed to update coupon.");
        }
    };

    return (
        <div className="couponsContainer">
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            {coupons.length > 0 ? (
                coupons.map((coupon) => (
                    <div className="coupon" key={coupon.id}>
                        <Link to={`/coupon/coupondetails/${coupon.id}`} className="coupon-link">
                            <Coupon
                                id={coupon.id}
                                title={coupon.title}
                                description={coupon.description}
                                price={coupon.price}
                                startDate={coupon.startDate}
                                endDate={coupon.endDate}
                                amount={coupon.amount}
                                imageUrl={coupon.imageUrl}
                                companyName={coupon.companyName}
                                categoryName={coupon.categoryName}
                            />
                        </Link>
                        {userType === "admin" && (
                            <div className="admin-controls">
                                <button onClick={() => handleUpdateCoupon(coupon)}>Edit</button>
                                <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div>
                    <p>No Coupons available</p>
                </div>
            )}

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={pageNumber === 0}>
                    Previous
                </button>
                <span>
                    Page {pageNumber + 1} of {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={pageNumber >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}*/
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Coupon, { ICoupon } from "../coupon/Coupon";
import "./CouponsContainer.css";
import EditCouponForm from "../editCouponForm/EditCouponForm";

interface Category {
    id: number;
    name: string;
}

export interface ICouponContainer {
    coupons: ICoupon[];
}

export default function CouponsContainer(props: ICouponContainer) {
    const [pageNumber, setPageNumber] = useState(0);
    const couponsNumberOnPage = 3;
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editingCoupon, setEditingCoupon] = useState<ICoupon | null>(null); // Состояние редактирования
    const userType = useSelector((state: any) => state.userLogin.userType);
    const token = useSelector((state: any) => state.userLogin.token);
    const companyId = useSelector((state: any) => state.userLogin.companyId);

    useEffect(() => {
        getCategories();
        getCoupons(pageNumber);
    }, [pageNumber, selectedCategory]);

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data.content);
        } catch (e) {
            console.error(e);
        }
    };

    const getCoupons = async (pageNumber: number) => {
        try {
            let url = `http://localhost:8080/coupons?page=${pageNumber}&size=${couponsNumberOnPage}`;
            if (userType === "company") {
                url = `http://localhost:8080/coupons/bycompanyid?page=${pageNumber}&size=${couponsNumberOnPage}&companyId=${companyId}`;
            }
            if (selectedCategory) {
                url += `&categoryName=${selectedCategory}`;
            }
            const response = await axios.get(url, {
                headers: { Authorization: token },
            });
            setCoupons(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setPageNumber(0);
    };

    const goToNextPage = () => {
        if (pageNumber < totalPages - 1) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleDeleteCoupon = async (couponId: number) => {
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            try {
                await axios.delete(`http://localhost:8080/coupons/admin/${couponId}`, {
                    headers: { Authorization: token },
                });
                alert("Coupon deleted successfully.");
                getCoupons(pageNumber);
            } catch (e) {
                console.error("Error deleting coupon:", e);
                alert("Failed to delete coupon.");
            }
        }
    };

    const handleUpdateCoupon = async (updatedCoupon: ICoupon) => {
        debugger;
        try {
            await axios.put("http://localhost:8080/coupons/byadmin", updatedCoupon, {
                headers: { Authorization: token },
            });
            alert("Coupon updated successfully!");
            getCoupons(pageNumber);
            setEditingCoupon(null); // Закрываем форму редактирования
        } catch (error) {
            console.error("Error updating coupon:", error);
            alert("Failed to update coupon.");
        }
    };

    const handleEditCoupon = (coupon: ICoupon) => {
        setEditingCoupon(coupon); // Открываем форму редактирования
    };

    const handleCancelEdit = () => {
        setEditingCoupon(null); // Закрываем форму редактирования
    };

    return (
        <div className="couponsContainer">
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* Если редактируем купон, показываем форму редактирования */}
            {editingCoupon && (
                <EditCouponForm
                    coupon={editingCoupon}
                    onSave={handleUpdateCoupon}
                    onCancel={handleCancelEdit}
                    token={token}
                />
            )}

            {coupons.length > 0 ? (
                coupons.map((coupon) => (
                    <div className="coupon" key={coupon.id}>
                        <Link to={`/coupon/coupondetails/${coupon.id}`} className="coupon-link">
                            <Coupon
                                id={coupon.id}
                                title={coupon.title}
                                description={coupon.description}
                                price={coupon.price}
                                startDate={coupon.startDate}
                                endDate={coupon.endDate}
                                amount={coupon.amount}
                                imageUrl={coupon.imageUrl}
                                companyName={coupon.companyName}
                                categoryName={coupon.categoryName}
                                companyId={undefined}
                            />
                        </Link>
                        {/* Показываем кнопки редактирования только для администратора или компании, владельца купона */}
                        {(userType === "admin" || (userType === "company" && coupon.companyId === companyId)) && (
                            <div className="admin-controls">
                                <button onClick={() => handleEditCoupon(coupon)}>Edit</button>
                                <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div>
                    <p>No Coupons available</p>
                </div>
            )}

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={pageNumber === 0}>
                    Previous
                </button>
                <span>
                    Page {pageNumber + 1} of {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={pageNumber >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}

