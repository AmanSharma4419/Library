import React, { Component } from "react";
import config from "../../../config.json";
import axios from "axios";
import moment from "moment";
import inboxicon from "../../../assets/img/student/inbox.svg";
import senticon from "../../../assets/img/student/sent.svg";
import outboxicon from "../../../assets/img/student/outbox.svg";
import avtivestaricon from "../../../assets/img/student/avtive_star.svg";
import inavtivestaricon from "../../../assets/img/student/inactive_star.svg";
import drafticon from "../../../assets/img/student/draft.svg";
import staredicon from "../../../assets/img/student/starred-blue.svg";
import livechat from "../../../assets/img/student/live_chat.svg";
import calendaricon from "../../../assets/img/student/calendar.svg";
import vectoricon from "../../../assets/img/student/vector.svg";
import deleteicon from "../../../assets/img/university/delete.svg";
import chatmessage from "../../../assets/img/student/chatbox.jpg";
import { Link, Redirect } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
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
  Form,
  ModalFooter,
  InputGroupAddon,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
var baseurl = `${config.baseurl}`;
var countdata = "0";

function submitReadFav(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/university_mailaciton`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

function submitdeleteAPi(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/delete_sentmail`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class StarredMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favmail: [],
      formData: new FormData(),
      pageSize: 8,
      pageIndex: 0,
      favmailCopy: [],
      mailArrangementSelected: "",
      mailArrangementOptions: ["Recently", "2 Days before", "1 Week before"],
    };
  }

  componentDidMount() {
    this.getdata();
  }

  getdata = () => {
    axios
      .get(
        baseurl +
          "/get_inboxemail/" +
          localStorage.getItem("studentid") +
          "/Student"
      )
      .then((response) => {
        // console.log("fav_mail", response.data.fav_mail);
        countdata = response.data.fav_mail.length || "0";
        this.setState({
          favmail: response.data.fav_mail,
          favmailCopy: response.data.fav_mail,
        });
      });
  };

  handlePrevPageClick = (event) => {
    this.setState((prevState) => ({
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  handleNextPageClick = (event) => {
    this.setState((prevState) => ({
      pageIndex:
        prevState.pageIndex <
        Math.floor(prevState.favmail.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  handlestarred = (datas) => {
    console.log(datas);
    this.state.formData.append("type", "Student");
    this.state.formData.append("type_id", localStorage.getItem("studentid"));
    this.state.formData.append("action_type", "Favourite");
    this.state.formData.append("composedmail_id", datas.id);
    this.state.formData.append("status", datas.starred);
    submitReadFav(
      "form-data",
      this.state.formData,
      (msg) => {
        if (msg.status_code == 200) {
          toast.success("UnStarred Mail Successfully");
          setTimeout(function () {}, 3000);
          this.getdata();
        } else {
          toast.success(msg.message);
        }
      },
      "studentreadfav"
    );
  };

  deletemail = (ids) => {
    this.state.formData.append("type", "Student");
    this.state.formData.append("type_id", localStorage.getItem("studentid"));
    this.state.formData.append("composedmail_id", ids.id);
    this.state.formData.append("delete_for", "Starred");
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to permanently delete this email?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            submitdeleteAPi(
              "form-data",
              this.state.formData,
              (msg) => {
                if (msg.status_code == 200) {
                  toast.success("Starred Mail Removed Successfully");
                  setTimeout(function () {}, 3000);
                  this.getdata();
                } else {
                  toast.success(msg.message);
                }
              },
              "studentdelete"
            ),
        },
        {
          label: "No",
          onClick: () => this.getdata(),
        },
      ],
    });
  };

  maildetial = (detailsroot) => {
    // this.updatedataread(detailsroot);
    sessionStorage.clear();
    var t = {
      id: detailsroot.id,
      type: detailsroot.type,
      type_id: detailsroot.type_id,
    };
    var data = {
      id: detailsroot.id,
      types: detailsroot.type,
      type_id: detailsroot.type_id,
      page: "Starred Mail",
      type: "Starred",
      pathName: "/#/starredmail",
      count: countdata,
    };
    sessionStorage.setItem("mdetail", JSON.stringify(data));
    window.location = "/#/maildetail";
  };

  // Mail sorting in alphabetically order
  //   sortFavMails = (e) => {
  //     let textValue = e.target;
  //     if (this.state.favmail.length > 1){
  //       const sortedInbox = this.state.favmail.sort((a, b) => {
  //           if (a.mail_from > b.mail_from) {
  //             return -1;
  //           } else if (a.mail_from < b.mail_from){
  //             return 1;
  //           }
  //         })
  //         if (this.state.isInboxSorted){
  //           textValue.textContent = "A to Z";
  //           this.setState({favmail: sortedInbox.reverse(), isInboxSorted: false});
  //         } else {
  //           textValue.textContent = "Z to A";
  //           this.setState({favmail: sortedInbox, isInboxSorted: true});
  //         }
  //   }
  //   }

  handleChangeMailArrangement = (e) => {
    const value = e.target.value;
    let favMails = [];
    const currentDate = new Date();

    if (value === "recently") {
      favMails = this.state.favmailCopy;
    } else if (value === "1 week before") {
      // Normal Sorting by time - 1 Week before
      const weekBeforeDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - 7)
      );
      favMails = this.state.favmailCopy.filter((mail) => {
        const mailDate = new Date(mail.created_date);
        if (mailDate >= weekBeforeDate) console.log(mailDate, weekBeforeDate);
        return mailDate >= weekBeforeDate;
      });
    } else if (value === "2 days before") {
      // Normal Sorting by time - 2 Days before
      const twoDaysBeforeDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - 2)
      );
      favMails = this.state.favmailCopy.filter((mail) => {
        const mailDate = new Date(mail.created_date);
        if (mailDate >= twoDaysBeforeDate)
          console.log(mailDate, twoDaysBeforeDate);
        return mailDate >= twoDaysBeforeDate;
      });
    }

    // Set the changed value
    this.setState({ mailArrangementSelected: value, favmail: favMails });
  };
  ViewMeeting = (param) => (e) => {
    // alert(param);
   
    localStorage.setItem('mailview', 'mail');
    localStorage.setItem('viewmeetingid', param.id);
    localStorage.setItem("meeting_id", param.meeting_id);
    window.location.href = "/#/viewMeeting";
   };

   RequestMeeting = (param) => (e) => {

    let fd=new FormData();
    fd.append("type","Student");
    fd.append("type_id",localStorage.getItem("studentid"));
    fd.append("mail_from",localStorage.getItem("studentemail"));
    fd.append("mail_to",localStorage.getItem("studentemail")===param.mail_from?param.mail_to:param.mail_from);
    fd.append("mail_cc",param.mail_cc);
    fd.append("mail_bcc",param.mail_bcc);
    fd.append("composemailid",param.id);

axios.post(baseurl+"/request_meeting",fd).then(response=>{toast.success("Meeting requested successfully.");this.getdata();});
   };

   composemd = () => {
    localStorage.removeItem("agentstore");
    window.location = "/#/composemail";
  };

  render() {
    const imgpath = `${config.baseurl}`;
    return (
      <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5">
        <div className="foe-student-box draft-app-page">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="2" sm="1" xl="1" md="1" lg="1" className="pr-0">
                <div className="stud-left uni-right-border">
                  <CardBody className="pr-0 pt-1">
                    <ListGroup className="left-list float-right">
                      <a href="/#/inboxmail">
                        <ListGroupItem>
                          <img src={inboxicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/sentmail">
                        <ListGroupItem>
                          <img src={senticon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/outboxmail">
                        <ListGroupItem>
                          <img src={outboxicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/maildraft">
                        <ListGroupItem>
                          <img src={drafticon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a href="/#/starredmail">
                        <ListGroupItem className="active">
                          <img src={staredicon} alt="" />
                        </ListGroupItem>
                      </a>
                      <a 
                      // href="/#/"
                      >
                        <ListGroupItem className="pt-5 pr-2 mt-5 mb-5">
                          <img src={livechat} alt="" />
                        </ListGroupItem>
                      </a>
                    </ListGroup>
                  </CardBody>
                </div>
              </Col>
              <Col
                xs="10"
                sm="11"
                xl="9"
                md="11"
                lg="9"
                className="px-0 inbox-page"
              >
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="px-0">
                    <Row className="col-12 m-0 px-0">
                      <div className="col-md-6 px-0">
                        <h3 className="pl-4">
                          Starred{" "}
                          <span className="font-12 pt-2 pl-2">
                            {" "}
                            (You have{" "}
                            {this.state.favmail.length !== "0"
                              ? this.state.favmail.length
                              : "0"}{" "}
                            message)
                          </span>
                        </h3>
                      </div>
                      <div className="col-md-6 pr-0 d-flex justify-content-end">
                        <a onClick={() => this.composemd()} className="mr-3 pt-1">
                          <img src={vectoricon} alt="" />
                        </a>
                        <select
                          className="form-control width-150 checksame"
                          value={this.state.mailArrangementSelected}
                          id=""
                          name=""
                          required=""
                          onChange={this.handleChangeMailArrangement}
                        >
                          {this.state.mailArrangementOptions.map((mOpt) => (
                            <option
                              key={mOpt.toLowerCase()}
                              value={mOpt.toLowerCase()}
                            >
                              {mOpt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>
                    <Scrollbars style={{ height: 300 }}>
                      <div className="card-body table-responsive pr-0">
                        <table className="table">
                          <tbody>
                            {this.state.favmail.length !== "0"
                              ? this.state.favmail
                                  .slice(
                                    this.state.pageIndex * this.state.pageSize,
                                    this.state.pageIndex * this.state.pageSize +
                                      this.state.pageSize
                                  )
                                  .map((m) => (
                                    <tr key={m.id}>
                                      <td
                                        onClick={() => this.maildetial(m)}
                                        className="width-50px"
                                      >
                                        <span className="btn btn-danger mail-new-btn inbox-new-higlit">
                                          New
                                        </span>
                                      </td>
                                      <td onClick={() => this.maildetial(m)}>
                                        <span className="unread-text font-10 ">
                                          {m.mail_from}
                                        </span>
                                      </td>
                                      <td
                                        onClick={() => this.maildetial(m)}
                                        className="request_fld_inbox"
                                      >
                                        {m.subject}
                                      </td>
                                      <td className="request_fld_inbox">
                                      {m.calendar_meeting == "1" ? (
                                          <a className="calen-btn mr-3">
                                            <img src={calendaricon} alt=""
                                            onClick={this.ViewMeeting(m)} />
                                          </a>
                                        ) : m.is_requested===0&&m.calendar_meeting!==1?( <button className="btn btn-blue-clr btn-primary" onClick={this.RequestMeeting(m)}>
                                        Request Meeting
                                      </button>):null}
                                      </td>
                                      <td className="text-right">
                                       
                                        {m.is_starred == 0 ? (
                                          <a
                                            className="calen-btn mr-3"
                                            onClick={() =>
                                              this.handlestarred({
                                                id: m.id,
                                                starred: 1,
                                              })
                                            }
                                          >
                                            <img
                                              src={inavtivestaricon}
                                              alt=""
                                            />
                                          </a>
                                        ) : (
                                          <a
                                            className="calen-btn mr-3"
                                            onClick={() =>
                                              this.handlestarred({
                                                id: m.id,
                                                starred: 0,
                                              })
                                            }
                                          >
                                            <img src={avtivestaricon} alt="" />
                                          </a>
                                        )}
                                        </td>
                                        <td className=""> 
                                        <a
                                          className="del-btn"
                                          onClick={() => this.deletemail(m)}
                                        >
                                          <img
                                            src={deleteicon}
                                            width="16"
                                            alt=""
                                          />
                                        </a>
                                      </td>
                                      <td className="width-100px">
                                        {moment(m.created_date).format(
                                          "MMM DD, YYYY LTS"
                                        )}

                                      </td>
                                    </tr>
                                  ))
                              : null}
                            {/* <tr>
                                                    <td className="width-100px"><span className="btn btn-danger mail-new-btn inbox-new-higlit">New</span></td>
                                                    <td><span className="unread-text font-10 ">James Mills</span></td>
                                                    <td className="request_fld_inbox">cONSTULTANCY <br/> REQUEST</td>
                                                    <td className="width-150px text-right"><a className="calen-btn mr-3"><img src={calendaricon} alt="" /></a><a className="calen-btn mr-3"><img src={staredicon} alt="" /></a><a className="del-btn"><img src={deleteicon} width="16" alt="" /></a></td>
                                                    <td className="width-100px">10:52AM</td>
                                                </tr>
                                                <tr>
                                                    <td className="width-100px"><span className="btn btn-danger mail-new-btn inbox-new-higlit">New</span></td>
                                                    <td><span className="unread-text font-10 ">James Mills</span></td>
                                                    <td className="request_fld_inbox">cONSTULTANCY <br/> REQUEST</td>
                                                    <td className="width-150px text-right"><a className="calen-btn mr-3"><img src={calendaricon} alt="" /></a><a className="calen-btn mr-3"><img src={staredicon} alt="" /></a><a className="del-btn"><img src={deleteicon} width="16" alt="" /></a></td>
                                                    <td className="width-100px">10:52AM</td>
                                                </tr>
                                                <tr>
                                                <td className="width-100px"><span className="btn btn-danger mail-new-btn inbox-new-higlit">New</span></td>
                                                    <td><span className="unread-text font-10 ">James Mills</span></td>
                                                    <td className="request_fld_inbox">cONSTULTANCY <br/> REQUEST</td>
                                                    <td className="width-150px text-right"><a className="calen-btn mr-3"><img src={calendaricon} alt="" /></a><a className="calen-btn mr-3"><img src={staredicon} alt="" /></a><a className="del-btn"><img src={deleteicon} width="16" alt="" /></a></td>
                                                    <td className="width-100px">Jan 14, 2020 <br/>10:52AM</td>
                                                </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </Scrollbars>
                    {this.state.favmail.length > 8 ? (
                      <div className="mailPagination">
                        <button
                          onClick={(event) => this.handlePrevPageClick(event)}
                        >
                          Prev page
                        </button>
                        {this.state.pageIndex} /
                        {Math.ceil(
                          this.state.favmail.length / this.state.pageSize
                        ) - 1}
                        {/* {this.state.pageIndex}/{this.state.favmail.length / this.state.pageSize} */}
                        <button
                          onClick={(event) => this.handleNextPageClick(event)}
                        >
                          Next page
                        </button>
                      </div>
                    ) : null}
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="12" xl="2" md="12" lg="2" className="px-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <Row>
                      <img src={chatmessage} alt="" className="chat_bot" />
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default StarredMail;
