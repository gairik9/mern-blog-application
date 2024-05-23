import { useState } from "react";
import { GoogleIcon, sideImage } from "../../assets/images";
import "./Register.styles.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All Fields Are Required!");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);

      if (response.ok) {
        navigate("/sign-in");
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="register">
      <div className="register__Container">
        <div className="register__Left">
          <div className="register__LeftTop">
            <h1>
              Welcome to <span>MicroBlog</span>
            </h1>
            <p>
              - &ldquo;Discover big ideas in bite-sized posts at Microblog –
              where every word counts!&ldquo;
            </p>
          </div>
          <div className="register__LeftBottom">
            <img src={sideImage} alt="side-image" />
          </div>
        </div>
        <div className="register__Right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Pasword"
              onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "SignUp"}
            </button>
            <button type="button">
              <img src={GoogleIcon} alt="google-icon" />
              <span>GOOGLE</span>
            </button>
          </form>
          {errorMessage ? (
            <div className="register__ErrorMessage">{errorMessage}</div>
          ) : (
            ""
          )}
          <div className="register__ExistingMember">
            <p>
              Already a member?{" "}
              <Link to="/sign-in">
                <span>SignIn</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
