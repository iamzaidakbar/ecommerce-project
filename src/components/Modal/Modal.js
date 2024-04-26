import React, { useState } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import "./Modal.scss";
import { DISCOUNT_CODE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { applyDiscount } from "../../redux/Slices/discountSlice";

const CustomModal = ({ isOpen, onRequestClose }) => {
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [code, setCode] = useState(false)

    const verifyIfCorrectCode = () => {
        if (code === DISCOUNT_CODE) {
            setError(false)
            dispatch(applyDiscount())
            onRequestClose()
            return
        }

        setError(true)
        return
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Modal"
                className={{
                    base: "modal-base",
                    afterOpen: "modal-base_after-open",
                    beforeClose: "modal-base_before-close"
                }}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-base_after-open",
                    beforeClose: "overlay-base_before-close"
                }}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={0}
            >
                <div className="d-flex align-items-center justify-content-between p-4">
                    <h2>Discounts</h2>
                    <GrClose style={{ cursor: 'pointer' }} size={'30px'} onClick={onRequestClose} color="black" />
                </div>

                <div className="d-flex align-items-center justify-content-between py-3 px-4 gap-4">
                    <input style={{ fontSize: '16px', height: '48px' }} onChange={(e) => { setCode(e.target.value) }} className={`form-control form-control-lg rounded-0 ${error && 'border-danger'}`} placeholder="Add a discount code" />
                    <button className="btn btn-dark btn-lg rounded-0" onClick={verifyIfCorrectCode}>ADD</button>
                </div>
                {error && <p className="text-danger px-4" style={{ fontSize: '10px' }}>Please enter a valid discount code</p>}
            </Modal>
        </>
    );
};

export default CustomModal;
