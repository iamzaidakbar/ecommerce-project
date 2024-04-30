import AddressForm from "../AddresForm/AddressForm";
import "./Address.scss";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import useAlert from "../../utils/useAlert";

const Address = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [storedAddresses, setStoredAddresses] = useState(JSON.parse(localStorage.getItem('addresses')) || []);
    const { handleAlertOpen, handleAlertClose } = useAlert();

    const closeModal = (e) => {
        e.stopPropagation();
        setShow(false);
    };

    const setDefaultAddress = (item) => {
        const updatedAddresses = storedAddresses.map(address => {
            if (address.id === item.id) {
                address.isDefault = true;
            } else {
                address.isDefault = false;
            }
            return address;
        });
        setStoredAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        handleAlertOpen("success", "Default Address Changed.", '#1fae15');
        setTimeout(() => {
            handleAlertClose();
        }, 5000);
    };

    const deleteAddress = (e, id) => {
        e.stopPropagation()
        const updatedAddresses = storedAddresses.filter(address => address.id !== id);
        setStoredAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    };

    const editAddress = (e, item) => {
        e.stopPropagation()
        setEditingAddress(item);
        setShow(true);
        // You can pass the selected address item to the AddressForm component for editing
    };

    useEffect(() => {
        setStoredAddresses(JSON.parse(localStorage.getItem('addresses')))
    }, [refresh])

    return (
        <>
            <div className="container w-50 address p-3 my-3">
                <section className="section_1">
                    <label>Select Delivery Address</label>
                </section>

                {storedAddresses && storedAddresses.map(item => (
                    <section onClick={() => setDefaultAddress(item)} key={item.id} className="section_2">
                        <input className="form-check-input" readOnly checked={item.isDefault} type="radio" />

                        <aside className="address_details">
                            <span className="name">{item.name} {item.addressType && <small>{item.addressType}</small>}</span>
                            <span className="address_line">{item.address}, {item.city}, {item.state}, {item.postalCode}</span>
                            <span className="phone"><small>Mobile: </small>{item.mobile}</span>
                            <span className="pay">Pay on delivery available</span>
                            <span className="actions">
                                <button onClick={(e) => deleteAddress(e, item.id)} className={`btn rounded-0 btn-remove ${item?.isDefault && 'disabled'}`}>Remove</button>
                                <button onClick={(e) => editAddress(e, item)} className="btn rounded-0 btn-edit">Edit</button>
                            </span>
                        </aside>
                    </section>
                ))}

                <section onClick={() => {
                    setEditingAddress(null)
                    setShow(true)
                }} className="section_3">
                    <button className="btn">Add New Address</button>
                </section>

                <section className="section_4 d-flex gap-2">
                    <button onClick={() => { navigate("/checkout/cart") }} className="btn btn-back rounded-0">Back To Bag</button>
                    <button onClick={() => { navigate("/checkout/payment") }} className={`btn rounded-0 ${storedAddresses?.length > 0 ? '' : 'disabled'}`}>Proceed To Payment</button>
                </section>
            </div>

            {show && (
                <motion.div onClick={closeModal} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="address-modal">
                    <AddressForm editingAddress={editingAddress} setRefresh={setRefresh} refresh={refresh} setShow={setShow} show={show} />
                </motion.div>
            )}
        </>
    );
};

export default Address;
