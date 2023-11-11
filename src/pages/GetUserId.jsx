import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../components/navbar/MyNavbar";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";
import { faHammer, faFile, faHome } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./getUserId.css";

function GetUserId() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const token = JSON.parse(localStorage.getItem("loggedInUser"));
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate();

  const getVideos = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/video/get`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const filteredVideos = data.videos.filter(
          (video) => video.author._id === userId
        );
        setVideos([...filteredVideos]);

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error("Errore nel recupero dei video:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users2/get/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        console.error("Errore nel recupero dei dati:", data.message);
      }
    } catch (e) {
      console.error("Errore nel recupero dei video:", e);
    }
  };

  useEffect(() => {
    getUsers();
    getVideos();
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="spinner-container bg-dark d-flex flex-column justify-content-center align-items-center text-white">
            <Spinner className="fs-5" animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p>Caricamento...</p>
          </div>
        </>
      ) : (
        <div className="text-light">
          <MyNavbar />
          <div
            className="div-container-getUserId bg-getUserId-custom"
            key="user-details-container"
          >
            <h2 className="filter-custom">Dettagli dell'utente:</h2>
            <Button
              className="px-3 border border-info filter-custom"
              variant="secondary"
              onClick={() => navigate("/home")}
            >
              <FontAwesomeIcon
                className="text-info"
                icon={faHome}
                key="home-icon"
              />
            </Button>
            {user ? (
              <>
                <form
                  className="container w-100 text-center"
                  key="user-details-form"
                >
                  <div className="row" key="user-details-row-1">
                    {/* Immagine del profilo */}
                    <div className="col-md-6" key="user-details-col-1">
                      <div className="w-100 p-2 m-2 d-flex flex-column mt-2">
                        <label
                          className="fs-4 text-info"
                          key="user-details-avatar-label"
                        >
                          Immagine profilo:
                        </label>
                        <div
                          className="w-100 d-flex flex-column align-items-center mt-4"
                          key="user-details-avatar-container"
                        >
                          <img
                            className="filter-custom border border-4"
                            width={"90%"}
                            src={user.avatar}
                            alt={`Avatar di ${user.name}`}
                            key="user-avatar"
                          />
                        </div>
                      </div>
                    </div>

                    {/* immagine doc */}
                    <div className="col-md-6" key="user-details-col-2">
                      <div key={user._id}>
                        {user.doc && (
                          <div className="mb-3" key="user-doc-container">
                            <label
                              className="fs-4 text-info"
                              key="user-details-doc-title"
                            >
                              I tuoi documenti (fai uno screenShot):
                            </label>
                            <img
                              className="mt-3 filter-custom doc-custom-byId"
                              alt="document"
                              src={user.doc}
                              key="user-doc-image"
                            ></img>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row" key="user-details-row-2">
                    {/* Nome */}
                    <div className="col-md-6" key="user-details-name-col">
                      <div className="w-100 p-2 d-flex flex-column text-center filter-custom">
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="user-details-name-label"
                        >
                          Nome:
                        </label>
                        <input
                          className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="text"
                          name="name"
                          value={user.name}
                          readOnly
                          key="user-name-input"
                        />
                      </div>
                    </div>
                    {/* Cognome */}
                    <div className="col-md-6" key="user-details-lastName-col">
                      <div
                        className="d-flex filter-custom"
                        key="user-details-cognome-div"
                      >
                        <div
                          className="w-100 p-2 d-flex flex-column"
                          key="user-details-cognome-column"
                        >
                          <label
                            className="text-center text-dark bg-info rounded-top-3"
                            key="user-details-name-label"
                          >
                            Cognome:
                          </label>
                          <input
                            className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            readOnly
                            key="user-lastName-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row" key="user-details-row-3">
                    {/* Email */}
                    <div className="col-md-6" key="user-details-email-col">
                      <div
                        className="w-100 p-2 d-flex flex-column filter-custom"
                        key="user-details-email-div"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="user-details-name-label"
                        >
                          Email:
                        </label>
                        <input
                          className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="email"
                          name="email"
                          value={user.email}
                          readOnly
                          key="user-email-input"
                        />
                      </div>
                    </div>
                    {/* Indirizzo  */}
                    <div className="col-md-6" key="user-details-address-col">
                      <div
                        className="w-100 p-2 d-flex flex-column filter-custom"
                        key="user-details-address-div"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="user-details-name-label"
                        >
                          Indirizzo:
                        </label>{" "}
                        <input
                          className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="text"
                          name="address"
                          value={user.address}
                          readOnly
                          key="user-address-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row" key="user-details-row-4">

                    {/* Data di Nascita */}
                    <div className="col-md-6" key="user-form-address-col">
                      <div
                        className="p-2 d-flex flex-column filter-custom"
                        key="dob-container"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="dob-label"
                        >
                          Data di nascita:
                        </label>
                        <DatePicker
                          className="z-index-custom bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2 w-100 text-center"
                          selected={user.dob ? new Date(user.dob) : null}
                          key="dob-input"
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>

                    {/* provincia */}
                    <div className="col-md-6" key="user-details-provincia-col">
                      <div
                        className="w-100 p-2 d-flex flex-column filter-custom"
                        key="user-details-provincia-div"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="user-details-provincia-label"
                        >
                          Provincia:
                        </label>{" "}
                        <input
                          className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="text"
                          name="provincia"
                          value={user.provincia}
                          readOnly
                          key="user-provincia-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row" key="user-details-row-444">
                    {/* work */}
                    <div className="col-md-6" key="user-details-work-col">
                      <div
                        className="w-100 p-2 d-flex flex-column filter-custom"
                        key="user-details-work-div"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="user-details-work-label"
                        >
                          Lavoro:
                        </label>{" "}
                        <input
                          className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="text"
                          name="work"
                          value={user.work}
                          readOnly
                          key="user-work-input"
                        />
                      </div>
                    </div>
                    {/* gender */}
                    <div className="col-md-6" key="user-details-gender-col">
                      <div
                        className="w-100 p-2 d-flex flex-column filter-custom"
                        key="user-details-gender-div"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="user-details-gender-label"
                        >
                          Sesso:
                        </label>{" "}
                        <input
                          className="text-center bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="text"
                          name="gender"
                          value={user.gender}
                          readOnly
                          key="user-gender-input"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <h4
                  className="filter-custom title-videos-from"
                  key="user-videos-title"
                >
                  i video di
                  <i className="ms-2" key="user-videos-username">
                    <b>
                      {user.name} {user.lastName}
                    </b>
                  </i>{" "}
                  :
                </h4>

                {videos.map((video) => (
                  <div className="row" key={video._id}>
                    <div className="col-3 col-md-0" key="video-col-1"></div>
                    <div
                      className="col-12 col-md-6 mb-4 border border-dark border-4 filter-custom p-3 bg-light rounded-3 text-dark"
                      key={`video-${video._id}`}
                    >
                      <div className="w-100" key={`video-details-${video._id}`}>
                        <div
                          className="dettails-post mb-3"
                          key={`video-post-details-${video._id}`}
                        >
                          <video
                            className="rounded-3 border border-dark border-4"
                            controls
                            width="100%"
                            height="315"
                            src={video.video}
                            key={`video-source-${video._id}`}
                          ></video>
                          <div key={`video-details-${video._id}`}>
                            <h4 key={`video-title-${video._id}`}>
                              {video.title}
                            </h4>
                            <p
                              className="m-0"
                              key={`video-category-${video._id}`}
                            >
                              <FontAwesomeIcon
                                className="mx-2 text-info"
                                icon={faHammer}
                                key={`video-category-icon-${video._id}`}
                              />
                              <span
                                className="wrap-text"
                                key={`video-category-text-${video._id}`}
                              >
                                {video.categoryWork}
                              </span>
                            </p>
                            <p
                              className="m-0 mb-3"
                              key={`video-content-${video._id}`}
                            >
                              <FontAwesomeIcon
                                className="mx-2 text-info"
                                icon={faFile}
                                key={`video-content-icon-${video._id}`}
                              />
                              <span
                                className="wrap-text"
                                key={`video-content-text-${video._id}`}
                              >
                                {video.content}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 col-md-0" key="video-col-2"></div>
                  </div>
                ))}
              </>
            ) : (
              <p key="loading-text">Caricamento in corso...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GetUserId;
