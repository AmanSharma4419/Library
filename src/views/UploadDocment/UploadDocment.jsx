import "./UploadDocment.css";
import React from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, 
  DropdownToggle, Table, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Infoicon from '../../assets/img/student/info-icon.svg';
import Pricon from '../../assets/img/student/folder-icon.svg';
import trashicon from '../../assets/img/student/trash.svg';
import Closeicon from '../../assets/img/close-btn.svg';
import gDriveIcon from '../../assets/img/student/gDriveIcon.svg';
import dropboxIcon from '../../assets/img/student/dropboxIcon.svg';
import Foldericon from '../../assets/img/student/folder-icon.svg';
import FolderNotchOpen from '../../assets/img/student/FolderNotchOpen.png';
import keyboard_arrow_down from '../../assets/img/student/keyboard_arrow_down.png';
import config from '../../config.json';
import { FileDrop } from 'react-file-drop';
import GooglePicker from 'react-google-picker';
import moment from 'moment'

const styles = { 
  border: '1px solid black',
  width: 600,
  color: 'black',
  padding: 10,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 20,
};

function template() {
  const imgpath = `${config.baseurl}`;
  return (
    <div className="upload-docment">
      <div className="row">
        {this.state.contentclose2 ?
          <div className="col-12">
            <div className="complete-box flex-column">
              <div className="row">
                <div className="com-top col-6">
                  <img 
                    src={Infoicon}
                    alt="home-icon"
                    className="uni-icon pr-2" 
                  /> 
                  <span className="align-middle"></span>PLEASE COMPLETE YOUR PROFILE?
                </div>
                <div className="com-top col-6 d-flex justify-content-end">
                  <img
                    src={Closeicon}
                    alt="home-icon"
                    onClick={this.closepop3}
                    className="uni-icon pr-2"
                  />
                </div>
              </div>
              <div className="com-body">
                <p className="com-text mb-0">
                  <strong>Save time :</strong> complete your profile once and use for multiple enquiries/applications<br/>
                  <strong>Receive the best guidance from institutions :</strong> allow them to send you the most accurate information possible
                </p>
              </div>
            </div>
            <div className="match-box py-2 col-10">
              to get more relevant results, including "Best match" and apply to programs and schools that align with your background, skills, and interests.
            </div>
          </div>
          : null
        }
        <div className="col-12 per-box py-4 px-4">              
          <div className="destination-box">
            <div className="pr-header d-block d-sm-flex mb-4">
              <h3 className="mr-5">Documents</h3>  
              <div className="upload-btn-wrapper profile-btn align-middle">
                <Button color="primary" className="disablepro" onClick={this.handleAddFileModal}>+ Add files</Button>
                {/* <Input type="file" multiple id="upfile" className='' accept="image/*,application/pdf" onChange={this.onFileChange} name="upload_photo[]" />     */}
                {/* {this.state.filename.map(item=>{return(<div>{item}</div>)})} */}
              </div>
              <div >
                <Modal isOpen={this.state.fileModalOpen} className={'addfile-pop-outer modal-lg max-250 ' + this.props.className}>
                  <ModalHeader toggle={() => this.setState({ fileModalOpen: false })}></ModalHeader>
                  <ModalBody className="addfilepopup student-popup text-center">

                    <h2>+ Add Files</h2>

                    <div className="add_file_sec">
                      <div className="add-file-header d-flex justify-content-between align-items-center" 
                        onClick={()=>{this.setState((prevState)=>({fileDropdownOpen : !prevState.fileDropdownOpen}))}}
                      >
                        <h2>Browse files</h2>
                        <div className="afh_icon"><img src={keyboard_arrow_down} alt="keyboard_arrow_down" /></div>
                      </div>
                      {this.state.fileDropdownOpen ? 
                        <div className="add-file-content">
                          <ul>
                            <li>
                              <div className="upload-btn-wrapper">
                                <button className="btn">
                                  <img src={FolderNotchOpen} alt="FolderNotchOpen" />
                                  <span>From Device</span>
                                </button>
                                <input type="file" name="myfile" onChange={this.handleBrowseFromDevice}/>
                              </div>
                            </li>
                            {/* <li>
                              <div className="upload-btn-wrapper">
                                <button className="btn">
                                  <img src={dropboxIcon} alt="dropboxIcon" /> <span>From Dropbox</span>
                                </button>
                                <input type="file" name="myfile1" />
                              </div>
                            </li> */}
                            <li>
                              <div className="upload-btn-wrapper" onClick={() => this.handleBrowseFrom(`Google Drive`)}>
                                <button className="btn">
                                  <GooglePicker 
                                    clientId={'899782020464-3v6jdrsr5ag7laior2sev2utdm6vvt5r.apps.googleusercontent.com'}
                                    developerKey={'AIzaSyDWron2YqY7OOGlrAKiphwJ_qFHNp476dk'}
                                    scope={['https://www.googleapis.com/auth/drive.readonly']}
                                    onChange={data => this.handleGPickerFileChange(data)}
                                    onAuthenticate={token => console.log('oauth token:', token)}
                                    onAuthFailed={data => console.log('on auth failed:', data)}
                                    multiselect={true}
                                    navHidden={true}
                                    authImmediate={false}
                                    viewId={'DOCS'}
                                  >
                                    <img src={gDriveIcon} alt="gDriveIcon" /> <span>From Google Drive</span>
                                    <div className="google" style={{zIndex: '2000'}}></div>
                                  </GooglePicker>
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                        :
                        null
                      }
                    </div>

                    {/* <Dropdown 
                      isOpen={this.state.fileDropdownOpen} 
                      toggle={()=>{this.setState({fileDropdownOpen : !this.state.fileDropdownOpen});}}
                    >
                      <DropdownToggle caret> {this.state.browseFrom ? this.state.browseFrom : "Browse Files"} </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem 
                          style={{textTransform: "uppercase"}}
                          onClick={()=>{this.deviceSelectRef.click()}}
                        >
                          <img class="mr-3" src={Pricon} alt="file name" style={{height: "15px"}}/>
                          From Device
                          <input
                            type='file'
                            id='file'
                            multiple
                            ref={(ref) => this.deviceSelectRef = ref}
                            style={{display: 'none'}}
                            onChange={this.handleBrowseFromDevice}
                          />
                        </DropdownItem>


                        //We will add Dropbox functionality later 
                        
                        <DropdownItem 
                          style={{textTransform: "uppercase"}}
                          onClick={() => this.handleBrowseFrom(`Dropbox`)}
                        >
                          <img class="mr-3" src={dropboxIcon} alt="file name" />
                          From DropBox
                        </DropdownItem>
                        <DropdownItem 
                          style={{textTransform: "uppercase"}}
                          onClick={() => this.handleBrowseFrom(`Google Drive`)}
                        >
                          <GooglePicker 
                            clientId={'899782020464-3v6jdrsr5ag7laior2sev2utdm6vvt5r.apps.googleusercontent.com'}
                            developerKey={'AIzaSyDWron2YqY7OOGlrAKiphwJ_qFHNp476dk'}
                            scope={['https://www.googleapis.com/auth/drive.readonly']}
                            onChange={data => this.handleGPickerFileChange(data)}
                            onAuthenticate={token => console.log('oauth token:', token)}
                            onAuthFailed={data => console.log('on auth failed:', data)}
                            multiselect={true}
                            navHidden={true}
                            authImmediate={false}
                            viewId={'DOCS'}
                          >
                            <span><img class="mr-3" src={gDriveIcon} alt="file name" />From Google Drive</span>
                            <div className="google" style={{zIndex: '2000'}}></div>
                          </GooglePicker>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}

                    <h3> OR </h3>
                    <div className="drop-img-sec">
                      <div className="text-center" style={styles}>
                        <FileDrop
                          onDrop={(files, event) => this.handleDropFiles(files, event)}
                        >
                          Drag & Drop files here!
                        </FileDrop>
                      </div>
                      {this.state.filename ?
                        <ul>
                          { this.state.filename.map((doc, index) => <li key={index}>{doc}</li> ) }
                        </ul>
                        :
                        null
                      }
                    </div>
                    <div className="form-group  text-center">
                      <div className="select-wrapper">
                        <Input type="select" id="uploadDocType" onChange={this.handleUploadDocTypeChange} className='' style={{textTransform: "uppercase"}}>
                          <option value="">Type of Document</option>
                          <option value="doc_medical_records" selected={'doc_medical_records' == this.state.uploadDocType}>Medical Records</option>
                          <option value="doc_academic_records" selected={'doc_academic_records' == this.state.uploadDocType}>Academic Records</option>
                          <option value="doc_entry_exam_results" selected={'doc_entry_exam_results' == this.state.uploadDocType}>Entry Exam Results</option>
                          <option value="doc_personal_documents" selected={'doc_personal_documents' == this.state.uploadDocType}>Personal documents</option>
                          <option value="doc_immigration_documents" selected={'doc_immigration_documents' == this.state.uploadDocType}>Immigration documents</option>
                          <option value="doc_other" selected={'doc_other' == this.state.uploadDocType}>Other</option>
                        </Input>
                      </div>
                    </div>
                    <div className="text-center pp-btn">
                      <Button
                        color="secondary"
                        disabled={!this.state.formData}
                        onClick={this.handleUploadFiles} className="upload-btn"
                      >Upload</Button>
                      <Button 
                        color="secondary" className="cancle-btn" 
                        onClick={() => this.setState({ fileModalOpen: false })}
                      >Cancel</Button>
                    </div>
                    
                  </ModalBody>
                </Modal>
              </div>
            </div>

            <div className="upldoctable">
              <Table >
                <thead style={{backgroundColor: "#F2F2F2"}}>
                  <tr>
                    <th className="text-center nameth">Name</th>
                    <th className="text-center docth"> 
                      <div className="select-wrapper">
                        <Input type="select" id="tableDocType" onChange={this.handleTableDocTypeChange} className='disablepro' style={{textTransform: "uppercase"}}>
                          <option value="">Type of Document</option>
                          <option value="doc_medical_records" selected={'doc_medical_records' == this.state.tableDocType}>Medical Records</option>
                          <option value="doc_academic_records" selected={'doc_academic_records' == this.state.tableDocType}>Academic Records</option>
                          <option value="doc_entry_exam_results" selected={'doc_entry_exam_results' == this.state.tableDocType}>Entry Exam Results</option>
                          <option value="doc_personal_documents" selected={'doc_personal_documents' == this.state.tableDocType}>Personal documents</option>
                          <option value="doc_immigration_documents" selected={'doc_immigration_documents' == this.state.tableDocType}>Immigration documents</option>
                          <option value="doc_other" selected={'doc_other' == this.state.tableDocType}>Other</option>
                        </Input>
                      </div>
                    </th>
                    <th className="text-center createth">Created</th>
                    <th className="text-center slctth"> 
                    <p onClick={this.handleDeleteDocuments}><img src={trashicon}/> 
                    </p >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.docs && this.state.docs.length ?
                    this.state.docs.map((doc, index)=>{
                      console.log('doc', doc);
                      return(
                        <tr className="text-center">
                          <td><p>{doc.orgfilename}</p></td>
                          <td><p>Medical Records</p></td>
                          <td><p>MON 21 JULY<br></br>8:30AM</p></td>
                          <td>
                            <p>
                            <div class="custom-control custom-checkbox ">
                            
                            <input 
                              type="checkbox"
                              id={doc.id}
                              checked={this.state.checkedItems[`${doc.id}`]}
                              onChange={this.handleFileCheckbox}
                              className="custom-control-input"
                            />
                            <label class="custom-control-label" for="customControlAutosizing"></label>
                          </div>
                            </p>
                           
                          </td>
                        </tr>
                      )
                    })
                    :
                    <tr className="text-center">
                      <td colSpan="4">It seems, you havn't uploaded any file.</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>
            <div className="col-12 d-flex justify-content-end mr-3 mt-4">
			        <Button color="primary" className="score-back mx-4 aftersave" onClick={this.prevtab}>BACK</Button>
				      <Button color="primary" className="score-back mx-4 beforesave" onClick={this.prevtab}>BACK</Button>
              <Button color="primary" className="score-save beforesave" type="submit" onClick={this.onSubmit.bind(this)}>FINISH</Button>
					  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default template;
