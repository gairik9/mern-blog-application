import { Link } from "react-router-dom";
import "./Header.styles.css";
import { CiSearch } from "react-icons/ci";

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
          <CiSearch
            style={{ color: "#000", fontSize: "1.5rem", fontWeight: "bold" }}
          />
        </form>
        {/* Navbar */}
        <nav>
          <ul>
            <Link to={'/'}>
              <li>Home</li>
            </Link>
            <Link to={'/about'}>
              <li>About</li>
            </Link>
            <Link to={'/projects'}>
              <li>Projects</li>
            </Link>
          </ul>
        </nav>
        {/* Sign In Button */}
        <div className="header__Right">
          <Link to="/sign-in">
            <button>SignIn</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
