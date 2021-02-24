import "./Footer_Blocks.css";
import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { Container,Row, Col, ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading, Button } from 'reactstrap';
import Footerlogo from '../../assets/img/brand/formee-footer-logo.png';
function template() {
  return (
    <div className="footer-blocks">
      <Container>
      <Row>
        <Col xl="5" md="5" lg="5" sm="5" xs="12">
          <div className="footer_logo">
            <img src={Footerlogo} className="footer-logo-img" alt="footer-logo" width="249" height="auto" />
          </div>
          </Col>
        <Col xl="7" md="7" lg="7" sm="7" xs="12">
          <Row>
            <div className="col-6 col-sm-6 col-lg-4 col-lg-4 col-xl-4 my-4">
             <ListGroup>
               <ListGroupItemHeading>for Student</ListGroupItemHeading>
               <ListGroupItem>Australia</ListGroupItem>
               <ListGroupItem>Canada</ListGroupItem>
               <ListGroupItem>Germany</ListGroupItem>
               <ListGroupItem>Sounth Africa</ListGroupItem>
               <ListGroupItem>USA</ListGroupItem>
               <ListGroupItem>United Kingdom</ListGroupItem>
             </ListGroup>
            </div>
 <div className="col-6 col-sm-6 col-lg-4 col-lg-4 col-xl-4 my-4">
             <ListGroup>
             <ListGroupItemHeading>for Preferred <br/>Partners</ListGroupItemHeading>
               <ListGroupItem>Partner with us</ListGroupItem>
               <ListGroupItem>Our benefit</ListGroupItem>
                             
             </ListGroup>
            </div>
            <div className="col-6 col-sm-6 col-lg-4 col-lg-4 col-xl-4 my-4">
             <ListGroup>
             <ListGroupItemHeading>for University</ListGroupItemHeading>
               <ListGroupItem>Partner with us</ListGroupItem>
               <ListGroupItem>Our benefit</ListGroupItem>
               <ListGroupItem><Link to="/studentlibrary">Student library</Link></ListGroupItem>
             </ListGroup>
            </div>
    
          </Row>
          <Row className="foe-row-border">
            <div className="col-6 col-sm-6 col-lg-4 col-lg-4 col-xl-4 my-4">
             <ListGroup>
               <ListGroupItemHeading>About</ListGroupItemHeading>
               <ListGroupItem><Link to="/aboutus">About Us</Link></ListGroupItem>
               <ListGroupItem>Career</ListGroupItem>
               <ListGroupItem>Contact Us</ListGroupItem>
             </ListGroup>
            </div>
 <div className="col-6 col-sm-6 col-lg-4 col-lg-4 col-xl-4 my-4">
             <ListGroup>
             <ListGroupItemHeading>help center</ListGroupItemHeading>
                <ListGroupItem><Link to="/ourservice">Services</Link></ListGroupItem>
               <ListGroupItem>Account</ListGroupItem>
               <ListGroupItem>Join us</ListGroupItem>
               <ListGroupItem>Question?</ListGroupItem>              
             </ListGroup>
            </div>
            <div className="col-6 col-sm-6 col-lg-4 col-lg-4 col-xl-4 my-4">
             <ListGroup>
             <ListGroupItemHeading>contact</ListGroupItemHeading>
               <ListGroupItem>+61-426 839 225</ListGroupItem>
               <ListGroupItem>info@formee.com.au</ListGroupItem>
               
             </ListGroup>
            </div>
    
          </Row>
<Row className="foe-row-border">
    <div className="col-xl-12 col-lg-12 col-12 foe-newsletter">
    <ListGroup>
             <ListGroupItemHeading>Newsletter</ListGroupItemHeading>
               <ListGroupItem className="p-13">Stay up to date with our latest news releases by signing up to our newsletter.</ListGroupItem>
             </ListGroup>
    </div>
</Row>
        </Col>
      </Row>
      <Row>
        <Col xl="5" md="5" lg="5" sm="5" xs="12">
          <p className="foe-footer-text">&copy; 2020 formee express All rights reserved.</p>
        </Col>
        <Col xl="7" md="7" lg="7" sm="7" xs="12">
          <div className="foe-bottom-footer">
               <Button color="primary" className="foe-mail-btn">Enter your email</Button>{' '}
               <Button color="secondary" className="foe-sub-btn">Subscribe</Button>{' '}
          </div>
        </Col>
      </Row> 
      </Container>
    </div>
  );
};

export default template;
