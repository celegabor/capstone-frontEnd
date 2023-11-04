import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';
import './sidebar.css';

const MySidebar = () => {
  const { show, setShow, handleClose, handleShow, filters, setFilters } = useContext(PostProvider);

  // Stato per tenere traccia del pulsante attivo
  const [activeButton, setActiveButton] = useState('');

  const handleCategoryFilter = (category) => {
    setFilters({ ...filters, category });

    // Imposta il pulsante attivo
    setActiveButton(category);
  };

  return (
    <div>
      <Offcanvas className="sidebar-left-custom" show={show} onHide={handleClose}>
        <Offcanvas.Header className='custom-filters' closeButton>
          <div className='text-dark d-flex flex-column'>
            <Offcanvas.Title className='text-light bg-dark rounded-3 p-1 mb-2'>Aggiungi un filtro per vedere una sola categoria di video!</Offcanvas.Title>
            <Button variant='light' className='w-100 border border-5 border-dark' onClick={() => handleCategoryFilter('')}>Cancella Filtri</Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-custom text-secondary w-100 justify-content-around align-items-center'>
          <h4>che video vuoi vedere?</h4>
          <Button
            variant={activeButton === 'agricoltore' ? 'dark' : 'secondary'}
            className={activeButton === 'agricoltore' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('agricoltore')}
          >
            agricoltore
          </Button>
          <Button
            variant={activeButton === 'falegname' ? 'dark' : 'secondary'}
            className={activeButton === 'falegname' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('falegname')}
          >
            falegname
          </Button>
          <Button
            variant={activeButton === 'ingegnere' ? 'dark' : 'secondary'}
            className={activeButton === 'ingegnere' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('ingegnere')}
          >
            ingegnere
          </Button>
          <Button
            variant={activeButton === 'psicologo' ? 'dark' : 'secondary'}
            className={activeButton === 'psicologo' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('psicologo')}
          >
            psicologo
          </Button>
          <Button
            variant={activeButton === 'personal trainer' ? 'dark' : 'secondary'}
            className={activeButton === 'personal trainer' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('personal trainer')}
          >
            personal trainer
          </Button>
          <Button
            variant={activeButton === 'medico' ? 'dark' : 'secondary'}
            className={activeButton === 'medico' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('medico')}
          >
            medico
          </Button>
          <Button
            variant={activeButton === 'architetto' ? 'dark' : 'secondary'}
            className={activeButton === 'architetto' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('architetto')}
          >
            architetto
          </Button>
          <Button
            variant={activeButton === 'artista' ? 'dark' : 'secondary'}
            className={activeButton === 'artista' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('artista')}
          >
            artista
          </Button>
          <Button
            variant={activeButton === 'barista' ? 'dark' : 'secondary'}
            className={activeButton === 'barista' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('barista')}
          >
            barista
          </Button>
          <Button
            variant={activeButton === 'autista' ? 'dark' : 'secondary'}
            className={activeButton === 'autista' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('autista')}
          >
            autista
          </Button>
          <Button
            variant={activeButton === 'elettricista' ? 'dark' : 'secondary'}
            className={activeButton === 'elettricista' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('elettricista')}
          >
            elettricista
          </Button>
          <Button
            variant={activeButton === 'idraulico' ? 'dark' : 'secondary'}
            className={activeButton === 'idraulico' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('idraulico')}
          >
            idraulico
          </Button>
          <Button
            variant={activeButton === 'giornalista' ? 'dark' : 'secondary'}
            className={activeButton === 'giornalista' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('giornalista')}
          >
            giornalista
          </Button>
          <Button
            variant={activeButton === 'programmatore' ? 'dark' : 'secondary'}
            className={activeButton === 'programmatore' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('programmatore')}
          >
            programmatore
          </Button>
          <Button
            variant={activeButton === 'infermiere' ? 'dark' : 'secondary'}
            className={activeButton === 'infermiere' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('infermiere')}
          >
            infermiere
          </Button>
          <Button
            variant={activeButton === 'cuoco' ? 'dark' : 'secondary'}
            className={activeButton === 'cuoco' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('cuoco')}
          >
            cuoco
          </Button>
          <Button
            variant={activeButton === 'muratore' ? 'dark' : 'secondary'}
            className={activeButton === 'muratore' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('muratore')}
          >
            muratore
          </Button>
          <Button
            variant={activeButton === 'insegnante' ? 'dark' : 'secondary'}
            className={activeButton === 'insegnante' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('insegnante')}
          >
            insegnante
          </Button>
          <Button
            variant={activeButton === 'avvocato' ? 'dark' : 'secondary'}
            className={activeButton === 'avvocato' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('avvocato')}
          >
            avvocato
          </Button>
          <Button
            variant={activeButton === 'altro..' ? 'dark' : 'secondary'}
            className={activeButton === 'altro..' ? 'w-50 my-1 border border-3 border-success h-custom' : 'w-50 my-1 border border-3 border-dark h-custom'}
            onClick={() => handleCategoryFilter('altro..')}
          >
            altro..
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MySidebar;

