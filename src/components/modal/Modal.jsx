import './modal.css'
import { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import useDeleteTransaction from '../../hooks/useDeleteTransaction'
import Loader from '../loader/Loader'

const Modal = () => {
  const { showModal, setShowModal, modalData, setModalData } = useContext(ModalContext)
  const { isLoading, handleDeleteTransaction } = useDeleteTransaction()

  const { id, description, type } = modalData

  const close = () => {
    setShowModal(false)
  }

  const remove = () => {
    handleDeleteTransaction(id)

    setTimeout(() => {
      setShowModal(false)
    }, 1000);

    setTimeout(() => {
      setModalData({})
    }, 1200);
  }
  

  const handleClick = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowModal(false)
    }
  }
  

  return (
    <div className={`modal ${showModal ? 'active' : ''}`} onClick={handleClick}>
        <div className={`modal__content ${showModal ? 'active' : ''}`}>
          <i className="ri-delete-bin-6-line icon"></i>

          <h2 className='modal__title'>Delete Transaction</h2>

          <div className="modal__info">
            <div className='modal__note-title'>"{`${type} - ${description}`}"</div>{" "}
            You are going to delete this transaction. Are you sure?
          </div>

          <div className="modal__buttons">
              <button className="modal__button" onClick={close}>No, Keep It.</button>
              <button className="modal__button" onClick={remove}>
                  {isLoading ? (
                    <Loader />
                  ) : 'Yes, Delete!'}
              </button>
          </div>
        </div>
    </div>
  )
}

export default Modal