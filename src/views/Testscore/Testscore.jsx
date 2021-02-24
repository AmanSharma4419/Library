import "./Testscore.css";
import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, FormGroup, Input, Label } from 'reactstrap';
import Infoicon from '../../assets/img/student/info-icon.svg';
import Closeicon from '../../assets/img/close-btn.svg';
import AdditionalQualification from './Additional_Qualification';
import Select from 'react-select';

const options = [
  { value: '', label: 'I don’t have this' },
  { value: 'toefl', label: 'TOEFL' },
  { value: 'ielts', label: 'IELTS' },
  { value: 'pte', label: 'PTE' },
  { value: 'oet', label: 'OET' },
  { value: 'c1 Advanced', label: 'C1 Advanced' },
];

function template() {
  const { examtype, 
    toefl_reading_score, ilets_reading_score, pte_reading_score, oet_reading_score, c_reading_score,
    toefl_listening_score, ilets_listening_score, pte_listening_score, oet_listening_score, c_listening_score,
    toefl_writing_score, ilets_writing_score, pte_writing_score, oet_writing_score, c_writing_score,
    toefl_speaking_score, ilets_speaking_score, pte_speaking_score, oet_speaking_score, c_speaking_score,
    // toefl_reading_score, ilets_reading_score, pte_reading_score, oet_reading_score, 
  } = this.state;
  return (
    <div className="testscore student-testscore">
      <div className="row">
        {this.state.contentclose ?
          <div className="col-12">
            <div className="complete-box flex-column">
              <div className="row">
                <div className="com-top col-6">
                  <img src={Infoicon} alt="home-icon" className="uni-icon pr-2" /> 
                  <span className="align-middle">PLEASE COMPLETE YOUR PROFILE?</span>
                </div>
                <div className="com-top col-6 d-flex justify-content-end">
                  <img src={Closeicon} alt="home-icon" onClick={this.closepop1} className="uni-icon pr-2" />
                </div>
              </div>
              <div className="com-body">
                <p className="com-text mb-0">
                  <strong>Save time :</strong> Complete your profile once and use for multiple enquiries/applications<br />
                  <strong>Receive the best guidance from institutions :</strong> 
                  Allow them to send you the most accurate information possible
                </p>
              </div>
            </div>
          </div>
          : null
        }

        <div className="col-12 per-box py-4">
          <div className="destination-box english-exam-column col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header"> <h3>English Exam</h3> </div>
            <div className="row ">
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">English Exam Type</Label>
                  <div className="select-wrapper">
                    {/* <Select
                    value={examtype}
                    onChange={this.handleExamtypeChange}
                    options={options}
                    /> */}
                    <Input type="select" id="examtype" onChange={this.handleExamtypeChange} className='disablepro'>
                      <option value="">I don’t have this</option>
                      <option value="toefl" selected={'toefl' == this.state.examtype}>TOEFL</option>
                      <option value="ielts" selected={'ielts' == this.state.examtype}>IELTS</option>
                      <option value="pte" selected={'pte' == this.state.examtype}>PTE</option>
                      <option value="oet" selected={'oet' == this.state.examtype}>OET</option>
                      <option value="c1 Advanced" selected={'c1 Advanced' == this.state.examtype}>C1 Advanced</option>
                    </Input>
                  </div>
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.examtype}</h6>
              </div>
              {/* English Exam DatePicker */}
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label"> Exam Date</Label>
                  <DatePicker
                    selected={this.state.examdate}
                    onChange={this.handleExamdateChange}
                    dateFormat="yyyy-MM-dd"
                    className='disablepro'
                    id="examdate"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="YYYY-MMM-DD"
                    maxDate={new Date()}
                  />
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.examdate}</h6>
              </div>
            </div>
          </div>
          {/* For IELTS and TOEFL Exams */}
          {examtype === "ielts" || examtype === "toefl" ?
            <div className="scroe-box ielts-toef-scror-box col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {/* Total Score */}
              <div className="pr-header">
                <h3>Input Exact Scores</h3>
                <div className="col-md-3 uni-no-padd no-bl">
                  <FormGroup className="mb-0 tscolumn">
                    <Label className="uni-label">Total Score</Label>
                    <Input type="number" className="form-control total-score" 
                      id="averagescore" value={examtype === "ielts" ? this.state.ilets_total_score : this.state.toefl_total_score}
                      placeholder={
                          examtype === "toefl" ? "Enter A Test Score Between 0 and 120" : "Enter Overall Scores"
                      }
                      // onInput={(e) => {
                      //     e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                      // }}
                      disabled
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="row uni-no-mar">
                <div className="col-md-3 uni-no-padd no-br">
                  <FormGroup className="mb-0">
                    <Label className="uni-label">Reading Scores</Label>
                    <Input type="number" className="form-control disablepro" 
                        id="readingscore" onChange={this.handleReadingscoreChange} 
                        value={examtype === "ielts" ? ilets_reading_score : toefl_reading_score} 
                        placeholder="Enter Scores" min="0" 
                        max={examtype === "ielts" ? "9" : "30"} 
                        step={examtype === "ielts" ? "0.5" : ""}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            // e.target.value = (e.target.value%1)>0.5 ? parseInt(e.target.value)+1 : parseInt(e.target.value)+0.5;
                        }}
                    />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.readingscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-br no-br-l">
                  <FormGroup className="mb-0">
                      <Label className="uni-label">Listening Scores</Label>
                      <Input type="number" className="form-control disablepro" 
                          id="listeningscore" onChange={this.handleListeningscoreChange} 
                          value={examtype === "ielts" ? ilets_listening_score : toefl_listening_score} 
                          placeholder="Enter Scores" min="0" 
                          max={examtype === "ielts" ? "9" : "30"} 
                          step={examtype === "ielts" ? "0.5" : ""}
                          onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                      />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.listeningscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-br no-br-l">
                  <FormGroup className="mb-0">
                      <Label className="uni-label">Writing Scores</Label>
                      <Input type="number" className="form-control disablepro" 
                          id="writingscore" onChange={this.handleWritingscoreChange} 
                          value={examtype === "ielts" ? ilets_writing_score : toefl_writing_score} 
                          placeholder="Enter Scores" min="0" 
                          max={examtype === "ielts" ? "9" : "30"} 
                          step={examtype === "ielts" ? "0.5" : ""}
                          onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                      />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.writingscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-bl">
                  <FormGroup className="mb-0">
                      <Label className="uni-label">speaking Scores</Label>
                      <Input type="number" className="form-control disablepro" 
                          id="speakingscore" onChange={this.handleSpeakingscoreChange} 
                          value={examtype === "ielts" ? ilets_speaking_score : toefl_speaking_score}
                          placeholder="Enter Scores" min="0"
                          max={examtype === "ielts" ? "9" : "30"} 
                          step={examtype === "ielts" ? "0.5" : ""}
                          onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                          }}
                      />
                  </FormGroup>
                  <h6 style={{ color: 'red' }}>{this.state.errors.speakingscore}</h6>
                </div>
              </div>
              <h6 style={{ color: 'red' }}>{this.state.errors.englishCheck}</h6>
            </div>
            :
            null
          }

          {/* For OET and C1 Advance */}
          {examtype === "oet" || examtype === "c1 Advanced" ?
            <div className="scroe-box oet-c1-score-box col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {/* Total Score */}
              {examtype === "c1 Advanced"  ?
                <div className="pr-header">
                    <h3>Input Exact Scores</h3>
                    <div className="col-md-3 uni-no-padd no-bl">
                        <FormGroup className="mb-0">
                            <Label className="uni-label">Total Score</Label>
                            <Input type="number" className="form-control total-score" disabled
                                id="averagescore" value={this.state.averagescore}
                                placeholder={"Enter A Test Score Between 142 and 210"}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                                }}
                            />
                        </FormGroup>
                    </div>
                </div>
                :
                null
              }

              <div className="row uni-no-mar">
                <div className="col-md-3 uni-no-padd no-br">
                    <FormGroup className="mb-0">
                        <Label className="uni-label">Reading Scores</Label>
                        <Input type="number" className="form-control disablepro" 
                            id="readingscore" onChange={this.handleReadingscoreChange} 
                            value={this.state.readingscore} placeholder="Enter Scores" min="0" 
                            max={examtype === "ielts" ? "9" : examtype === 'c1 Advanced' ? "210" : "30"} 
                            step={examtype === "ielts" ? "0.5" : ""}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                                // e.target.value = (e.target.value%1)>0.5 ? parseInt(e.target.value)+1 : parseInt(e.target.value)+0.5;
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <Input type="number" className="form-control disablepro" 
                            id="averagescore" value={this.state.averagescore}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                            placeholder={"Grade"}
                        />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.readingscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-br no-br-l">
                    <FormGroup className="mb-0">
                        <Label className="uni-label">Listening Scores</Label>
                        <Input type="number" className="form-control disablepro" 
                            id="listeningscore" onChange={this.handleListeningscoreChange} 
                            value={this.state.listeningscore} placeholder="Enter Scores" min="0" 
                            max={examtype === "ielts" ? "9" : examtype === 'c1 Advanced' ? "210" : "30"} 
                            step={examtype === "ielts" ? "0.5" : ""}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <Input type="number" className="form-control disablepro" 
                            id="averagescore" value={this.state.averagescore}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                            placeholder={"Grade"}
                        />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.listeningscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-br no-br-l">
                    <FormGroup className="mb-0">
                        <Label className="uni-label">Writing Scores</Label>
                        <Input type="number" className="form-control disablepro" 
                            id="writingscore" onChange={this.handleWritingscoreChange} 
                            value={this.state.writingscore} placeholder="Enter Scores" min="0" 
                            max={examtype === "ielts" ? "9" : examtype === 'c1 Advanced' ? "210" : "30"} 
                            step={examtype === "ielts" ? "0.5" : ""}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <Input type="number" className="form-control disablepro" 
                            id="averagescore" value={this.state.averagescore}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                            placeholder={"Grade"}
                        />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.writingscore}</h6>
                </div>
                <div className="col-md-3 uni-no-padd no-bl">
                    <FormGroup className="mb-0">
                        <Label className="uni-label">speaking Scores</Label>
                        <Input type="number" className="form-control disablepro" 
                            id="speakingscore" onChange={this.handleSpeakingscoreChange} 
                            value={this.state.speakingscore} placeholder="Enter Scores" min="0"
                            max={examtype === "ielts" ? "9" : examtype === 'c1 Advanced' ? "210" : "30"} 
                            step={examtype === "ielts" ? "0.5" : ""}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <Input type="number" className="form-control disablepro" 
                            id="averagescore" value={this.state.averagescore}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                            placeholder={"Grade"}
                        />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.speakingscore}</h6>
                </div>
                {examtype === 'c1 Advanced' ? 
                  <div className="col-md-3 uni-no-padd no-bl useof-english">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">Use of English</Label>
                          <Input type="number" className="form-control disablepro"
                              placeholder="Enter Scores" id="speakingscore" onChange={this.handleSpeakingscoreChange}
                              value={this.state.speakingscore} min="0" max="210"
                              onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 3)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="averagescore" value={this.state.averagescore}
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.speakingscore}</h6>
                  </div>
                  :
                  null
                }

              </div>
              <h6 style={{ color: 'red' }}>{this.state.errors.englishCheck}</h6>
            </div>
            :
            null
          }

          {/* PTE Exam start */}
          {examtype === "pte" ?
            <div className="scroe-box pte-score-box col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
              <div className="pr-header">
                  <h3>Input Exact Scores</h3>
                  <div className="col-md-6 uni-no-padd">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">Total Score</Label>
                          <Input type="number" className="form-control" 
                              id="averagescore" value={this.state.averagescore}
                              placeholder={
                                  examtype === "toefl" ? "Enter A Test Score Between 0 and 120" : "Enter Overall Scores"
                              }
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              disabled
                          />
                      </FormGroup>
                  </div>
              </div>

              <div className="row uni-no-mar">
                  <div className="col-md-3 uni-no-padd no-br">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">LISTENING</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="listeningscore" onChange={this.handleReadingscoreChange} 
                              value={this.state.listeningscore} placeholder="Enter Scores" 
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                                  // e.target.value = (e.target.value%1)>0.5 ? parseInt(e.target.value)+1 : parseInt(e.target.value)+0.5;
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="listening_rank" value={this.state.listening_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.listeningscore}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.listening_rank}</h6>
                  </div>
                  <div className="col-md-3 uni-no-padd no-br no-br-l">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">READING</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="readingscore" onChange={this.handleListeningscoreChange} 
                              value={this.state.readingscore} placeholder="Enter Scores" 
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="listening_rank" value={this.state.listening_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.readingscore}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.listening_rank}</h6>
                  </div>
                  <div className="col-md-3 uni-no-padd no-br no-br-l">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">SPEAKING</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="writingscore" onChange={this.handleWritingscoreChange} 
                              value={this.state.writingscore} placeholder="Enter Scores" 
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="writing_rank" value={this.state.writing_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.writingscore}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.writing_rank}</h6>
                  </div>
                  <div className="col-md-3 uni-no-padd no-bl">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">WRITING</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="speakingscore" onChange={this.handleSpeakingscoreChange} 
                              value={this.state.speakingscore} placeholder="Enter Scores" 
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="speaking_rank" value={this.state.speaking_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.speakingscore}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.speaking_rank}</h6>
                  </div>
              </div>
          
              <div className="row uni-no-mar">
                  <div className="col-md-3 uni-no-padd no-br">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">GRAMMAR</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="pte_grammer_score" onChange={this.handleReadingscoreChange} 
                              value={this.state.pte_grammer_score} placeholder="Enter Scores" 
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                                  // e.target.value = (e.target.value%1)>0.5 ? parseInt(e.target.value)+1 : parseInt(e.target.value)+0.5;
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="pte_grammer_rank" value={this.state.pte_grammer_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_grammer_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_grammer_rank}</h6>
                  </div>
                  <div className="col-md-3 uni-no-padd no-br no-br-l">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">ORAL FLUENCY</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="pte_oral_score" onChange={this.handleListeningscoreChange} 
                              value={this.state.pte_oral_score} placeholder="Enter Scores" 
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="pte_oral_rank" value={this.state.pte_oral_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_oral_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_oral_rank}</h6>
                  </div>
                  <div className="col-md-3 uni-no-padd no-br no-br-l">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">PRONUNCIATION</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="pte_pron_score" onChange={this.handleWritingscoreChange} 
                              value={this.state.pte_pron_score} placeholder="Enter Scores"
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="pte_pron_rank" value={this.state.pte_pron_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_pron_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_pron_rank}</h6>
                  </div>
                  <div className="col-md-3 uni-no-padd no-bl">
                      <FormGroup className="mb-0">
                          <Label className="uni-label">SPELLING</Label>
                          <Input type="number" className="form-control disablepro" 
                              id="pte_spelling_score" onChange={this.handleSpeakingscoreChange} 
                              value={this.state.pte_spelling_score} placeholder="Enter Scores"
                              min="10" max="90"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 2)
                              }}
                          />
                      </FormGroup>
                      <FormGroup className="mb-0">
                          <Input type="number" className="form-control disablepro" 
                              id="pte_spelling_rank" value={this.state.pte_spelling_rank}
                              min="0" max="99"
                              onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                              placeholder={"Grade"}
                          />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_spelling_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.pte_spelling_rank}</h6>
                  </div>
              </div>
              
              <div className="row uni-no-mar">
                    <div className="col-md-3 uni-no-padd no-br">
                        <FormGroup className="mb-0">
                            <Label className="uni-label">VOCABULARY</Label>
                            <Input type="number" className="form-control disablepro" 
                                id="pte_vocab_score" onChange={this.handleSpeakingscoreChange} 
                                placeholder="Score 10-99" value={this.state.pte_vocab_score}
                                min="10" max="90"
                                onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 3)
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-0">
                            <Input type="number" className="form-control disablepro" 
                                id="pte_vocab_rank" onChange={this.handleSpeakingscoreChange} 
                                placeholder="Rank 0-99" value={this.state.pte_vocab_rank}
                                min="0" max="99"
                                onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 3)
                                }}
                            />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.pte_vocab_score}</h6>
                        <h6 style={{ color: 'red' }}>{this.state.errors.pte_vocab_rank}</h6>
                    </div>
                    <div className="col-md-3 uni-no-padd no-bl">
                        <FormGroup className="mb-0">
                            <Label className="uni-label">WRITTEN DISCOURSE</Label>
                            <Input type="number" className="form-control disablepro" 
                                id="pte_written_score" onChange={this.handleSpeakingscoreChange} 
                                placeholder="Score 10-99" value={this.state.pte_written_score}
                                min="10" max="90"
                                onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 3)
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-0">
                            <Input type="number" className="form-control disablepro" 
                                id="pte_written_rank" onChange={this.handleSpeakingscoreChange} 
                                placeholder="Rank 0-99" value={this.state.pte_written_rank}
                                min="0" max="99"
                                onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 3)
                                }}
                            />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.pte_written_score}</h6>
                        <h6 style={{ color: 'red' }}>{this.state.errors.pte_written_rank}</h6>
                    </div>
                </div>
                
            {/* </div> */}
            
            </div>
            :
            null
          }
          {/* PTE Exam end */}


{/* // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* Additional Exams Section */}
          {/* GRE Exam */}
          <div className="personal-box-inner score-mark-box mt-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header mt-4">
              <h3 className="add_qua">Additional Qualifications</h3>
              <div className="toggle_head_sec d-flex align-items-center justify-content-between">
                <h5>GRE exam scores</h5>
                <label class="switch togle_switch">
                  <input
                    type="checkbox"
                    className="disablepro"
                    value="1" id="greCheck"
                    onChange={this.handleGrecheckChange}
                  />
                  <span class="slider round"></span>
                </label>  
              </div>  
            </div>
            {this.state.greCheck ? 
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label className="uni-label">GRE Exam Date</Label>
                      <DatePicker
                        selected={this.state.greexamdate}
                        onChange={this.handleGreexamdateChange}
                        dateFormat="yyyy-MM-dd"
                        className='disablepro'
                        id="greexamdate"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="YYYY-MMM-DD"
                        maxDate={new Date()}
                      />

                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.greexamdate}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Verbal</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="130" max="170" 
                            className="form-control disablepro" value={this.state.greverbalscore}
                            id="greverbalscore" onChange={this.handleGreverbalscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>

                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.greverbalrank}
                            id="greverbalrank" onChange={this.handleGreverbalrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>

                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.greverbalscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.greverbalrank}</h6>

                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Quantitative</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="130" max="170" 
                            className="form-control disablepro" value={this.state.grequanitativescore}
                            id="grequanitativescore" onChange={this.handleGrequanitativescoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number"  min="0" max="99"
                            className="form-control disablepro" value={this.state.grequanitativerank}
                            id="grequanitativerank" onChange={this.handleGrequanitativerankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.grequanitativescore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.grequanitativerank}</h6>

                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Writing</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="6" step="0.5"
                            className="form-control disablepro" value={this.state.grewritingscore}
                            id="grewritingscore" onChange={this.handleGrewritingscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.grewritingrank}
                            id="grewritingrank" onChange={this.handleGrewritingrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.grewritingscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.grewritingrank}</h6>

                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Average</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="260" max="340" 
                            className="form-control disablepro" value={this.state.gretotalscore}
                            id="gretotalscore" onChange={this.handleGretotalscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.gretotalrank}
                            id="gretotalrank" onChange={this.handleGretotalrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gretotalscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gretotalrank}</h6>

                  </div>
                </div>

                {/* <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input disablepro" value="1" id="greCheck" onChange={this.handleGrecheckChange} />
                  <label className="form-check-label">I don’t have GRE exam scores</label>
                </div>
                <h6 style={{ color: 'red' }}>{this.state.errors.greCheck}</h6> */}
              </div> : ""
            }
          </div>

          {/* GMAT Exam */}
          <div className="personal-box-inner address score-grt mt-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header ">
              <div className="toggle_head_sec d-flex align-items-center justify-content-between">
                <h5>GMAT exam scores</h5>
                <label class="switch togle_switch">
                  <input type="checkbox" className="disablepro" value="1" id="gmatCheck" 
                  onChange={this.handleGmatCheckChange} />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            {this.state.gmatCheck ?
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label className="uni-label">GMAT Exam Date</Label>
                      <DatePicker
                        selected={this.state.gmatexamdate}
                        onChange={this.handleGmatexamdateChange}
                        dateFormat="yyyy-MM-dd"
                        className='disablepro'
                        id="gmatexamdate"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="YYYY-MMM-DD"
                        maxDate={new Date()}
                      />

                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatexamdate}</h6>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Verbal</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input 
                            type="number" 
                            min="0" max="51"
                            className="form-control disablepro" 
                            value={this.state.gmatverbalscore}
                            id="gmatverbalscore" 
                            onChange={this.handleGmatverbalscoreChange}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input
                            type="number" 
                            min="0" max="99"
                            className="form-control disablepro" 
                            value={this.state.gmatverbalrank}
                            id="gmatverbalrank" 
                            onChange={this.handleGmatverbalrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatverbalscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatverbalrank}</h6>

                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Quantitative</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="51"
                            className="form-control disablepro" value={this.state.gmatquanitativescore}
                            id="gmatquanitativescore" onChange={this.handleGmatquanitativescoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.gmatquanitativerank}
                            id="gmatquanitativerank" onChange={this.handleGmatquanitativerankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatquanitativescore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatquanitativerank}</h6>

                  </div>

                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Integrated Reasoning</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="1" max="8"
                            className="form-control disablepro" value={this.state.gmatreasoningscore}
                            id="gmatreasoningscore" onChange={this.handleGmatreasoningscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.gmatreasoningrank}
                            id="gmatreasoningrank" onChange={this.handleGmatreasoningrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatreasoningscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatreasoningrank}</h6>

                  </div>

                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Writing</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="6"
                            className="form-control disablepro" value={this.state.gmatwritingscore}
                            id="gmatwritingscore" onChange={this.handleGmatwritingscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.gmatwritingrank}
                            id="gmatwritingrank" onChange={this.handleGmatwritingrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatwritingscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmatwritingrank}</h6>

                  </div>
                  
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Average</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input type="number" min="200" max="800"
                            className="form-control disablepro" value={this.state.gmattotalscore}
                            id="gmattotalscore" onChange={this.handleGmattotalscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input type="number" min="0" max="99"
                            className="form-control disablepro" value={this.state.gmattotalrank}
                            id="gmattotalrank" onChange={this.handleGmattotalrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmattotalscore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.gmattotalrank}</h6>
                  </div>
                </div>
            </div> : null }

            {/* <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input disablepro" value="1"
                id="gmatCheck" onChange={this.handleGmatCheckChange}
              />
              <label className="form-check-label">I don’t have GMAT exam scores</label>
            </div>
            <h6 style={{ color: 'red' }}>{this.state.errors.gmatCheck}</h6> */}
          </div>


          {/* SAT Exam */}{/* New Qualification Start */}
          <div className="personal-box-inner address score-grt mt-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header ">
              <div className="toggle_head_sec d-flex align-items-center justify-content-between">
                <h5>SAT exam scores</h5>
                <label class="switch togle_switch">
                    <input type="checkbox" className="disablepro" value="1" id="haveSatScore" name="haveSatScore"
                    onChange={this.handleSatScoreAvail} />
                    <span class="slider round"></span>
                </label>
              </div>
            </div>
            {  this.state.haveSatScore ?
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label className="uni-label">SAT Exam Date</Label>
                      <DatePicker
                        selected={this.state.satExamDate}
                        onChange={date => this.setState({ satExamDate: date })}
                        dateFormat="yyyy-MM-dd"
                        className='disablepro'
                        id="satExamDate"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="YYYY-MMM-DD"
                        maxDate={new Date()}
                      />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satExamDate}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Reading/Writing</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input
                            type="number"
                            className="form-control disablepro"
                            value={this.state.satWritingScore}
                            id="satWritingScore"
                            onChange={this.handleSATScoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input
                            type="number"
                            className="form-control disablepro"
                            value={this.state.satWritingRank}
                            id="satWritingRank"
                            onChange={this.handleSATScoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satWritingScore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satWritingRank}</h6>
                  </div>
                  
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Maths</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input 
                            type="number"
                            className="form-control disablepro"
                            value={this.state.satQuantScore}
                            id="satQuantScore"
                            onChange={this.handleSATScoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input 
                            type="number"
                            className="form-control disablepro"
                            value={this.state.satQuantRank}
                            id="satQuantRank"
                            onChange={this.handleSATScoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satQuantScore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satQuantRank}</h6>

                  </div>
                  {/* <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Verbal</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input 
                            type="number" 
                            className="form-control disablepro" 
                            value={this.state.satVerbalScore}
                            id="satVerbalScore"
                            onChange={this.handleSATScoreChange}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input
                            type="number" 
                            className="form-control disablepro" 
                            value={this.state.satVerbalRank}
                            id="satVerbalRank" 
                            onChange={this.handleSATScoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satVerbalScore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satVerbalRank}</h6>

                  </div> */}
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Total Score</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input
                            type="number"
                            className="form-control disablepro"
                            value={this.state.satAverageScore}
                            id="satAverageScore"
                            onChange={this.handleGmattotalscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input
                            type="number"
                            className="form-control disablepro"
                            value={this.state.satAverageRank}
                            id="satAverageRank" 
                            onChange={this.handleGmattotalrankChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satAverageScore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satAverageRank}</h6>
                  </div>
                </div>
              </div>
              :
              null
            }
          </div>

          {/* LSAT Exam */}
          <div className="personal-box-inner address score-grt mt-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header ">
              <div className="toggle_head_sec d-flex align-items-center justify-content-between">
                <h5>LSAT exam scores</h5>
                <label class="switch togle_switch">
                  <input type="checkbox" className="disablepro" value="1" id="haveLSATscore" name="haveLSATscore"
                    onChange={this.handleLSATscoreAvail} />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            {  this.state.haveLSATscore ?
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label className="uni-label">LSAT Exam Date</Label>
                      <DatePicker
                        selected={this.state.lsatExamDate}
                        onChange={date => this.setState({ lsatExamDate: date })}
                        dateFormat="yyyy-MM-dd"
                        className='disablepro'
                        id="lsatExamDate"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="YYYY-MMM-DD"
                        maxDate={new Date()}
                      />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satExamDate}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                    <Label className="uni-label">Total Score</Label>
                    <div className="score-list flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Score </div>
                        <div className="score-in">
                          <Input 
                            type="number" 
                            min="120" max="180"
                            className="form-control disablepro" 
                            value={this.state.lsatTotalScore}
                            id="lsatTotalScore"
                            onChange={this.handleLSATscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input
                            type="number" 
                            min="0" max="99"
                            className="form-control disablepro" 
                            value={this.state.lsatTotalRank}
                            id="lsatTotalRank" 
                            onChange={this.handleLSATscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.lsatTotalScore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.lsatTotalRank}</h6>

                  </div>
                </div>
              </div>
              :
              null
            }
          </div>

          {/* MCAT Exam */}
          <div className="personal-box-inner lasttestscore address score-grt mt-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header ">
              <div className="toggle_head_sec d-flex align-items-center justify-content-between">
                <h5>MCAT exam scores</h5>
                <label class="switch togle_switch">
                    <input type="checkbox" className="disablepro" value="1" id="haveMCATscore" name="haveMCATscore"
                    onChange={this.handleMCATscoreAvail} />
                    <span class="slider round"></span>
                </label>
              </div>
            </div>
            {  this.state.haveMCATscore ?
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label className="uni-label">MCAT Exam Date</Label>
                      <DatePicker
                        selected={this.state.mcatExamDate}
                        onChange={date => this.setState({ mcatExamDate: date })}
                        dateFormat="yyyy-MM-dd"
                        className='disablepro'
                        id="mcatExamDate"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="YYYY-MMM-DD"
                        maxDate={new Date()}
                      />
                    </FormGroup>
                    <h6 style={{ color: 'red' }}>{this.state.errors.satExamDate}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-8 col-xl-8 col-sm-6 col-8">
                    <Label className="uni-label">Total Score</Label>
                    <div className="score-list score-btween flex-column">
                      <div className="score-name border-gray">
                        <div className="scor-1"> Enter A Test Score Between 10 and 90 </div>
                        <div className="score-in">
                          <Input 
                            type="number" 
                            className="form-control disablepro" 
                            value={this.state.mcatTotalScore}
                            id="mcatTotalScore"
                            onChange={this.handleLSATscoreChange}
                          />
                        </div>
                      </div>
                      <div className="score-name">
                        <div className="scor-1"> Rank % </div>
                        <div className="score-in">
                          <Input
                            type="number" 
                            className="form-control disablepro" 
                            value={this.state.mcatTotalRank}
                            id="mcatTotalRank" 
                            onChange={this.handleLSATscoreChange}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 style={{ color: 'red' }}>{this.state.errors.mcatTotalScore}</h6>
                    <h6 style={{ color: 'red' }}>{this.state.errors.mcatTotalRank}</h6>

                  </div>
                </div>

                {/*  */}
                <div>
                  <div className="row babf-column">
                    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                      <Label className="uni-label"> Biological and Biochemical Foundations of Living Systems </Label>
                      <div className="score-list flex-column">
                        <div className="score-name border-gray">
                          <div className="scor-1"> Score </div>
                          <div className="score-in">
                            <Input 
                              type="number"  min="118" max="132"
                              className="form-control disablepro" 
                              value={this.state.mcat_bio_score}
                              id="mcat_bio_score" 
                              onChange={(e)=> {this.setState({mcat_bio_score: e.target.value})}}
                            />
                          </div>
                        </div>
                        <div className="score-name">
                          <div className="scor-1"> Rank % </div>
                          <div className="score-in">
                            <Input
                              type="number" min="0" max="99" 
                              className="form-control disablepro" 
                              value={this.state.mcat_bio_rank}
                              id="mcat_bio_rank" 
                              onChange={(e)=>{this.setState({mcat_bio_rank: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_bio_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_bio_rank}</h6>

                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                      <Label className="uni-label"> Chemical and Physical Foundations of Biological Systems </Label>
                      <div className="score-list flex-column">
                        <div className="score-name border-gray">
                          <div className="scor-1"> Score </div>
                          <div className="score-in">
                            <Input type="number" min="118" max="132" id="mcat_chemical_score" 
                              className="form-control disablepro" value={this.state.mcat_chemical_score}
                              onChange={(e)=>{this.setState({mcat_chemical_score: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                        <div className="score-name">
                          <div className="scor-1"> Rank % </div>
                          <div className="score-in">
                            <Input type="number" min="0" max="99" id="mcat_chemical_rank" 
                              className="form-control disablepro" value={this.state.mcat_chemical_rank}
                              onChange={(e)=>{this.setState({mcat_chemical_score: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_chemical_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_chemical_rank}</h6>

                    </div>

                    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                      <Label className="uni-label"> Psychological, Social, and Biological Foundations of Behaviour </Label>
                      <div className="score-list flex-column">
                        <div className="score-name border-gray">
                          <div className="scor-1"> Score </div>
                          <div className="score-in">
                            <Input type="number" min="1" max="8" id="mcat_psychology_score" 
                              className="form-control disablepro" value={this.state.mcat_psychology_score}
                              onChange={(e)=>{this.setState({mcat_psychology_score: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                        <div className="score-name">
                          <div className="scor-1"> Rank % </div>
                          <div className="score-in">
                            <Input type="number" min="0" max="99" id="mcat_psychology_rank" 
                              className="form-control disablepro" value={this.state.mcat_psychology_rank}
                              onChange={(e)=>{this.setState({mcat_psychology_rank: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_psychology_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_psychology_rank}</h6>

                    </div>

                    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                      <Label className="uni-label"> Critical Analysis and Reasoning Skills </Label>
                      <div className="score-list flex-column">
                        <div className="score-name border-gray">
                          <div className="scor-1"> Score </div>
                          <div className="score-in">
                            <Input type="number" min="0" max="6"
                              className="form-control disablepro" value={this.state.mcat_reading_score}
                              id="mcat_reading_score" onChange={(e)=>{this.setState({mcat_reading_score: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                        <div className="score-name">
                          <div className="scor-1"> Rank % </div>
                          <div className="score-in">
                            <Input type="number" min="0" max="99"
                              className="form-control disablepro" value={this.state.mcat_reading_rank}
                              id="mcat_reading_rank" onChange={(e)=>{this.setState({mcat_reading_rank: e.target.value})}}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_reading_score}</h6>
                      <h6 style={{ color: 'red' }}>{this.state.errors.mcat_reading_rank}</h6>

                    </div>
                  </div>
                </div>
                
                {/*  */}
              </div>
              :
              null
            }
          </div>
          {/* New Qualification End */}


          <div className="col-12 d-flex justify-content-end">
            <Button color="primary" className="score-back mx-4 aftersave" onClick={this.prevtab}>BACK</Button>
            <Button color="primary" className="score-save aftersave" onClick={this.nexttab}>NEXT</Button>

            <Button color="primary" className="score-back mx-4 beforesave" onClick={this.prevtab}>BACK</Button>
            <Button color="primary" className="score-save beforesave" type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default template;
