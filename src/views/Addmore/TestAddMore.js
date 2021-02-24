import React from "react";
import template from "./TestAddMore.jsx";
import config from '../../config.json';
import $, { merge, type } from 'jquery';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var baseurl = `${config.baseurl}`;

// API Call Url //
function submitForm(contentType, data, setResponse, path) {

  axios({
    url: baseurl + `/store_answers`,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': contentType
    }
  }).then((response) => {
    setResponse(response.data);
    // window.location.reload(false);


   /* setTimeout(function () {
      window.location.reload(true);
    }, 7000);*/

  }).catch((error) => {
    setResponse("error");
  })
}



class TestAddMore extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onAddmore = this.onAddmore.bind(this);
    this.onAddmorequestion = this.onAddmorequestion.bind(this);
    this.onSelectQuestion = this.onSelectQuestion.bind(this);
    this.handleAddMoreInput = this.handleAddMoreInput.bind(this);
    this.clearTestAddmore = this.clearTestAddmore.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

      question: [],
      questionId: '',
	  answers: [],

      addmoreinput: [[]],

      typeoption1: [''],
      typeoption2: [''],

      typeoption3: [''],
      typeoption4: [''],

      typeoption5: [''],
      typeoption6: [''],

      typeoption7: [''],
      typeoption8: [''],

      handlequestion: [''],
	   handleanswers: [''],
      questionsattended: [''],
      selectedOption: [''],
      addOnChange: [false],
      errors: {},
      formData: new FormData(),
      content: true,
      addFunction: true,
      addmore: [""],
      schemas: [],
      schemas_id: [],

      singleSelection: [],
      multipleSelection: []

    };


    //var param = localStorage.getItem('universityid');
	 var param = localStorage.getItem('universityid');
	var stdid = localStorage.getItem('studentid');
	axios.get(baseurl + '/get_answer/'+ param +'/'+ stdid +'/test').then(response => {
console.log("jay" + response)
      this.setState({
		  
        schemas: response.data.question,
        //  schemas_id: response.data.id,
      });
    })

    

    this.getQuessummary();

  }

  componentDidUpdate(prevProps) {
    if(this.props.clearTestAddmore !== prevProps.clearTestAddmore) {
      if(this.props.clearTestAddmore) this.clearTestAddmore()      
    }

    if(this.props.selectedQuestion !== prevProps.selectedQuestion) {
      if(this.props.selectedQuestion != null) this.onSelectQuestion(this.props.selectedQuestion)
    }
  }

  onValueChange(event, index) {
    const selectedOptionclone = this.state.selectedOption
    selectedOptionclone[index] = event.target.value
    this.setState({ selectedOption: selectedOptionclone });
    // this.setState({ selectedOption:  event.target.value});
  }



  getQuessummary() {


   // axios.get(baseurl + '/get_questionpattern/' + localStorage.getItem('universityid')).then(response => {
	   var param = localStorage.getItem('universityid');
	var stdid = localStorage.getItem('studentid');
	axios.get(baseurl + '/get_answer/'+ param +'/'+ stdid +'/test').then(response =>{
      console.log("QuestionPattern" + response)

      const questionArr = []
      response.data.question.map((question, index) => {
        const getquestionid = response.data.question_id[index]
        let getquestion
        let getquestionType
        let getoptions
		let getanswers
        const options = [];
        if (question.search(",") !== -1) {
          getquestion = question.split(",")
		  getanswers = response.data.answers[index].split("~")
          getquestionType = response.data.question_type[index].split(",")
          getoptions = response.data.options[index].split(",")
          getoptions.map(option => {
            if (option.search("@") !== -1) {
              const splittedOptions = option.split("@")
              options.push(splittedOptions)
            } else {
              options.push([option])
            }
          })
        } else {
          getquestion = [question]
		  getanswers = [response.data.answers[index]]
          getquestionType = [response.data.question_type[index]]
          let splittedOptions = []
          if (response.data.options[index].search("@") !== -1) {
            splittedOptions = response.data.options[index].split("@")
            options.push(splittedOptions)
          } else {
            options.push([response.data.options[index]])
          }
        }
        questionArr.push({ questionId: getquestionid, question: getquestion, answers: getanswers, questionType: getquestionType, options })
    // alert(getanswers);
	 })

      this.setState({ question: questionArr })

      this.props.getQuestiondata(questionArr)

      console.log("Id"+ questionArr)

    })

  }

  clearTestAddmore = () => {
    this.setState({
    questionsattended : [""],
     questionId : "",
     handlequestion : [""],
	 handleanswers : [""],
     selectedOption : [""],
     typeoption1 : [''],
     typeoption2 : [''],
     typeoption3 : [''],
     typeoption4 : [''],
     typeoption5 : [''],
     typeoption6 : [''],
     typeoption7 : [''],
     typeoption8 : [''],
     addOnChange : [false],
     addmoreinput : [[]]
    })
  }

  onSelectQuestion = (index) => {

    const questionsattended = []
    const questionId = this.state.question[index].questionId
    const handlequestion = this.state.question[index].question;
	const handleanswers = this.state.question[index].answers;
    const selectedOption = this.state.question[index].questionType;
    const typeoption1 = []
    const typeoption2 = []
    const typeoption3 = []
    const typeoption4 = []
    const typeoption5 = []
    const typeoption6 = []
    const typeoption7 = []
    const typeoption8 = []
    const addOnChange = []
    const addmoreinput = []

    this.state.question[index].options.map((option, index) => {
      questionsattended.push("")
      addmoreinput.push([])
      switch (selectedOption[index]) {
        case "1": {
          typeoption1[index] = option[0]
          typeoption2[index] = option[1]
          break;
        }
        case "2": {
          const getlength = option.length
          if (getlength === 4) {
            typeoption3[index] = option[0]
            typeoption4[index] = option[1]
            typeoption5[index] = option[2]
            typeoption6[index] = option[3]
          }
          else {
            let optionclone = [...option]
            typeoption3[index] = optionclone.shift()
            typeoption4[index] = optionclone.shift()
            typeoption5[index] = optionclone.shift()
            typeoption6[index] = optionclone.shift()
            // typeoption7[index] = option[4]
            // typeoption8[index] = option[5]
            // addmoreinput[index].push("","")
            optionclone.map((clonedoption, clonedIndex)=>{
              addmoreinput[index][clonedIndex] = clonedoption
              // if(inputIndex===2) {
              //   inputIndex=0
              //   sectionIndex++
              //   if(clonedIndex < optionclone.length-1 ) addmoreinput[index].push(["",""])
              //   // alert(JSON.stringify([addmoreinput, clonedIndex < optionclone.length, clonedIndex, optionclone.length]))
              // }
            })
            addOnChange[index] = true
            break;
          }
        }
      }
    })

    for(let  i = 0; i < questionsattended.length ; i++){
      if(typeoption1[i]== null) typeoption1[i] = ""
      if(typeoption2[i]== null) typeoption2[i] = ""
      if(typeoption3[i]== null) typeoption3[i] = ""
      if(typeoption4[i]== null) typeoption4[i] = ""
      if(typeoption5[i]== null) typeoption5[i] = ""
      if(typeoption6[i]== null) typeoption6[i] = ""
    } // change all null values to empty string

    this.setState({
      questionsattended,
      questionId,
      handlequestion,
      selectedOption,
	  handleanswers,
      typeoption1,
      typeoption2,
      typeoption3,
      typeoption4,
      typeoption5,
      typeoption6,
      typeoption7,
      typeoption8,
      addOnChange,
      addmoreinput
    })

  }

  handleQuestionName = (event, index) => {
   const handleQuestionclone = this.state.handleanswers
    handleQuestionclone[index] = event.target.value
    this.setState({ handleanswers: handleQuestionclone });
  };

  handleIdChange = event => {
    this.setState({questionId: event.target.value});
  }



  handleTypeOption1 = (event, index) => {
    const typeoption1clone = this.state.typeoption1
    typeoption1clone[index] = event.target.value
    this.setState({ typeoption1: typeoption1clone });
  };


  handleTypeOption2 = (event, index) => {
    const typeoption2clone = this.state.typeoption2
    typeoption2clone[index] = event.target.value
    this.setState({ typeoption2: typeoption2clone });


  };
  handleTypeOption3 = (event, index) => {
    const typeoption3clone = this.state.typeoption3
    typeoption3clone[index] = event.target.value
    this.setState({ typeoption3: typeoption3clone });
  };


  handleTypeOption4 = (event, index) => {
    const typeoption4clone = this.state.typeoption4
    typeoption4clone[index] = event.target.value
    this.setState({ typeoption4: typeoption4clone });
  };
  handleTypeOption5 = (event, index) => {
    const typeoption5clone = this.state.typeoption5
    typeoption5clone[index] = event.target.value
    this.setState({ typeoption5: typeoption5clone });
  };


  handleTypeOption6 = (event, index) => {
    const typeoption6clone = this.state.typeoption6
    typeoption6clone[index] = event.target.value
    this.setState({ typeoption6: typeoption6clone });
  };

  handleTypeOption7 = (event, index) => {
    const typeoption7clone = this.state.typeoption7
    typeoption7clone[index] = event.target.value
    this.setState({ typeoption7: typeoption7clone });
  };


  handleTypeOption8 = (event, index) => {
    const typeoption8clone = this.state.typeoption8
    typeoption8clone[index] = event.target.value
    this.setState({ typeoption8: typeoption8clone });
  };

  handleAddMoreInput = (evt, index, SectionIndex, inputIndex) =>{
    const addmoreinput = this.state.addmoreinput;
    addmoreinput[index][SectionIndex] = evt.target.value;
    this.setState({ addmoreinput: addmoreinput });
  }

  validate = () => {
    const errors = [];



    this.state.questionsattended.forEach((data, index) => {
      errors.push({})

      // if (this.state.handlequestion[index].trim() === '') { errors[index].handlequestion = 'This is required'; }
      // if (this.state.typeoption1[index].trim() === '') { errors[index].typeoption1 = 'This is required'; }
      // if (this.state.typeoption2[index].trim() === '') { errors[index].typeoption2 = 'This is required'; }
      // if (this.state.typeoption3[index].trim() === '') { errors[index].typeoption3 = 'This is required'; }
      // if (this.state.typeoption4[index].trim() === '') { errors[index].typeoption4 = 'This is required'; }
      // if (this.state.typeoption5[index].trim() === '') { errors[index].typeoption5 = 'This is required'; }
      // if (this.state.typeoption6[index].trim() === '') { errors[index].typeoption6 = 'This is required'; }
      // if (this.state.typeoption7[index].trim() === '') { errors[index].typeoption7 = 'This is required'; }
      // if (this.state.typeoption8[index].trim() === '') { errors[index].typeoption8 = 'This is required'; }


      if (this.state.handlequestion[index] === '') { errors[index].handlequestion = 'This is required'; }
      if (this.state.selectedOption[index] == 1 && this.state.typeoption1[index] === '') { errors[index].typeoption1 = 'This is required'; }
      if (this.state.selectedOption[index] == 1 && this.state.typeoption2[index] === '') { errors[index].typeoption2 = 'This is required'; }


      if (this.state.selectedOption[index] == 2 && this.state.typeoption3[index] === '') { errors[index].typeoption3 = 'This is required'; }
      if (this.state.selectedOption[index] == 2 && this.state.typeoption4[index] === '') { errors[index].typeoption4 = 'This is required'; }
      if (this.state.selectedOption[index] == 2 && this.state.typeoption5[index] === '') { errors[index].typeoption5 = 'This is required'; }
      if (this.state.selectedOption[index] == 2 && this.state.typeoption6[index] === '') { errors[index].typeoption6 = 'This is required'; }

      // alert(JSON.stringify([this.state.selectedOption[index], this.state.addOnChange[index], this.state.addmoreinput[index]]))
      if(this.state.selectedOption[index] == 2 && this.state.addOnChange[index] == true){
        errors[index].addmoreinput = [];
        this.state.addmoreinput[index].map((input,inputIndex)=>{
          // alert(inputIndex)
          if(input == "") errors[index].addmoreinput[inputIndex] = 'This is required'
        })
        if(!(errors[index].addmoreinput.length > 0)) delete errors[index].addmoreinput
      }
      // if (this.state.selectedOption[index] == 2 && this.state.typeoption7[index] === '') { errors[index].typeoption7 = 'This is required'; }
      // if (this.state.selectedOption[index] == 2 && this.state.typeoption8[index] === '') { errors[index].typeoption8 = 'This is required'; }



      // if (this.state.selectedOption[index] == 2 && this.state.addmoreinput[index] === '') { errors[index].this.state.addmoreinput= 'This is required'; }
      // if (this.state.selectedOption[index] == 2 && this.state.addmoreinput[1] === '') { errors[index].this.state.addmoreinput[1] = 'This is required'; }

    })

    return Object.keys(errors).length === 0 ? null : errors;
  };


  onAddmore(index) {


    const typeoption7 = this.state.typeoption7
    const typeoption8 = this.state.typeoption8
    const addOnChange = this.state.addOnChange
    const addmoreinput = this.state.addmoreinput

    typeoption7.push('')
    typeoption8.push('')
    addOnChange[index] = true
    addmoreinput[index].push("","")

    this.setState({
      typeoption7,
      typeoption8,
      addOnChange,
      addmoreinput
    })
  }


  onAddmorequestion() {
    const questionsattended = this.state.questionsattended
    questionsattended.push("")
    this.setState({ questionsattended })

    const handlequestion = this.state.handlequestion
    const typeoption1 = this.state.typeoption1
    const typeoption2 = this.state.typeoption2

    const typeoption3 = this.state.typeoption3
    const typeoption4 = this.state.typeoption4

    const typeoption5 = this.state.typeoption5
    const typeoption6 = this.state.typeoption6
    const selectedOption = this.state.selectedOption
    const addOnChange = this.state.addOnChange
    const addmoreinput = this.state.addmoreinput

    handlequestion.push('')
    typeoption1.push('')
    typeoption2.push('')
    typeoption3.push('')
    typeoption4.push('')
    typeoption5.push('')
    typeoption6.push('')
    selectedOption.push('')
    addOnChange.push(false)
    addmoreinput.push([])

    this.setState({
      handlequestion,
      typeoption1,
      typeoption2,
      typeoption3,
      typeoption4,
      typeoption5,
      typeoption6,
      selectedOption,
      addOnChange,
      addmoreinput

    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    let errors = this.validate()
    this.setState({ errors })
    errors = errors.filter(error => Object.keys(error).length !== 0)
    if (errors.length > 0) return;

    var handlequestionArr = [];
	var handleanswersArr = [];
    var typeoption1Arr = [];
    var typeoption2Arr = [];
    // var singleSelectionArr = [];
    var typeoption3Arr = [];
    var typeoption4Arr = [];
    var typeoption5Arr = [];
    var typeoption6Arr = [];
    var typeoption7Arr = [];
    var typeoption8Arr = [];
    var selectedOptionArr = [];
    var selected_val = [];

    $('.typeoption1').each(function (i) {
      typeoption1Arr.push($(this).val())
    });
    $('.typeoption2').each(function (i) {
      typeoption2Arr.push($(this).val());
    });
    $('.typeoption3').each(function (i) {
      typeoption3Arr.push($(this).val());
    });
    $('.typeoption4').each(function (i) {
      typeoption4Arr.push($(this).val());
    });
    $('.typeoption5').each(function (i) {
      typeoption5Arr.push($(this).val());
    });
    $('.typeoption6').each(function (i) {
      typeoption6Arr.push($(this).val());
    });
    $('.typeoption7').each(function (i) {
      typeoption7Arr.push($(this).val());
    });
    $('.typeoption8').each(function (i) {
      typeoption8Arr.push($(this).val());
    });

    $('.handlequestion').each(function (i) {
      handlequestionArr.push($(this).val());
    });

 $('.handleanswers').each(function (i) {
      handleanswersArr.push($(this).val());
    });

var arrayString= this.state.handleanswers.join('~'); 

var str2 = arrayString.replace(/",/g,"~"); 

    var singleSelectionArr = typeoption1Arr.map((e, i) =>
      e + '@' + typeoption2Arr[i]
    )
    var multipleSelectionArr = typeoption3Arr.map((e, i) => (
      e + '@' + typeoption4Arr[i] + '@' + typeoption5Arr[i] + '@' + typeoption6Arr[i]
    )
    )
   
    var merged = []

    this.state.selectedOption.map((option, index) => {
      if (option == 1) {
        let firstElement = singleSelectionArr.shift()
        merged.push(firstElement)
      }
      if (option == 2) {
        let firstElement = multipleSelectionArr.shift()
        if (this.state.addOnChange[index]) {
          let addOn;
          addOn = this.state.addmoreinput[index].join("@")
          firstElement = firstElement + "@" + addOn;
        }
        merged.push(firstElement)
      }
      if (option == 0) {
        merged.push(0)
      }
    })

    var selected_value = []
    var values = this.state.selectedOption
    values.map((option1, index) => {

      if (option1 == 1) {
        selected_value.push(1)
      }
      if (option1 == 2) {
        selected_value.push(2)
      }
      if (option1 == 0) {
        selected_value.push(0)

      }
    })



    this.state.formData.append("question_id",this.state.questionId);
    this.state.formData.append("answers", str2);
  //  this.state.formData.append("question_type", selected_value);
 //   this.state.formData.append("options", merged);
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
	this.state.formData.append("student_id", localStorage.getItem('studentid'));
	this.state.formData.append("type", 'test');

    submitForm("form-data", this.state.formData, (msg) => {
      toast.success(msg.message); setTimeout(function () {
      }, 3000);
    }, 'student');

    this.setState({ errors: '' });
  };



  render() {
    return template.call(this);
  }
}

export default TestAddMore;
