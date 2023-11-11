import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import FooterElement from "../components/footer/MyFooter";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../img/JobWork.png";
import "react-datepicker/dist/react-datepicker.css";
import "./addUser.css";

const AddUser = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    address: "",
    dob: new Date(),
    avatar: "",
    email: "",
    password: "",
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [emails, setEmails] = useState([]);

  // const dobAsDate = new Date(userData.dob);
  // const dobFormatted = dobAsDate.toISOString().split('T')[0];
  console.log(userData.dob);
  const navigate = useNavigate();

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (img) => {
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

      return await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setMessage("La password e la conferma della password NON corrispondono.");

      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }

    if (emails.includes(userData.email)) {
      setMessage(
        "Questa email NON è valida perchè è già stata registrata. Si prega di utilizzare un altro indirizzo email."
      );

      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }

    setIsLoading(true);

    if (file) {
      try {
        const uploadAvatar = await uploadFile(file);

        const finalBody = {
          ...userData,
          avatar: uploadAvatar.avatar,
          dob: userData.dob,
        };

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/users2/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalBody),
          }
        );

        if (response.ok) {
          setUserData({
            name: "",
            lastName: "",
            avatar: "",
            address: "",
            dob: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          setMessage("Complimenti!!! Utente creato correttamente !!!!");
          setTimeout(() => {
            setMessage("");
            setIsSuccessful(true);
            navigate("/login");
          }, 3000);
        } else {
          setMessage(
            "Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!"
          );
          setTimeout(() => {
            setMessage("");
            setIsSuccessful(true);
          }, 3000);

          setIsSuccessful(true);
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 1300);
      } catch (error) {
        setMessage(
          "Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!",
          error
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
      }
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users2/getEmails`
      );
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails);
      } else {
        console.log("Errore nel recupero delle email");
      }
    } catch (error) {
      console.log("Errore nel recupero delle email", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <>
      <nav className="d-flex justify-content-between nav-add-user">
        <img className="logo-add-user-nav" src={Logo} alt="logo site"></img>
        <Button
          variant="dark border border-light px-4 my-2"
          onClick={() => navigate("/")}
        >
          Torna indietro
        </Button>
      </nav>

      {isLoading ? (
        <>
          <div className="spinner-container bg-dark d-flex flex-column justify-content-center align-items-center text-white">
            <Spinner className="fs-5" animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p>Caricamento...</p>

            <p>..ci vorrà ancora un'attimo...</p>
          </div>
        </>
      ) : isSuccessful ? (
        <Navigate to="/" />
      ) : (
        <>
          <main className="w-100 d-flex justify-content-center align-items-center flex-column bg-dark py-3 text-light">
            <h2>Aggiungi Utente</h2>
            <Form className="bg-secondary" noValidate>
              {/* name */}
              <Form.Group className="elementsForm" as={Col} controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={userData.name}
                  onChange={handleChange}
                />
                {userData.name.length < 3 && userData.name.length > 0 && (
                  <div className="error-message">
                    Il nome deve essere lungo almeno 3 caratteri.
                  </div>
                )}
              </Form.Group>

              {/* lastname */}
              <Form.Group
                className="elementsForm"
                as={Col}
                controlId="lastName"
              >
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  placeholder="Cognome"
                  value={userData.lastName}
                  onChange={handleChange}
                />
                {userData.lastName.length < 3 &&
                  userData.lastName.length > 0 && (
                    <div className="error-message">
                      Il cognome deve essere lungo almeno 3 caratteri.
                    </div>
                  )}
              </Form.Group>

              {/* address */}
              <Form.Group className="elementsForm" as={Col} controlId="address">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="address"
                  placeholder="address"
                  value={userData.address}
                  onChange={handleChange}
                />
                {userData.address.length < 5 && userData.address.length > 0 && (
                  <div className="error-message">
                    L'indirizzo deve essere lungo almeno 5 caratteri.
                  </div>
                )}
              </Form.Group>

              {/* avatar */}
              <Form.Group className="elementsForm" as={Col} controlId="avatar">
                <Form.Label>link di internet di un avatar</Form.Label>
                <Form.Control
                  required
                  type="file"
                  name="avatar"
                  onChange={onChangeSetFile}
                />
              </Form.Group>

              {/* dob */}
              <Form.Group className="elementsForm" as={Col} controlId="dob">
                <Form.Label>Data di Nascita</Form.Label>
                <DatePicker
                  selected={userData.dob}
                  onChange={(date) => setUserData({ ...userData, dob: date })}
                  dateFormat="dd/MM/yyyy"
                />
              </Form.Group>

              {/* email */}
              <Form.Group className="elementsForm" as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                />
                {!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  userData.email
                ) && (
                  <div className="error-message">
                    Inserire un indirizzo email valido.
                  </div>
                )}
              </Form.Group>

              {/* password */}
              <Form.Group
                className="elementsForm"
                as={Col}
                controlId="password"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                />
                {userData.password.length < 4 &&
                  userData.password.length > 0 && (
                    <div className="error-message">
                      La password deve essere lunga almeno 4 caratteri.
                    </div>
                  )}
              </Form.Group>

              {/* confirm password */}
              <Form.Group
                className="elementsForm"
                as={Col}
                controlId="confirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
                {userData.password.length < 4 &&
                  userData.password.length > 0 && (
                    <div className="error-message">
                      La password deve essere lunga almeno 4 caratteri.
                    </div>
                  )}
              </Form.Group>

              <Button
                className="border border-2 border-secondary my-3 w-100"
                variant="dark"
                type="submit"
                onClick={handleSubmit}
              >
                Aggiungi Utente
              </Button>
              <div className="message-container">
                {message && (
                  <div
                    className={
                      message.includes("NON")
                        ? "NOT-success-message-put-user"
                        : "success-message-put-user"
                    }
                  >
                    {message}
                  </div>
                )}
              </div>
            </Form>
          </main>
        </>
      )}

      <footer>
        <FooterElement />
      </footer>
    </>
  );
};

export default AddUser;

// react date peacker
