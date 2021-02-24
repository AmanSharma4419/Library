import "./Leftoverview.css";
import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function template() {
	
	
  return (
    <div className="leftoverview">
     <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8">
              <h3 className="subletter">Overview</h3>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4">
                 <div className="float-right">
                 <span className="view-letter">View As ></span>
                 </div>
            </div>
     </div>
     <div className="row">
     <FormGroup className="col-md-12 col-lg-12">
					 <FormGroup>
             <Label className="uni-label" >Categories</Label>
             <Input  className="form-control" type="text" value={this.state.cat_count } />
             </FormGroup>
      </FormGroup>
      <FormGroup className="col-md-12 col-lg-12">
					 <FormGroup>
             <Label className="uni-label" >faculties</Label>
             <Input  className="form-control" type="text" value={this.state.fac_count } />
             </FormGroup>
      </FormGroup>
      <FormGroup className="col-md-12 col-lg-12">
					 <FormGroup>
             <Label className="uni-label" >departments</Label>
             <Input  className="form-control" type="text" value={this.state.dep_count } />
             </FormGroup>
      </FormGroup>
      <FormGroup className="col-md-12 col-lg-12">
					 <FormGroup>
             <Label className="uni-label" >Courses</Label>
             <Input  className="form-control" type="text" value={this.state.cou_count } />
             </FormGroup>
      </FormGroup>
     </div>
     <div className="row">
          <div className="col-md-4 col-lg-4 date-box uni-no-padd">
            <div className="date-inner">
               <div className="degree-text">Bachelor Degrees</div>
               <div className="degree-number">{this.state.res1 }</div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 date-box uni-no-padd">
            <div className="date-inner">
               <div className="degree-text">Postgraduate<br/> Degrees</div>
               <div className="degree-number">{this.state.res2 }</div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 date-box uni-no-padd">
            <div className="date-inner">
               <div className="degree-text">vocational</div>
               <div className="degree-number">{this.state.res3 }</div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 date-box uni-no-padd">
            <div className="date-inner">
               <div className="degree-text">Doctorates</div>
               <div className="degree-number">{this.state.res4 }</div>
            </div>
          </div>
     </div>
    </div>
  );
};

export default template;
