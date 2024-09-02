import React from 'react';
import './NavBar.css';

const Type = ({ contributorType, onTypeChange }) => {
    const singleContributorOptions = [
        { key: 'first', label: 'First Pull' },
        { key: 'second', label: 'Second Pull' },
        { key: 'final', label: 'Final Pull' }
    ];

    const multiContributorOptions = [
        { key: 'first', label: 'First Pull' },
        { key: 'second', label: 'Second Pull' },
        { key: 'final', label: 'Final Pull' },
        { key: 'amt', label: 'Amt Pull' }
    ];

    const options = contributorType === 'multi'
        ? multiContributorOptions
        : (contributorType === 'single' ? singleContributorOptions : []);

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        onTypeChange(selectedType);
    };

    return (
        <div className="Type-label">
            <div className="row center">
                <div className="col-lg-5 label text-lg-end">
                    <h4>Type :</h4>
                </div>
                <div className="col-lg-3">
                    <select className="form-control mb-3" onChange={handleTypeChange} defaultValue="">
                        <option value="" disabled>Select Type</option>
                        {options.map(option => (
                            <option key={option.key} value={option.key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Type;
