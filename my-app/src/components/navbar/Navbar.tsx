import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ActionType } from '../../redux/ActionType';

export default function Navbar() {
  const userLogin = useSelector((state: any) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Очищаем store
    dispatch({ type: ActionType.logout });
    alert("Logged out successfully!");
    navigate('/'); // Перенаправляем на главную
  };

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/" className="header">
          Best choice for your pet
        </Link>
        <img src="/logo.png" alt="Pet Shop Logo" />
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {userLogin?.token ? (
          // Если пользователь авторизован, показываем Log Out
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        ) : (
          // Если пользователь не авторизован, показываем Login и Register
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
