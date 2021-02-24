import React, { Component, lazy, Suspense } from "react";
import "./studentlibrary.css";
import { Bar, Line } from "react-chartjs-2";
import {
	Badge,
	Button,
	ButtonDropdown,
	ButtonGroup,
	ButtonToolbar,
	Card,
	CardBody,
	Modal,
	ModalBody,
	CardFooter,
	CardHeader,
	CardTitle,
	Col,
	Dropdown,
	ModalFooter,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Progress,
	Row,
	ListGroup,
	ListGroupItem,
	Media,
	Container,
	Table,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import config from "../../config.json";

import 'react-day-picker/lib/style.css';
import axios from "axios";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

var baseurl = `${config.library_student}/`;

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
class Studentlibrary extends Component {
	constructor() {
		super()
		this.state = {
			courses_list: ""
		}
	}
	componentDidMount() {
		axios.get(baseurl + `coursesList?student_id=${localStorage.getItem("studentid")}`, {
		}).then(res => {
			this.setState({ ...this.state, courses_list: res.data.courses })
			console.log(res.data.courses, "in the res of the axiosccccccc")
		})
	}
	render() {
		return (
			<div className="student-library-dashboard">
				<Container>
					<div className="slibrary-lp">
						<div className="slibrary-header">
							<h1>My Library</h1>
							<p>Subscribe to a course to stay up to date with the latest notifications</p>
							<hr></hr>
						</div>
						<div className="slibrary-dslayout">
							{
								this.state.courses_list && this.state.courses_list.map((value, index) => {
									console.log(value, "i the value of mapping courses list")
									return (
										<>
											<div className="courseBox">
												<div className="courseText">
													<p>{value.subscribe_count === 1 ? "Subscribed" : ""}</p>
													<Link to={`/Academicbeginner/${value.id}`}><h3>{value.courses_title}</h3></Link>
													<span className="cousrseStart">{value.level[0].title}</span>
												</div>
											</div>
										</>
									)
								})
							}
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

export default Studentlibrary;
