import React, { createRef } from "react";
import template from "./UploadDocment.jsx";
import config from "../../config.json";

import $ from "jquery";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var baseurl = `${config.baseurl}`;
var arr = [];

// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  axios({
    url: `${config.baseurl}/storestudocs`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
      //window.location.reload(false);

      if (response.data == "error") {
        toast.error("Please Login");
      }

      setTimeout(function () {
        localStorage.setItem("completeprofile", 1);
        window.location.reload(true);
      }, 3000);
    })
    .catch((error) => {
      setResponse("error");
    });
}

function uploadFiles (data, setResponse) {
  
  axios({
    url: `${config.baseurl}/storestudocs`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": "form-data",
    },
  })
    .then((response) => {
      setResponse(response.data);
      console.log('response', response);
      window.location.reload(true);

      if (response.data == "error") {
        toast.error("Please Login");
      }
      this.setState({fileModalOpen: false});

      setTimeout(function () {
        localStorage.setItem("completeprofile", 1);
        window.location.reload(true);
      }, 3000);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

class UploadDocment extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      showpersonal: false,
      showtranscripts: false,
      foldertype: "",
      docs: [],
      pers: [],
      trans: [],

      errors: {},
      formData: new FormData(),
      upload_photo: [],
      fileLength: 0,
      contentclose2: this.props.contentclose2,
      filename: [],
      folderData: [],
      info: false,
      folderName: "",
      folderFiles: [],

      browseFrom: '',
      uploadDocType: 'doc_other',
      tableDocType: '',
      checkedItems: '',
      showFolderFiles: false,
      modalDropdownOpen: false,
      fileDropdownOpen: false,
      fileModalOpen: false,
    };

    axios
      .get(baseurl + "/get_studocuments/" + localStorage.getItem("studentid"))
      .then((response) => {
        console.log(response, "hii");

        const initialIsChecked = response.data.docs.reduce((arr, file) => {
          arr[file.id] = false;
          return arr;
        }, {});
        console.log("response, hii", typeof(initialIsChecked));
        //alert(response.data.docs.length);
        this.setState({
          checkedItems: initialIsChecked,
          docs: response.data.docs,
          pers: response.data.pers,
          trans: response.data.trans,
        });
      });
  }

  handleUploadFiles = () => {
    this.state.formData.append("foldertype", this.state.uploadDocType);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("doctype", this.state.uploadDocType);

    uploadFiles(
      this.state.formData,
      (msg) => {
        toast.success("Profile completed successfully");
      },
    )
  }

  handleFileCheckbox = (event) => {
    let updatedChecks = this.state.checkedItems;
    updatedChecks[event.target.id] = event.target.checked;
    this.setState({ checkedItems: updatedChecks });
  }

  handleDeleteDocuments = () => {
    const itemList = Object.keys(this.state.checkedItems).map((id) => {
      if (this.state.checkedItems[id] === true) {
        return id;
      }
    });

    const result = itemList.filter((item) => item != undefined );
    console.log('result', result);
    let json=JSON.stringify(result);
    console.log('json', json);

    if(result && result.length){
        let data = {
        student_id: localStorage.getItem("studentid"),
        doc_ids: result
      }
      console.log('payload data', data);

      axios.post(`${baseurl}/delete_studocuments`, data)
      .then((response) => {
        toast.success("Deleted successfully");
        setTimeout(function () {
          window.location.reload();
        }, 1000);
        console.log('response', response);
      })
      .catch(function (error) {
        // your action on error success
        console.log(error);
      });
    }else{
      toast.error("Please select atleast one document to delete.");
    }
      
  };

  handleDeviceSelect = () => {
    this.deviceSelectRef.click();
  }

  handleBrowseFrom = (type) => {
    console.log('handleBrowseFrom!', type);
    this.setState({
      browseFrom: type,
      fileDropdownOpen: false
    });
  }

  handleBrowseFromDevice = (event) => {
    console.log(`handleBrowseFromDevice `, event.target.files);
    let { fileLength, filename } = this.state;
    let files = event.target.files;
    let newLength = files.length + fileLength;
    this.setState({ fileLength: newLength });
    let file_arr = []
    for (let i = 0; i < files.length; i++) {
      file_arr.push(files[i].name);
      this.state.formData.append(
        "upload_photo[]",
        files[i],
        files[i].name
      );
    }

    let newRecords = filename.concat(file_arr);
    console.log(this.state.formData.getAll("upload_photo[]"), "fd", file_arr);
    this.setState({
      filename: newRecords,
      fileDropdownOpen: false
    });

  }

  handleAddFileModal = (event) => {
    event.preventDefault();
    this.setState({fileModalOpen : !this.state.fileModalOpen});
  }

  handleDropFiles = (files, event) => {
    console.log('onDrop!', files);
    let { fileLength, filename } = this.state;
    let newLength = files.length + fileLength;
    this.setState({ fileLength: newLength });
    let file_arr = []
    for (let i = 0; i < files.length; i++) {
      file_arr.push(files[i].name);
      this.state.formData.append(
        "upload_photo[]",
        files[i],
        files[i].name
      );
    }

    let newRecords = filename.concat(file_arr);
    console.log(this.state.formData.getAll("upload_photo[]"), "fd", file_arr);
    this.setState({
      filename: newRecords,
    });

  }

  handleUploadDocTypeChange = (event) => {

    this.setState({uploadDocType: event.target.value});
  }

  handleTableDocTypeChange = (event) => {
    console.log('handleTableDocTypeChange', event.target.text);
    this.setState({tableDocType: event.target.value});
  }

  handleGPickerFileChange = (data) => {
    console.log('handleGPickerFikeChange ', data);
    if(data && data.docs){
      let { fileLength, filename } = this.state;
      let newLength = data.docs.length + fileLength;

      // this.setState({ fileLength: newLength });
      // let file_arr = []
      // let newArr = this.state.upload_photo;
      // for (let i = 0; i < data.docs.length; i++) {
      //   file_arr.push(data.docs[i].name);
      //   this.state.formData.append(
      //     "upload_photo[]",
      //     data.docs[i].url,
      //     data.docs[i].name
      //   );
      // }

      // let newRecords = filename.concat(file_arr);
      // console.log(this.state.formData.getAll("upload_photo[]"), "fd", newArr);
      // this.setState({
      //   filename: newRecords,
      // });
    }
  }

  handleFolderChange = (param, folderName) => (e) => {
    debugger;
    //handleFolderChange = param => {
    //alert(param);
    if (param == 1) {
      $(".folder-selected").removeClass("folder-selected active");
      $(".personal").addClass("active");
      $(".transcripts").removeClass("active");
      this.setState({
        showpersonal: true,
        showtranscripts: false,
        showFolderFiles: false,
        foldertype: "personal",
      });
    } else if (param == 2) {
      $(".folder-selected").removeClass("folder-selected active");
      $(".transcripts").addClass("active");
      $(".personal").removeClass("active");
      this.setState({
        showtranscripts: true,
        showpersonal: false,
        showFolderFiles: false,
        foldertype: "transcripts",
      });
      axios
        .get(
          baseurl +
            "/getalldocumentstudent/" +
            localStorage.getItem("studentid")
        )
        .then((response) => {
          debugger;
          const files = response.data.filter(
            (elem) => elem.folder === folderName
          );
          var arr = [];
          files.map((item) => {
            arr.push(item);
          });

          var oldarr = [...this.state.trans];
          this.setState({ trans: oldarr.concat(arr) });
          console.log("Folder files", this.state.trans, response.data);
        });
    } else {
      $(".personal").removeClass("active");
      $(".transcripts").removeClass("active");
      $(".folder-selected").removeClass("folder-selected active");
      $(`.folder-${param}`).addClass("folder-selected active");
      this.setState({
        showpersonal: false,
        showtranscripts: false,
        showFolderFiles: true,
        foldertype: folderName,
      });
      // Select folder files
      axios
        .get(
          baseurl +
            "/getalldocumentstudent/" +
            localStorage.getItem("studentid")
        )
        .then((response) => {
          debugger;
          const files = response.data.filter(
            (elem) => elem.folder === folderName
          );
          this.setState({ folderFiles: files });
          console.log("Folder files", files, response.data);
        });
    }
  };

  onClickdelete = (param) => (e) => {
    //handleFolderChange = param => {
    //alert(param);

    axios
      .get(
        baseurl +
          "/delete_studocuments/" +
          localStorage.getItem("studentid") +
          "/" +
          param
      )
      .then((response) => {
        toast.success("Deleted successfully");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      });
  };

  //handleFolderChange = (event) => { this.setState({ foldertype: event.target.value }); };

  onFileChange = (event) => {
    this.setState({ fileLength: event.target.files.length });
    console.log(`event.target.files  ${event.target.files}`)
    for (let i = 0; i < event.target.files.length; i++) {
      arr.push(event.target.files[i].name);
      this.state.formData.append(
        "upload_photo[]",
        event.target.files[i],
        event.target.files[i].name
      );
    }
    console.log(this.state.formData.getAll("upload_photo[]"), "fd");
    this.setState({
      filename: arr,
    });
  };

  handleCreateFolder = (e) => {
    e.preventDefault();
    // console.log("Create folder named,", this.state.folderName);
    axios({
      url: `${config.baseurl}/savefolderdocs`,
      method: "POST",
      data: {
        student_id: localStorage.getItem("studentid"),
        foldername: this.state.folderName,
      },
    }).then((response) => {
      console.log("folder created", response);
      this.setState({ info: false, folderName: "" });
      toast.success("Created folder successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  closepop3 = () => {
    this.setState({
      contentclose2: false,
    });
  };

  prevtab = () => {
    $("#tab4").addClass("active");
    $("#tab5").removeClass("active");
    $(".uploadtab").removeClass("active");
    $(".bgtab").addClass("active");
  };

  validate = () => {
    const errors = {};

    // if ( this.state.fileLength === '')
    // {
    // errors.fileLength = "Please select upload files";
    // }
    // else if( this.state.fileLength > 1 )
    // {
    // errors.fileLength = "Maximum 1 files are allowed to upload";
    // }

    const fi = document.getElementById("upfile");
    // Check if any file is selected.
    //alert(fi.value);
    var filePath = fi.value;
    var allowedExtensions = /(\.jpg|\.pdf|\.png)$/i;

    if (fi.files.length > 0) {
      for (var i = 0; i <= fi.files.length - 1; i++) {
        const fsize = fi.files.item(i).size;
        const file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 5120) {
          errors.fileLength =
            "File too Big, please select a file less than 5 MB";
        } else if (!allowedExtensions.exec(filePath)) {
          /*
                else if (file < 2048) 
                { 
                    alert("File too small, please select a file greater than 2mb"); 
                } 
                alert(file + '</b> KB');*/
          errors.fileLength =
            "Invalid file type.Allowed file types are jpg,png,pdf";
        }
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  componentDidMount() {
    if (localStorage.getItem("completeprofile") == 1) {
      //alert();
      $(".disablepro").prop("disabled", true);
      $(".aftersave").attr("style", "display: block !important");
      $(".beforesave").attr("style", "display: none !important");
    } else {
      //alert("1");
      $(".disablepro").prop("disabled", false);
      $(".beforesave").attr("style", "display: block !important");
      $(".aftersave").attr("style", "display: none !important");
    }
    //alert(localStorage.getItem('completeprofile'));

    axios
      .get(baseurl + "/folderdocs/" + localStorage.getItem("studentid"))
      .then((response) => {
        console.log("folder data", response);
        this.setState({ folderData: response.data });
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
    //alert(this.state.foldertype)
    //alert(this.state.foldertype)

    this.state.formData.append("foldertype", this.state.foldertype);
    //this.state.formData.append("profilefilled", 1);
    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));

    // if(this.state.fileLength !== ''){

    //submitForm("multipart/form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');
    submitForm(
      "form-data",
      this.state.formData,
      (msg) => {
        toast.success("Profile completed successfully");
      },
      "student"
    );
    //  alert(this.state.foldertype);
    // }else{

    // setTimeout(function () {
    // toast.success('Profile12 completed successfully');
    // localStorage.setItem('completeprofile', 1);
    // window.location.reload(true);
    // }, 5000);

    // }

    this.setState({ foldertype: "" });
    this.setState({ imgfile: "" });
    this.setState({ upload_photo: "" });
    this.setState({ formData: new FormData() });

    this.setState({ errors: "" });
  };

  render() {
    const { errors } = this.state;

    const imgpath = `${config.baseurl}`;

    return template.call(this);
  }
}

export default UploadDocment;
