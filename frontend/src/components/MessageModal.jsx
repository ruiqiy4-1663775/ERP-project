// This is the overall system message modal
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ModalContext } from "../utils/ModalContext";

function MessageModal() {
    const { isOpen, error, successMessage, closeModal } = useContext(ModalContext);
    const navigate = useNavigate();
    if (!isOpen) {
        return null;
    }
    if (successMessage) {
        return (
            <Modal close={closeModal} textColor={'text-green-500'}>{successMessage}</Modal>
        )
    }
    if (error) {
        console.log(error);
        let errorMessage = "An unknown error occurred.";
        if (error?.response?.status === 403 || error?.response?.status === 401) {
            // Check for specific status codes and set the error message accordingly
            return (
                <Modal close={() => { navigate('/login'); closeModal() }}>Your session has expired. Please log in again.</Modal>
            )
        } else if (typeof error?.response?.data === 'string') {
            errorMessage = error.response.data
        } else if (error?.response?.data?.sqlMessage) {
            errorMessage = error.response.data.sqlMessage
        } else if (error.message) {
            errorMessage = error.message
        }
        return (
            <Modal close={closeModal}>{JSON.stringify(errorMessage)}</Modal>
        );
    }
}

function Modal({ close, children, textColor, backgroundColor }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={(textColor ? textColor : 'text-red-600') + ' ' + (backgroundColor ? backgroundColor : 'bg-black') + ' relative rounded py-12 px-6 text-center bg-opacity-80 tracking-wider w-full md:w-1/4 break-words'}>
                <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 absolute top-0 right-0 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {children}
            </div>
        </div>
    );
};

export default MessageModal;
