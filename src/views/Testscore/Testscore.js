import React from "react";
import template from "./Testscore.jsx";
import config from '../../config.json';
import $ from 'jquery';
import axios from 'axios';
//import config from '../../config.json';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//import { parseFloat } from "core-js/fn/number";
// import { parseFloat } from "core-js/fn/number";
var baseurl = `${config.baseurl}`;



// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/storetestscores`,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': contentType
    }
  }).then((response) => {
    setResponse(response.data);
    //window.location.reload(false);

    // setTimeout(function () { 
    //   window.location.reload(true); 
    // }, 4000); 

  }).catch((error) => {
    setResponse("error");
  })
}




class Testscore extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

      examtype: '',
      examdate: '',

      ttl_score: '',
      readingscore: '',
      listeningscore: '',
      writingscore: '',
      speakingscore: '',
      englishCheck: '',   // don't have any test score

      average_score: '',
      listValue: "",
      greexamdate: '',
      greverbalscore: '',
      greverbalrank: '',
      grequanitativescore: '',
      grequanitativerank: '',
      grewritingscore: '',
      grewritingrank: '',
      greCheck: '',

      gmatexamdate: '',
      gmatverbalscore: '',
      gmatverbalrank: '',
      gmatquanitativescore: '',
      gmatquanitativerank: '',
      gmatwritingscore: '',
      gmatwritingrank: '',
      gmattotalscore: '',
      gmattotalrank: '',
      gmatCheck: false,
      id: '',

      errors: {},
      formData: new FormData(),
      //examdate: new Date(),
      examdateN: '',
      greexamdateN: '',
      gmatexamdateN: '',
      contentclose: true,
      averagescore: '',
      grereadingscore: '',
      gmatreadingscore: '',
      grereadingrank: '',
      gretotalscore: '',
      gretotalrank: '',
      gmatreadingrank: '',
      //buttonshow:localStorage.getItem('completeprofile'),
      haveSatScore: false,
      satExamDate: '',
      satVerbalScore: '',
      satVerbalRank: '',
      satQuantScore: '',
      satQuantRank: '',
      satWritingScore: '',
      satWritingRank: '',
      satAverageScore: '',
      satAverageRank: '',

      haveLSATscore: false,
      lsatExamDate: '',
      lsatTotalScore: '',
      lsatTotalRank: '',

      haveMCATscore: false,
      mcatExamDate: '',
      mcatTotalScore: '',
      mcatTotalRank: '',

    };
    this.text = "";

    this.getTestscoresdata();
    //       $("#greverbalscore").attr({
    //    "max" : 10,
    //    "min" : 2
    // });

  }


  closepop1 = () => {
    this.setState({
      contentclose: false,
    });
  }


  getTestscoresdata() {

    //axios.get('https://formeeadmin.bicsglobal.com/get_testscores/1').then(response => {
    axios.get(baseurl + '/get_testscores/' + localStorage.getItem('studentid')).then(response => {
      //alert(response.data.length);
      console.log("response", response.data)
      let respData = response.data[0];
      if ((response.data.length > '0')) {
        if (respData.exam_date != null) {
          var examdateN = new Date(respData.exam_date);
        }

        if (respData.gre_exam_date != null) {
          var greexamdateN = new Date(respData.gre_exam_date);
        }

        if (respData.gmat_exam_date != null) {
          var gmatexamdateN = new Date(respData.gmat_exam_date);
        }
        var finaleaverage = (parseInt(respData.reading_score)) + (parseInt(respData.listening_score)) + (parseInt(respData.writing_score)) + (parseInt(respData.speaking_score))
        var toltalaverage = finaleaverage / 4;
        this.setState({
          examtype: respData.exam_type,
          examdate: examdateN,
          readingscore: respData.reading_score,
          listeningscore: respData.listening_score,
          writingscore: respData.writing_score,
          speakingscore: respData.speaking_score,
          englishCheck: respData.notestscores,
          average_score: toltalaverage,
          id: respData.id,

          greexamdate: greexamdateN,
          greverbalscore: respData.gre_verbal_score,
          greverbalrank: respData.gre_verbal_rank,
          grequanitativescore: respData.gre_quanitative_score,
          grequanitativerank: respData.gre_quanitative_rank,
          grewritingscore: respData.gre_writing_score,
          grewritingrank: respData.gre_writing_rank,
          greCheck: respData.nogrescores,

          gmatexamdate: gmatexamdateN,
          gmatverbalscore: respData.gmat_verbal_score,
          gmatverbalrank: respData.gmat_verbal_rank,
          gmatquanitativescore: respData.gmat_quanitative_score,
          gmatquanitativerank: respData.gmat_quanitative_rank,
          gmatwritingscore: respData.gmat_writing_score,
          gmatwritingrank: respData.gmat_writing_rank,
          gmattotalscore: respData.gmat_total_score,
          gmattotalrank: respData.gmat_total_rank,
          gmatCheck: respData.nogmatscores,
          averagescore: toltalaverage,
          grereadingscore: respData.gre_reading_score,
          grereadingrank: respData.gre_reading_rank,
          gmatreadingscore: respData.gmat_reading_score,
          gretotalscore: respData.gre_total_score,
          gretotalrank: respData.gre_total_rank,
          gmatreadingrank: respData.gmat_reading_rank,

          haveSatScore: respData.nosatscores && respData.nosatscores,
          satExamDate: respData.sat_exam_date,
          satVerbalScore: respData.sat_verbal_score,
          satVerbalRank: respData.sat_verbal_rank,
          satQuantScore: respData.sat_quanitative_score,
          satQuantRank: respData.sat_quanitative_rank,
          satWritingScore: respData.sat_writing_score,
          satWritingRank: respData.sat_writing_rank,
          satAverageScore: respData.sat_total_score,
          satAverageRank: respData.sat_total_rank,

          haveLSATscore: respData.nolsatscores && respData.nolsatscores,
          lsatExamDate: respData.lsat_exam_date,
          lsatTotalScore: respData.lsat_verbal_score,
          lsatTotalRank: respData.lsat_verbal_rank,

          haveMCATscore: respData.nolmcatscores && respData.nolmcatscores,
          mcatExamDate: respData.mcat_exam_date,
          mcatTotalScore: respData.mcat_total_score,
          mcatTotalRank: respData.mcat_total_rank,
        });

        console.log("this.state", this.state.averagescore)
        if (respData.notestscores) {
          $("#englishCheck").prop("checked", true);
        }
        if (respData.nogrescores) {
          $("#greCheck").prop("checked", true);
        }
        if (respData.nogmatscores) {
          $("#gmatCheck").prop("checked", true);
        }

      }

    })

  }



  //handleChange = date => { this.setState({ startDate: date }); };
  handleGmatreadingscoreChange = (event) => {
    this.setState({
      gmatreadingscore: event.target.value
    }, () => {
      //  this.calculategmataveragescore()
    });
  };
  handleGmatreadingrankChange = (event) => {

    this.setState({
      gmatreadingrank: event.target.value
    }, () => {
      //  this.calculategmataveragerank()
    });
  }
  handleGretotalscoreChange = (event) => {

    this.setState({
      gretotalscore: event.target.value
    }, () => {
    });
    // this.setState({ gretotalscore: event.target.value });
    console.log("scoreee", this.state.gretotalscore)
  };
  handleGretotalrankChange = (event) => {
    this.setState({ gretotalrank: event.target.value });
  };
  handleExamtypeChange = (event) => { this.setState({ examtype: event.target.value }); };

  //handleExamdateChange = (event) => { this.setState({ examdate: event.target.value }); };
  handleExamdateChange = date => { this.setState({ examdate: date }); };

  handleReadingscoreChange = (event) => {
    this.setState({
      readingscore: event.target.value
    }, () => {
      this.calculateaverage()
    });
  }

  handleListeningscoreChange = (event) => {

    this.setState({
      listeningscore: event.target.value
    }, () => {
      this.calculateaverage()
    });
  }
  handleWritingscoreChange = (event) => {
    this.setState({
      writingscore: event.target.value
    }, () => {
      this.calculateaverage()
    });
  }
  handleSpeakingscoreChange = (event) => {
    this.setState({
      speakingscore: event.target.value
    }, () => {
      this.calculateaverage()
    });
  }

  handleEnglishCheckChange = (event) => { this.setState({ englishCheck: $("#englishCheck").is(":checked") }); };

  //handleGreexamdateChange = (event) => { this.setState({ greexamdate: event.target.value }); };
  handleGreexamdateChange = date => { this.setState({ greexamdate: date }); };
  handleGrereadingscoreChange = (event) => {
    this.setState({
      grereadingscore: event.target.value
    }, () => {
      this.calculategreaveragescore()
    });

  };
  handleGrereadingrankChange = (event) => {
    this.setState({
      grereadingrank: event.target.value
    }, () => {
      this.calculategreaveragerank()
    });
  }
  handleGreverbalscoreChange = (event) => {

    this.setState({
      greverbalscore: event.target.value
    }, () => {
      //  this.calculategreaveragescore()
    });

  };
  handleGreverbalrankChange = (event) => {
    this.setState({
      greverbalrank: event.target.value
    }, () => {
      //  this.calculategreaveragerank()
    });
  };
  handleGrequanitativescoreChange = (event) => {
    this.setState({
      grequanitativescore: event.target.value
    }, () => {
      //  this.calculategreaveragescore()
    });

  };
  handleGrequanitativerankChange = (event) => {
    this.setState({
      grequanitativerank: event.target.value
    }, () => {
      this.calculategreaveragerank()
    });
  };
  handleGrewritingscoreChange = (event) => {
    this.setState({
      grewritingscore: event.target.value
    }, () => {
      //  this.calculategreaveragescore()
    });


  };
  handleGrewritingrankChange = (event) => {
    this.setState({
      grewritingrank: event.target.value
    }, () => {
      //  this.calculategreaveragerank()
    });
  };
  handleGrecheckChange = (event) => { this.setState({ greCheck: $("#greCheck").is(":checked") }); };
  // handleGretreadingrankChange = (event) => { this.setState({ greadingrank: event.target.value }); };

  //handleGmatexamdateChange = (event) => { this.setState({ gmatexamdate: event.target.value }); };
  handleGmatexamdateChange = date => { this.setState({ gmatexamdate: date }); };

  handleGmatverbalscoreChange = (event) => {
    this.setState({
      gmatverbalscore: event.target.value
    }, () => {

      // console.log("New state in ASYNC callback:", this.state.gmatverbalscore);
      // this.calculategmataveragescore()
    });

    console.log("this.staete", this.state.gmatverbalscore)
  };
  handleGmatverbalrankChange = (event) => {
    this.setState({
      gmatverbalrank: event.target.value
    }, () => {
      //  this.calculategmataveragerank()
    });
  };
  handleGmatquanitativescoreChange = (event) => {
    this.setState({
      gmatquanitativescore: event.target.value
    }, () => {
      //  this.calculategmataveragescore()
    });

  };
  handleGmatquanitativerankChange = (event) => {
    this.setState({
      gmatquanitativerank: event.target.value
    }, () => {
      //  this.calculategmataveragerank()
    });

  };
  handleGmatwritingscoreChange = (event) => {
    this.setState({
      gmatwritingscore: event.target.value
    }, () => {
      //  this.calculategmataveragescore()
    });
  };
  handleGmatwritingrankChange = (event) => {
    this.setState({
      gmatwritingrank: event.target.value
    }, () => {
      //  this.calculategmataveragerank()
    });

  };
  handleGmattotalscoreChange = (event) => { this.setState({ gmattotalscore: event.target.value }); };
  handleGmattotalrankChange = (event) => { this.setState({ gmattotalrank: event.target.value }); };
  handleGmatCheckChange = (event) => { this.setState({ gmatCheck: $("#gmatCheck").is(":checked") }); };
  // handleGmatreadingrankChange = (event) => { this.setState({ gmatreadingrank: event.target.value }); };

  // Amit's Code
  handleSatScoreAvail = () => {
    this.setState({ haveSatScore: $("#haveSatScore").is(":checked") });
  };

  handleSATScoreChange = (event) => {
    console.log('handleSATScoreChange', event.target.id, event.target.name, event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  };

  handleLSATscoreAvail = () => {
    this.setState({ haveLSATscore: $("#haveLSATscore").is(":checked") });
  };

  handleLSATscoreChange = (event) => {
    console.log('handleLSATscoreChange', event.target.id, event.target.name, event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  };

  handleMCATscoreAvail = () => {
    this.setState({ haveMCATscore: $("#haveMCATscore").is(":checked") });
  };

  handleMCATscoreChange = (event) => {
    console.log('handleMCATscoreChange', event.target.id, event.target.name, event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  };

  calculateaverage() {
    var readingscore;
    var listeningscore;
    var writingscore;
    var speakingscore;
    console.log("this.state.listeningscor", this.state.listeningscore)
    if (this.state.readingscore == null) {
      readingscore = 0
    }
    if (this.state.readingscore) {
      console.log("insideee ")
      readingscore = this.state.readingscore;
    }
    if (this.state.listeningscore == null) {
      listeningscore = 0
    }
    if (this.state.listeningscore) {
      listeningscore = this.state.listeningscore
    }
    if (this.state.writingscore == null) {
      writingscore = 0
    }
    if (this.state.writingscore) {
      writingscore = this.state.writingscore
    }
    if (this.state.speakingscore == null) {
      speakingscore = 0
    }
    if (this.state.speakingscore) {
      speakingscore = this.state.speakingscore
    }
    var finaleaverage = (parseInt(readingscore)) + (parseInt(listeningscore)) + (parseInt(writingscore)) + (parseInt(speakingscore))
    var toltalaverage = finaleaverage / 4;
    this.setState({ averagescore: Math.max(0, parseFloat(toltalaverage)).toString().slice(0, 6) })
  }

  calculategreaveragescore() {
    if (this.state.greverbalscore == null) { this.state.greverbalscore = 0; }
    if (this.state.grequanitativescore == null) { this.state.grequanitativescore = 0; }
    if (this.state.grewritingscore == null) { this.state.grewritingscore = 0; }
    if (this.state.grereadingscore == null) { this.state.grereadingscore = 0; }
    var finaleaverage = (parseInt(this.state.greverbalscore)) + 
                        (parseInt(this.state.grequanitativescore)) + 
                        (parseInt(this.state.grewritingscore)) + 
                        (parseInt(this.state.grereadingscore));
    var toltalaverage = finaleaverage / 4;
    this.setState({ gretotalscore: Math.max(0, parseFloat(toltalaverage)).toString().slice(0, 6) })
  }

  calculategreaveragerank() {
    if (this.state.greverbalrank == null) { this.state.greverbalrank = 0; }
    if (this.state.grequanitativerank == null) { this.state.grequanitativerank = 0; }
    if (this.state.grewritingrank == null) { this.state.grewritingrank = 0 }
    if (this.state.grereadingrank == null) { this.state.grereadingrank = 0 }
    
    var finaleaverage = (parseInt(this.state.greverbalrank)) + 
                        (parseInt(this.state.grequanitativerank)) + 
                        (parseInt(this.state.grewritingrank)) + 
                        (parseInt(this.state.grereadingrank))
    var toltalaverage = finaleaverage / 4;
    console.log("reading", toltalaverage)
    this.setState({ gretotalrank: Math.max(0, parseFloat(toltalaverage)).toString().slice(0, 6) })
  }

  calculategmataveragescore() {
    console.log("this.state.gmatquanitativescore", this.state.gmatquanitativescore)
    console.log("this.state.gmatverbalscore", this.state.gmatverbalscore)

    if (this.state.gmatverbalscore == null) {
      this.state.gmatverbalscore = 0
    }
    if (this.state.gmatquanitativescore == null) {
      this.state.gmatquanitativescore = 0
      console.log("this.state.inside", this.state.gmatquanitativescore)
    }
    if (this.state.gmatwritingscore == null) {
      this.state.gmatwritingscore = 0
    }
    if (this.state.gmatreadingscore == null) {
      this.state.gmatreadingscore = 0
    }
    var finaleaverage = (parseFloat(this.state.gmatverbalscore)) + (parseFloat(this.state.gmatquanitativescore)) + (parseFloat(this.state.gmatwritingscore)) + (parseFloat(this.state.gmatreadingscore))
    var toltalaverage = finaleaverage / 4;
    console.log("this.state.finaleaverage", finaleaverage)
    this.setState({ gmattotalscore: Math.max(0, parseFloat(toltalaverage)).toString().slice(0, 6) })
  }

  calculategmataveragerank() {
    if (this.state.gmatverbalrank == null) {
      this.state.gmatverbalrank = 0
    }
    if (this.state.gmatquanitativerank == null) {
      this.state.gmatquanitativerank = 0
    }
    if (this.state.gmatwritingrank == null) {
      this.state.gmatwritingrank = 0;
    }
    if (this.state.gmatreadingrank == null) {
      this.state.gmatreadingrank = 0
    }
    var finaleaverage = (parseInt(this.state.gmatverbalrank)) + (parseInt(this.state.gmatquanitativerank)) + (parseInt(this.state.gmatwritingrank)) + (parseInt(this.state.gmatreadingrank))
    var toltalaverage = finaleaverage / 4;
    console.log("reading", toltalaverage)

    this.setState({ gmattotalrank: Math.max(0, parseFloat(toltalaverage)).toString().slice(0, 6) })
  }
  validate = () => {
    console.log("gretotalscore", this.state.gretotalscore)
    const errors = {};

    if (!$("#englishCheck").is(":checked")) {
      //alert(1);
      if ($("#examtype").val().trim() === '') { errors.examtype = 'Please select'; }
      if ($("#examdate").val().trim() === '') { errors.examdate = 'Please select'; }
      if ($("#readingscore").val().trim() === '') { errors.readingscore = 'This is required'; }
      if ($("#listeningscore").val().trim() === '') { errors.listeningscore = 'This is required'; }
      if ($("#writingscore").val().trim() === '') { errors.writingscore = 'This is required'; }
      if ($("#speakingscore").val().trim() === '') { errors.speakingscore = 'This is required'; }

      if (this.state.examtype == "toefl") {
        if (($("#readingscore").val().trim() > 30) || ($("#readingscore").val().trim() < 0)) { errors.readingscore = 'Enter scores between 0 to 30'; }

        if (($("#listeningscore").val().trim() > 30) || ($("#listeningscore").val().trim() < 0)) { errors.listeningscore = 'Enter scores between 0 to 30'; }

        if (($("#writingscore").val().trim() > 30) || ($("#writingscore").val().trim() < 0)) { errors.writingscore = 'Enter scores between 0 to 30'; }

        if (($("#speakingscore").val().trim() > 30) || ($("#speakingscore").val().trim() < 0)) { errors.speakingscore = 'Enter scores between 0 to 30'; }
      }


      if (this.state.examtype == "ielts") {
        if (($("#readingscore").val().trim() > 9) || ($("#readingscore").val().trim() < 4)) { errors.readingscore = 'Enter scores between 4 to 9'; }

        if (($("#listeningscore").val().trim() > 9) || ($("#listeningscore").val().trim() < 4)) { errors.listeningscore = 'Enter scores between 4 to 9'; }

        if (($("#writingscore").val().trim() > 9) || ($("#writingscore").val().trim() < 4)) { errors.writingscore = 'Enter scores between 4 to 9'; }

        if (($("#speakingscore").val().trim() > 9) || ($("#speakingscore").val().trim() < 4)) { errors.speakingscore = 'Enter scores between 4 to 9'; }
      }
    }

    if (!$("#greCheck").is(":checked")) {
      //alert(2);
      if ($("#greexamdate").val().trim() === '') { errors.greexamdate = 'Please select'; }
      if ($("#greverbalscore").val().trim() === '') { errors.greverbalscore = 'This is required'; }
      if ($("#greverbalrank").val().trim() === '') { errors.greverbalrank = 'This is required'; }
      if ($("#grequanitativescore").val().trim() === '') { errors.grequanitativescore = 'This is required'; }
      if ($("#grequanitativerank").val().trim() === '') { errors.grequanitativerank = 'This is required'; }
      if ($("#grewritingscore").val().trim() === '') { errors.grewritingscore = 'This is required'; }
      if ($("#grewritingrank").val().trim() === '') { errors.grewritingrank = 'This is required'; }
      if ($("#gretotalrank").val().trim() === '') { errors.gretotalrank = 'This is required'; }


      if (($("#greverbalscore").val().trim() > 170) || ($("#greverbalscore").val().trim() < 130)) { errors.greverbalscore = 'Enter verbal score between 130 to 170'; }

      if (($("#greverbalrank").val().trim() > 99) || ($("#greverbalrank").val().trim() < 0)) { errors.greverbalrank = 'Enter verbal rank between 0 to 99'; }


      if (($("#grequanitativescore").val().trim() > 170) || ($("#grequanitativescore").val().trim() < 139)) { errors.grequanitativescore = 'Enter quanitative score between 139 to 170'; }

      if (($("#grequanitativerank").val().trim() > 98) || ($("#grequanitativerank").val().trim() < 0)) { errors.grequanitativerank = 'Enter quanitative rank between 0 to 98'; }

      if (($("#grewritingscore").val().trim() > 6) || ($("#grewritingscore").val().trim() < 0)) { errors.grewritingscore = 'Enter writing score between 0 to 6'; }

      if (($("#grewritingrank").val().trim() > 99) || ($("#grewritingrank").val().trim() < 0)) { errors.grewritingrank = 'Enter writing rank between 0 to 99'; }

      if (($("#gretotalscore").val().trim() > 340) || ($("#gretotalscore").val().trim() < 260)) {
        errors.gretotalscore = 'Enter total scores between 260 to 340';
        console.log("treeee")
      }
      if ($("#gretotalscore").val().trim() === '') { errors.gretotalscore = 'This is required'; }


      if (($("#gretotalrank").val().trim() > 99) || ($("#gretotalrank").val().trim() < 0)) {
        errors.gretotalrank = 'Enter total rank between 0 to 99';
        console.log("treeee")
      }


    }

    if (!$("#gmatCheck").is(":checked")) {
      //alert(3);
      if ($("#gmatexamdate").val().trim() === '') { errors.gmatexamdate = 'Please select'; }
      if ($("#gmatverbalscore").val().trim() === '') { errors.gmatverbalscore = 'This is required'; }
      if ($("#gmatverbalrank").val().trim() === '') { errors.gmatverbalrank = 'This is required'; }

      if ($("#gmatquanitativescore").val().trim() === '') { errors.gmatquanitativescore = 'This is required'; }
      if ($("#gmatquanitativerank").val().trim() === '') { errors.gmatquanitativerank = 'This is required'; }

      if ($("#gmatwritingscore").val().trim() === '') { errors.gmatwritingscore = 'This is required'; }
      if ($("#gmatwritingrank").val().trim() === '') { errors.gmatwritingrank = 'This is required'; }


      if ($("#gmattotalrank").val().trim() === '') { errors.gmattotalrank = 'This is required'; }


      if (($("#gmatverbalscore").val().trim() > 51) || ($("#gmatverbalscore").val().trim() < 0)) { errors.gmatverbalscore = 'Enter verbal scores between 0 to 51'; }

      if (($("#gmatquanitativescore").val().trim() > 51) || ($("#gmatquanitativescore").val().trim() < 0)) { errors.gmatquanitativescore = 'Enter quanitative scores between 0 to 51'; }
      if (($("#gmatwritingscore").val().trim() > 6) || ($("#gmatwritingscore").val().trim() < 0)) {
        console.log("inside value")
        errors.gmatwritingscore = 'Enter  writing scores between 0 to 6';
      }

      if (($("#gmattotalrank").val().trim() > 99) || ($("#gmattotalrank").val().trim() < 0)) { errors.gmattotalrank = 'Enter total rank between 0 to 99'; }
      if (($("#gmattotalscore").val().trim() > 800) || ($("#gmattotalscore").val().trim() < 200)) {
        errors.gmattotalscore = 'Enter total score between 200 to 800';
      }
      if ($("#gmattotalscore").val().trim() === '') {
        console.log("inside nullll")
        errors.gmattotalscore = 'This is required';
      }

      if (($("#gmatwritingrank").val().trim() > 90) || ($("#gmatwritingrank").val().trim() < 0)) { errors.gmatwritingrank = 'Enter writing rank between 0 to 90'; }

      if (($("#gmatquanitativerank").val().trim() > 99) || ($("#gmatquanitativerank").val().trim() < 0)) { errors.gmatquanitativerank = 'Enter quanitative rank between 0 to 99'; }

      if (($("#gmatverbalrank").val().trim() > 99) || ($("#gmatverbalrank").val().trim() < 0)) { errors.gmatverbalrank = 'Enter  verbal rank between 0 to 99'; }
    }

    if(!$("#haveSatScore").is(":checked")){
      if ($("#satExamDate").val().trim() === '') { errors.satExamDate = 'Please select Exam Date'; }
      if ($("#satVerbalScore").val().trim() === '') { errors.satVerbalScore = 'This is required'; }
      if (($("#satVerbalScore").val().trim() > 51) || ($("#satVerbalScore").val().trim() < 0)) { 
        errors.satVerbalScore = 'Enter verbal scores between 0 to 51'; 
      }
      if ($("#satVerbalRank").val().trim() === '') { errors.satVerbalRank = 'This is required'; }
      if (($("#satVerbalRank").val().trim() > 99) || ($("#satVerbalRank").val().trim() < 0)) { 
        errors.satVerbalRank = 'Enter  verbal rank between 0 to 99'; 
      }

      if ($("#satQuantScore").val().trim() === '') { errors.satQuantScore = 'This is required'; }
      if (($("#satQuantScore").val().trim() > 51) || ($("#satQuantScore").val().trim() < 0)) { 
        errors.satQuantScore = 'Enter quanitative scores between 0 to 51'; 
      }
      if ($("#satQuantRank").val().trim() === '') { errors.satQuantRank = 'This is required'; }
      if (($("#satQuantRank").val().trim() > 99) || ($("#satQuantRank").val().trim() < 0)) { 
        errors.satQuantRank = 'Enter quanitative rank between 0 to 99'; 
      }

      if ($("#satWritingScore").val().trim() === '') { errors.satWritingScore = 'This is required'; }
      if (($("#satWritingScore").val().trim() > 6) || ($("#satWritingScore").val().trim() < 0)) {
        console.log("inside value")
        errors.satWritingScore = 'Enter  writing scores between 0 to 6';
      }
      if ($("#satWritingRank").val().trim() === '') { errors.satWritingRank = 'This is required'; }
      if (($("#satWritingRank").val().trim() > 90) || ($("#satWritingRank").val().trim() < 0)) {
        errors.satWritingRank = 'Enter writing rank between 0 to 90';
      }


      if ($("#satAverageScore").val().trim() === '') { errors.satAverageScore = 'This is required'; }
      if (($("#satAverageScore").val().trim() > 800) || ($("#satAverageScore").val().trim() < 200)) {
        errors.satAverageScore = 'Enter total score between 200 to 800';
      }
      if ($("#satAverageRank").val().trim() === '') { errors.satAverageRank = 'This is required'; }
      if (($("#satAverageRank").val().trim() > 99) || ($("#satAverageRank").val().trim() < 0)) { 
        errors.satAverageRank = 'Enter total rank between 0 to 99'; 
      }

    }
    

    if(!$("#haveLSATscore").is(":checked")){
      if ($("#lsatExamDate").val().trim() === '') { errors.lsatExamDate = 'Please select Exam Date'; }
      
      if ($("#lsatTotalScore").val().trim() === '') { errors.lsatTotalScore = 'This is required'; }
      if (($("#lsatTotalScore").val().trim() > 800) || ($("#lsatTotalScore").val().trim() < 200)) {
        errors.lsatTotalScore = 'Enter total score between 200 to 800';
      }
      if ($("#lsatTotalRank").val().trim() === '') { errors.lsatTotalRank = 'This is required'; }
      if (($("#lsatTotalRank").val().trim() > 99) || ($("#lsatTotalRank").val().trim() < 0)) { 
        errors.lsatTotalRank = 'Enter total rank between 0 to 99'; 
      }

    }

    if(!$("#haveMCATscore").is(":checked")){
      if ($("#mcatExamDate").val().trim() === '') { errors.mcatExamDate = 'Please select Exam Date'; }


      if ($("#mcatTotalScore").val().trim() === '') { errors.mcatTotalScore = 'This is required'; }
      if (($("#mcatTotalScore").val().trim() > 800) || ($("#mcatTotalScore").val().trim() < 200)) {
        errors.mcatTotalScore = 'Enter total score between 200 to 800';
      }
      if ($("#mcatTotalRank").val().trim() === '') { errors.mcatTotalRank = 'This is required'; }
      if (($("#mcatTotalRank").val().trim() > 99) || ($("#mcatTotalRank").val().trim() < 0)) { 
        errors.mcatTotalRank = 'Enter total rank between 0 to 99'; 
      }

    }

    return Object.keys(errors).length === 0 ? null : errors;
  };


  nexttab = () => {
    $("#tab4").addClass("active");
    $("#tab3").removeClass("active");
    $(".testscore").removeClass("active");
    $(".bgtab").addClass("active");

  }

  prevtab = () => {
    $("#tab2").addClass("active");
    $("#tab3").removeClass("active");
    $(".testscore").removeClass("active");
    $(".educationtab").addClass("active");
  }



  onSubmit = (e) => {
    e.preventDefault();


    const errors = this.validate();
    console.log("gretotalrank", this.state.gretotalrank)
    console.log("erroorr", this.state.errors)
    this.setState({ errors });
    if (errors) return;


    this.state.formData.append("examtype", this.state.examtype);
    this.state.formData.append("examdate", $("#examdate").val());
    this.state.formData.append("readingscore", this.state.readingscore);
    this.state.formData.append("listeningscore", this.state.listeningscore);
    this.state.formData.append("writingscore", this.state.writingscore);
    this.state.formData.append("speakingscore", this.state.speakingscore);
    this.state.formData.append("englishCheck", this.state.englishCheck);
    this.state.formData.append("average_score", this.state.average_score);

    this.state.formData.append("greexamdate", $("#greexamdate").val());

    this.state.formData.append("greverbalscore", this.state.greverbalscore);
    this.state.formData.append("greverbalrank", this.state.greverbalrank);

    this.state.formData.append("grequanitativescore", this.state.grequanitativescore);
    this.state.formData.append("grequanitativerank", this.state.grequanitativerank);

    this.state.formData.append("grewritingscore", this.state.grewritingscore);
    this.state.formData.append("grewritingrank", this.state.grewritingrank);

    this.state.formData.append("gretotalrank", this.state.gretotalrank);
    this.state.formData.append("gretotalscore", this.state.gretotalscore);

    this.state.formData.append("greCheck", this.state.greCheck);

    this.state.formData.append("gmatexamdate", $("#gmatexamdate").val());
    this.state.formData.append("gmatverbalscore", this.state.gmatverbalscore);
    this.state.formData.append("gmatverbalrank", this.state.gmatverbalrank);
    this.state.formData.append("gmatquanitativescore", this.state.gmatquanitativescore);
    this.state.formData.append("gmatquanitativerank", this.state.gmatquanitativerank);
    this.state.formData.append("gmatwritingscore", this.state.gmatwritingscore);
    this.state.formData.append("gmatwritingrank", this.state.gmatwritingrank);
    this.state.formData.append("gmattotalscore", this.state.gmattotalscore);
    this.state.formData.append("gmattotalrank", this.state.gmattotalrank);
    this.state.formData.append("gmatCheck", this.state.gmatCheck); //nogmatscores

    this.state.formData.append("grereadingscore", this.state.grereadingscore);
    this.state.formData.append("grereadingrank", this.state.grereadingrank);
    this.state.formData.append("gmatreadingscore", this.state.gmatreadingscore);
    this.state.formData.append("gmatreadingrank", this.state.gmatreadingrank);

    this.state.formData.append("haveSatScore", this.state.haveSatScore);
    this.state.formData.append("satExamDate", this.state.satExamDate);
    this.state.formData.append("satVerbalScore", this.state.satVerbalScore);
    this.state.formData.append("satVerbalRank", this.state.satVerbalRank);
    this.state.formData.append("satQuantScore", this.state.satQuantScore);
    this.state.formData.append("satQuantRank", this.state.satQuantRank);
    this.state.formData.append("satWritingScore", this.state.satWritingScore);
    this.state.formData.append("satWritingRank", this.state.satWritingRank);
    this.state.formData.append("satAverageScore", this.state.satAverageScore);
    this.state.formData.append("satAverageRank", this.state.satAverageRank);

    this.state.formData.append("haveLSATscore", this.state.haveLSATscore);
    this.state.formData.append("lsatExamDate", this.state.lsatExamDate);
    this.state.formData.append("lsatTotalScore", this.state.lsatTotalScore);
    this.state.formData.append("lsatTotalRank", this.state.lsatTotalRank);
    this.state.formData.append("haveMCATscore", this.state.haveMCATscore);
    this.state.formData.append("mcatExamDate", this.state.mcatExamDate);
    this.state.formData.append("mcatTotalScore", this.state.mcatTotalScore);
    this.state.formData.append("mcatTotalRank", this.state.mcatTotalRank);

    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem('studentid'));

    //submitForm("form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');

    submitForm("form-data", this.state.formData, (msg) => {
      console.log("msfgg", msg)
      toast.success(msg.message); setTimeout(function () {
        $("#tab4").addClass("active");
        $("#tab3").removeClass("active");
        $(".testscore").removeClass("active");
        $(".bgtab").addClass("active");
      }, 3000);
    },
      'student'
    );


    // this.setState({ examtype: '' });
    // this.setState({ examdate: '' });
    // this.setState({ readingscore: '' });
    // this.setState({ listeningscore: '' });
    // this.setState({ writingscore: '' });
    // this.setState({ speakingscore: '' });
    // this.setState({ englishCheck: '' });

    // this.setState({ greexamdate: '' });
    // this.setState({ greverbalscore: '' });
    // this.setState({ greverbalrank: '' });
    // this.setState({ grequanitativescore: '' });
    // this.setState({ gmatquanitativerank: '' });
    // this.setState({ grewritingscore: '' });
    // this.setState({ grewritingrank: '' });
    // this.setState({ greCheck: '' });

    // this.setState({ gmatexamdate: '' });
    // this.setState({ gmatverbalscore: '' });
    // this.setState({ gmatverbalrank: '' });
    // this.setState({ gmatquanitativescore: '' });
    // this.setState({ gmatquanitativerank: '' });
    // this.setState({ gmatwritingscore: '' });
    // this.setState({ gmatwritingrank: '' });
    // this.setState({ gmattotalscore: '' });
    // this.setState({ gmattotalrank: '' });
    // this.setState({ gmatCheck: '' });

    this.setState({ errors: '' });
  };


  render() {
    const { errors } = this.state;

    return template.call(this);
  }
}

export default Testscore;
