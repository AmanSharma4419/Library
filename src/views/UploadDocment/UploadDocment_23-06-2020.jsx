import "./UploadDocment.css";
import React from "react";
import { Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader,
  CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table, Container,
  ListGroup, ListGroupItem, Media,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon,
  InputGroupButtonDropdown, InputGroupText, Label
} from 'reactstrap';
import Infoicon from '../../assets/img/student/info-icon.svg';
import PersonalIcon from '../../assets/img/student/personal-folder.svg';
import TransIcon from '../../assets/img/student/trans.svg';

import File1 from '../../assets/img/student/file-1.svg';
import File2 from '../../assets/img/student/file-2.svg';
import File3 from '../../assets/img/student/file-3.svg';
import File4 from '../../assets/img/student/file-4.svg';
import Closeicon from '../../assets/img/close-btn.svg';

function template() {
  const imgpath = "https://formeeadmin.bicsglobal.com";
  return (
    <div className="upload-docment">
        <div className="row">
          <div className="col-12">
            <div className="complete-box flex-column">
            <div className="com-top d-flex justify-content-end">
           <img src={Closeicon} alt="home-icon"  className="uni-icon pr-2" />
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
          <div className="col-12 per-box py-4">
              <div className="match-box py-2">
              to get more relevant results, including "Best match" and apply to programs and schools that align with your background, skills, and interests.

              </div>
           <div className="destination-box">
           <div className="pr-header d-flex">
                 <h3 className="mr-3">Documents</h3>  
                 <div className="profile-btn d-flex">
                    {/*<Button color="primary">+ Add files</Button>*/}
                    <Input type="file" id="upfile" accept="image/*,application/pdf" multiple onChange={this.onFileChange} name="upload_photo[]" />
                  </div>
                  
             </div><h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>

                  <div className="row">
                     <div className="col-md-6">
                        <FormGroup>
                            <Label className="uni-label">SELECT FOLDER</Label>
                            <Input type="select" id="foldertype" onChange={this.handleFolderChange}>
                              <option value="">Select</option>
                              <option value="1">Personal</option>
                              <option value="2">Transscripts</option>
                            </Input>
                        </FormGroup>
                        {/*<h6 style={{color: 'red'}}>{this.state.errors.examtype}</h6>*/}
                     </div>
                     </div>


               {/*<div className="row uni-no-mar flex-column">
               <Label className="uni-label">Folders</Label>
               <div className="row">
                     <div className="col-md-4">
                     <FormGroup>
                         
                            <img src={PersonalIcon} alt="home-icon"  className="uni-icon pr-2" />
                          </FormGroup>
                     </div>
                     <div className="col-md-4">
                     <FormGroup>
                        
                            <img src={TransIcon} alt="home-icon"  className="uni-icon pr-2" />
                          </FormGroup>
                     </div>
                   </div>
                   
               </div>*/}


              <div className="row uni-no-mar flex-column">
                    <Label className="uni-label">Personal</Label>
                    <div className="row">

                        {this.state.pers.map(pers => (

                        <div className="col-md-4">
                          <FormGroup>
                              <img src={File1} alt={pers.orgfilename} className="uni-icon pr-2" />
                          </FormGroup>
                          <span><a href={imgpath+pers.filename} target="_blank" download>{pers.orgfilename}</a></span>
                        </div>

                        ) ) }

                    </div>
               </div>

               
               <div className="row uni-no-mar flex-column">
                    <Label className="uni-label">Transscripts</Label>
                    <div className="row">
                        
                    {this.state.trans.map(trans => (

                    <div className="col-md-4">
                      <FormGroup>
                          <img src={File1} alt={trans.orgfilename} className="uni-icon pr-2" />
                      </FormGroup>
                      <span><a href={imgpath+trans.filename} target="_blank" download>{trans.orgfilename}</a></span>
                    </div>

                    ) ) }

                    </div>
               </div>

               <div className="row uni-no-mar flex-column">
               <Label className="uni-label">Files</Label>
               <div className="row">


                    {this.state.docs.map(docs => (

                      <div className="col-md-4">
                        <FormGroup>
                            <img src={File1} alt={docs.orgfilename} className="uni-icon pr-2" />
                        </FormGroup>
                        <span><a href={imgpath+docs.filename} target="_blank" download>{docs.orgfilename}</a></span>
                     </div>
                    
                    ) ) }
                     
                     {/*
                     <div className="col-md-4">
                     <FormGroup>
                        
                            <img src={File2} alt="home-icon"  className="uni-icon pr-2" />
                          </FormGroup>
                     </div>
                     <div className="col-md-4">
                     <FormGroup>
                        
                            <img src={File3} alt="home-icon"  className="uni-icon pr-2" />
                          </FormGroup>
                     </div>
                     <div className="col-md-4">
                     <FormGroup>
                        
                            <img src={File4} alt="home-icon"  className="uni-icon pr-2" />
                          </FormGroup>
                     </div>
                     */}
                   </div>
                   
               </div>
               <div className="col-12 d-flex justify-content-end mr-3">
                      <Button color="primary" className="score-back mx-4" data-toggle="tab" href="#tab3" role="tab">BACK</Button>
                      <Button color="primary" className="score-save" type="submit" onClick={this.onSubmit.bind(this)}>FINISH</Button>
                     </div>
           </div>
           
          </div>
     </div>
    </div>
  );
};

export default template;
