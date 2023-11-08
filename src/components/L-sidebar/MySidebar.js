import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons'; 


const MySidebar = () => {
  const { show, setShow, handleClose, handleShow, filters, setFilters } = useContext(PostProvider);

  const [activeButton, setActiveButton] = useState('');

  const handleCategoryFilter = (category) => {
    setFilters({ ...filters, category });
    setActiveButton(category);
  };

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header className='bg-light border border-info border-1 custom-filters'>
          <div className='bg-light text-dark d-flex flex-column'>
            <Offcanvas.Title className='text-info bg-custom p-1 w-100 text-center mb-2'>Aggiungi un filtro per vedere una sola categoria di video!</Offcanvas.Title>
            <div className='d-flex bg-light container-buttonsTop-sidebar-left'>
              <Button variant='outline-dark' className='w-100 border border-5 border-dark m-1' onClick={() => handleCategoryFilter('')}>Cancella Filtri</Button>
              <Button variant='outline-dark' className='w-100 border border-5 border-dark m-1' onClick={()=>setShow(false)}>
                <FontAwesomeIcon className='mx-1 text-danger' icon={faClose} />
                Chiudi</Button>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-dark text-light w-100 justify-content-around align-items-center'>
          <h4>che video vuoi vedere?</h4>
          <Button
            variant={activeButton === 'agricoltore' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('agricoltore')}
          >
            agricoltore
          </Button>
          <Button
            variant={activeButton === 'falegname' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('falegname')}
          >
            falegname
          </Button>
          <Button
            variant={activeButton === 'ingegnere' ? 'outline-info' : null}
            className= 'w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('ingegnere')}
          >
            ingegnere
          </Button>
          <Button
            variant={activeButton === 'psicologo' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('psicologo')}
          >
            psicologo
          </Button>
          <Button
            variant={activeButton === 'personal trainer' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('personal trainer')}
          >
            personal trainer
          </Button>
          <Button
            variant={activeButton === 'medico' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('medico')}
          >
            medico
          </Button>
          <Button
            variant={activeButton === 'architetto' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('architetto')}
          >
            architetto
          </Button>
          <Button
            variant={activeButton === 'artista' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('artista')}
          >
            artista
          </Button>
          <Button
            variant={activeButton === 'barista' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('barista')}
          >
            barista
          </Button>
          <Button
            variant={activeButton === 'autista' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('autista')}
          >
            autista
          </Button>
          <Button
            variant={activeButton === 'elettricista' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('elettricista')}
          >
            elettricista
          </Button>
          <Button
            variant={activeButton === 'idraulico' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('idraulico')}
          >
            idraulico
          </Button>
          <Button
            variant={activeButton === 'giornalista' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('giornalista')}
          >
            giornalista
          </Button>
          <Button
            variant={activeButton === 'programmatore' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('programmatore')}
          >
            programmatore
          </Button>
          <Button
           variant={activeButton === 'infermiere' ? 'outline-info' : null}
           className='w-50 my-1 h-custom overflow-scroll text-light'
           onClick={() => handleCategoryFilter('infermiere')}
          >
            infermiere
          </Button>
          <Button
            variant={activeButton === 'cuoco' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('cuoco')}
          >
            cuoco
          </Button>
          <Button
            variant={activeButton === 'muratore' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('muratore')}
          >
            muratore
          </Button>
          <Button
            variant={activeButton === 'insegnante' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('insegnante')}
          >
            insegnante
          </Button>
          <Button
            variant={activeButton === 'avvocato' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
            onClick={() => handleCategoryFilter('avvocato')}
          >
            avvocato
          </Button>
          <Button
            variant={activeButton === 'altro..' ? 'outline-info' : null}
            className='w-50 my-1 h-custom overflow-scroll text-light'
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

