import React, { Component } from 'react';
import { Link  , Redirect , withRouter } from 'react-router-dom';
import { Button, Card, FormGroup, CardBody,CardHeader,ListGroup ,ListGroupItem, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
var baseurl = `${config.baseurl}`;

class Faculties extends Component {

  constructor(props) {
    super(props);

	this.onSubmit = this.onSubmit.bind(this);
    this.state = {
				id :'',
				heading :'',
				sub_heading : '',
				description : '',
				category_id : '',
				faculty_id : '',
				department_id : '',
				category_levelid:'',
				tenure:'',
				tution_fee:'',
				application_fee:'',
				prerequiste_education:'',
				prerequiste_edu_compulsary:0,
				grade_min:'',
				grade_recommended:'',
				lan_exam:[],
				intakedate_fall:0,
				intakedate_winter:0,
				intakedate_spring:0,
				intakedate_summer:0,
				startdate_fall:'',
				startdate_winter:'',
				startdate_spring:'',
				startdate_summer:'',
				fall:'',
				winter:'',
				spring:'',
				summer:'',
				listening:[],
				listening1:[],
				reading:[],
				writing:[],
				speaking:[],
				qua_exam:[],
				qua_min:[],
				qua_max:[],
				generic_doc:[],
				teams: [],
				schemas: [],
				schemas_id: [],
				fach: [],
				faci: [],
				cath: [],
				cati: [],
				deph: [],
				depi: [],
				mainh: [],
				maini: [],
				
				lis: [],
				rea: [],
				wri: [],
				spk: [],
				qexam: [],
				qlexam: [],
				qmin: [],
				qmax: [],
				gdoc: [],
				selectedTeam: "",
				validationError: "",
				errormsg: "",
				content1: "",
				planets: [],
				count: 0,
				errors:{}
    };
	
	
	var param = localStorage.getItem('universityid');	
	axios.get(baseurl+'/get_courses/'+param).then(response => {	

         this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id,
                   schemas_res: response.data.res,
				   fach: response.data.fach,
                   faci: response.data.faci,
                   cath: response.data.cath,
                   cati: response.data.cati,
				   deph: response.data.deph,
                   depi: response.data.depi,
				   mainh: response.data.mainh,
                   maini: response.data.maini           });
        })	
  }
  
 handleChange = param => e => {
	 this.setState({ errors: {} });
	 $('.row_error').text('');
   axios.get(baseurl+'/get_course/'+param).then(response1 => {
		console.log(response1.data.qlexam);
		if(response1.data.result.intakedate_fall =="1")
			this.setState({ fall: 'checked' });
		if(response1.data.result.intakedate_winter =="1")
			this.setState({ winter: 'checked' });
		if(response1.data.result.intakedate_spring =="1")
			this.setState({ spring: 'checked' });
		if(response1.data.result.intakedate_summer =="1")
			this.setState({ summer: 'checked' });
		
		this.setState({
                   id: response1.data.result.id,
                   heading: response1.data.result.heading,
                   sub_heading: response1.data.result.sub_heading,
                   description: response1.data.result.description,
                   category_id: response1.data.result.category_id,
                   faculty_id: response1.data.result.faculty_id,
                   department_id: response1.data.result.department_id,
                   category_levelid: response1.data.result.category_levelid,
                   tenure: response1.data.result.tenure,
                   tution_fee: response1.data.result.tution_fee,
                   application_fee: response1.data.result.application_fee,
                   prerequiste_education: response1.data.result.prerequiste_education,
                   grade_min: response1.data.result.grade_min,
                   grade_recommended: response1.data.result.grade_recommended,
                   lan_exam: response1.data.result.lan_exam,
                   intakedate_fall: response1.data.result.intakedate_fall,
                   intakedate_winter: response1.data.result.intakedate_winter,
                   intakedate_spring: response1.data.result.intakedate_spring,
                   intakedate_summer: response1.data.result.intakedate_summer,
                   startdate_fall: response1.data.result.startdate_fall,
                   startdate_spring: response1.data.result.startdate_spring,
                   startdate_winter: response1.data.result.startdate_winter,
                   startdate_summer: response1.data.result.startdate_summer,				   
                   lis: response1.data.lis,
                   rea: response1.data.rea,
                   wri: response1.data.wri,
                   spk: response1.data.spk,
                   qexam: response1.data.qexam,
                   qlexam: response1.data.qlexam,
                   qmin: response1.data.qmin,
                   qmax: response1.data.qmax,
                   gdoc: response1.data.gdoc,
                   content1: response1.data.content1
				   
               });
         
        })
		
		e.preventDefault();
		document.querySelector('li.active').classList.remove('active');
		e.target.className = "list-group-item active";
		
};

handleClick = () => {
this.setState({ id: '' });
	this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description: '' });
	this.setState({ category_id: '' });
	this.setState({ faculty_id: '' });
	this.setState({ department_id: '' });
	this.setState({ category_levelid: '' });
	this.setState({ tenure: '' });
	this.setState({ tution_fee: '' });
	this.setState({ application_fee: '' });
	this.setState({ prerequiste_education: '' });
	this.setState({ grade_min: '' });
	this.setState({ grade_recommended: '' });
	this.setState({ lan_exam: '' });
	this.setState({ intakedate_fall: 0 });
	this.setState({ intakedate_winter: 0 });
	this.setState({ intakedate_spring: 0 });
	this.setState({ intakedate_summer: 0 });
	this.setState({ startdate_fall: '' });
	this.setState({ startdate_winter: '' });
	this.setState({ startdate_spring: '' });
	this.setState({ startdate_summer: '' });
	this.setState({ fall: '' });
	this.setState({ winter: '' });
	this.setState({ spring: '' });
	this.setState({ summer: '' });
	this.setState({ lis: [] });
	this.setState({ qlexam: [] });
	this.setState({ rea: [] });
	this.setState({ wri: [] });
	this.setState({ spk: [] });
	this.setState({ qexam: [] });
	this.setState({ qmin: [] });
	this.setState({ qmax: [] });
	this.setState({ gdoc: [] });
	
}

  
handleIdChange = event => {
	this.setState({id: event.target.value});
}
handleHeadingChange = event => {
	this.setState({heading: event.target.value});
}

handleSubHeadingChange = event => {
	this.setState({sub_heading: event.target.value});
}

handleDescriptionChange = event => {
	this.setState({description: event.target.value});
}
handleCategoryChange = event => {
	this.setState({category_id: event.target.value});
}

handleFacultyChange = event => {
	this.setState({faculty_id: event.target.value});
}
handleDepartmentChange = event => {
	this.setState({department_id: event.target.value});

}
handleMainlevelChange = event => {
	this.setState({category_levelid: event.target.value});

}
handleTenureChange = event => {
	this.setState({tenure: event.target.value});

}
handleTutionfeeChange = event => {
	this.setState({tution_fee: event.target.value});
}
handleApplicationfeeChange = event => {
	this.setState({application_fee: event.target.value});

}
handlePreeduChange = event => {
	this.setState({prerequiste_education: event.target.value});

}
/*
handleCompulsaryChange = event => {
	this.setState({prerequiste_edu_compulsary: event.target.value});

}
*/
handleGrademinChange = event => {
	this.setState({grade_min: event.target.value});

}
handleGraderecChange = event => {
	this.setState({grade_recommended: event.target.value});

}
handleLangexamChange = event => {
	this.setState({lan_exam: event.target.value});

}
handleListeningChange = event => {
	this.setState({listening: event.target.value});

}
handleListeningChange1 = event => {
	this.setState({lis: event.target.value});
}
handleReadingChange = event => {
	this.setState({reading: event.target.value});
}
handleReadingChange1 = event => {
	this.setState({rea: event.target.value});
}

handleWritingChange = event => {
	this.setState({writing: event.target.value});
}

handleWritingChange1 = event => {
	this.setState({wri: event.target.value});
}
handleSpeakingChange = event => {
	this.setState({speaking: event.target.value});
}
handleSpeakingChange1 = event => {
	this.setState({spk: event.target.value});
}
handleQuaexamChange = event => {
	this.setState({qua_exam: event.target.value});

}
handleQuaminChange = event => {
	this.setState({qua_min: event.target.value});
}
handleQuaminChange1 = event => {
	this.setState({qmin : event.target.value});
}
handleQuamaxChange = event => {
	this.setState({qua_max: event.target.value});

}
handleDocumentChange = event => {
	this.setState({generic_doc: event.target.value});

}
handleDatefallChange = event => {
	var datefal =0;
	var fall ='';
	if(event.target.value =='0')
	{
	datefal =1;
	fall ='checked';
	}
	else
	{
	datefal =0;	
	fall ='';
	}
		
	this.setState({intakedate_fall: datefal});
	this.setState({fall: fall});

}
handleWinterChange = event => {
	var datefal =0;
	var winter ='';
	if(event.target.value =='0')
	{
	datefal =1;
	winter ='checked';
	}
	else
	{
	datefal =0;
	winter ='';
	}
		
	this.setState({intakedate_winter: datefal});
	this.setState({winter: winter});

}
handleSpringChange = event => {
	var datefal =0;
	var spring ='';
	if(event.target.value =='0')
	{
	datefal =1;
	spring ='checked';
	}
	else
	{
	datefal =0;	
	spring ='';
	}
		
	this.setState({intakedate_spring: datefal});
	this.setState({spring: spring});

}
handleSummerChange = event => {
	var datefal =0;
	var summer ='';
	if(event.target.value =='0')
	{
	datefal =1;
	summer ='checked';
	}
	else
	{
	datefal =0;	
	summer ='';
	}
		
	this.setState({intakedate_summer: datefal});
	this.setState({summer: summer});

}
handleStartdatefallChange = event => {
	this.setState({startdate_fall: event.target.value});

}
handleStartdatewinterChange = event => {
	this.setState({startdate_winter: event.target.value});

}
handleStartdatespringChange = event => {
	this.setState({startdate_spring: event.target.value});

}
handleStartdatesummerChange = event => {
	this.setState({startdate_summer: event.target.value});

}
handleCompulsaryChange = event => {
	var datefal =0;
	if(event.target.value =='0')
	datefal =1;
	else
	datefal =0;	
		
	this.setState({prerequiste_edu_compulsary: datefal});

}
handleAddnewChange = event => {	
	/*
	var $tr    = $('.langdiv').eq(0);
    var $clone = $tr.clone();
    $clone.find(':text').val('');
    $tr.after($clone);
	*/
	var newel = $('.langdiv:last').clone();
	newel.find(':text').val('');
    $(newel).insertAfter(".langdiv:last");
	this.changeclassfields();	
}
changeclassfields = () => {
	this.changeClassName('lan_exam');
	this.changeClassName('listening');
	this.changeClassName('reading');
	this.changeClassName('writing');
	this.changeClassName('speaking');
	this.changeClassName('lan_exam_error');
	this.changeClassName('listening_error');
	this.changeClassName('reading_error');
	this.changeClassName('writing_error');
	this.changeClassName('speaking_error');
}
changequaclassfields = () => {
	this.changeClassName('qua_exam');
	this.changeClassName('qua_min');
	this.changeClassName('qua_max');
	this.changeClassName('qua_exam_error');
	this.changeClassName('qua_min_error');
	this.changeClassName('qua_max_error');
}
changedocclassfields = () => {
	this.changeClassName('generic_doc');
	this.changeClassName('generic_doc_error');
}
changeclassfieldserror = () => {
	
	this.changeClassNameerror('lan_exam');
	this.changeClassNameerror('listening');
	this.changeClassNameerror('reading');
	this.changeClassNameerror('writing');
	this.changeClassNameerror('speaking');
}
changequaclassfieldserror = () => {
	this.changeClassNameerror('qua_exam');
	this.changeClassNameerror('qua_min');
	this.changeClassNameerror('qua_max');
}
changedocclassfieldserror = () => {
	this.changeClassNameerror('generic_doc');
}
changeClassName(className) 
{	
	var numItems = $('.'+className).length;
	for(var i=0;i<=numItems;i++)
	{
		$('.'+className).removeClass(className+i);
	}
	
	$('.' + className).each(function (index)
	{
		$(this).removeClass(className + '0');
		//$(this).removeClass(className + index);
		//$(this).removeClassExcept('form-control '+className);
		$(this).addClass(className + index);
	});
}
changeClassNameerror(className) 
{	
	$('.' + className).each(function (index)
	{
		if($(this).val() =='')
		{ 
			var newcount = parseFloat($('.count').val()) + parseFloat(1);
			$('.count').val(newcount);
			$('.' +className+'_error'+index).text('Value is required');
			$('.' +className+index).val('');
		}
		else
		{
			$('.' +className+'_error'+index).text('');
			//$(this).val($(this).val());
		}
			
	});
}
handleAddnewqChange = event => {
	
	var $tr    = $('.qua_div').eq(0);
    var $clone = $tr.clone();
    $clone.find(':text').val('');
    $tr.after($clone);
	this.changequaclassfields();
	
}
handleAddnewdChange = event => {
	
	var $tr    = $('.doc_div').eq(0);
    var $clone = $tr.clone();
    $clone.find(':text').val('');
    $tr.after($clone);
	this.changedocclassfields();
	
}
validate = () => {
     const errors = {};
	 if(this.state.heading.trim() === '')
		{
			errors.heading = 'Heading is required';
		}
		if(this.state.sub_heading.trim() === '')
		{
			errors.sub_heading = 'Sub Heading is required';
		}
		if(this.state.description.trim() === '')
		{
			errors.description = 'Description is required';
		}
		if(this.state.category_id === '')
		{
			errors.category_id = 'category is required';
		}
		if(this.state.faculty_id === '')
		{
			errors.faculty_id = 'Faculty is required';
		}
		if(this.state.department_id === '')
		{
			errors.department_id = 'Department is required';
		}
		if(this.state.category_levelid === '')
		{
			errors.category_levelid = 'Course category is required';
		}
		if(this.state.tenure === '')
		{
			errors.tenure = 'Tenure is required';
		}
		if(this.state.tution_fee === '')
		{
			errors.tution_fee = 'Tution fee is required';
		}
		if(this.state.application_fee === '')
		{
			errors.application_fee = 'Application fee is required';
		}
		if(this.state.prerequiste_education === '')
		{
			errors.prerequiste_education = 'Prerequiste Education  is required';
		}
		if(this.state.grade_min === '')
		{
			errors.grade_min = 'Grade Minimun  is required';
		}
		if(this.state.grade_recommended === '')
		{
			errors.grade_recommended = 'Grade Recommanded  is required';
		}
		if(this.state.lan_exam === '')
		{
			errors.lan_exam = 'Language exam is required';
		}
		if(this.state.intakedate_fall == "1")
		{
			if(this.state.startdate_fall === '')
			{
			errors.startdate_fall = 'startdate fall is required';
			}
		}
		if(this.state.intakedate_winter == "1")
		{
			if(this.state.startdate_winter === '')
			{
			errors.startdate_winter = 'startdate winter is required';
			}
		}
		if(this.state.intakedate_spring == "1")
		{
			if(this.state.startdate_spring === '')
			{
			errors.startdate_spring = 'startdate spring is required';
			}
		}
		if(this.state.intakedate_summer == "1")
		{
			if(this.state.startdate_summer === '')
			{
			errors.startdate_summer = 'startdate summer is required';
			}
		}
		
		
		
   	 return Object.keys(errors).length === 0 ? null : errors;
};
/*
$('.add_more').on("click",function() 
{
    var $tr    = $('lang_div');
    var $clone = $tr.clone();
    $clone.find(':text').val('');
    $tr.after($clone);
});
*/

 onSubmit = e => {
   e.preventDefault();
   var count=0;
   this.changeclassfieldserror();
   this.changequaclassfieldserror();
   this.changedocclassfieldserror();
  
   
	const errors = this.validate();
	console.log(errors);
	var lanexamArr         =[];
	var lisArr         =[];
   var readArr        =[];
   var wriArr         =[];
   var spkArr         =[];
   var qua_examArr    =[];
   var qua_minArr     =[];
   var qua_maxArr     =[];
   var generic_docArr =[];
   $('.generic_doc').each(function (i) {
                generic_docArr.push($(this).val());
    });
	$('.lan_exam').each(function (i) {
                lanexamArr.push($(this).val());
    });
    $('.listening').each(function (i) {
                lisArr.push($(this).val());
    });
	$('.reading').each(function (i) {
                readArr.push($(this).val());
    });
	$('.writing').each(function (i) {
                wriArr.push($(this).val());
    });
	$('.writing1').each(function (i) {
                wriArr.push($(this).val());
    });
	$('.speaking').each(function (i) {
                spkArr.push($(this).val());
    });
	$('.qua_exam').each(function (i) {
                qua_examArr.push($(this).val());
    });
	$('.qua_min').each(function (i) {
                qua_minArr.push($(this).val());
    });
	$('.qua_max').each(function (i) {
                qua_maxArr.push($(this).val());
    });
	/*
	if($('#intakefall').val() =="0")
	{
		//errors.intakedate_fall='';	
		errors.startdate_fall='';	
	}
	if($('#intakespring').val() =="0")
	{
		//errors.intakespring='';	
		errors.startdate_spring='';	
	}
	if($('#intakesummer').val() =="0")
	{
		//errors.intakesummer='';	
		errors.startdate_summer='';	
	}
	if($('#intakewinter').val() =="0")
	{
		//errors.intakewinter='';	
		errors.startdate_winter='';	
	}
	*/
	
   this.setState({listening: lisArr});
   this.setState({reading: readArr});
   this.setState({writing: wriArr});
   this.setState({speaking: spkArr});
   this.setState({qua_exam: qua_examArr});
   this.setState({qua_min: qua_minArr});
   this.setState({qua_max: qua_maxArr});
   this.setState({generic_doc: generic_docArr});
	
	//if ($('.count').val() <= 0)
	//{
	this.setState({ errors });
	if (errors) return;
	//}
   console.log(lisArr);
   console.log(readArr);
   console.log(wriArr);
   console.log(spkArr);
   console.log(qua_examArr);
   console.log(qua_minArr);
   console.log(qua_maxArr);
   console.log(generic_docArr);
    const products = {           
					id : this.state.id,
					sub_heading : this.state.sub_heading,
					heading : this.state.heading,
					description : this.state.description,
					category_id : this.state.category_id,
					faculty_id : this.state.faculty_id,
					department_id : this.state.department_id,
					category_levelid : this.state.category_levelid,
					tution_fee : this.state.tution_fee,
					tenure : this.state.tenure,
					application_fee : this.state.application_fee,
					prerequiste_education : this.state.prerequiste_education,
					prerequiste_edu_compulsary : this.state.prerequiste_edu_compulsary,
					grade_min : this.state.grade_min,
					grade_recommended : this.state.grade_recommended,
					lan_exam : lanexamArr,
					listening : lisArr,
					reading : readArr,
					writing : wriArr,
					speaking : spkArr,
					qua_exam : qua_examArr,
					qua_min :qua_minArr,
					qua_max : qua_maxArr,
					generic_doc : generic_docArr,
					intakedate_fall : this.state.intakedate_fall,
					intakedate_winter : this.state.intakedate_winter,
					intakedate_spring : this.state.intakedate_spring,
					intakedate_summer : this.state.intakedate_summer,
					startdate_fall : this.state.startdate_fall,
					startdate_spring : this.state.startdate_spring,
					startdate_summer : this.state.startdate_summer,
					startdate_winter : this.state.startdate_winter,
					program_coordinator_id : 1,
					university_id : localStorage.getItem('universityid')          
		}
		//setTimeout(function () { 
		if ($('.count').val() <= 0)
		{
		let uri = baseurl+'/store_courses';
		const post = axios.post(uri, products).then((response) => {
		if(response.data.status_code =="200")
		{
		toast.success(response.data.message);
		setTimeout(function () 
		{ 
		window.location.reload(true);

		}, 3000);
		}
		else
		{
			toast.success('Error in save Faculty');  
		}
		});
		}
		//}, 3000);


	/*
	this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description: '' });
	this.setState({ category_id: '' });
	this.setState({ faculty_id: '' });
	this.setState({ department_id: '' });
	this.setState({ category_levelid: '' });
	this.setState({ tenure: '' });
	this.setState({ tution_fee: '' });
	this.setState({ application_fee: '' });
	this.setState({ prerequiste_education: '' });
	this.setState({ prerequiste_edu_compulsary: '' });
	this.setState({ grade_min: '' });
	this.setState({ grade_recommended: '' });
	this.setState({ lan_exam: '' });
	//this.setState({ listening: '' });
	//this.setState({ reading: '' });
	//this.setState({ writing: '' });
	//this.setState({ speaking: '' });
	//this.setState({ qua_exam: '' });
	//this.setState({ qua_min: '' });
	//this.setState({ qua_max: '' });
	//this.setState({ generic_doc: '' });
	this.setState({ intakedate_fall: '' });
	this.setState({ intakedate_winter: '' });
	this.setState({ intakedate_spring: '' });
	this.setState({ intakedate_summer: '' });
	this.setState({ startdate_fall: '' });
	this.setState({ startdate_winter: '' });
	this.setState({ startdate_summer: '' });
	this.setState({ startdate_spring: '' });
	*/
	this.setState({ errors: '' }); 
	
	
	
	}
	getClassNames(index,classname) 
	{
	return classname+index;
	}
	getErrorClassNames(index,classname) 
	{
	return classname+index;
	}
	render() {
	const { errors } = this.state;
	if(!this.state.id)
	{
		var content =<div className="langdiv">
					  
					   <div className="row">
					  <label className="card-label col-12">
                           Language Exam
                            </label>
					  <div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
					  <InputGroup className="mb-1">
                            <label className="card-label">
                            Exam
                            </label>

							<Input type="select" name="lan_exam" id="SelectLm" bsSize="sm" className="form-control lan_exam lan_exam0" value={this.state.lan_exam}  onChange={this.handleLangexamChange}>
                              <option value="">Select language exam</option>
                              <option>Tofel</option>
                              <option>IELTS</option>
                            
                            </Input>
                          </InputGroup>

                         <h6 className="row_error lan_exam_error lan_exam_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
					  </div>
		<div className="row lang_div">	
					  
					  <div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
					  
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Listening
                            </label>
							<Input type="text" name="listening" className="form-control listening listening0" placeholder="" value={this.state.listening}  onChange={this.handleListeningChange}/>
                          </InputGroup>
                           <h6 className="row_error listening_error listening_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                      </div>
					  
					  
					  <div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Reading
                            </label>

                            <Input type="text" name="reading" className="form-control reading reading0" placeholder="" value={this.state.reading}  onChange={this.handleReadingChange}/>
                          </InputGroup> 
						<h6 className="row_error reading_error reading_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>						  
                       </div>
					   
					   <div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Writing
                            </label>
                            <Input type="text" name="writing" className="form-control writing writing0" placeholder="" value={this.state.writing}  onChange={this.handleWritingChange}/>
                          </InputGroup>
						   <h6 className="row_error writing_error writing_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
						
						<div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Speaking
                            </label>
                            <Input type="text" name="speaking" className="form-control speaking speaking0" placeholder="" value={this.state.Speaking}  onChange={this.handleSpeakingChange}/>
                          </InputGroup>
						  <h6 className="row_error speaking_error speaking_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
                        </div>
						</div>;
	var content1=<div className="row qua_div">
					  <label className="card-label col-12">
                           Qualification Exam
                            </label>
					  <div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
					  <InputGroup className="mb-1">
                            <label className="card-label">
                            Exam
                            </label>

							<Input type="select" name="qua_exam" id="qua_exam" className="qua_exam qua_exam0" value={this.state.qua_exam}  onChange={this.handleQuaexamChange}>
                              <option value="" >Select</option>
                              <option>GRE</option>
                              <option>GMAT</option>
                              <option>SAT</option>
                            </Input>
                          </InputGroup>
						  <h6 className="row_error qua_exam_error qua_exam_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
						<div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Min
                            </label>

                            <Input type="text" name="qua_min" id="qua_min" className="form-control qua_min qua_min0" value={this.state.qua_min}  onChange={this.handleQuaminChange}/>
                          </InputGroup>
						  <h6 className="row_error qua_min_error qua_min_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
						<div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Max
                            </label>

                            <Input type="text" name="qua_max" id="qua_max" className="form-control qua_max qua_max0" value={this.state.qua_max}  onChange={this.handleQuamaxChange}/>
                          </InputGroup>
						  <h6 className="row_error qua_max_error qua_max_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
						</div>;
	var content2 = <div className="row doc_div">
							 
						 <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                         <InputGroup className="mb-1">
                            <label className="card-label">
                            Exam
                            </label>

							<Input  type="select" name="generic_doc" id="generic_doc" className="generic_document generic_doc generic_doc0"  value={this.state.generic_doc}  onChange={this.handleDocumentChange}>
                              <option value="" >Select</option>
                              <option>2 YEAR</option>
                            
                            </Input>
                          </InputGroup>
						  <h6 className="row_error generic_doc_error generic_doc_error0" style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>
                        </div>
						</div>;
						
	}
	else
	{
		var content='';
		var content1='';
		var content2='';
		
	}
	



    return (
      <div className="faculty-box">
        <Container>
          <ToastContainer />
          <Row>
            <Col md="9">
              <CardGroup className="custom_group">
                <Card className="uni-right-card">
                  <CardBody>
                    <Form>
					
					
					
					 <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                      <InputGroup className="mb-1">
                       <label className="card-label">Add Course</label>
					   <Input type="hidden" name="id" className="form-control"  value={this.state.id} onChange={this.handleIdChange} />
					   <Input type="hidden" name="count" className="form-control count"  value={this.state.count} />
                        <Input type="text" name="heading" className="form-control" placeholder="Heading" value={this.state.heading} onChange={this.handleHeadingChange} />
              </InputGroup>
              <h6 style={{color: 'red',fontSize:"13px"}}>{errors.heading}</h6>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                        <InputGroup className="mb-1">
        <label className="card-label">Add sub - heading</label>
                  
                        <Input type="text" name="sub_heading" className="form-control" placeholder="Sub Heading" value={this.state.sub_heading} onChange={this.handleSubHeadingChange}/>
                      </InputGroup>
					  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.sub_heading}</h6>
                          </div>
                          <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group-text">
        <InputGroup className="mb-1">
        <label className="card-label">Description</label>
                        <textarea rows="3" cols="100" width="100%" name="description" placeholder="Add your description" value={this.state.description} onChange={this.handleDescriptionChange}/>

                      </InputGroup>
					  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.description}</h6>
        </div>
		
		
		
		
		
		<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">  
		<InputGroup className="pl-0 mb-1 col-md-6">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="select" name="category_id" id="SelectLm" bsSize="sm" value={this.state.category_id}  onChange={this.handleCategoryChange}>
                        <option value="">select Category</option>
						{this.state.cath.map((schema, index) => ( 
                        <option value={ this.state.cati[index] }>{ schema }</option>
                          ))}
                      </Input>
                      </InputGroup>
					  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.category_id}</h6>
		</div>
		
		
		<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">  
		<InputGroup className="pl-0 mb-1 col-md-6">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="select" name="faculty_id" id="SelectLm" bsSize="sm" value={this.state.faculty_id}  onChange={this.handleFacultyChange}>
                        <option value="">select Faculty</option>
						{this.state.fach.map((schema, index) => ( 
                        <option value={ this.state.faci[index] }>{ schema }</option>
                          ))}
                      </Input>
                      </InputGroup>
					  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.faculty_id}</h6>
		</div>
		
		<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">  
		<InputGroup className="pl-0 mb-1 col-md-6">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="select" name="department_id" id="SelectLm" bsSize="sm" value={this.state.department_id}  onChange={this.handleDepartmentChange}>
                        <option value="">select Department</option>
						{this.state.deph.map((schema, index) => ( 
                        <option value={ this.state.depi[index] }>{ schema }</option>
                          ))}
                      </Input>
                      </InputGroup>
					  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.faculty_id}</h6>
		</div>
		
		<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">  
		<InputGroup className="pl-0 mb-1 col-md-6">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="select" name="category_levelid" id="SelectLm" bsSize="sm" value={this.state.category_levelid}  onChange={this.handleMainlevelChange}>
                        <option value="">select Course category</option>
						{this.state.mainh.map((schema, index) => ( 
                        <option value={ this.state.maini[index] }>{ schema }</option>
                          ))}
                      </Input>
                      </InputGroup>
					  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.category_levelid}</h6>
		</div>
		
		<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
<FormGroup className="col-md-6 uni-no-padd">
<label className="card-label">Assign Program Coordinator</label>              
                              <div class="btn-group">
                                  <button type="button" class="btn btn-secondary">Dr Kelly Anne</button>
                                  <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-expanded="false" data-reference="parent">
                                   <i class="fa fa-angle-down"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    <a class="dropdown-item">Dr Kelly</a>
                                    <a class="dropdown-item">Dr Anne</a>
                                  
                                  </div>
                            </div>
                            </FormGroup>
</div>
					
					
					
                      <div  className="row card-form-box uni-no-mar mb-3 cour-box">
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-lf">
                          <label className="card-label">INTAKE</label >
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
							  <div className="check-name">
                                <Input
                                  addon
                                  type="checkbox" name='intakedate_fall' id="intakefall" checked={this.state.fall}  value={this.state.intakedate_fall}  onChange={this.handleDatefallChange}
                                  aria-label="Checkbox for following text input"
                                />
								<span className="checkmark"></span>
								 <h6 style={{color: 'red',fontSize:"11px"}}>{errors.intakedate_fall}</h6>
								</div>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Fall" />
                          </InputGroup>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-rt">
                          <label className="card-label">START Date</label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                {" "}
                                <span class="fa fa-calendar"></span>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="..." value={this.state.startdate_fall}  onChange={this.handleStartdatefallChange} />
                          </InputGroup>
						  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.startdate_fall}</h6>
                        </div>
                      </div>
                      <div className="row card-form-box uni-no-mar mb-3 cour-box">
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-lf">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
							  <div className="check-name">
                                <Input
                                  addon
                                  type="checkbox"
                                  aria-label="Checkbox for following text input" id="intakewinter" checked={this.state.winter} name='intakedate_winter' value={this.state.intakedate_winter}  onChange={this.handleWinterChange}
                                />
								<span className="checkmark"></span>
								</div>
                              </InputGroupText>
							  <h6 style={{color: 'red'}}>{errors.intakedate_winter}</h6>
                            </InputGroupAddon>
                            <Input placeholder="Winter" />
                          </InputGroup>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-rt">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                {" "}
                                <span class="fa fa-calendar"></span>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="..." value={this.state.startdate_winter}  onChange={this.handleStartdatewinterChange} />
                          </InputGroup>
						  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.startdate_winter}</h6>
                        </div>
                      </div>
                      <div className="row card-form-box uni-no-mar mb-3 cour-box">
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-lf">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
							  <div className="check-name">
                                <Input
                                  addon
                                  type="checkbox" checked={this.state.spring}
                                  aria-label="Checkbox for following text input" id="intakespring" name='intakedate_spring' value={this.state.intakedate_spring}  onChange={this.handleSpringChange}
                                />
								<span className="checkmark"></span>
								</div>
                              </InputGroupText>
							  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.intakedate_spring}</h6>
                            </InputGroupAddon>
                            <Input placeholder="Spring" />
                          </InputGroup>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-bt-rt">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                {" "}
                                <span class="fa fa-calendar"></span>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="..." value={this.state.startdate_spring}  onChange={this.handleStartdatespringChange} />
                          </InputGroup>
						  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.startdate_spring}</h6>
                        </div>
                      </div>
                      <div className="row card-form-box uni-no-mar mb-3 cour-box">
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-lf">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
							  <div className="check-name">
                                <Input
                                  addon
                                  type="checkbox" checked={this.state.summer}
                                  aria-label="Checkbox for following text input" id="intakesummer" name='intakedate_summer' value={this.state.intakedate_summer}  onChange={this.handleSummerChange}
                                />
								<span className="checkmark"></span>
								</div>
                              </InputGroupText>
							  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.intakedate_summer}</h6>
                            </InputGroupAddon>
                            <Input placeholder="Summer" />
                          </InputGroup>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group uni-no-padd no-br-rt">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                {" "}
                                <span class="fa fa-calendar"></span>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="..." value={this.state.startdate_summer}  onChange={this.handleStartdatesummerChange} />
                          </InputGroup>
						  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.startdate_summer}</h6>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                          <FormGroup className="mb-1">
                            <label className="card-label">TENURE</label>
                            <Input type="select" name="tenure" id="SelectLm" bsSize="sm" value={this.state.tenure}  onChange={this.handleTenureChange}>
                              <option value="">Select</option>
                              <option>3 Months</option>
                              <option>6 Months</option>
                              <option>9 Months</option>
                              <option>1 Year</option>
                              <option>2 Years</option>
                              <option>3 Years</option>
                              <option>4 Years</option>
                            
                            </Input>
                          </FormGroup>
						  <h6 style={{color: 'red',fontSize:"11px"}}>{errors.tenure}</h6>
                        </div>
                       
                        

                        {/* <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                          <FormGroup className="col-md-6 uni-no-padd">
                            <label className="card-label">
                              Assign Program Coordinator
                            </label>
                            <div class="btn-group">
                              <button type="button" class="btn btn-secondary">
                                Dr Kelly Anne
                              </button>
                              <button
                                type="button"
                                class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                                id="dropdownMenuReference"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                data-reference="parent"
                              >
                                <i class="fa fa-angle-down"></i>
                              </button>
                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuReference"
                              >
                                <a class="dropdown-item">Dr Kelly</a>
                                <a class="dropdown-item">Dr Anne</a>
                              </div>
                            </div>
                          </FormGroup>
                        </div> */}
                      </div>
					  <div className="row">
					  <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
                             Tution Fee
                            </label>

                            <Input
                              type="text"
                              name="tution_fee"
                              className="form-control"
                              placeholder=""
                              value={this.state.tution_fee}
                              onChange={this.handleTutionfeeChange}
                            />
                          </InputGroup>
                          <h6 style={{ color: "red",fontSize:"11px" }}>{errors.tution_fee}</h6>
                        </div>
						<div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
                             Application Fee
                            </label>

                            <Input
                              type="text"
                              name="application_fee"
                              className="form-control"
                              placeholder=""
                              value={this.state.application_fee}
                              onChange={this.handleApplicationfeeChange}
                            />
                          </InputGroup>
                          <h6 style={{ color: "red",fontSize:"11px"}}>{errors.application_fee}</h6>
                        </div>
					  </div>
					  <div className="row">
					  <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
					  <label className="card-label">
                             COURSE Eligibility
                            </label>
                          <InputGroup className="mb-1">
                            <label className="card-label">
                            Prerequisite Education
                            </label>

							<Input type="select" name="prerequiste_education"  id="SelectLm" bsSize="sm" value={this.state.prerequiste_education}  onChange={this.handlePreeduChange}>
                              <option value="">Select</option>
                              <option>Bachelor</option>
                              <option>Master</option>
                              <option>High School</option>
                            
                            </Input>
                          </InputGroup>
                          <h6 style={{ color: "red",fontSize:"11px" }}>{errors.prerequiste_education}</h6>
						  <InputGroup className="col-12 card-form-box">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
							  <div className="check-name">
                                <Input
                                  addon
                                  type="checkbox"
                                  aria-label="Checkbox for following text input" name='prerequiste_edu_compulsary' value={this.state.prerequiste_edu_compulsary}  onChange={this.handleCompulsaryChange}
                                />
								<span className="checkmark"></span>
								</div>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Compulsary"
                              className="form-control"
                              placeholder=""
							  placeholder="..."  />
                          </InputGroup>
                        </div>

					  </div>
					  <div className="row">
					  <label className="card-label col-12">
                            GRADE
                            </label>
					  <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
                             MIN
                            </label>

                            <Input
                              type="text"
                              name="grade_min"
                              className="form-control"
                              placeholder=""
                              value={this.state.grade_min}
							  onChange={this.handleGrademinChange}
							  placeholder="..."
                            />
                          </InputGroup>
                          <h6 style={{ color: "red",fontSize:"11px" }}>{errors.grade_min}</h6>
                        </div>
						<div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Recommanded
                            </label>

                            <Input
                              type="text"
                              name="grade_recommended"
                              className="form-control"
                              placeholder=""
                              value={this.state.grade_recommended}
							  onChange={this.handleGraderecChange}
							  placeholder="..."
                            />
                          </InputGroup>
                          <h6 style={{ color: "red",fontSize:"11px" }}>{errors.grade_recommended}</h6>
                        </div>
					  </div>
					  
					  {content}
					  
					  {this.state.lis.map((listening, index) => (
					  <div className="langdiv">
					  
					   <div className="row">
					  <label className="card-label col-12">
                           Language Exam
                            </label>
					  <div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
					  <InputGroup className="mb-4">
                            <label className="card-label">
                            Exam
                            </label>

							<Input type="select" name="lan_exam" id="SelectLm" bsSize="sm" className={this.getClassNames(index,'lan_exam lan_exam')} value={this.state.qlexam[index]}  onChange={this.handleLangexamChange}>
                              <option value="">Select language exam</option>
                              <option>Tofel</option>
                              <option>IELTS</option>
                            
                            </Input>
                          </InputGroup>

                         <h6 className={this.getClassNames(index,'row_error lan_exam_error lan_exam_error')} style={{ color: "red",fontSize:"13px" }}>{this.state.errormsg}</h6>
                        </div>
					  </div>
					  
					  
					  <div className="row lang_div">	
					  
					  <div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
					  
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Listening
                            </label>
							<Input type="text" name="lis" className={this.getClassNames(index,'listening listening')} placeholder="" value={this.state.lis[index]}   onChange={this.handleListeningChange1}/>
                          </InputGroup>
                           <h6 className={this.getErrorClassNames(index,'row_error listening_error listening_error')} style={{ color: "red",fontSize:"13px",fontSize:"11px" }}>{this.state.errormsg}</h6>
                      </div>
					  
					  
					  <div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Reading
                            </label>

                            <Input type="text" name="rea" className={this.getClassNames(index,'reading reading')} placeholder="" value={this.state.rea[index]}  onChange={this.handleReadingChange1}/>
                          </InputGroup> 
						<h6 className={this.getErrorClassNames(index,'row_error reading_error reading_error')} style={{ color: "red",fontSize:"11px" }}>{this.state.errormsg}</h6>						  
                       </div>
					   
					   <div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Writing
                            </label>
                            <Input type="text" name="wri" className={this.getClassNames(index,'writing writing')} placeholder="" value={this.state.wri[index]}  onChange={this.handleWritingChange1}/>
                          </InputGroup>
						   <h6 className={this.getErrorClassNames(index,'row_error writing_error writing_error')} style={{ color: "red" }}>{this.state.errormsg}</h6>
                        </div>
						
						<div className="col-xl-3 col-md-3 col-sm-3 col-lg-3 col-12 card-from-group">
                          <InputGroup className="mb-1">
                            <label className="card-label">
							Speaking
                            </label>
                            <Input type="text" name="spk" className={this.getClassNames(index,'speaking speaking')} placeholder="" value={this.state.spk[index]}  onChange={this.handleSpeakingChange1}/>
                          </InputGroup>
						  <h6 className={this.getErrorClassNames(index,'row_error speaking_error speaking_error')} style={{ color: "red" }}>{this.state.errormsg}</h6>
                        </div>
						</div>
						 
						</div>))}
						<InputGroup className="col-12 card-form-box d-flex justify-content-end">
                           <div className="float-right">
                                <a className="add-btn add_more" onClick={this.handleAddnewChange}> + Add</a>  
						   </div>
                          </InputGroup>
						  {content1}

					  {this.state.qexam.map((qexam, index) => (
					  <div className="row qua_div">
					  <label className="card-label col-12">
                           Qualification Exam
                            </label>
					  <div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
					  <InputGroup className="mb-4">
                            <label className="card-label">
                            Exam
                            </label>

							<Input type="select" name="qua_exam" id="qua_exam" className={this.getClassNames(index,'qua_exam qua_exam')} value={qexam}  onChange={this.handleQuaexamChange}>
                              <option value="" >Select</option>
                              <option>GRE</option>
                              <option>GMAT</option>
                              <option>SAT</option>
                            </Input>
                          </InputGroup>
						  <h6 className={this.getErrorClassNames(index,'row_error qua_exam_error qua_exam_error')} style={{ color: "red" }}>{this.state.errormsg}</h6>
                        </div>
						<div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
                          <InputGroup className="mb-4">
                            <label className="card-label">
							Mineee
                            </label>

                            <Input type="text" name="qmin" id="qua_min" className={this.getClassNames(index,'qua_min qua_min')} value={this.state.qmin[index]} onChange={this.handleQuaminChange1} />
                          </InputGroup>
						  <h6 className={this.getErrorClassNames(index,'row_error qua_min_error qua_min_error')} style={{ color: "red" }}>{this.state.errormsg}</h6>
                        </div>
						<div className="col-xl-4 col-md-4 col-sm-4 col-lg-4 col-12 card-from-group">
                          <InputGroup className="mb-4">
                            <label className="card-label">
							Max
                            </label>

                            <Input type="text" name="qua_max" id="qua_max" className={this.getClassNames(index,'qua_max qua_max')} value={this.state.qmax[index]}  onChange={this.handleQuamaxChange}/>
                          </InputGroup>
						  <h6 className={this.getErrorClassNames(index,'row_error qua_max_error qua_max_error')} style={{ color: "red" }}>{this.state.errormsg}</h6>
                        </div>
						</div>
						 ))}
						<InputGroup className="col-12 card-form-box d-flex justify-content-end">
                           <div className="float-right">
                                <a className="add-btn add_more" onClick={this.handleAddnewqChange}> + Add</a>  
						   </div>
                          </InputGroup>
						  {content2}

					  {this.state.gdoc.map((gdoc, index) => (
                         <div className="row doc_div">
							 
						 <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                         <InputGroup className="mb-4">
                            <label className="card-label">
                            Exam
                            </label>

							<Input  type="select" name="generic_doc" id="generic_doc" className={this.getClassNames(index,'generic_doc generic_doc')}  value={gdoc}  onChange={this.handleDocumentChange}>
                              <option value="" >Select</option>
                              <option>2 YEAR</option>
                            
                            </Input>
                          </InputGroup>
						  <h6 className={this.getErrorClassNames(index,'row_error generic_doc_error generic_doc_error')} style={{ color: "red" }}>{this.state.errormsg}</h6>
                        </div>
						</div>
						))}
						<InputGroup className="col-12 card-form-box">
                           <div className="float-right col-lg-6 col-md-6">
                                <a className="add-btn float-right add_more" onClick={this.handleAddnewdChange} > + Add</a>  
						   </div>
                          </InputGroup>
						 
                      <Row className="uni-no-mar">
                        <Col xs="12">
                          <Button
                            color="primary"
                            type="submit"
                            onClick={this.onSubmit.bind(this)}
                            className="px-4 float-md-right save-btn"
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>

            <Card className="col-md-3 list-card uni-no-padd">
              <CardHeader className="card-list-header">
                <span className="card-list-head" onClick={this.handleClick}>
                  <strong> + Add Subsection</strong>
                </span>
                <div className="card-header-actions"></div>
              </CardHeader>
              <CardBody className="uni-no-padd">
                <ListGroup className="university-list">
                  <Scrollbars style={{ height: 300 }}>
                    {this.state.schemas.map((schema, index) => (
                      <ListGroupItem
                        className="lists"
                        onClick={this.handleChange(
                          this.state.schemas_id[index]
                        )}
                      >
                        {schema}
                      </ListGroupItem>
                    ))}
                  </Scrollbars>
                </ListGroup>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
  
}

export default Faculties;
