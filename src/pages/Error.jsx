import React from "react";
import "./error.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="d-flex align-items-center justify-content-center bg-error-custom border border-5 border-info">
        <div className="container-error d-flex flex-column align-items-center justify-content-center border border-info border-3 filter-custom bg-dark text-info rounded-3">
          <div className="border-bottom border-info text-center pb-3 w-50 font-size-custom ">
            errore: 404!!!
          </div>

          <div className="pt-3 font-size-custom">Pagina non trovata...</div>
        <Button
                className="border border-2 border-info text-info bg-secondary mt-5 w-50"
                variant="dark"
                type="submit"
                onClick={()=>navigate('/')}
              >Torna indietro..</Button>
        </div>
      </section>
    </>
  );
};

export default Error;
