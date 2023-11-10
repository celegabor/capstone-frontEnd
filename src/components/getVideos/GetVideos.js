import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import CardVideos from "../CardVideos/CardVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCogs,
  faEdit,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./getVideos.css";
import useSession from "../../hooks/useSession";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { PostProvider } from "../../context/context";
import { jwtDecode } from "jwt-decode";

const GetVideos = () => {
  const token = JSON.parse(localStorage.getItem("loggedInUser"));
  const session = useSession();
  const decodedToken = jwtDecode(token);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    video: "",
    categoryWork: "",
    content: "",
    author: session.id,
  });
  const [editingVideo, setEditingVideo] = useState(null);
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { filters, videos, setVideos, categories } = useContext(PostProvider);
  const [confirmedDeletion, setConfirmedDeletion] = useState(false);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (video) => {
    setIsLoading(true);
    const fileData = new FormData();
    fileData.append("video", video);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/videoupload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      setIsLoading(false);

      return response.json();
    } catch (e) {
      setIsLoading(false);
      setNewVideo({
        title: "",
        video: "",
        categoryWork: "",
        content: "",
      });

      console.log("errore in uploadFile: ", e);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleFavorite = (videoId) => {
    const index = favoriteVideos.indexOf(videoId);
    if (index === -1) {
      setFavoriteVideos([...favoriteVideos, videoId]);
    } else {
      const newFavorites = [...favoriteVideos];
      newFavorites.splice(index, 1);
      setFavoriteVideos(newFavorites);
    }
  };

  const getVideos = async () => {
    setIsLoading(true);

    try {
      const filterParams = new URLSearchParams();
      if (filters.category) {
        filterParams.append("category", filters.category);
      }
      if (filters.keyword) {
        filterParams.append("keyword", filters.keyword);
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/video/get?page=${currentPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideos(data.videos);
        setTotalPages(data.totalPages);

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error("Errore nel recupero dei video:", error);
    }
  };

  const deleteVideo = async (videoId) => {
    setShowDeleteConfirmation(true);
    if (showDeleteConfirmation) {
      setShowDeleteConfirmation(false);

      if (confirmedDeletion) {
        try {
          setIsLoading(true);
          await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/video/delete/${videoId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: token,
              },
            }
          );

          setMessage("Complimenti!!! Il video è stato cancellato!!!");
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
      }
    }
  };

  const addVideo = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (file) {
      try {
        const uploadVideo = await uploadFile(file);
        console.log(uploadVideo);
        const finalBody = {
          ...newVideo,
          categoryWork: selectedCategory,
          video: uploadVideo.video,
        };

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/video/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalBody),
          }
        );

        if (response.ok) {
          setMessage(
            "Complimenti!!! Il tuo video è stato CARICATO correttamente !!!!!"
          );
          setTimeout(() => {
            setMessage("");
          }, 2500);

          getVideos();
          setShowModal(false);
          setNewVideo({ title: "", video: "", content: "", author: "" });
          setSelectedCategory("");

          setTimeout(() => {
            setIsLoading(false);
            window.location.reload();
          }, 300);
          console.log("aggiunto");
        } else {
          console.error("Errore durante l'aggiunta del video");
        }

        return response.json();
      } catch (error) {
        setMessage(
          "Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!",
          error
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);

        console.error("Errore durante l'aggiunta del video:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("seleziona un file");
    }
  };

  const editVideo = (videoId) => {
    const videoToEdit = videos.find((video) => video._id === videoId);
    setEditingVideo(videoToEdit);

    setNewVideo({
      title: videoToEdit.title,
      video: videoToEdit.video,
      categoryWork: videoToEdit.categoryWork,
      content: videoToEdit.content,
      author: session.id,
    });

    setSelectedCategory(videoToEdit.categoryWork);
    setShowModal(true);
  };

  const saveEditedVideo = async () => {
    const finalBody = {
      ...newVideo,
      categoryWork: selectedCategory,
    };
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/video/put/${editingVideo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalBody),
        }
      );

      if (response.ok) {
        setMessage(
          "Complimenti!!! Il tuo video è stato MODIFICATO correttamente !!!!!"
        );
        setTimeout(() => {
          setMessage("");
        }, 2500);
        console.log("aggiornato", newVideo, selectedCategory);

        getVideos();
        setShowModal(false);
        setEditingVideo(null);
        setNewVideo({ title: "", video: "", content: "", author: "" });
        setSelectedCategory("");
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } else {
        setNewVideo({ title: "", video: "", content: "", author: "" });
        setSelectedCategory("");
        console.error("Errore durante la modifica del video");
      }
    } catch (error) {
      setMessage(
        "Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!",
        error
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);

      setNewVideo({
        title: "",
        categoryWork: "",
        video: "",
        content: "",
        author: "",
      });
      console.error("Errore durante la modifica del video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getVideos();
  }, [currentPage, filters]);

  const renderAddVideoForm = () => {
    return (
      <>
        {isLoading ? (
          <div className="h-25 d-flex flex-column align-items-center justify-content-center text-dark spinner-custom p-3">
            <Spinner
              className="text-info"
              animation="border"
              role="status"
              key="spinner"
            />
            <p
              className="fs-5 text-info m-3"
              key={`${decodedToken.id}/${decodedToken}`}
            >
              Caricamento video in corso...
            </p>
            <p
              className="fs-5 text-info m-3"
              key={`${decodedToken.id}/${decodedToken}/${decodedToken.name}`}
            >
              Attendi qualche minuto senza ricaricare la pag...
            </p>
          </div>
        ) : (
          <Form encType="multipart/form-data">
            {/* -------------------------------------------- */}

            <Form.Group controlId="formTitle">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il titolo del video"
                value={newVideo.title}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, title: e.target.value })
                }
              />
            </Form.Group>

            {/* -------------------------------------------- */}

            <Form.Group controlId="formCategoryWork">
              <Form.Label>Categoria di Lavoro</Form.Label>
              <Form.Control as="select" onChange={handleCategoryChange}>
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
              </Form.Control>
            </Form.Group>

            {/* -------------------------------------------- */}

            <Form.Group controlId="formVideo">
              <Form.Label>File Video</Form.Label>
              <Form.Control
                name="video"
                type="file"
                onChange={onChangeSetFile}
                required
              />
            </Form.Group>

            {/* -------------------------------------------- */}

            <Form.Group controlId="formContent">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Inserisci il contenuto del video"
                value={newVideo.content}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, content: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        )}
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center text-dark spinner-custom">
          <Spinner
            className="text-dark"
            animation="border"
            role="status"
            key="spinner"
          />
          <p
            className="fs-5 text-dark m-3"
            key={`${decodedToken.id}/${decodedToken}`}
          >
            Caricamento...
          </p>
        </div>
      ) : (
        <div className="main bg-main-custom text-gray d-flex flex-wrap justify-content-center background-color: rgb(72, 69, 69);">
          <div className="w-100 custom-button-addVideo d-flex justify-content-end p-3">
            <Button
              variant="light border-2 border-dark button-custom"
              onClick={() => {
                setShowModal(true);
                window.alert(
                  "Per questa versione DEMO di JobWork l'upload di un video può arrivare a durare fino a 5/7 min in base alla dimensione!!"
                );
                window.alert(
                  "Attendi perfavore senza ricaricare la pag o cliccare ripetutamente 'Salva Video'! "
                );
              }}
            >
              <FontAwesomeIcon icon={faEdit} /> Aggiungi Video
            </Button>
          </div>
          {videos.map((video) => (
            <>
              {/* Modale per conferma cancellazione */}
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
                  >
                    Annulla
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowDeleteConfirmation(false);
                      setConfirmedDeletion(true);
                      deleteVideo(video._id); // Esegui la cancellazione
                    }}
                  >
                    Conferma
                  </Button>
                </Modal.Footer>
              </Modal>
              <div
                className="card-video rounded-3 bg-light m-3 p-3"
                key={video._id}
              >
                {filters.category ? (
                  <>
                    {video.categoryWork === filters.category ? (
                      <>
                        <CardVideos video={video} />
                        <div className="d-flex justify-content-end w-100 height-custom">
                          <div>
                            <Button
                              className="mx-2 px-3 py-1 ml-2"
                              variant={
                                favoriteVideos.includes(video._id)
                                  ? "danger"
                                  : "info"
                              }
                              onClick={() => toggleFavorite(video._id)}
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </Button>
                            {video.author._id === session.id ? (
                              <>
                                <Button
                                  className="text-info border-info px-3 py-1"
                                  variant="dark"
                                  onClick={() => deleteVideo(video._id)}
                                >
                                  <FontAwesomeIcon
                                    className="text-info"
                                    icon={faTrash}
                                  />
                                </Button>
                                <Button
                                  className=" mx-2 px-3 py-1 ml-2"
                                  variant="dark"
                                  onClick={() => editVideo(video._id)}
                                >
                                  <FontAwesomeIcon icon={faCogs} />
                                </Button>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <CardVideos className="card-video" video={video} />
                    <div className="d-flex justify-content-end w-100">
                      <div>
                        <Button
                          className="mx-2 px-3 py-1 ml-2"
                          variant={
                            favoriteVideos.includes(video._id)
                              ? "danger"
                              : "dark"
                          }
                          onClick={() => toggleFavorite(video._id)}
                        >
                          <FontAwesomeIcon
                            className="buttons-card-custom"
                            icon={faHeart}
                          />
                        </Button>
                        {video.author._id === session.id ? (
                          <>
                            <Button
                              className=" px-3 py-1"
                              variant="dark"
                              onClick={() => deleteVideo(video._id)}
                            >
                              <FontAwesomeIcon
                                className="buttons-card-custom"
                                icon={faTrash}
                              />
                            </Button>
                            <Button
                              className=" mx-2 px-3 py-1 ml-2"
                              variant="dark"
                              onClick={() => editVideo(video._id)}
                            >
                              <FontAwesomeIcon
                                className="buttons-card-custom"
                                icon={faCogs}
                              />
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ))}

          <div className="message-container">
            {message && (
              <div
                className={
                  message.includes("NON")
                    ? "NOT-success-message"
                    : "success-message"
                }
                key="message"
              >
                {message}
              </div>
            )}
          </div>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="bg-dark border border-info" closeButton>
          <Modal.Title className="text-info">
            {editingVideo ? "Modifica Video" : "Aggiungi un nuovo video"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray text-info">
          {renderAddVideoForm()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Chiudi
          </Button>
          {isLoading ? (
            null
          ) : (
            <>
              {editingVideo ? (
                <Button variant="primary" onClick={saveEditedVideo}>
                  Aggiorna Video
                </Button>
              ) : (
                <Button variant="primary" onClick={addVideo}>
                  Salva Video
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>

      <div className="bg-light p-1 m-0">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={handlePagination}
          key="pagination"
        />
      </div>
    </>
  );
};

export default GetVideos;
