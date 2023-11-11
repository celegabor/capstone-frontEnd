import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyNavbar from "../components/navbar/MyNavbar";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Spinner from "react-bootstrap/Spinner";
import { faHammer, faFile, faHome } from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./user.css";

function User() {
  const token = localStorage.getItem("loggedInUser");
  const token2 = JSON.parse(localStorage.getItem("loggedInUser"));
  const decodedToken = jwtDecode(token);

  const [users, setUsers] = useState([]);
  const [userFormData, setUserFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    dob: new Date(),
    address: "",
    provincia: "",
    cap: "",
    avatar: "",
    doc: "",
    gender: "",
    work: "",
  });
  console.log(userFormData);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileDoc, setFileDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updateCredential, setUpdateCredential] = useState({
    userId: decodedToken.id,
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const categories = [
    "cuoco",
    "insegnante",
    "infermiere",
    "programmatore",
    "avvocato",
    "elettricista",
    "idraulico",
    "barista",
    "autista",
    "architetto",
    "muratore",
    "giornalista",
    "artista",
    "pompiere",
    "commerciante",
    "personal trainer",
    "medico",
    "ingegnere",
    "psicologo",
    "agricoltore",
    "falegname",
    "altro...",
  ];

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const getVideos = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/video/get`,
        {
          headers: {
            Authorization: token2,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const filteredVideos = data.videos.filter(
          (video) => video.author._id === decodedToken.id
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
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users2/get`,
        {
          headers: {
            Authorization: token2,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user) => user._id === decodedToken.id
        );
        setUsers([...filteredUsers]);
      } else {
        console.error("Errore nella richiesta GET:", response.status);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    getUsers();
    getVideos();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const currentUser = users.find((user) => user._id === decodedToken.id);

      if (currentUser) {
        setUserFormData({
          name: currentUser.name,
          lastName: currentUser.lastName,
          email: currentUser.email,
          dob: currentUser.dob,
          address: currentUser.address,
          avatar: currentUser.avatar,
          provincia: currentUser.provincia,
          cap: currentUser.cap,
          gender: currentUser.gender,
          work: currentUser.work,
        });
      }
    }
  }, [users, decodedToken.id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFileDoc = async (img) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("doc", img);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users2/post/docUpload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Errore durante il caricamento dell'avatar.");
      }
    } catch (e) {
      console.error("Errore durante il caricamento dell'avatar:", e);
      throw e;
    }
  };

  const uploadFile = async (img) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", img);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users2/post/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Errore durante il caricamento dell'avatar.");
      }
    } catch (e) {
      console.error("Errore durante il caricamento dell'avatar:", e);
      throw e;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedData = {
      ...userFormData,
      categoryWork: selectedCategory,
      dob: new Date(userFormData.dob),
    };

    if (file || fileDoc || updatedData) {
      try {
        if (file) {
          const uploadAvatar = await uploadFile(file);
          updatedData.avatar = uploadAvatar.avatar;
        }

        if (fileDoc) {
          const uploadDoc = await uploadFileDoc(fileDoc);
          updatedData.doc = uploadDoc.docUrl;
        }

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/users2/put/${decodedToken.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        if (response.ok) {
          setUserFormData({
            name: "",
            lastName: "",
            email: "",
            dob: "",
            address: "",
            provincia: "",
            cap: "",
            avatar: "",
            doc: "",
            gender: "",
            work: "",
          });
          setTimeout(() => {
            setMessage("Complimenti!!! Utente MODIFICATO correttamente !!!!");
          }, 400);
          setTimeout(() => {
            setMessage("");
            setIsSuccessful(true);
            navigate("/home");
          }, 1500);
        } else {
          setMessage(
            "Mi dispiace.... L'aggiornamento NON è andato a buon fine !!!!!"
          );
          setTimeout(() => {
            setMessage("");
            setIsSuccessful(true);
          }, 3000);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Errore durante l'aggiornamento:", error);
        setMessage(
          "Mi dispiace.... L'aggiornamento NON è andato a buon fine !!!!!"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
      }
    }
  };

  const deleteVideo = async (videoId) => {
    setShowDeleteConfirmation(true);
    setIsLoading(true);

    try {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/video/delete/${videoId}`,
        {
          method: "DELETE",
        }
      );

      setMessage("Complimenti!!! Il cancellamento è andato a buon fine !!!!!");
      setTimeout(() => {
        setMessage("");
      }, 2500);

      getVideos();

      console.log("cancellato");
    } catch (error) {
      setMessage(
        "Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!",
        error
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);

      console.error("Errore nella cancellazione del video:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const handleDocUpload = (e) => {
    const docFile = e.target.files[0];
    setFileDoc(docFile);
  };

  const handlePageChangeUp = (e) => {
    e.preventDefault();
    setPageNumber(pageNumber + 1);
  };

  const handlePageChangeDown = (e) => {
    e.preventDefault();
    setPageNumber(pageNumber - 1);
  };

  const handleChangeCredentials = async (e) => {
    e.preventDefault();

    try {
      if (
        updateCredential.newPassword === updateCredential.confirmNewPassword
      ) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/update`,
          {
            method: "POST",
            headers: {
              Authorization: token2,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateCredential),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUserFormData({
            name: "",
            lastName: "",
            email: "",
            dob: "",
            address: "",
            provincia: "",
            cap: "",
            avatar: "",
            doc: "",
            gender: "",
            work: "",
          });
          setUpdateCredential({
            newPassword: "",
            email: "",
          });
          setMessage(
            "Complimenti!!! CREDENZIALI MODIFICATE correttamente !!!!"
          );
          setTimeout(() => {
            setMessage("");
            setIsSuccessful(true);
            navigate("/home");
          }, 1500);
        } else {
          setMessage(
            "Mi dispiace.... L'aggiornamento NON è andato a buon fine !!!!!"
          );
          setTimeout(() => {
            setMessage("");
            setIsSuccessful(true);
          }, 3000);
        }
      } else {
        setMessage("Password e Conferma-Password NON coincidono!!");

        setTimeout(() => {
          setMessage("");
        }, 1500);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Errore durante l'aggiornamento:", error);
      setMessage(
        "Mi dispiace.... L'aggiornamento NON è andato a buon fine !!!!!"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          className="spinner-container bg-dark d-flex flex-column justify-content-center align-items-center text-white"
          key="spinner-container"
        >
          <Spinner
            className="fs-5"
            animation="border"
            role="status"
            key="spinner"
          >
            <span className="sr-only" key="spinner-text"></span>
          </Spinner>
          <p key="loading-text">Caricamento...</p>
          <p className="mt-2" key="loading-wait-text">
            ..attendi qualche secondo!
          </p>
        </div>
      ) : isSuccessful ? (
        <Navigate to="/home" key="success-navigation" />
      ) : (
        <>
          <MyNavbar />
          <div
            className="overflow-x-hidden bg-user-custom text-light container-user-put"
            key={decodedToken.lastName}
          >
            <h2 className="p-3 filter-custom" key="user-info-title">
              Informazioni sull'utente:
            </h2>
            <Button
              className="px-3 border border-info filter-custom"
              variant="secondary"
              onClick={() => navigate("/home")}
              key="home-button"
            >
              <FontAwesomeIcon
                className="text-info"
                icon={faHome}
                key="home-icon"
              />
            </Button>

            {/* form dati utente */}
            <form className="w-100 text-center form-user-put" key="user-form">
              <div className="container" key="user-form-container">
                <div className="row" key="user-form-row-1">
                  <div className="col-md-6" key="user-form-col-1">
                    {/* Immagine profilo */}
                    <div
                      className="w-100 p-2 m-2 d-flex flex-column"
                      key="user-avatar-container"
                    >
                      <label className="fs-4 text-info" key="avatar-label">
                        Immagine profilo:
                      </label>
                      <div
                        className="w-100 d-flex flex-column align-items-center mt-4 filter-custom"
                        key="avatar-input-container"
                      >
                        {file ? (
                          <img
                            className="border border-4"
                            width="90%"
                            src={URL.createObjectURL(file)}
                            alt="documento"
                            key="avatar-image"
                          />
                        ) : (
                          <img
                            className="border border-4"
                            width={"90%"}
                            src={users.map((user) => user.avatar)}
                            alt="immagine profilo"
                            key="avatar-image-default"
                          />
                        )}
                        <div
                          className="w-100 p-2 d-flex flex-column text-center"
                          key="avatar-details"
                        >
                          <label
                            className="filter-custom text-center text-dark bg-info rounded-top-3"
                            key="avatar-details-name-label"
                          >
                            Carica la tua immagine
                          </label>
                          <input
                            className="filter-custom bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                            type="file"
                            name="avatar"
                            onChange={onChangeSetFile}
                            key="avatar-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* caricamento immagini "doc" */}
                  <div className="col-md-6 uploadDoc" key="user-form-col-2">
                    <div
                      className="w-100 p-2 m-2 d-flex flex-column align-items-center"
                      key="doc-container"
                    >
                      <label className="text-info fs-4" key="doc-label">
                        Documento della tua carriera
                      </label>

                      <div
                        className="w-100 d-flex flex-column align-items-center mt-4 filter-custom doc-size-custom"
                        key="doc-input-container"
                      >
                        {fileDoc ? (
                          fileDoc.name.toLowerCase().endsWith(".pdf") ? (
                            <>
                              <div key="pdf-buttons">
                                <button
                                  onClick={(e) => handlePageChangeUp(e)}
                                  key="page-up-button"
                                >
                                  Pagina successiva
                                </button>
                                <button
                                  onClick={(e) => handlePageChangeDown(e)}
                                  key="page-down-button"
                                >
                                  Pagina precedente
                                </button>

                                <Document
                                  file={URL.createObjectURL(fileDoc)}
                                  options={{
                                    workerSrc:
                                      pdfjs.GlobalWorkerOptions.workerSrc,
                                  }}
                                  key="pdf-document"
                                >
                                  <Page
                                    pageNumber={pageNumber}
                                    width={400}
                                    key="pdf-page"
                                  />
                                </Document>
                              </div>
                            </>
                          ) : (
                            <img
                              className="border border-4"
                              width={"90%"}
                              src={URL.createObjectURL(fileDoc)}
                              alt="documento"
                              key="doc-image"
                            />
                          )
                        ) : (
                          <img
                            className="border border-4"
                            width={"90%"}
                            src={users.map((user) => user.doc)}
                            alt="documento"
                            key="doc-image-default"
                          />
                        )}
                      </div>
                      <div
                        className="w-100 p-2 d-flex flex-column text-center"
                        key="doc-details"
                      >
                        <label
                          className="filter-custom text-center text-dark bg-info rounded-top-3"
                          key="doc-details-name-label"
                        >
                          Carica il tuo documento (oppure screen del CV)
                        </label>
                        <input
                          className="filter-custom bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="file"
                          name="doc"
                          onChange={handleDocUpload}
                          key="doc-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" key="user-form-row-2">
                  {/* Nome */}
                  <div className="col-md-6" key="user-form-name-col">
                    <div
                      className="w-100 p-2 d-flex flex-column text-center filter-custom"
                      key="name-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="name-label"
                      >
                        Nome:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="text"
                        name="name"
                        value={userFormData.name}
                        onChange={handleFormChange}
                        key="name-input"
                      />
                    </div>
                  </div>
                  {/* Cognome */}
                  <div className="col-md-6" key="user-form-lastName-col">
                    <div className="d-flex" key="lastName-container">
                      <div
                        className="w-100 p-2 d-flex flex-column filter-custom"
                        key="lastName-column"
                      >
                        <label
                          className="text-center text-dark bg-info rounded-top-3"
                          key="lastName-label"
                        >
                          Cognome:
                        </label>
                        <input
                          className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                          type="text"
                          name="lastName"
                          value={userFormData.lastName}
                          onChange={handleFormChange}
                          key="lastName-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" key="user-form-row-33">
                  {/* Data di Nascita */}
                  <div className="z-index-custom col-md-6" key="user-form-dob-col">
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
                        selected={userFormData.dob ? new Date(userFormData.dob) : null}
                        onChange={(date) =>  setUserFormData({ ...userFormData, dob: new Date(date) })}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                        key="dob-input"
                      />
                    </div>
                  </div>

                  {/* Indirizzo */}
                  <div className="col-md-6" key="user-form-address-col">
                    <div
                      className="w-100 p-2 d-flex flex-column filter-custom"
                      key="address-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="address-label"
                      >
                        Indirizzo:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="text"
                        name="address"
                        value={userFormData.address}
                        onChange={handleFormChange}
                        key="address-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="row" key="user-form-row-3">
                  {/* Provincia */}
                  <div className="col-md-6" key="user-form-provincia-col">
                    <div
                      className="p-2 d-flex flex-column filter-custom"
                      key="provincia-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="provincia-label"
                      >
                        Provincia:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="text"
                        name="provincia"
                        value={userFormData.provincia}
                        onChange={handleFormChange}
                        key="provincia-input"
                      />
                    </div>
                  </div>
                  {/* Cap */}
                  <div className="col-md-6" key="user-form-cap-col">
                    <div
                      className="w-100 p-2 d-flex flex-column filter-custom"
                      key="cap-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="cap-label"
                      >
                        Cap:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="text"
                        name="cap"
                        value={userFormData.cap}
                        onChange={handleFormChange}
                        key="cap-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="row" key="user-form-row-333">
                  {/* Work */}
                  <div className="col-md-6" key="user-form-work-col">
                    <div
                      className="p-2 d-flex flex-column filter-custom"
                      key="work-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="work-label"
                      >
                        Il tuo lavoro:
                      </label>
                      <select
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="text"
                        name="work"
                        value={userFormData.work}
                        onChange={handleFormChange}
                        key="work-input"
                      >
                        {selectedCategory ? (
                          <option>{selectedCategory}</option>
                        ) : (
                          <option>Seleziona una categoria</option>
                        )}

                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Gender */}
                  <div className="col-md-6" key="user-form-gender-col">
                    <div
                      className="w-100 p-2 d-flex flex-column filter-custom"
                      key="gender-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="gender-label"
                      >
                        Sesso:
                      </label>
                      <select
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        name="gender"
                        value={userFormData.gender}
                        onChange={handleFormChange}
                        key="gender-select"
                      >
                        <option value="Maschio">Maschio</option>
                        <option value="Femmina">Femmina</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row" key="user-form-row-5">
                  <div className="col-md-12" key="submit-button-col">
                    <Button
                      className="border border-2 border-info text-success p-2 my-3 w-100 filter-custom"
                      variant="dark"
                      type="submit"
                      onClick={handleSubmit}
                      key="submit-button"
                    >
                      Modifica Dati
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* form cambio credenziali */}
            <div className="border border-danger border-3 rounded-2 filter-custom p-2">
              <h2 className="filter-custom">modifica credenziali</h2>
              <form className="w-100 ms-0">
                <div className="row">
                  <div className="col-md-6">
                    {/* Nuova Password */}
                    <div
                      className="w-100 p-2 d-flex flex-column filter-custom"
                      key="newPassword-container"
                    >
                      <label className="text-center text-dark bg-info rounded-top-3">
                        Nuova Password:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="password"
                        name="newPassword"
                        value={updateCredential.newPassword}
                        onChange={(e) =>
                          setUpdateCredential({
                            ...updateCredential,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* Email */}
                    <div
                      className="w-100 p-2 d-flex flex-column text-center filter-custom"
                      key="email-container"
                    >
                      <label
                        className="text-center text-dark bg-info rounded-top-3"
                        key="name-label"
                      >
                        Email:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="text"
                        name="email"
                        onChange={(e) =>
                          setUpdateCredential({
                            ...updateCredential,
                            email: e.target.value,
                          })
                        }
                        key="email-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {/* Conferma Nuova Password */}
                    <div
                      className="w-100 p-2 d-flex flex-column filter-custom"
                      key="confirmNewPassword-container"
                    >
                      <label className="text-center text-dark bg-info rounded-top-3">
                        Conferma Nuova Password:
                      </label>
                      <input
                        className="bg-secondary text-white p-2 rounded-bottom-3 border-bottom border-2"
                        type="password"
                        name="confirmNewPassword"
                        value={updateCredential.confirmNewPassword}
                        onChange={(e) =>
                          setUpdateCredential({
                            ...updateCredential,
                            confirmNewPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Button
                      className="border border-2 border-info text-danger p-2 my-3 w-100 filter-custom"
                      variant="dark"
                      type="submit"
                      onClick={handleChangeCredentials}
                      key="submit-button-credentials"
                    >
                      Modifica Credenziali
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* messaggio chiamate crud */}
            <div className="message-container" key="message-container">
              {message && (
                <div
                  className={
                    message.includes("NON")
                      ? "NOT-success-message-put-user"
                      : "success-message-put-user"
                  }
                  key="message"
                >
                  {message}
                </div>
              )}
            </div>

            {/* sezione video */}
            <h4 className="m-5 px-5 filter-custom" key="user-videos-title">
              I tuoi video :
            </h4>
            {videos.map((video) => (
              <>
                <Modal
                  className="bg-light"
                  show={showDeleteConfirmation}
                  onHide={() => setShowDeleteConfirmation(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Conferma la cancellazione</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Sei sicuro di voler cancellare questo video?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowDeleteConfirmation(false)}
                      key={`modal-delete-${video._id}`}
                    >
                      Annulla
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setShowDeleteConfirmation(false);
                        deleteVideo(video._id);
                      }}
                    >
                      Conferma
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div
                  className="row"
                  key={`video-row-${video._id}/${video.name}`}
                >
                  <div key={`video-col-${video._id}`}>
                    <div
                      className="col-3 col-md-0"
                      key={`video-col-1-${video._id}`}
                    ></div>
                    <div
                      className="col-12 col-md-6 mb-4 border border-dark border-4 filter-custom p-3 bg-light rounded-3 text-dark"
                      key={`video-${video._id}`}
                    >
                      <div
                        className="w-100"
                        key={`video-container-a-${video._id}`}
                      >
                        <div
                          className="dettails-post mb-3"
                          key={`video-post-a-${video._id}`}
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
                            <div
                              className="w-100 text-center p-3"
                              key={`delete-video-button-${video._id}`}
                            >
                              <Button
                                className="w-50 border rounded-3 border-info border-3 text-danger "
                                variant="dark"
                                onClick={() => deleteVideo(video._id)}
                                key={`delete-video-button-${video._id}`}
                              >
                                Cancella video
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-3 col-md-0"
                      key={`video-col-2-${video._id}`}
                    ></div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default User;
