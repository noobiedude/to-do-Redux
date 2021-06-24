const Modal = ({ idxModal, setShowModal, setIdxModal }) => {
    return(
        <div>{idxModal}
        <button onClick={(e) => {setShowModal(false); setIdxModal(undefined)}}>Cancel</button>
        </div>
    )
}

export default Modal;