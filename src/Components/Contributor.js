import React, { useEffect } from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import Pull from './Pull';
import Type from './Type';
import Isbn from './Isbn';
import LoginPage from "./login";
import { useNavigate } from "react-router-dom";

const Contributor = () => {
    let navigate = useNavigate();
    const [contributorType, setContributorType] = useState('');
    const [pullType, setPullType] = useState('');
    const EmpCode = localStorage.getItem("empCode");
    useEffect(() => {
      if(!EmpCode)
         navigate('/pullgenerator');
    });

    const handleContributorChange = (selectedContributor) => {
        setContributorType(selectedContributor);
    };

    const handleTypeChange = (selectedType) => {
        setPullType(selectedType);
    };
  return (

    <div>
      <NavBar/>
      <Pull onContributorChange={handleContributorChange} />
      <Type contributorType={contributorType} onTypeChange={handleTypeChange} />
      <Isbn contributorType={contributorType} pullType={pullType} />
    </div>
  )
}

export default Contributor
