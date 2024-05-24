/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import "./Header.styles.css";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { headerAltImage } from "../../assets/images";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
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
          <IoSearch style={{ color: "#facc15", fontSize: "2rem" }} />
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
          {currentUser ? (
            <div className="user__details">
              {/* <div className="user__detail">
                <img src={currentUser.profilePicture || headerAltImage}/>
                <h1>{currentUser.email}</h1>
              </div>
              <button>Logout</button> */}
              {/* <span>More</span> */}
              <FlyoutLink href="#" FlyoutContent={DropdownContent} currentUser={currentUser}>
                More
              </FlyoutLink>
            </div>
          ) : (
            <Link to="/sign-in">
              <button>SignIn</button>
            </Link>
          )}
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

const FlyoutLink = ({ children, href, FlyoutContent,currentUser }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = open && FlyoutContent;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative h-fit w-fit"
    >
      {/* Main Link */}
      <a href={href} className="relative text-white text-[1.6rem]">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="cursor-pointer absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-yellow-400 transition-transform duration-300 ease-out"
        />
      </a>
      {/* Dropdown */}
      {showFlyout && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="absolute top-12 bg-[#3d3c3c] rounded-[0.5rem]"
          style={{
            right: '-30px',
            transform: 'translateX(0)', 
          }}
        >
          <div className="absolute -top-6 left-0 right-0 h-6" />
          <div className="absolute right-16 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#3d3c3c]" />
          <FlyoutContent currentUser={currentUser} />
        </motion.div>
      )}
    </div>
  );
};

const DropdownContent = ({currentUser}) => {
  return (
    <div className="dropdowncontent">
      <div className="dropdowncontent__Main">
        <img src={currentUser.profilePicture || headerAltImage} alt="" />
        <div><MdEmail/> <span>{currentUser.email}</span></div>
        <div><FaUser/> <span>{currentUser.username}</span></div>
        <button>Logout</button>
      </div>
    </div>
  );
};
