import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/auth.service";
import "./index.scss";

export const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); // 清空local storage
    window.alert("登出成功!。");
    setCurrentUser(null);
  };

  return (
    <div className="navigation col-md-2">
      <ul className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-100">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Gamania</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {!currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/">
                會員登入
              </Link>
            </li>
          )}
          {!currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                註冊會員
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item text-white">
              <Link onClick={handleLogout} className="nav-link" to="/">
                登出
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item text-white">
              <Link className="nav-link" to="/profile">
                個人資訊
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item text-white">
              <Link className="nav-link" to="/course">
                薪資
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item text-white">
              <Link className="nav-link" to="/discuss">
                討論區
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item text-white">
              <Link className="nav-link" to="/enroll">
                線上投票、問卷
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item text-white">
              <Link className="nav-link" to="/leave">
                請假加班
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item text-white">
              <Link className="nav-link" to="/vote">
                線上投票、問卷
              </Link>
            </li>
          )}
        </ul>
        <hr />
        <div className="dropdown">
          <a
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {currentUser ? (
              <img
                src={currentUser.user.profileImage}
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: "30px" }}
              />
            )}
            <strong>{currentUser && currentUser.user.fullname}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item">New project...</a>
            </li>
            <li>
              <a className="dropdown-item">Settings</a>
            </li>
            <li>
              <a className="dropdown-item">Profile</a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item">Sign out</a>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};
