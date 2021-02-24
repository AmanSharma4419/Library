import "./Addmore.css";
import React from "react";
import {
  Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter,
  CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
  Container, ListGroup, ListGroupItem, Media, Form, FormGroup, FormText, FormFeedback, Input,
  InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label
} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';


function template() {

  const { disabled } = this.props
  const { errors } = this.state


  return (

   <div className="Addmore">



      <div className="col-12 per-box py-4">



        {this.state.questionsattended.map((data, index) =>
          <div className="destination-box format">
          
		   
			{this.state.selectedOption[index] == 0 ?
			<div> <h2 className="uni-label">{this.state.handlequestion[index]}</h2>
			
			 <Input
       disabled={this.state.disabled}
                        type="text"
                        className=""
                        placeholder="Type here"
                        
						onChange={(evt) => this.handleQuestionName(evt, index)}
						value={this.state.handleanswers[index]}
                        id="handlequestion"
                        
                      />
			</div>
			

			 : this.state.selectedOption[index] == 1 ?
			 <div> <h2 className="uni-label">{this.state.handlequestion[index]}</h2>
			 
			 <Input disabled={this.state.disabled} type="select" id="edulevel"   onChange={(evt) => this.handleQuestionName(evt, index)} className=" edulevel" >
                          <option value="">Select</option>
                         
                            <option selected={this.state.handleanswers[index] == this.state.typeoption1[index]} value={this.state.typeoption1[index]}>
                              {this.state.typeoption1[index]}</option>
                            <option selected={this.state.handleanswers[index] == this.state.typeoption2[index]} value={this.state.typeoption2[index]}>
                              {this.state.typeoption2[index]}</option>
                         
                        </Input>

			 </div>
			 : this.state.selectedOption[index] == 2 ?
			<div> <h2 className="uni-label">{this.state.handlequestion[index]}</h2> 
			
			
		
			
			 <Input disabled={this.state.disabled} type="select" id="edulevel" onChange={(evt) => this.handleQuestionName(evt, index)} className="multiple-select edulevel" multiple>
                          <option value="">Select</option>
                         
                            <option selected={this.state.handleanswers[index] == this.state.typeoption3[index]} value={this.state.typeoption3[index]}>{this.state.typeoption3[index]}</option>
                            <option selected={this.state.handleanswers[index] == this.state.typeoption4[index]} value={this.state.typeoption4[index]}>{this.state.typeoption4[index]}</option>
							<option selected={this.state.handleanswers[index] == this.state.typeoption5[index]} value={this.state.typeoption5[index]}>{this.state.typeoption5[index]}</option>
                            <option selected={this.state.handleanswers[index] == this.state.typeoption6[index]} value={this.state.typeoption6[index]}>{this.state.typeoption6[index]}</option>
							
                            	{this.state.addOnChange[index] == true ?
                      this.state.addmoreinput[index].map((input, sectionIndex) =>
                        <>
                         <option value={input}>{input}</option> 
                        </>
                      )
                      : null}                        
                        </Input></div>
			: null}
			
			
			
			
           
		
          </div>
		  
		 
        )
		
		}

     
      

        



      </div>
<div>
     

</div>

<div className="col-12 d-flex justify-content-end save">
         {this.state.disabled===false?null: <Button color="primary" className="score-save" type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button> 
}</div>
    </div>
	
  );
   
};

export default template;
