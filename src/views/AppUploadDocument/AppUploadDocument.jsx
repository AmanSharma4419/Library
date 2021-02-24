import "./AppUploadDocument.css";
import Pricon from '../../assets/img/student/folder-icon.svg';
import Bluefolder from '../../assets/img/student/blue-folder.svg';
import dwnicon from '../../assets/img/download.png';
import dlteicon from '../../assets/img/delete.svg';
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
import config from '../../config.json';

function template() {
  const imgpath = `${config.baseurl}`;
  return (
    <div className="upload-docment">
        <div className="row">
		  <div className="col-12 per-box py-4">
              <div className="match-box py-2">
              to get more relevant results, including "Best match" and apply to programs and schools that align with your background, skills, and interests.

              </div>
           <div className="destination-box">
           <div className="pr-header d-flex">
                 <h3 className="mr-3">Documents</h3>  
                 <div className="upload-btn-wrapper">
				   
                {this.state.disabled===true?null: <Button color="primary" className="blue-addmore">+ Add files</Button>}
                    <Input type="file" id="upfile" className='' accept="image/*,application/pdf" onChange={this.onFileChange} name="upload_photo[]" />
					
					 <div>{this.state.filename}</div>
                  </div>
                  <h6 style={{color: 'red', marginLeft:'20px', paddingTop:'10px'}}>{this.state.errors.fileLength}</h6>
             </div>

                  {/* <div className="row">
                     <div className="col-md-6">
                        <FormGroup>
                            <Label className="uni-label">SELECT FOLDER</Label>
                            <Input type="select" id="foldertype" onChange={this.handleFolderChange} className=''>
                              <option value="">Select</option>
                              <option value="1">Personal</option>
                              <option value="2">Transscripts</option>
                            </Input>
                        </FormGroup>
                        
                     </div>
                     </div> */}
                     <div className="row">
						<div class="col-sm-10 lib-add mt-4">
							<h4 class="d-inline-block pr-md-5 pr-3 upload-doc-title">Folder</h4>
						</div>
					</div>

<div className="row">
                 <div className="col-12 row">
                 <div className="col-md-3 col-lg-3 col-xl-3 lib-box">
					   <div class="media personal">
						<img class="mr-3" src={Pricon} alt="file name" />
						<div class="media-body" style={{cursor:'pointer'}} onClick={this.handleFolderChange("1")}>
							<h5 class="mt-0">Personal</h5>
						</div>
						</div>
					</div>
            <div className="col-md-3 col-lg-3 col-xl-3 lib-box">
					   <div class="media transcripts">
						<img class="mr-3" src={Pricon} alt="file name" />
						<div class="media-body" style={{cursor:'pointer'}} onClick={this.handleFolderChange("2")}>
							<h5 class="mt-0">Transcripts</h5>
						</div>
						</div>
					</div>
                 </div>
               </div>

               <div className="row">
						<div class="col-sm-10 lib-add mt-4 pb-0">
							<h4 class="d-inline-block pr-md-5 pr-3 upload-doc-title">Files</h4>
						</div>
					</div>
          <div className="row">
                 <div className="col-12 row">
          
		            {this.state.showtranscripts ? 
					<>
					 
					 {this.state.trans.map(trans => (
					   <div className="col-md-3 col-lg-3 col-xl-3 lib-box mt-3">
						<div className="media flex-column pl-0">
						<div class="media-lib text-center mt-4">
						<img class="" src={Bluefolder} alt="file name" width="90"/>
						</div>
						<div class="media-body text-center">
						<a href={imgpath+trans.filename} target="_blank" id='down_img' ><h5 class="mt-0 mb-0">{trans.orgfilename}</h5></a>
						</div>
						<div className="col-12">

            {this.state.disabled===false?		<div class="row float-right">
						<a  target="_blank" download><img class="ml-2 mt-2 mb-2" src={dwnicon} alt="file name" width="10"/></a>
						<a onClick={this.onClickdelete(trans.id)}><img class="m-2" src={dlteicon} alt="file name" width="10"/></a>
						</div>
:null}
						</div>

							</div>
							</div>
							  ) ) }
						</>	 
					: <></>
					}
					
					
					 {this.state.showpersonal ? <>
					
			  	  {this.state.pers.map(pers => (
				      
					   <div className="col-md-3 col-lg-3 col-xl-3 lib-box mt-3">
						<div className="media flex-column pl-0">
						<div class="media-lib text-center mt-4">
						<img class="" src={Bluefolder} alt="file name" width="90"/>
						</div>
						<div class="media-body text-center">
						<a href={imgpath+pers.filename} target="_blank" id='down_img' ><h5 class="mt-0 mb-0">{pers.orgfilename}</h5></a>
						</div>
						<div className="col-12">

						{this.state.disabled===false?	<div class="row float-right">
						<a  target="_blank" download><img class="ml-2 mt-2 mb-2" src={dwnicon} alt="file name" width="10"/></a>
						<a onClick={this.onClickdelete(pers.id)}><img class="m-2" src={dlteicon} alt="file name" width="10"/></a>

						</div>
:null}
						</div>

							</div>
							</div>
							  ) ) }
                     
					 </>	 
					: <></>
					}
							  
         
         
		  
			  {this.state.docs.map(docs => (
					   <div className="col-md-3 col-lg-3 col-xl-3 lib-box mt-3">
						<div className="media flex-column pl-0">
						<div class="media-lib text-center mt-4">
						<img class="" src={Bluefolder} alt="file name" width="90"/>
						</div>
						<div class="media-body text-center">
						<a href={imgpath+docs.filename} target="_blank" id='down_img' ><h5 class="mt-0 mb-0">{docs.orgfilename}</h5></a>
						</div>
						<div className="col-12">

						{this.state.disabled===false?	<div class="row float-right">
						<a  target="_blank" download><img class="ml-2 mt-2 mb-2" src={dwnicon} alt="file name" width="10"/></a>
						<a onClick={this.onClickdelete(docs.id)}><img class="m-2" src={dlteicon} alt="file name" width="10"/></a>

						</div>
:null}
						</div>

							</div>
							</div>
							  ) ) }
						
						
					
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


              {/* <div className="row uni-no-mar flex-column">
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
               </div> */}

               
               {/* <div className="row uni-no-mar flex-column">
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
               </div> */}

               {/* <div className="row uni-no-mar flex-column">
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
                     
                   
                   </div>
                   
               </div> */}
              
              
               <div className="col-12 d-flex justify-content-end mr-3">
			   
						{this.state.disabled===false?( <Button color="primary" className="score-save" type="submit" onClick={this.onSubmit.bind(this)}>FINISH</Button>
					  ):( <Button
              color="primary"
              className="score-back mx-4 aftersave"
              onClick={this.prevtab}
            >
              BACK
            </Button>)}
                     
					   
                     </div>
           </div>
           
          </div>
     </div>
    </div>
  );
};

export default template;
