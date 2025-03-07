"use client"

import React, { useState } from 'react';

const AddAddressPage = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle address submission, e.g., save to database or state
    console.log('Address Submitted:', address);
  };

  return (
    <div className="add-address-page">
      <h2>Add New Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Enter street address"
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>
        <div>
          <label htmlFor="state">State/Province</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="Enter state or province"
            required
          />
        </div>
        <div>
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            placeholder="Enter zip code"
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Enter country"
            required
          />
        </div>
        <button type="submit">Submit Address</button>
      </form>
    </div>
  );
};

export default AddAddressPage;
