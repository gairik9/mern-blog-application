import { GoogleIcon, sideImageLogin } from "../../assets/images";
import "./Login.styles.css";
import { Link } from "react-router-dom";

const Login = () => {
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
          <form>
            <input type="text" id="username" placeholder="Username" />
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Pasword" />
            <button>SignIn</button>
            <button>
              <img src={GoogleIcon} alt="google-icon" />
              <span>GOOGLE</span>
            </button>
          </form>
          <div className="login__ExistingMember">
            <p>
              Not a member?{" "}
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
