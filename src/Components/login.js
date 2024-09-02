import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import IntegraLogo from '../Logos/integra.png';
// import Logo from '../Logos/logo.png';

function LoginPage() {
    let navigate = useNavigate();
    const [usr,setUser] =useState([]);
    const [pwd,setPwd] =useState([]);
    const handleInputChange =(e) =>{
        const { id, value } = e.target;
    
        if (id === "user") {
          setUser(value)
        }
        if (id === "pwd") {
          setPwd(value)
        }
    }
    function validate(){
        let isValid = true;
     
        if (!usr) {
          isValid = false;
          alert("Please enter your Employee Code.");
        }
    
        if (!pwd) {
          isValid = false;
          alert("Please enter your password.");
        }
    
        if (typeof pwd !== "undefined") {
          if(pwd.length < 6){
              isValid = false;
              alert("Please add at least 6 character.");
          }
        }
    
        return isValid;
    }
    function LoginCheck(){
        if(validate()) {
            const payload = {
                userName : usr,
                pwd: pwd
            }
            axios.post('http://is-cvm62:5001/api/executeQuery', payload ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',   
                },
            })
            .then(function (response) {
                let authenticated = false; // Define and initialize authenticated variable
                if(response.data.result.length > 0)
                {
                    let data = response.data.result[0];
                    // let email = response.data[0].userMailID;
                    let EmpCode = data.EmpCode;
                    let Name = data.Name;
                    // let password = response.data[0].password;
                    // localStorage.setItem("datas",data)
                    // localStorage.setItem("email",email)
                    localStorage.setItem("empCode",EmpCode)
                    localStorage.setItem("name",Name)
                    // localStorage.setItem("password",password)
                    navigate('/contributor');
                }
                else
                {
                    alert("Invalid username/Password");
                    authenticated = false;
                }
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
    return (
        <>
            <header>
                <div className="headerLogo">
                    {/* <img src={Logo} className="logoImg"></img> */}
                    <h3>OUP-BOOKS SCOUT & AMT PULL GENERATOR</h3>
                </div>
            </header>
            <div className="LoginPage">
                <div className="LoginPageLeft">
                    <div className="innerSection">
                        <h1>PANCHASEELAS</h1>
                        <ul className="listTexts">
                            <li>Customer Satisfaction</li>
                            <li>People Care</li>
                            <li>Professionalism</li>
                            <li>Team Work</li>
                            <li>Excellence</li>
                        </ul>
                    </div>
                    <div className="footerSection">
                        <div>
                            <img src={IntegraLogo} className="logoImg"></img>
                        </div>
                        <div className="leftContSec">
                            <span>Proud to be One Among</span>
                            <h2>THE 100 BEST COMPANIES</h2>
                            <span>for Working Women in India</span>
                        </div>
                    </div>
                </div>
                <div className="LoginPageRight">
                    <h1>Login</h1>
                    <div className="innerscetion">
                        <div className="fromFields">
                            <TextField label="Username" id="user" variant="outlined" onChange={(e) => handleInputChange(e)}/>
                        </div>
                        <div className="fromFields">
                            <TextField label="Password" type="password" id="pwd" variant="outlined" onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="forgetArea">
                            <div>
                                <FormControlLabel control={<Checkbox />} label="Remember me" />
                            </div>
                            <div>
                                <p><a href="#">Forgot Password?</a></p>
                            </div>
                        </div>
                        <Button variant="contained" className='fromLogButton' onClick={LoginCheck}>Login</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;