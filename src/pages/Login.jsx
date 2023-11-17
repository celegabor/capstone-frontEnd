import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Video from "../video/video.mp4";
import "./login.css";

function Login() {
  const [loginData, setLoginData] = useState({});
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(loginData),
        }
      );
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate("/home");
      } else {
        setMessage("Credenziali NON valide, ricontrolla email e password..");
        setTimeout(() => {
          setMessage("");
        }, 25000);
      }

      setLogin(data);
    } catch (e) {
      console.log(e);
    }
  };

  const redirectHandlerGitHub = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };
  const redirectHandlerGoogle = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/google`;
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setVideoStarted(true);
    localStorage.removeItem('loggedInUser');
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <>
      <div className="body d-flex flex-column align-items-center justify-content-center bg-dark border-top border-bottom border-2 border-info text-light w-100">
        <div className="z-index-custom d-flex justify-content-start w-100 ms-5">
          <Button
            variant="dark"
            className="border border-info text-info z-indez-custom"
            onClick={() => navigate("/")}
          >
            Torna indietro
          </Button>
        </div>
        <form
          onSubmit={onSubmit}
          className="z-3 form-login bg-form-custom border border-3 border-secondary d-flex flex-column p-md-5 rounded-5"
        >
          <label htmlFor="email">Inserisci la tua Email</label>
          <input
            className="p-1 rounded-2 border border-info border-2"
            type="email"
            name="email"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="password" className="mt-2 mt-md-3">
            Inserisci la tua Password
          </label>
          <input
            className="p-1 rounded-2 border border-info border-2"
            type="password"
            name="password"
            required
            onChange={handleInputChange}
          />

          <div className="d-flex justify-content-center">
            <Button
              className="w-50 mt-4 bg-dark text-light rounded-4 border border-info"
              type="submit"
            >
              Accedi
            </Button>
          </div>
          <div className="message-container w-100 text-center text-white">
            {message && (
              <div
                className={
                  message.includes("NON")
                    ? "message-alert-login"
                    : "message-login"
                }
              >
                {message}
              </div>
            )}
          </div>
        </form>

        <video
          className="video"
          ref={videoRef}
          onEnded={handleVideoEnded}
          src={Video}
          autoPlay
          muted={true}
        ></video>
        <div className="filter-video border-top border-bottom border-3 border-secondary"></div>
        <div className="mt-2 mt-md-2 w-100 text-center z-3">
          <Button
            className="border border-info border-1 text-light p-2 rounded-3 mt-3 px-5"
            variant="dark"
            onClick={() => {
              navigate("/addUser");
            }}
          >
            Crea Profilo
          </Button>
        </div>
        <div className="d-flex flex-column flex-md-row mt-3 mt-md-4">
          {!showPopup && (
            <div className="d-flex flex-column">
              <p className="z-index-custom text-center">oppure</p>

              <Button
                onClick={openPopup}
                className="mt-0 custom-login z-2 bg-dark border border-secondary text-white border border-info"
              >
                Login-Guest with GitHub/Google
              </Button>
            </div>
          )}

          {showPopup && (
            <div className="popup z-index-custom" ref={popupRef}>
              <div className="popup-content d-flex flex-column">
                {/* Bottone per l'accesso con GitHub */}
                <Button
                  onClick={redirectHandlerGitHub}
                  className="custom-login mx-4 z-2 bg-dark border border-info text-white"
                >
                  <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="logo GitHub"
                  />
                  Login with GitHub
                </Button>

                {/* Bottone per l'accesso con Google */}
                <Button
                  onClick={redirectHandlerGoogle}
                  className="border custom-login mx-4 z-2 bg-dark border-info text-white"
                >
                  <img
                    src="https://img.freepik.com/free-icon/google_318-258888.jpg?w=2000"
                    alt="logo Google"
                  />
                  Login with Google
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
