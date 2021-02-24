import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FormGroup, Input, Label} from 'reactstrap';

function AdditionalQualification(){
    return(
        <>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GMAT Exam Date</Label>
                  <DatePicker
                    // selected={this.state.gmatexamdate}
                    // onChange={this.handleGmatexamdateChange}
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
                {/* <h6 style={{ color: 'red' }}>{this.state.errors.gmatexamdate}</h6> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                <Label className="uni-label">Verbal</Label>
                <div className="score-list flex-column">
                  <div className="score-name border-gray">
                    <div className="scor-1">Score</div>
                    <div className="score-in">
                      <Input type="number" 
                        className="form-control disablepro" 
                        // value={this.state.gmatverbalscore}
                        id="gmatverbalscore" 
                        // onChange={this.handleGmatverbalscoreChange}
                      />
                    </div>
                  </div>
                  <div className="score-name">
                    <div className="scor-1">Rank %</div>
                    <div className="score-in">
                      <Input type="number" 
                        className="form-control disablepro" 
                        // value={this.state.gmatverbalrank}
                        id="gmatverbalrank" 
                        // onChange={this.handleGmatverbalrankChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <h6 style={{ color: 'red' }}>{this.state.errors.gmatverbalscore}</h6>
                <h6 style={{ color: 'red' }}>{this.state.errors.gmatverbalrank}</h6> */}

              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                <Label className="uni-label">Quantitative</Label>
                <div className="score-list flex-column">
                  <div className="score-name border-gray">
                    <div className="scor-1">Score</div>
                    <div className="score-in">
                      <Input type="number" 
                        id="gmatquanitativescore" 
                        className="form-control disablepro" 
                        // value={this.state.gmatquanitativescore}
                        // onChange={this.handleGmatquanitativescoreChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                  <div className="score-name">
                    <div className="scor-1">Rank %</div>
                    <div className="score-in">
                      <Input type="number" 
                        className="form-control disablepro"
                        id="gmatquanitativerank"
                        // value={this.state.gmatquanitativerank}
                        // onChange={this.handleGmatquanitativerankChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <h6 style={{ color: 'red' }}>{this.state.errors.gmatquanitativescore}</h6>
                <h6 style={{ color: 'red' }}>{this.state.errors.gmatquanitativerank}</h6> */}

              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                <Label className="uni-label">Writing</Label>
                <div className="score-list flex-column">
                  <div className="score-name border-gray">
                    <div className="scor-1">Score</div>
                    <div className="score-in">
                      <Input type="number" 
                        className="form-control disablepro"
                        id="gmatwritingscore"
                        // value={this.state.gmatwritingscore}
                        // onChange={this.handleGmatwritingscoreChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                  <div className="score-name">
                    <div className="scor-1">Rank %</div>
                    <div className="score-in">
                      <Input type="number" 
                        className="form-control disablepro"
                        id="gmatwritingrank"
                        // value={this.state.gmatwritingrank}
                        // onChange={this.handleGmatwritingrankChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <h6 style={{ color: 'red' }}>{this.state.errors.gmatwritingscore}</h6>
                <h6 style={{ color: 'red' }}>{this.state.errors.gmatwritingrank}</h6> */}

              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-8">
                <Label className="uni-label">Average</Label>
                <div className="score-list flex-column">
                  <div className="score-name border-gray">
                    <div className="scor-1">Score</div>
                    <div className="score-in">
                      <Input type="number" 
                        className="form-control disablepro" 
                        id="gmattotalscore" 
                        // value={this.state.gmattotalscore}
                        // onChange={this.handleGmattotalscoreChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                  <div className="score-name">
                    <div className="scor-1">Rank %</div>
                    <div className="score-in">
                      <Input type="number"
                        className="form-control disablepro" 
                        id="gmattotalrank" 
                        // value={this.state.gmattotalrank}
                        // onChange={this.handleGmattotalrankChange}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <h6 style={{ color: 'red' }}>{this.state.errors.gmattotalscore}</h6>
                <h6 style={{ color: 'red' }}>{this.state.errors.gmattotalrank}</h6> */}

              </div>
            </div>
              
        </>
    );
}


export default AdditionalQualification;