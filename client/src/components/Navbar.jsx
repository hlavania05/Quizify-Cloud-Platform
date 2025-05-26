import { NavLink } from "react-router-dom";
import "../components/Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Quizify</NavLink>
          </div>
          <nav>
            <ul>
              {isLoggedIn ? (
                isAdmin ? (
                  <>
                    <li>
                      <NavLink to="/logout"> Logout </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to="/Portal"> Home </NavLink>
                    </li>
                    <li>
                      <NavLink to="/results"> Check Results </NavLink>
                    </li>
                    <li>
                      <NavLink to="/about"> About </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact"> Contact Us </NavLink>
                    </li>
                    <li>
                      <NavLink to="/logout"> Logout </NavLink>
                    </li>
                  </>
                )
              ) : (
                <>
                  <li>
                    <NavLink to="/"> Home </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about"> About </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact"> Contact Us </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
