import { useState } from "react";
import { sideImageLogin } from "../../assets/images";
import "./Login.styles.css";
import { Link, useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { OAuthButton } from "../../components";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All Fields Are Required!"));
    }

    try {
      dispatch(signInStart());
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <main className="login">
      <div className="login__Container">
        <div className="login__Left">
          <div className="login__LeftTop">
            <h1>
              Welcome to <span>MicroBlog</span>
            </h1>
            <p>
              - &ldquo;Discover big ideas in bite-sized posts at Microblog –
              where every word counts!&ldquo;
            </p>
          </div>
          <div className="login__LeftBottom">
            <img src={sideImageLogin} alt="side-image" />
          </div>
        </div>
        <div className="login__Right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">{loading ? "Loading..." : "SignIn"}</button>
            <OAuthButton className="OAuth__Button" />
          </form>
          {errorMessage && (
            <div className="login__ErrorMessage">{errorMessage}</div>
          )}
          <div className="login__ExistingMember">
            <p>
              Not a member?
              <Link to="/sign-up">
                <span>SignUp</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
