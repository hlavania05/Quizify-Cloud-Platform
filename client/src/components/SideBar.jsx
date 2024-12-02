import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'; 

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/manage_users">Manage Users</Link>
                </li>
                <li>
                    <Link to="/manage_quizzes">Manage Quizzes</Link>
                </li>
                <li>
                    <Link to="/userResultDetails">Users Results</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact"> Contact Us </Link>
                </li>
            </ul>
        </div>
    );
};

