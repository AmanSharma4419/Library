import "./AppBackgroundinfo.css";
import QueBackgroundAddMore from '../Addmore/BackgroundAddMore';
import React from "react";
import { Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, CardTitle,
  Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table, Container, ListGroup, ListGroupItem, Media,Form,
  FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText,
  Label} from 'reactstrap';

import Infoicon from '../../assets/img/student/info-icon.svg';
import Closeicon from '../../assets/img/close-btn.svg';


function template() {
	const backgroundtab = () => {
  this.setState({BackgroundAddMore:false, selectedQuestion3: null})
    }
  return (
    <div className="appbackgroundinfo">
      <div className="row">
     {/*{this.state.contentclose1 ?
          <div className="col-12">
            <div className="complete-box flex-column">
            <div className="com-top d-flex justify-content-end">
           <img src={Closeicon} alt="home-icon" onClick={this.closepop2} className="uni-icon pr-2" />
           </div>
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
	: null
	}*/}

         <div className="col-12 col-md-9 per-box pb-4">
              {/*<div className="match-box py-2">
              to get more relevant results, including "Best match" and apply to programs and schools that align with your background, skills, and interests.

              </div>*/}
			  <p style={{display:this.state.BackgroundAddMore==false?"block":"none"}}> 
           <div className="destination-box">
              <div className="pr-header">
                 <h3>Background Information</h3>
             </div>
               <div className="row uni-no-mar flex-column">
               <Label className="uni-label">Have you been refused a visa from Canada, the USA, the United Kingdom, New Zealand or Australia?</Label>
                 
                 <div onChange={this.handleRefusedvisaChange}>
				   
				   
                    <div className="form-check my-2">
					<Label className="check-name" >
                      <input disabled={this.state.disabled} type="radio" className="form-check-input " id="exampleCheck1" value="yes" name="refusedvisa" />
					  <span className="checkmark"></span>
					  
					</Label>
                      <label className="form-check-label pl-3">Yes</label>
                    </div>
					

                    <div className="form-check my-2">
					<Label className="check-name" >
                    <input disabled={this.state.disabled} type="radio" className="form-check-input " id="exampleCheck2" value="no" name="refusedvisa" />
					 <span className="checkmark"></span>
					  
					</Label>
                    <label className="form-check-label pl-3">No</label>
                    </div>
                  </div>
                  <h6 style={{color: 'red'}}>{this.state.errors.refusedvisa}</h6>
               </div>

               <div className="row">
                     <div className="col-md-12">
                     <FormGroup>
                            <Label className="uni-label">Do you have a valid Study Permit / Visa?</Label>
                            <Input disabled={this.state.disabled} type="select" id="visapermit" onChange={this.handleVisapermitChange} className=''>
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
                            <textarea disabled={this.state.disabled} id="txtdetails" value ={this.state.txtdetails} className="form-control " placeholder="Provide Details" onChange={this.handleTxtdetailsChange}></textarea>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.txtdetails}</h6>
                     </div>
					 
                  </div>
           </div>   
					  
		
		             <div className="col-12 d-flex justify-content-end">
                    
                    {this.state.disabled===false?( <Button color="primary" className="score-save " type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>
                   ):(<div className="col-12 d-flex justify-content-end"> <Button
                    color="primary"
                    className="score-back mx-4 aftersave"
                    onClick={this.prevtab}
                  >
                    BACK
                  </Button>
                  <Button
                    color="primary"
                    className="score-save aftersave"
                    onClick={this.nexttab}
                  >
                    NEXT
                  </Button></div>)}
                     </div>
		  </p>
		    <p style={{display:this.state.BackgroundAddMore==true?"block":"none"}}>
                                        <QueBackgroundAddMore clearBackgroundAddmore = {this.state.clearBackgroundAddmore}  getQuestiondata={this.getQuestiondata3} selectedQuestion={this.state.selectedQuestion3}></QueBackgroundAddMore>
                                      </p>
                     
		  
					 
              </div>
			  
			  <div className="col-12 col-md-3" >
		   <div className=" list-card uni-no-padd mt-3 add-more-box" >
                                      
                                      <button className="list-group-item w-100"
                                        // className="nav-l"
                                       onClick={() => backgroundtab()}
                                      >
									  
                                        Background Information
                                       </button>
                               
          
			   
			     <div className="uni-no-padd card-body">
                                  <ul className="university-list list-group">
                                    <div className="stepone">
                                      <div className="steptwo">
                                        {this.state.questiondata3.map((question, index)=>
                                          <li id="about" key={index} className="list-group-item" onClick={()=>this.setQuestiondata3(index)}>{question.question[0]}</li>
                                        )}
                                        
                                      
                                        </div>
                                        
                                           </div></ul></div> 
			   
			   </div>                 </div>
			  


     </div>
    </div>
  );
};

export default template;
