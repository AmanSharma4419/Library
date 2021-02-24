import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Container,
  ListGroup, ListGroupItem, Media,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText
} from 'reactstrap';
import Pricon from '../../assets/img/student/personal-icon.svg';
import Flagicon from '../../assets/img/student/flag-my-icon.svg';
import $ from 'jquery';
import Personalinfo from './../Personalinfo/Personalinfo';
import Testscore from './../Testscore/Testscore';
import Backgroundinfo from './../Backgroundinfo/index';
import UploadDocment from './../UploadDocment/UploadDocment';
import config from '../../config.json';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import bargraph from '../../assets/img/university/bar_graph.svg';
import contlogo from '../../assets/img/university/australia_circle_flag.svg';
import favourites from '../../assets/img/university/favourites.svg';
import heart from '../../assets/img/university/heart.svg';
import eyeicon from '../../assets/img/university/view_simple.svg';
import rating from '../../assets/img/university/rating.svg';
import backarrow from '../../assets/img/university/back_arrow.svg';
import { Link  , Redirect } from 'react-router-dom';
import axios from 'axios';
var baseurl = `${config.baseurl}/`;



class Programlist extends Component {
   constructor() {
        super();
        this.state = {
          todos: [],
          currentPage: 1,
          todosPerPage: 5,
		 // showStore:false,
		  showmore:false,
		  uniid:'',
		  country:[],
		  courses:[],
		  university:'',
		  studentselectcountry:'',
		  studentselectcourse:'',
        };
		this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //this.handleSpeakingChange = this.handleSpeakingChange.bind(this);
		
		
		axios.get(baseurl+'get_country').then(response => {
		console.log(response);
		//this.setState({data: [...json]});
         this.setState({
                  country : response.data,
               });
        }) 

        axios.get(baseurl+'get_mainlevelcourse').then(response => {
		console.log(response);
		//this.setState({data: [...json]});
         this.setState({
                  courses : response.data,
               });
        })   		
		
      }
	  
	    componentDidMount() {
    axios.get('https://formeeadmin.bicsglobal.com/studentuniversitylist').then(response => 
		{
      		console.log(response);
			//alert(response.data.about[0].id);
      		this.setState({
				todos: response.data,
			
      		});
    	})
  }
	  
	  
	handleStudentselectcountryChange = event => {
	this.setState({studentselectcountry: event.target.value});
	}
	
	handleStudentselectcourseChange = event => {
	this.setState({studentselectcourse: event.target.value});
	}
	
	handleUniversityChange = event => {
	this.setState({university: event.target.value});
	}

  
onSubmit() {
   //e.preventDefault()
		 
    const data = {
			studentselectcountry : this.state.studentselectcountry,
			studentselectcourse : this.state.studentselectcourse,
			university : this.state.university,
	}
	
	
			const post = axios.post(baseurl+'search', data).then((response) => {
				//console.log(response.data);

			//alert(response.data.about[0].id);
      		this.setState({
				todos: response.data,
			
      		});

			});

   
}

       handleChange = param => e => {
		//alert(param);
		 axios.get('https://formeeadmin.bicsglobal.com/studentuniversitylists/'+param).then(response => 
		{
      		console.log(response);
			//alert(response.data.about[0].id);
      		this.setState({
				uniid: param,
				todos: response.data,
			
      		});
    	})
		
		}
		
		
      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      } 
	   
	 
		


  render() {
	  const imgpath = `${config.baseurl}`;
        const { todos, currentPage, todosPerPage , showStore , showmore } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        
		
		
		
		

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <span
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </span>
          );
        });
		
		
		
		
		
							
            
					


    return (
	  
	
      <div className="foe-studen-container foe-institute-box">
        <div className="foe-student-box foe-institute">
          <Container>
            <Row>
       
            <Col xs="12" sm="12" xl="12" md="12" lg="12">
            <div className="row col-md-12">
                <div className="foe-about-boxx">
                <p className="foe-service-body">Browse Institutes</p>
                  <div className="row w-100">
                    <div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
                     <button className="btn service-btn ">
                       <span>Business and Management</span>
                     </button>
                    </div>
                    <div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
                    {/*<button className="btn service-btn">
                       <span>Institute</span>
					</button>  */}
					<Input type="university_name" name="university_name" placeholder="University" onChange={this.handleUniversityChange} />
                    </div>
                    <div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
                      <FormGroup>
                       <Input type="select" name="studentselectcountry" id="studentselectcountry" onChange={this.handleStudentselectcountryChange} className={this.state.inputClass2}>
								<option value="">Choose a Country</option> 
							    { this.state.country.map(studentselectcountry => <option value={studentselectcountry.id}>{studentselectcountry.country_name}</option> )}	
                                </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
                    <FormGroup>
                        <Input type="select" name="studentselectcourse" id="studentselectcourse" onChange={this.handleStudentselectcourseChange} >
								<option value="">Choose a Country</option> 
							    { this.state.courses.map(studentselectcourse => <option value={studentselectcourse.id}>{studentselectcourse.level_name}</option> )}	
                                </Input>
                      
                      </FormGroup>
                    </div>
                  </div>
                  <div className="search-box-orange">
                  {/*<button className="btn service-btn">
                       <span>Institute</span>
				  </button>  */}
					  <Button color="primary" type="submit" onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn">Filter</Button>
                  </div>
                </div>
                </div>
            </Col>
            </Row>
          </Container>
        </div>
		<div className="container-fluid institute-list px-0">
			<div className="container">
				<div className="menu-section">
					<ul className="nav nav-tabs filter-btn float-left" id="" role="">
						<li className="nav-item mb-5 mt-5">
							<a className="nav-link" data-toggle="tab" href="#About1" role="tab" > FILLTER </a>
						</li>  
					</ul>
          <ul className="nav nav-tabs float-right" id="" role="">
						<li className="nav-item mb-5 mt-5">
							<a className="nav-link btn btn-outline-dark " data-toggle="tab" href="#About1" role="tab" > PROGRAM </a>
						</li> 
            <li className="nav-item mb-5 mt-5">
							<a className="nav-link btn btn-primary inti-btn" data-toggle="tab" href="#About1" role="tab" > INSTITUTE </a>
						</li> 
					</ul>
          
          
				</div>
				<div className="col-md-12 pb-3 float-left">
        <div className="top-section stud-init-list">

		    <div className="container">
					 <div className="row">
					<div className="mx-0 col-md-4 prog-list">
						<div className="col-md-12 content-block px-0 mb-4 cont-rgt">
            <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>
            <div className="mt-2 pl-3 cont-rgt-grap"> DEAKIN UNIVERSITY </div>
							<div className="mt-2 pl-3 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /> AUSTRALIA</span> 
							
							</div>
						</div>
					</div>

          <div className="mx-0 col-md-4 prog-list">
						<div className="col-md-12 content-block px-0 mb-4 cont-rgt">
            <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>
            <div className="mt-2 pl-3 cont-rgt-grap"> DEAKIN UNIVERSITY </div>
							<div className="mt-2 pl-3 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /> AUSTRALIA</span> 
							
							</div>
						</div>
					</div>

          <div className="mx-0 col-md-4">
						<div className="col-md-12 content-block px-0 mb-4 cont-rgt">
            <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>
            <div className="mt-2 pl-3 cont-rgt-grap"> DEAKIN UNIVERSITY </div>
							<div className="mt-2 pl-3 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /> AUSTRALIA</span> 
							
							</div>
						</div>
					</div>

          <div className="mx-0 col-md-4">
						<div className="col-md-12 content-block px-0 mb-4 cont-rgt">
            <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>
            <div className="mt-2 pl-3 cont-rgt-grap"> DEAKIN UNIVERSITY </div>
							<div className="mt-2 pl-3 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /> AUSTRALIA</span> 
							
							</div>
						</div>
					</div>

          <div className="mx-0 col-md-4">
						<div className="col-md-12 content-block px-0 mb-4 cont-rgt">
            <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>
            <div className="mt-2 pl-3 cont-rgt-grap"> DEAKIN UNIVERSITY </div>
							<div className="mt-2 pl-3 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /> AUSTRALIA</span> 
							
							</div>
						</div>
					</div>

          <div className="mx-0 col-md-4">
						<div className="col-md-12 content-block px-0 mb-4 cont-rgt">
            <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>
            <div className="mt-2 pl-3 cont-rgt-grap"> DEAKIN UNIVERSITY </div>
							<div className="mt-2 pl-3 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /> AUSTRALIA</span> 
							
							</div>
						</div>
					</div>
          
          </div>
							
				</div>
                      
								
				
				
			</div>
				</div>
        

      <span className="float-left" id="page-numbers">
              {renderPageNumbers}
            </span>


			</div>
		</div>
		
      </div>
	  
	  
	 
    );
  }
}

export default Programlist;
