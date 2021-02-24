import "./Backgroundinfo.css";
import React from "react";
import { Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, CardTitle,
  Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table, Container, ListGroup, ListGroupItem, Media,Form,
  FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText,
  Label} from 'reactstrap';

import Infoicon from '../../assets/img/student/info-icon.svg';


function template() {
  return (
    <div className="backgroundinfo">
      <div className="row">

          <div className="col-12">
            <div className="complete-box flex-column">

           <div className="com-top">
           <img src={Infoicon} alt="home-icon"  className="uni-icon pr-2" /> PLEASE COMPLETE YOUR PROFILE?
           </div>

            <div className="com-body">
              <p className="com-text"><strong>Save time :</strong> complete your profile once and use for multiple enquiries/applications<br/>
              <strong>Receive the best guidance from institutions :</strong> allow them to send you the most accurate information possible
              </p>
            </div>

           </div>
          </div>

          <div className="col-12 per-box py-4">
              {/*<div className="match-box py-2">
              to get more relevant results, including "Best match" and apply to programs and schools that align with your background, skills, and interests.

              </div>*/}
           <div className="destination-box">
              <div className="pr-header">
                 <h3>Background Information</h3>
             </div>
               <div className="row uni-no-mar flex-column">
               <Label className="uni-label">Have you been refused a visa from Canada, the USA, the United Kingdom, New Zealand or Australia?</Label>
                 
                 <div onChange={this.handleRefusedvisaChange}>
                    <div className="form-check my-2">
                      <input type="radio" className="form-check-input" id="exampleCheck1" value="yes" name="refusedvisa" />
                      <label className="form-check-label">Yes</label>
                    </div>

                    <div className="form-check my-2">
                    <input type="radio" className="form-check-input" id="exampleCheck2" value="no" name="refusedvisa" />
                    <label className="form-check-label">No</label>
                    </div>
                  </div>
                  <h6 style={{color: 'red'}}>{this.state.errors.refusedvisa}</h6>
               </div>

               <div className="row">
                     <div className="col-md-12">
                     <FormGroup>
                            <Label className="uni-label">Do you have a valid Study Permit / Visa?</Label>
                            <Input type="select" id="visapermit" onChange={this.handleVisapermitChange}>
                              <option value="" selected={'' == this.state.visapermit}>Select</option>
                              <option value="1" selected={'1' == this.state.visapermit}>Yes</option>
                              <option value="0" selected={'0' == this.state.visapermit}>No</option>
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.visapermit}</h6>
                     </div>
                     <div className="col-md-12">
                     <FormGroup>
                            <Label className="uni-label">If you answered "Yes" to any of the following questions above, please provide more details below:
                            </Label>
                            <textarea id="txtdetails" value ={this.state.txtdetails} className="form-control" placeholder="Provide Details" onChange={this.handleTxtdetailsChange}></textarea>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.txtdetails}</h6>
                     </div>
                     <div className="col-12 d-flex justify-content-end">
                     <Button color="primary" className="score-back mx-4" data-toggle="tab" href="#tab3" role="tab">BACK</Button>
                     <Button color="primary" className="score-save" type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>
                     </div>
              </div>
           </div>
           
          </div>
     </div>
    </div>
  );
};

export default template;
