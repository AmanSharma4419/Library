import "./AppTestscore.css";
import React from "react";
import QueTestAddMore from './../Addmore/TestAddMore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader,
  CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table, Container,
  ListGroup, ListGroupItem, Media, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon,
  InputGroupButtonDropdown, InputGroupText, Label
} from 'reactstrap';
import Infoicon from '../../assets/img/student/info-icon.svg';
import Closeicon from '../../assets/img/close-btn.svg';

function template() {
  const testtab = () => {
    this.setState({ TestAddMore: false, selectedQuestion2: null })
  }
  return (
    <div className="apptestscore">
      <div className="row">
        {/*{this.state.contentclose ?
	  
          <div className="col-12">
            <div className="complete-box flex-column">
            <div className="com-top d-flex justify-content-end">
           <img src={Closeicon} alt="home-icon" onClick={this.closepop1} className="uni-icon pr-2" />
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

          <p style={{ display: this.state.TestAddMore == false ? "block" : "none" }}>
            <div className="destination-box">
              <div className="pr-header">
                <h3>Test Scores</h3>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label className="uni-label">English Exam Type</Label>
                    <Input disabled={this.state.disabled} type="select" id="examtype" onChange={this.handleExamtypeChange} className=''>
                      <option value="">Select</option>
                      <option value="toefl" selected={'toefl' == this.state.examtype}>TOEFL</option>
                      <option value="ielts" selected={'ielts' == this.state.examtype}>IELTS</option>
                    </Input>
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.examtype}</h6>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label className="uni-label"> Exam Date</Label>
                    {/*
                            <Input type="date" dateFormat="dd-mm-yyyy" className="form-control" placeholder="YYYY-MMM-DD"
                            id="examdate" onChange={this.handleExamdateChange}
                             />*/}

                    <DatePicker
                      disabled={this.state.disabled}
                      selected={this.state.examdate}
                      onChange={this.handleExamdateChange}
                      dateFormat="yyyy-MM-dd"
                      className=''
                      id="examdate"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="YYYY-MMM-DD"
                    />

                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.examdate}</h6>
                </div>

              </div>
            </div>
            <div className="scroe-box">
              <div className="pr-header">
                <h3>Input Exact Scores</h3>

              </div>
              <div className="row uni-no-mar">
                <div className="col-md-3 uni-no-padd no-br">
                  <FormGroup>
                    <Label className="uni-label">Reading Scores</Label>
                    <Input disabled={this.state.disabled} type="number" className="form-control " placeholder="Enter Scores"
                      id="readingscore" onChange={this.handleReadingscoreChange} value={this.state.readingscore}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                      }}
                    />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.readingscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-br no-br-l">
                  <FormGroup>
                    <Label className="uni-label">Listening Scores</Label>
                    <Input disabled={this.state.disabled} type="number" className="form-control " placeholder="Enter Scores"
                      id="listeningscore" onChange={this.handleListeningscoreChange} value={this.state.listeningscore}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                      }}
                    />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.listeningscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-br no-br-l">
                  <FormGroup>
                    <Label className="uni-label">Writing Scores</Label>
                    <Input disabled={this.state.disabled} type="number" className="form-control " placeholder="Enter Scores"
                      id="writingscore" onChange={this.handleWritingscoreChange} value={this.state.writingscore}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                      }}
                    />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.writingscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-bl">
                  <FormGroup>
                    <Label className="uni-label">speaking Scores</Label>
                    <Input disabled={this.state.disabled} type="number" className="form-control " placeholder="Enter Scores"
                      id="speakingscore" onChange={this.handleSpeakingscoreChange} value={this.state.speakingscore}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                      }}
                    />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.speakingscore}</h6>
                </div>

              </div>


              <div className="form-check my-3">
                <Label className="check-name" >
                  <input disabled={this.state.disabled} type="checkbox" className="form-check-input" value="1"
                    id="englishCheck" onChange={this.handleEnglishCheckChange} />
                  <span className="checkmark"></span>

                </Label>
                <label className="form-check-label pl-3">I don’t have any test scores</label>
              </div>

              <h6 style={{ color: 'red' }}>{this.state.errors.englishCheck}</h6>
            </div>
            <div className="personal-box-inner score-mark-box">
              <div className="pr-header my-3">
                <h3>Additional Qualifications</h3>
                <h5>GRE exam scores</h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label className="uni-label">GRE Exam Date</Label>
                    {/*
                        <Input type="text" className="form-control" placeholder="YYYY-MMM-DD " 
                        id="greexamdate" onChange={this.handleGreexamdateChange}
                        />*/}

                    <DatePicker
                      disabled={this.state.disabled}
                      selected={this.state.greexamdate}
                      onChange={this.handleGreexamdateChange}
                      dateFormat="yyyy-MM-dd"
                      className=''
                      id="greexamdate"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="YYYY-MMM-DD"
                    />

                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.greexamdate}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">Verbal</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.greverbalscore}
                          id="greverbalscore" onChange={this.handleGreverbalscoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>

                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.greverbalrank}
                          id="greverbalrank" onChange={this.handleGreverbalrankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>

                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.greverbalscore}</h6>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">Quantitative</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.grequanitativescore}
                          id="grequanitativescore" onChange={this.handleGrequanitativescoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.grequanitativerank}
                          id="grequanitativerank" onChange={this.handleGrequanitativerankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.grequanitativescore}</h6>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">Writing</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.grewritingscore}
                          id="grewritingscore" onChange={this.handleGrewritingscoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.grewritingrank}
                          id="grewritingrank" onChange={this.handleGrewritingrankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.grewritingscore}</h6>
                </div>
              </div>


              <div className="form-check my-3">
                <Label className="check-name" >
                  <input disabled={this.state.disabled} type="checkbox" className="form-check-input" value="1" id="greCheck" onChange={this.handleGrecheckChange} />
                  <span className="checkmark"></span>

                </Label>
                <label className="form-check-label pl-3">I don’t have GRE exam scores</label>
              </div>
              <h6 style={{ color: 'red' }}>{this.state.errors.greCheck}</h6>
            </div>
            <div className="personal-box-inner address score-grt">
              <div className="pr-header">
                <h5>GMAT exam scores</h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label className="uni-label">GMAT Exam Date</Label>
                    {/*<Input type="text" className="form-control" placeholder="YYYY-MMM-DD " 
                        id="gmatexamdate" onChange={this.handleGmatexamdateChange}
                        />*/}

                    <DatePicker
                      disabled={this.state.disabled}
                      selected={this.state.gmatexamdate}
                      onChange={this.handleGmatexamdateChange}
                      dateFormat="yyyy-MM-dd"
                      className=''
                      id="gmatexamdate"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="YYYY-MMM-DD"
                    />

                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.gmatexamdate}</h6>
                </div>

              </div>
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">Verbal</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmatverbalscore}
                          id="gmatverbalscore" onChange={this.handleGmatverbalscoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmatverbalrank}
                          id="gmatverbalrank" onChange={this.handleGmatverbalrankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.gmatverbalscore}</h6>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">Quantitative</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmatquanitativescore}
                          id="gmatquanitativescore" onChange={this.handleGmatquanitativescoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmatquanitativerank}
                          id="gmatquanitativerank" onChange={this.handleGmatquanitativerankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.gmatquanitativescore}</h6>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">Writing</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmatwritingscore}
                          id="gmatwritingscore" onChange={this.handleGmatwritingscoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmatwritingrank}
                          id="gmatwritingrank" onChange={this.handleGmatwritingrankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.gmatwritingscore}</h6>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-12">
                  <Label className="uni-label">TOTAL</Label>
                  <div className="score-list flex-column">
                    <div className="score-name border-gray">
                      <div className="scor-1">
                        Score
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmattotalscore}
                          id="gmattotalscore" onChange={this.handleGmattotalscoreChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-name">
                      <div className="scor-1">
                        Rank %
                             </div>
                      <div className="score-in">
                        <Input disabled={this.state.disabled} type="number" className="form-control " value={this.state.gmattotalrank}
                          id="gmattotalrank" onChange={this.handleGmattotalrankChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h6 style={{ color: 'red' }}>{this.state.errors.gmattotalscore}</h6>
                </div>
              </div>


              <div className="form-check my-3">
                <Label className="check-name" >
                  <input disabled={this.state.disabled} type="checkbox" className="form-check-input" value="1"
                    id="gmatCheck" onChange={this.handleGmatCheckChange}
                  />
                  <span className="checkmark"></span>

                </Label>
                <label className="form-check-label pl-3">I don’t have GMAT exam scores</label>
              </div>
              <h6 style={{ color: 'red' }}>{this.state.errors.gmatCheck}</h6>
            </div>




            <div className="col-12 d-flex justify-content-end">
              {this.state.disabled === false ?
                (<Button color="primary" className="score-save " type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>) : (
                  <div className="col-12 d-flex justify-content-end"> <Button
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
          <p style={{ display: this.state.TestAddMore == true ? "block" : "none" }}>
            <QueTestAddMore clearTestAddmore={this.state.clearTestAddmore} getQuestiondata={this.getQuestiondata2} selectedQuestion={this.state.selectedQuestion2}></QueTestAddMore>
          </p>
        </div>
        <div className="col-12 col-md-3" >
          <div className=" list-card uni-no-padd mt-3 add-more-box" >

            <button className="list-group-item w-100"
              // className="nav-l"
              onClick={() => testtab()}
            >

              Test Score
                                       </button>

            <div className="uni-no-padd card-body">
              <ul className="university-list list-group">
                <div className="stepone">
                  <div className="steptwo">
                    {this.state.questiondata2.map((question, index) =>
                      <li id="about" key={index} className="list-group-item" onClick={() => this.setQuestiondata2(index)}>{question.question[0]}</li>
                    )}


                  </div>

                </div></ul></div>



          </div>                 </div>

      </div>
    </div>
  );
};

export default template;
