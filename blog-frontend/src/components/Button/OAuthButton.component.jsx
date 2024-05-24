/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../assets/images";
import { app } from "../../firebase";
import { signInSuccess } from "../../redux/user/userSlice";
import "./OAuthButton.styles.css";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";

const OAuthButton = ({ className }) => {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);

      const response = await fetch("api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={className} onClick={handleGoogleClick}>
      <img src={GoogleIcon} alt="googleIcon" />
      <span>GOOGLE</span>
    </button>
  );
};

export default OAuthButton;
