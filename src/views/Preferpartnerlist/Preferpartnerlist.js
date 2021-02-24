import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Scrollbars } from 'react-custom-scrollbars';
import Closebtn from '../../assets/img/close-btn.svg';
import {
	Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card,
	CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu,
	DropdownToggle, Progress, Row, Table, Container, ListGroup, ListGroupItem, Media, Modal, ModalBody, ModalFooter, ModalHeader,
	Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Breadcrumb, BreadcrumbItem,UncontrolledTooltip
} from 'reactstrap';
import Pricon from '../../assets/img/student/personal-icon.svg';
import Flagicon from '../../assets/img/student/flag-my-icon.svg';
import $ from 'jquery';
import Programlist from '../Programlist/Programlist';
import config from '../../config.json';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import bargraph from '../../assets/img/university/bar_graph.svg';
import contlogo from '../../assets/img/university/australia_circle_flag.svg';
import favourites from '../../assets/img/university/favourites.svg';
import heart from '../../assets/img/university/heart.svg';
import heart2 from '../../assets/img/university/red-heart.svg';
import eyeicon from '../../assets/img/university/view_simple.svg';
import rating from '../../assets/img/university/rating.svg';
import backarrow from '../../assets/img/university/back_arrow.svg';
import { Link, Redirect } from 'react-router-dom';
import searchorange from '../../assets/img/search-orange-icon.svg';
import Homeicon from "../../assets/img/university/home.svg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterStudent1 from "../FilterStudent/FilterStudent1";
import Closeicon from '../../assets/img/close-btn.svg';
import Infoicon from '../../assets/img/student/info-icon.svg';

var baseurl = `${config.baseurl}/`;
function submitStore(contentType, data, setResponse, path) {

	axios({
		url: baseurl + `store_wishlist`,
		method: 'POST',
		data: data,
		headers: {
			'Content-Type': contentType
		}
	})
		.then((response) => {
			setResponse(response.data);
		}).catch((error) => {
			setResponse("error");
		})

}

class Preferpartnerlist extends Component {
	constructor() {
		super();
		this.state = {
			
			todos: [],
			currentPage: 1,
			todosPerPage: 2,
			filteredTodos: [],
			// showStore:false,
			showmore: false,
			uniid: '',
			country: [],
			courses: [],
			course_name: '',
			studentselectcountry: '',
			studentselectcourse: '',
			errors: {},
			searchshow: true,
			selectprogram: 1,
			totalcount: '',
			failuremessage: '',
			eligiblesuccess: false,
			eligiblefailure: false,
			large: false,

			selectcourse: '',
			disabled: false,
			checkcompletedprofile: false,
			university: '',
			selectcountry: '',
			coursename: '',
			universitylist: [],
			filtereduniversitylist: [],
			filteredCourses: [],
			currentPage1: 1,
			universitylistPerPage: 6,
			searchsuggestion: [],
			searchsuggestionprog: [],
			searchsuggestionuniversity: [],

			//searchtextprogram:''
			search: false,
			searchedValue: [],
			visible: false,
			formData: new FormData(),

			deleteid: '',
			unvid: '',
			uncourseid: '',
			coursefavids: [],
			getstorewishlistdata: [],
			applicationID: '',
			tooltipOpen: false,
		};
		this.toggle = this.toggle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmit1 = this.onSubmit1.bind(this);
		this.toggleLarge = this.toggleLarge.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
		this.toggleSuccess = this.toggleSuccess.bind(this);
		this.toggleFailure = this.toggleFailure.bind(this);
		this.handleCoursenameChange = this.handleCoursenameChange.bind(this);


		console.log("Change applied")

		axios.get(baseurl + 'get_country').then(response => {
			console.log(response);
			this.setState({
				country: response.data,
			});
		})

		//for non complete profile
		axios.get(baseurl + 'checkcompletedprofile/' + localStorage.getItem('studentid')) .then(response => {
			if(response.data.status_code == 100){
				this.setState({checkcompletedprofile: true });
			}
			
		})


		axios.get(baseurl + 'get_mainlevelcourse').then(response => {
			// console.log("Main Course"+JSON.stringify(response));
			//this.setState({data: [...json]});
			console.log("courses-->", response.data)
			this.setState({
				courses: response.data,
			});
		})

	}

	/*    componentDidMount() {
    axios.get('https://formeeadmin.bicsglobal.com/studentuniversitylist').then(response => 
		{
      		console.log(response);
			//alert(response.data.about[0].id);
      		this.setState({
				todos: response.data,
			
      		});
    	})
  }   */

	//for institute validate and save start	

	handleSelectcountryChange = event => {
		this.setState({ selectcountry: event.target.value });
	}
	handleSelectcourseChange = event => {
		this.setState({ selectcourse: event.target.value });
	}
	handleUniversityChange = event => {
		//this.setState({university: event.target.value});
		const university = event.target.value;

		if (university.length > 0) {

			axios.get(baseurl + 'autocompleteuniversity/' + university).then(response => {

				console.log("Auto Complete" + university)

				this.setState({ searchsuggestionuniversity: response.data, university: university })
			})

		} else {

			this.setState({ searchsuggestionuniversity: [], university: '' });
		}
	}
	
	
	toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

	renderSuggestionsuniversityname = () => {
		let { searchsuggestionuniversity } = this.state;

		return (
			<Scrollbars style={{ height: 100 }}>
				<ul style={{ backgroundColor: 'white' }} className="searchdropdown">
					{

						searchsuggestionuniversity.map((item, index) => (<li key={index} onClick={() => this.selectedTextuniversity(item)}>{item}</li>))

					}
				</ul>
			</Scrollbars>
		);
	}

	selectedTextuniversity(value) {
		this.setState({
			searchsuggestionuniversity: [],
			university: value
		})
	}


	handleUnicoursenameChange = event => {


		const value = event.target.value;
		//alert(value);
		if (value.length > 0) {


			axios.get(baseurl + 'autocompletecourse/' + value).then(response => {

				//console.log(response.data);
				this.setState({
					searchsuggestion: response.data,
					coursename: value
				})
			})

		} else {
			this.setState({ searchsuggestion: [], coursename: '' });
		}

		//this.setState({coursename: event.target.value});
	}

	//for dropdown based on search in inistitute

	renderSuggestions = () => {
		let { searchsuggestion } = this.state;

		return (
			<Scrollbars style={{ height: 100 }}>
				<ul style={{ backgroundColor: 'white' }} className="searchdropdown">
					{

						searchsuggestion.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))

					}
				</ul>
			</Scrollbars>
		);
	}

	//filter search value
	componentDidMount() {
		this.filterHandler();
		this.getstorewishlist();
		
	}


	storewishlist = () => {
		this.state.formData.append("student_id", localStorage.getItem('studentid'));
		this.state.formData.append("university_id", this.state.unvid);
		this.state.formData.append("course_id", this.state.uncourseid);

		submitStore("form-data", this.state.formData, (msg) => {
			toast.success("Favourite Saved Successfully"); setTimeout(function () {
			}, 3000);
			this.getstorewishlist();
		}, 'student');
	}

	getstorewishlist = () => {
		axios.get(baseurl + 'getWishlist/' + localStorage.getItem('studentid')).then(response => {
			// console.log('getstorewishlist123123', response.data.result[0].university_id);
			this.setState({ getstorewishlistdata: response.data.result });
			

		});
	}


	getIndex = (value, arr, prop) => {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][prop] === value) {
				return value;
			}
		}
		return -1; //to handle the case where the value doesn't exist
	}


	removestorewishlist = data => {
		for (var i = 0; i < this.state.getstorewishlistdata.length; i++) {
			if (this.state.getstorewishlistdata[i].course_id === data) {
				const deleteid = this.state.getstorewishlistdata[i].id;
				// console.log('jksdnaksdnakd', deleteid);
				axios.get(baseurl + 'deleteWishlist/' + deleteid).then(response => {
					toast.success("Favourite Removed Successfully"); setTimeout(function () {
					}, 3000);
					this.getstorewishlist();
				});
			}
		}
	}

	handleFav = data => {
		console.log('click data', data);
		this.state.formData.append("student_id", localStorage.getItem('studentid'));
		this.state.formData.append("university_id", data.unvid);
		this.state.formData.append("course_id", data.uncourseid);

		submitStore("form-data", this.state.formData, (msg) => {
			toast.success("Favourite Saved Successfully"); setTimeout(function () {				
			}, 3000);
			this.getstorewishlist();
		}, 'student');

	}


	searchedValue1 = (alluniversities, allcourse, allProgram) => {
         
		let { universitylist, filtereduniversitylist, todos, filteredTodos } = this.state
		const coursearr = [...allcourse]

		//console.log("non modified university", alluniversities)

		// if (universitylist.length > 0) {
		// 	filtereduniversitylist = universitylist.filter(university=>{
		// 		for(let i=0; i < alluniversities.length; i++) {
		// 			return alluniversities[i].university_id == university.id
		// 		}
		// 	})
		// } else {
		filtereduniversitylist = alluniversities
		// }



		// Fiter Courses
		// const filteredCourses = coursearr.filter(course=>{
		// 	for(let i=0; i < filtereduniversitylist.length; i++) {
		// 		if(universitylist.length > 0) return course.university_id == filtereduniversitylist[i].id
		// 		else return course.university_id == filtereduniversitylist[i].university_id
		// 	}
		// })
		const filteredCourses = [...coursearr]

		console.log(filtereduniversitylist)
        
		filteredTodos = allProgram

		console.log("filtered university", filtereduniversitylist)

		console.log("filtered programs", filteredTodos)

		this.setState({ filtereduniversitylist, filteredCourses, filteredTodos })

	}
	
	searchedValue = ( institutelist, allProgram) => {
         
		
	    let { universitylist, filtereduniversitylist, todos, filteredTodos } = this.state
        filtereduniversitylist = institutelist;
		
		filteredTodos = allProgram;

		console.log("filtered programs", filteredTodos)

		this.setState({ filtereduniversitylist, filteredTodos })

	}

	selectedText(value) {
		this.setState({
			searchsuggestion: [],
			coursename: value
		})
	}



	validate1 = () => {
		const errors = {};
		var universitycountry = $("#selectcountry option:selected").text();
		localStorage.setItem('universitycountry', universitycountry);
		var universitycourse = $("#coursename").val();
		localStorage.setItem('universitycourse', universitycourse);
		var universityname = $("#university_name").val();
		localStorage.setItem('universityname', universityname);
		var universityeducation = $("#selectcourse option:selected").text();
		localStorage.setItem('universityeducation', universityeducation);


		// if(this.state.university === '' || (!this.state.university ))
		// {
		// errors.university = 'This is required';
		// }
		if (this.state.coursename === '' || (!this.state.coursename)) {
			errors.coursename = 'Course name is required';
		}
		this.setState({ errors });
		return Object.keys(errors).length === 0 ? null : errors;
	};




	onSubmit1 = e => {
		e.preventDefault()

		const errors = this.validate1();
		this.setState({ errors });
		if (errors) return;


		const data = {
			selectcountry: this.state.selectcountry,
			selectcourse: this.state.selectcourse,
			university: this.state.university,
			 coursename: this.state.coursename
		}
		console.log(data);

		const post = axios.post(baseurl + 'searchinstitute', data).then((response) => {
			this.setState({
				universitylist: response.data,
				filtereduniversitylist: response.data,
				currentPage1: 1

			});
			toast.success("Records searched successfully")
		});
		this.setState({ errors: '' });

	}


	//for institute validate and save end	 

	handleStudentselectcountryChange = event => {
		this.setState({ studentselectcountry: event.target.value });
	}

	handleStudentselectcourseChange = event => {
		this.setState({ studentselectcourse: event.target.value });
	}

	handleCoursenameChange = event => {



		const value = event.target.value;
		if (value.length > 0) {
			//alert(value);

			axios.get(baseurl + 'autocompletecourse/' + value).then(response => {

				//console.log(response.data);
				this.setState({
					searchsuggestionprog: response.data,
					course_name: value
				})
			})

		} else {
			this.setState({ searchsuggestionprog: [], course_name: '' });
		}


	}


	//for dropdown based on search in inistitute

	renderSuggestionsprogram = () => {
		let { searchsuggestionprog } = this.state;
		// if (searchsuggestionprog.length === 0) {
		// 	return null;
		// }
		return (
			<Scrollbars style={{ height: 100 }}>
				<ul style={{ backgroundColor: 'white' }} className="searchdropdown">
					{
						searchsuggestionprog.map((program, index) => (<li key={index} onClick={() => this.selectedTextpro(program)}>{program}</li>))
					}
				</ul>
			</Scrollbars>
		);
	}

	selectedTextpro(value) {
		//alert(value);
		this.setState({
			searchsuggestionprog: [],
			course_name: value
		})
	}



	validate = () => {
		const errors = {};

		/* var programcountry = $("#studentselectcountry option:selected" ).text();
		 localStorage.setItem('programcountry',programcountry);
		 var programcourse = $("#course_name").val();
		 var programeducation = $("#studentselectcourse" ).val();
		 localStorage.setItem('programcourse',programcourse);
		 localStorage.setItem('programeducation',programeducation);  */


		var universitycountry = $("#studentselectcountry option:selected").text();
		localStorage.setItem('universitycountry', universitycountry);
		var universitycourse = $("#course_name").val();
		localStorage.setItem('universitycourse', universitycourse);
		var universityeducation = $("#studentselectcourse option:selected").text();
		localStorage.setItem('universityeducation', universityeducation);


		if (this.state.course_name === '' || (!this.state.course_name)) {
			errors.course_name = 'Course name is required';
		}
		this.setState({ errors });
		return Object.keys(errors).length === 0 ? null : errors;
	};
	filterHandler = () => {
		this.setState({ visible: this.state.visible != true });
	}

	selectprogram = e => {

		this.setState({ selectprogram: 2 });
		this.setState({ searchtext: '' });
		this.setState({ searchtextprogram: '' });



	}


	selectprogram1 = e => {

		this.setState({ selectprogram: 1 });
		this.setState({ searchtext: '' });
		this.setState({ searchtextprogram: '' });

	}

	closeall() {
		window.location.reload();
	}

	onSubmit = e => {
		e.preventDefault()

		const errors = this.validate();
		this.setState({ errors });
		if (errors) return;
		this.setState({ searchshow: false });

		const data = {
			studentselectcountry: this.state.studentselectcountry,
			studentselectcourse: this.state.studentselectcourse,
			course_name: this.state.course_name,
			studentid: localStorage.getItem('studentid')
		}
		//console.log(data);

		const post = axios.post(baseurl + 'search', data).then((response) => {
			console.log("Searched course", response.data);
			this.setState({
				todos: response.data.result,
				totalcount: response.data.message,
				currentPage: 1
			});
			toast.success("Records searched successfully");

		});
		this.setState({ errors: '' });

	}

	handleChange = param => e => {
		//alert(param);

		const data = {
			studentselectcountry: this.state.studentselectcountry,
			studentselectcourse: this.state.studentselectcourse,
			course_name: this.state.course_name,
			seemoreid: param
		}

		/* axios.get('https://formeeadmin.bicsglobal.com/studentuniversitylists/'+param).then(response => 
		{
      		console.log(response);
			//alert(response.data.about[0].id);
      		this.setState({
				uniid: param,
				todos: response.data,
			
      		});
    	})   */

		const post = axios.post(baseurl + 'seemoresearch', data).then((response) => {
			console.log(response.data);
			this.setState({
				todos: response.data,
				//currentPage:1,
				uniid: param,
			});
		});
	}


	//for check elegiblity

	handleChangeElegibilityprogram = param => e => {
	
		const data = {
			studentid: localStorage.getItem('studentid'),	
			courseid: param
		}

		axios.post(baseurl + 'checkelegibility', data).then((response) => {
			if (response.data.status_code == 200) {
				this.setState({ eligiblesuccess: true });			
			} else {
				this.setState({ failuremessage: response.data.message })
				this.setState({ eligiblefailure: true });
			}

		 });

	}
	
	
	//for check elegiblity
	
	handleChangeApplyprogram = data => {
		
		 //alert(data.unvid);
		localStorage.setItem('universityid',data.unvid);
		localStorage.setItem('selectcoursedraft',data.courseid);
		//alert(data.courseid);
		
		 axios.get(baseurl + 'applycheckeligibility/' + localStorage.getItem('studentid')+'/'+data.courseid).then(response => {
				//console.log(response.data);
				//this.setState({ applicationID : response.data.message })
			   // localStorage.setItem('selectcoursedraft',response.data.message);
				 window.location = "/#/applications";
		})
		
	}

	// handleChangeApplyprogram = param => e => {
	  // alert(param);
	   
		
	// }


	//end	

	handleChangeuniversityid = param => e => {
		//alert(param);
		// this.props.history.push({
		// pathname: '/universityabout',
		// universityid: param // your data array of objects
		// })

		localStorage.setItem('selectuniversity', param);
		localStorage.setItem('selectcourse', '');
		window.location = "/#/universityabout";

	}


	handleChangeprogram = param => e => {
		var courseid = param;
		axios.get(baseurl + 'getuniversityidwithcourseid/' + courseid).then(response => {
			var universityid = response.data;
			localStorage.setItem('selectuniversity', universityid);
			localStorage.setItem('selectcourse', courseid);
			window.location = "/#/universityabout";
		})


	}


	removeunicoursename = e => {
		this.setState({ coursename: '' });
	}
	removeunicoursename1 = e => {
		this.setState({ course_name: '' });
	}

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	handleClick1(event) {
		this.setState({
			currentPage1: Number(event.target.id)
		});
	}

	toggleSuccess() {
		this.setState({
			eligiblesuccess: !this.state.eligiblesuccess,

		});
	}


	toggleLarge() {
		
		this.setState({
			large: !this.state.large,
			todos: [],
			filteredTodos: [],
		});
	}

	toggleFailure() {
		this.setState({
			eligiblefailure: !this.state.eligiblefailure,

		});
	}



	render() {
		//console.log(this.state.errors); 
		const imgpath = `${config.baseurl}`;
		const { currentPage, todosPerPage, showStore, showmore, selectprogram, currentPage1, universitylistPerPage, searchtext, searchtextprogram, searchsuggestionprog, searchsuggestion, searchsuggestionuniversity } = this.state;


		// Logic for displaying Filtered Program Course and Searched Program Course
		const todos = (this.state.todos.length > 0) ? this.state.todos : this.state.filteredTodos

		// Logic for displaying Filtered University list and Searched University list
		const universitylist = (this.state.universitylist.length > 0) ? this.state.universitylist : this.state.filtereduniversitylist

		// Logic for displaying current todos
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		

		// for (var i=0; i < currentTodos.length; i++) {
		// 	for (var j = 0; j < currentTodos[i].programcourses.length; j++) {
					
		// 	}
		// }
		// console.log('currentTodos',currentTodos)

		// Logic for displaying university list
		const indexOfLastTodo1 = currentPage1 * universitylistPerPage;
		const indexOfFirstTodo1 = indexOfLastTodo1 - universitylistPerPage;
		const currentList = universitylist.slice(indexOfFirstTodo1, indexOfLastTodo1);




		// Logic for displaying page numbers
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
			pageNumbers.push(i);
		}

		// Logic for displaying page numbers
		const pageNumbers1 = [];
		for (let i = 1; i <= Math.ceil(universitylist.length / universitylistPerPage); i++) {
			pageNumbers1.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<button
					key={number}
					id={number} class="px-2 py-1"
					onClick={this.handleClick}
				>
					{number}
				</button>
			);
		});

		const renderPageNumbers1 = pageNumbers1.map(number => {
			return (
				<button key={number} id={number} onClick={this.handleClick1} class="px-2 py-1" > {number} </button>
			);
		});



		const universitylists = currentList.map((universitylist, index) => {

			return (


				<div className="mx-0 col-md-4 uni-logo-list">
					<div className="col-md-12 content-block mb-4 cont-rgt">
						{universitylist.logo_image ? <div className="col-md-8">  <img src={imgpath + universitylist.logo_image} alt="" /> </div> : <div className="col-md-8">  <img src={deakinlogo} alt="" /> </div>}
						<div className="my-3 pl-3 cont-rgt-grap" style={{ cursor: 'pointer' }} onClick={this.handleChangeuniversityid((universitylist.university_id) ? universitylist.university_id : universitylist.id)}> {universitylist.institute_name} </div>
						<div className="my-3 pl-3 cont-rgt-contry"> <span className="pr-3"> <img src={contlogo} alt="" /> {(universitylist.country || universitylist.country_name) ? universitylist.country ? universitylist.country : universitylist.country_name : null}</span>
						</div>
					</div>
				</div>

			);
		});



		const prods = currentTodos.map((ub, index) => {

			const programcourses = ub.programcourses.map((programcourses, i) => {
				
				// {this.handleChangeElegibilityprogram(programcourses.id)}
				return (
					
					<div className="mb-3 mt-4 det-list">

						<table className="table list-items table-responsive-sm">
							<tbody>
								<tr>
									<td>
										<table width="100%" cellPadding="0" cellSpacing="0" border="0">
											<tr>
												<th colSpan="6">
													{programcourses.heading}
												</th>
											</tr>
											<tr>
												 <td><span>Study Type</span><br />{programcourses.level_name}</td>
												<td><span>TUITION FEE</span><br />${programcourses.tution_fee}</td>
												<td><span>APPLICATION FEE</span><br />{programcourses.application_fee}</td>
												<td><span>Campus</span><br />Undergraduate</td>
												 <td><div className="tab-btn">
												

													{programcourses.status >= 1 || programcourses.status == 'apply' && programcourses.validreson == '' ? (
														<span className="list-btn"><Button className="btn btn-outline-primary" type="button" onClick={() => this.handleChangeApplyprogram({ courseid: programcourses.id, unvid: ub.id })}>APPLY</Button></span>
													):  programcourses.validreson ? (
														 <><p style={{textAlign:"center"}} id="UncontrolledTooltipExample"> <img style={{ cursor: "default", marginBottom: "5px" }} src={Infoicon} alt="home-icon" className="uni-icon pr-2" /></p>
														<UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
														{programcourses.validreson}
														</UncontrolledTooltip></>
													): (
														<span className="list-btn"><Button className="btn btn-outline-primary" onClick={this.handleChangeElegibilityprogram(programcourses.id)} type="button">CHECK ELEGIBILITY</Button></span>
													)}
													<span className="list-btn-outline"><Button className="btn btn-outline-primary" onClick={this.handleChangeprogram(programcourses.id)} type="button">VIEW MORE</Button></span>

												</div>
												{this.getIndex(programcourses.id, this.state.getstorewishlistdata, 'course_id') == programcourses.id
		? <span className="list-fav pl-3" onClick={() => this.removestorewishlist(programcourses.id)}> 
		<img src={heart2} alt="" /></span> :
		<span className="list-fav pl-3" onClick={() => this.handleFav({ unvid: ub.id, uncourseid: programcourses.id })}> 
		<img src={heart} alt="" /></span>}
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</tbody>
						</table>


					</div>

				);
			});


			return (

				<div className="container stud-det-block bg-white">
					<div className="row mx-0 border-list">
						<div className="content-block row col-md-6">
							<div className="col-md-4">  <img src={imgpath + ub.logo_image} alt="" /> </div>
							<div className="col-md-8 px-0 cont-rgt">

								<h5 className="cont-rgt-head">{ub.institute_name} {/*<span className="heart-icon"> <img src={heart} alt="" /></span> */} </h5>
								<div className="my-3 cont-rgt-contry"> <span className="pr-2"> <img src={contlogo} alt="" /></span>
									{((ub.country != null && ub.country != '') ? (<span>{ub.country}</span>) : (ub.country_name != null && ub.country_name != '') ? <span>{ub.country_name}</span> : <span>Australia</span>)}
								</div>
								<div className="my-3 cont-rgt-grap"> <span className="pr-2"> <img src={bargraph} alt="" /></span>The World Rankings : 0 </div>
								<div className="my-3 row px-3 mx-0">
									<div className="icon-align row"><div className="pr-2"> <img src={eyeicon} alt="" /></div><div>0<br />Views</div></div>
									<div className="icon-align row"><div className="pr-2"> <img src={favourites} alt="" /></div><div>0<br />Favourites</div></div>
									<div className="icon-align"><div> <img src={rating} alt="" /></div><div>Reviews (0)</div></div>

								</div>
							</div>
						</div>
						<div className="col-md-6 see-ins-btn">
							<div className="icon-align"><div className="pr-1">
								<Button className="btn btn-outline-primary icon-align row mr-5" onClick={this.handleChangeuniversityid(ub.id)} type="button">See Institute info</Button></div></div>
						</div>
					</div>
					{programcourses}
					{this.state.uniid !== ub.id ?
						<div className="text-center more-btn">{ub.programcount > 2 ?
							<button onClick={this.handleChange(ub.id)}>See more programs</button>
							: null
						} </div>
						: null
					}

				</div>


			);
		});



		return (


			<div className="foe-studen-container foe-institute-box foe-ins-container">

				<Modal isOpen={this.state.eligiblesuccess} toggle={this.toggleSuccess}
					className={'modal-md ' + 'register-popup sucess-pop' + ' ' + this.props.className}>
					<ModalBody>
						<div className="modal_header mb-4">
							<span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon" onClick={this.closeall} className="uni-icon" /></span>
						</div>
						<div className="p-5 text-center">
							<div className="mb-5 sucess-text">Congratulations!.
					You are eligible to apply for this program.</div>
						</div>
					</ModalBody>

				</Modal>

				<Modal isOpen={this.state.eligiblefailure} toggle={this.toggleFailure}
					className={'modal-md ' + 'register-popup sucess-pop' + ' ' + this.props.className}>
					<ModalBody>
						<div className="modal_header mb-4">
							<span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon" onClick={this.closeall} className="uni-icon" /></span>
						</div>
						<div className="p-5 text-center">
							<div className="mb-5 sucess-text">You are not eligible to apply for this program.Below are the details</div>
							<div className="mb-5 sucess-text">{this.state.failuremessage}.</div>
							<a style={{cursor:'pointer'}} href='/#/studentprofile'>Go to profile</a>
						</div>
					</ModalBody>

				</Modal>


				<ToastContainer />
				{selectprogram != 1
					?
					<div className="foe-student-box foe-institute">
						<Container>
							<Row>

								<Col xs="12" sm="12" xl="12" md="12" lg="12">
									<div className="row col-md-12">
										<div className="foe-about-boxx pgro-search">
											<p className="foe-service-body">What subject are you interested in?</p>
											
											
											<div className="row w-100 mx-auto foe-program-box justify-content-center">
												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
													<Input type="text" id="course_name" name="course_name" placeholder="Course name" value={this.state.course_name} onChange={this.handleCoursenameChange} />
													<span onClick={this.removeunicoursename1}> <img src={Closebtn} alt="close-icon" /></span>
													<h6 style={{ color: 'red' }}>{this.state.errors.course_name}</h6>
													{this.renderSuggestionsprogram()}
												</div>

												{/*<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
						<button className="btn service-btn">
						<span>Institute</span>
						</button>  
						<Input type="university_name" name="university_name" placeholder="University" onChange={this.handleUniversityChange} />  
						</div>*/}
												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
													<FormGroup>
														<Input type="select" name="studentselectcountry" id="studentselectcountry" onChange={this.handleStudentselectcountryChange} className={this.state.inputClass2}>
															<option value="">Country</option>
															{this.state.country.map(studentselectcountry => <option value={studentselectcountry.id}>{studentselectcountry.country_name}</option>)}
														</Input>
													</FormGroup>
												</div>

												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
													<FormGroup>
														<Input type="select" name="studentselectcourse" id="studentselectcourse" onChange={this.handleStudentselectcourseChange} >
															<option value="">Qualification</option>
															{this.state.courses.map(studentselectcourse => <option value={studentselectcourse.id}>{studentselectcourse.level_name}</option>)}
														</Input>

													</FormGroup>
												</div>
												<div className="search-box-orange">
													{/*<button className="btn service-btn">
						<span>Institute</span>
						</button>  */}
													<Button color="primary" type="submit" onClick={this.onSubmit.bind(this)} className="search-icon float-md-right"><img src={searchorange} alt="" /></Button>
												</div>
											</div>


										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
					:
					<div className="foe-student-box foe-institute">
						<Container>
							<Row>

								<Col xs="12" sm="12" xl="12" md="12" lg="12">
									<div className="row col-md-12 mx-auto">
										<div className="foe-about-boxx pgro-search">
											<p className="foe-service-body">Browse Institutes</p>
											<div className="row w-100">
												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">

													<Input type="text" name="coursename" id="coursename" placeholder="Course name" value={this.state.coursename} onChange={this.handleUnicoursenameChange} />
													<span onClick={this.removeunicoursename}> <img src={Closebtn} alt="close-icon" /></span>
													<h6 style={{ color: 'red' }}>{this.state.errors.coursename}</h6>
													{this.renderSuggestions()}

												</div>
												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
													{/*<button className="btn service-btn">
                       <span>Institute</span>
					</button>  */}
													<Input type="university_name" name="university_name" id="university_name" value={this.state.university} placeholder="Institute" onChange={this.handleUniversityChange} />
													{this.renderSuggestionsuniversityname()}
												</div>
												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
													<FormGroup>
														<Input type="select" name="selectcountry" id="selectcountry" onChange={this.handleSelectcountryChange} className={this.state.inputClass2}>
															<option value="">Country</option>
															{this.state.country.map(selectcountry => <option value={selectcountry.id}>{selectcountry.country_name}</option>)}
														</Input>
													</FormGroup>
												</div>
												<div className="col-md-3 col-xl-3 col-md-3 col-12 foe-top-1 foe-subject">
													<FormGroup>
														<Input type="select" name="selectcourse" id="selectcourse" onChange={this.handleSelectcourseChange} >
															<option value="">Education level</option>
															{this.state.courses.map(selectcourse => <option value={selectcourse.id}>{selectcourse.level_name}</option>)}
														</Input>

													</FormGroup>
												</div>
												<div className="search-box-orange">
													{/*<button className="btn service-btn">
                       <span>Institute</span>
				  </button>  */}
													<Button type="submit" onClick={this.onSubmit1.bind(this)} className="search-icon float-md-right"><img src={searchorange} alt="" /></Button>
												</div>
											</div>

										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</div>

				}


				<div className="container-fluid institute-list px-0">
					<div className="container px-0">
						<div className="foe-breabcrumb pt-4 pb-1">
							<Breadcrumb>
								<BreadcrumbItem>
									<img src={Homeicon} alt="home-icon" className="uni-icon" />&nbsp;&nbsp;<a>Student Portal</a></BreadcrumbItem>

								<BreadcrumbItem><a>Institutes</a></BreadcrumbItem>
								<BreadcrumbItem><a>Search</a></BreadcrumbItem>

							</Breadcrumb>
						</div>
						<div className="menu-section bor-menu-box">
							<ul className="nav nav-tabs filter-btn float-left" id="" role="">
								<li className="nav-item mb-5 mt-2"
									onClick={this.toggleLarge}
								>

									<a className="nav-link filter" data-toggle="tab" role="tab"  > <i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;FILTER </a>

								</li>
							</ul>

							<ul className="nav nav-tabs float-right tab-btn-new" id="" role="">
								<li className="nav-item mb-5 mt-2">
									<a className="nav-link btn btn-outline-dark mr-3" data-toggle="tab" href="#program" role="tab" onClick={this.selectprogram} > PROGRAM </a>
								</li>
								<li className="nav-item mb-5 mt-2">
									<a className="nav-link btn btn-primary inti-btn active" data-toggle="tab" href="#institute" role="tab" onClick={this.selectprogram1} > INSTITUTE </a>
								</li>
							</ul>
							{/* <FilterStudent1 search={this.state.search} searchedValue={this.searchedValue} /> */}
						</div>
						<div>


						</div>
						{/* {this.state.visible != true ?
							<div >
								 <FilterStudent1 search={this.state.search} searchedValue={this.searchedValue} />


							</div>
							: null } */}


						{/* <Button onClick={this.toggleLarge} className="mr-1 signup-btn">Sign Up</Button> */}

						<Modal isOpen={this.state.large} toggle={this.toggleLarge}
							className={'modal-lg ' + 'register-popup student-popup-box filter-popup' + ' ' + this.props.className}>
							<ModalBody className="student-popup">
								<Form>

									{/* <div>Pop up Show</div> */}
									<FilterStudent1 search={this.state.search} searchedValue={this.searchedValue} closePanel={this.toggleLarge} />
								</Form>

							</ModalBody>

						</Modal>
 
                    {this.state.checkcompletedprofile ?  
                        <div className="col-12 checkcomplete mt-5">
						<div className="complete-box flex-column mt-3">
						<div className="com-top d-flex justify-content-end">
					   {/*<img src={Closeicon} alt="home-icon" onClick={this.closepop4}   className="uni-icon pr-2" />*/}
					   </div>
					   <div className="com-body">
						{/*<p className="">Please complete your Profile for best matches</p>*/}
					   </div>
					   </div>
					  </div>
						: <></>
					}

						<div className="col-md-12 pb-3 init-list-block float-left foe-inst-list px-0">
							<div className=" stud-init-list mb-34 ">


								{selectprogram != 1 ?
									<span>
										{
										todos.length > 0 ?
										<div>
										<div className="list-number">{this.state.totalcount}	</div>
										<div >{prods}</div>
										</div>
										: <div className="container px-0"></div>
										}
									</span>
									:


									<div className="container px-0">



										{universitylist.length > 0 ?
											<div className="row"> {universitylists}</div>
											: <div> </div>
										}





									</div>

								}



							</div>

							{selectprogram != 1 ?
								<div className="text-center">
									<span id="page-numbers">
										{renderPageNumbers}
									</span>
								</div>
								:


								<div className="text-center">
									<span id="page-numbers">
										{renderPageNumbers1}
									</span>
								</div>


							}



						</div>





					</div>

				</div>



			</div>




		);
	}
}

export default Preferpartnerlist;



