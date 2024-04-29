import "./AddressForm.scss";
import { MdOutlineClear } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import useAlert from '../../utils/useAlert';

const AddressForm = ({ setShow, setRefresh, refresh, editingAddress }) => {
    const [activeAddressType, setActiveAddressType] = useState('');
    const { handleAlertOpen, handleAlertClose } = useAlert();
    const [formData, setFormData] = useState({
        id: editingAddress ? editingAddress.id : Date.now(), 
        name: editingAddress ? editingAddress.name : '',
        email: editingAddress ? editingAddress.email : '',
        mobile: editingAddress ? editingAddress.mobile : '',
        address: editingAddress ? editingAddress.address : '',
        city: editingAddress ? editingAddress.city : '',
        postalCode: editingAddress ? editingAddress.postalCode : '',
        state: editingAddress ? editingAddress.state : '',
        addressType: editingAddress ? editingAddress.addressType : 'home',
        isDefault: editingAddress ? editingAddress.isDefault : false
    });

    useEffect(() => {
        setActiveAddressType(formData.addressType);
    }, [formData.addressType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressTypeClick = (e, type) => {
        e.preventDefault();
        setActiveAddressType(type);
        setFormData(prevState => ({
            ...prevState,
            addressType: type
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    
        if (formData.isDefault) {
            // Reset isDefault for all addresses in storedAddresses
            storedAddresses.forEach(address => {
                address.isDefault = false;
            });
        }
    
        let updatedAddresses;
        if (storedAddresses.length === 0) {
            // If there are no stored addresses, simply add the new address
            updatedAddresses = [formData];
        } else {
            // If there are existing addresses, update the matching one or add the new one
            updatedAddresses = storedAddresses.map(address => {
                if (address.id === formData.id) {
                    return formData; // Update the existing address
                }
                return address;
            });
        }
    
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    
        handleAlertOpen("success", "Address saved successfully.", '#1fae15');
        setTimeout(() => {
            handleAlertClose();
        }, 5000);
    
        setFormData({
            id: Date.now(),
            name: '',
            email: '',
            mobile: '',
            address: '',
            city: '',
            postalCode: '',
            state: '',
            addressType: 'home',
            isDefault: false
        });
        setRefresh(!refresh);
        setShow(false);
    };
    

    return (
        <div onClick={(e) => { e.stopPropagation() }} className="modal_body">
            <header className="d-flex justify-content-between border-bottom p-3">
                <span>{editingAddress ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}</span>
                <MdOutlineClear onClick={() => { setShow(false) }} style={{ cursor: 'pointer' }} size={'24px'} />
            </header>
            <form className="p-3">
                <label>Contact Details</label>
                <input className="form-control rounded-0 mb-3" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
                <input className="form-control rounded-0 mb-3" type="text" placeholder="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />

                <label>Address</label>
                <input className="form-control rounded-0 mb-3" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                <input className="form-control rounded-0 mb-3" type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
                <input className="form-control rounded-0 mb-3" type="text" placeholder="Pincode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />

                <span className="d-flex gap-3">
                    <input className="form-control rounded-0 border-0 mb-3 bg-light" type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} required />
                    <input className="form-control rounded-0 border-0 mb-3" type="text" placeholder="State" name="state" value={formData.state} onChange={handleChange} required />
                </span>

                <label>Save address as</label>

                <span className="d-flex gap-3 mb-4">
                    <button onClick={(e) => handleAddressTypeClick(e, 'home')} className={`btn btn-home-address btn-sm ${activeAddressType === 'home' ? 'active' : ''}`}>Home</button>
                    <button onClick={(e) => handleAddressTypeClick(e, 'work')} className={`btn btn-work-address btn-sm ${activeAddressType === 'work' ? 'active' : ''}`}>Work</button>
                    <button onClick={(e) => handleAddressTypeClick(e, 'other')} className={`btn btn-work-address btn-sm ${activeAddressType === 'other' ? 'active' : ''}`}>Other</button>
                </span>


                <label className="d-flex align-items-center gap-2 text-capitalize">
                    <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={() => setFormData(prevState => ({ ...prevState, isDefault: !prevState.isDefault }))} />
                    Make this my default address
                </label>
            </form>

            <footer className="border-top p-2">
                <button onClick={handleSubmit} className="btn btn-add-address rounded-0 w-100 p-0" type="submit">{editingAddress ? 'Edit Address' : 'Add Address'}</button>
            </footer>
        </div>
    );
};

export default AddressForm;
