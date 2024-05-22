import { Link, NavLink } from "react-router-dom";
import "./Header.styles.css";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className="header">
      <div className="header__Container">
        {/* Logo */}
        <Link to="/" className="header__Left">
          <img src="./logo.png" />
        </Link>
        {/* SearchBar */}
        <form className="header__SearchBar">
          <input type="text" placeholder="Search here...." />
          <IoSearch
            style={{ color: "#000", fontSize: "2rem", }}
          />
        </form>
        {/* Navbar */}
        <nav>
          <ul>
            <NavLink
              to={"/"}
              style={({ isActive }) => ({
                color: isActive ? "#FCC200" : "#848482",
              })}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/about"}
              style={({ isActive }) => ({
                color: isActive ? "#FCC200" : "#848482",
              })}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/projects"}
              style={({ isActive }) => ({
                color: isActive ? "#FCC200" : "#848482",
              })}
            >
              <li>Projects</li>
            </NavLink>
          </ul>
        </nav>
        {/* Sign In Button */}
        <div className="header__Right">
          <Link to="/sign-in">
            <button>SignIn</button>
          </Link>
        </div>
        {/* Responsive Menu Icon */}
        <div className="header__responsiveIcon">
          <GiHamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
