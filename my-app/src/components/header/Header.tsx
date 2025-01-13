import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import { ActionType } from '../../redux/ActionType';

export default function Header() {
  // Получаем состояние пользователя из Redux
  const userLogin = useSelector((state: any) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Обработчик для выхода
  const handleLogout = () => {
    dispatch({
      type: ActionType.logout,
    });

    // Перенаправляем пользователя на главную страницу
    navigate('/');
  };

  console.log("Current userLogin in Header:", userLogin);

  return (
    <header className='header'>
      <div className="logo">
        <img src="/logo.png" alt="Pet Shop Logo" />
        <h1>Pet Choice</h1>
      </div>

      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>

          {/* Условное отображение кнопок Login/Logout */}
          {userLogin?.token ? (
            <>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/signup">SignUp</Link></li>
            </>
          )}

          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
