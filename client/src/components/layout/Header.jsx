import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {message} from 'antd'

const Header = () => {
  const [loginUser, setloginUser] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setloginUser(user);
    }
  }, []);
  const logoutHandler=()=>{
    localStorage.removeItem('user')
    message.success('Logout successfully')
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Expense Management
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
            {" "}
              <p>{loginUser && loginUser.name}</p>{" "}
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
