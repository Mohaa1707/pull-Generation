import React, { useState } from 'react';
import './NavBar.css';

const Pull = ({ onContributorChange }) => {
    const handleContributorChange = (event) => {
        const selectedContributor = event.target.value;
        onContributorChange(selectedContributor);
    };


    return (
        <div className="contributor-label">
            <div className="row center">
                <div className="col-lg-5 label text-lg-end">
                    <h4>Contributor :</h4>
                </div>
                <div className="col-lg-3">
                <select className="form-control mb-3" onChange={handleContributorChange} defaultValue="">
                        <option value="" disabled>Select Contributor</option>
                        <option value="single">Single Contributor</option>
                        <option value="multi">Multi Contributor</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Pull;
