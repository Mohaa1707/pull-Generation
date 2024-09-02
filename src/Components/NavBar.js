import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Integra from '../Logos/integra.png';
import icon from '../Logos/icon.png';
import './NavBar.css';

const NavBar = () => {
    const EmpCode = localStorage.getItem("empCode");
    const Name = localStorage.getItem("name");
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <img src={Integra} alt="integra logo" className="integra-logo" />
                </Navbar.Brand>
                <div className="Nav-heading-container">
                    <h4 className="Nav-heading">OUP-BOOKS SCOUT & AMT PULL GENERATOR</h4>
                </div>
                <Nav className="d-flex align-items-center">
                    <div className="profile-info d-flex align-items-center">
                        <img src={icon} className="profile-icon" alt="profile icon" />
                        <div className='row' >
                            <span className="profile-name">{Name}</span>
                            <span className="profile-code">{EmpCode}</span>
                        </div>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
