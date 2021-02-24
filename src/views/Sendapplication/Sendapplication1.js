import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Closebtn from '../../assets/img/close-btn.svg';

 import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Modal,
  ModalFooter,
  FormGroup,
  FormText,
  ModalBody,
  Input,
  InputGroup,
  Label,
  Row,
  Container,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.json';
import axios from 'axios';

var baseurl = `${config.baseurl}/`;

export default class MyApp extends React.Component {
	
	 constructor(props) {
    super(props);
    this.state = {
      large: false,
	  responsestatus:'',
	  paymentsuccess:false,
	  payment:''
    };
	this.toggleSuccess = this.toggleSuccess.bind(this);
  }
  
   componentDidMount() {
     // alert();
  }
  toggleSuccess() {
    this.setState({
      paymentsuccess: !this.state.paymentsuccess,
	  
    });
  }
  
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            		 //console.log("The payment was succeeded!", payment);
					 this.setState({responsestatus: 1 });
					 this.setState({payment: payment });
						const data = {
						responsestatus : 1,
						payment : this.state.payment,
						studentid : localStorage.getItem('studentid'),
						amount : 3,
						}
						//console.log(data);

						const post = axios.post(baseurl+'savepayment', data).then((response) => {
						//console.log(response)
						if(response.data.status_code == 200){
						 this.setState({ paymentsuccess: true });	
						}else{
						 toast.error("Payment cancelled");
						}
						});

					 
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onCancel = (payment) => {
            // User pressed "cancel" or close Paypal's popup!
            //console.log('The payment was cancelled!', data);
			         this.setState({responsestatus: 0 });
					 this.setState({payment: payment });
						const data = {
						responsestatus : 0,
						payment : this.state.payment,
						studentid : localStorage.getItem('studentid'),
						amount : 3,
						}
						//console.log(data);

						const post = axios.post(baseurl+'savepayment', data).then((response) => {
						//console.log(response)
						if(response.data.status_code == 100){
						 toast.error("Payment cancelled");
						}
						});
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = 7; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox:    'AQl_r_FfteZ0jPsI1g672qEEUwxAoF34LXKHcW07NVMt0APl4iWExF4vTN_qr6V8evtP7MUoptwm9X--',
           // production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
		  <>
		  	<ToastContainer/>
		       <Modal isOpen={this.state.paymentsuccess} toggle={this.toggleSuccess}	
                       className={'modal-md ' + 'register-popup sucess-pop' + ' ' + this.props.className}>	
                  <ModalBody>	
				    <div className="modal_header mb-4">
						  <span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon" onClick={this.closeall}  className="uni-icon" /></span>
				  </div>	
				    <div className="p-5 text-center">	
				    <div className="mb-5 sucess-text">Payment is Successful</div>	
			<p>Thank you for your payment. Your transaction has been completed and a
receipt has been sent to your payments History.</p>
							
                          <a onClick={this.closeall} style={{cursor:'pointer'}} color="link" className="px-4">VIEW RECEIPT</a>
              <a 
              // onClick={this.closeall} 
              href="/#/sendapplication"
              style={{cursor:'pointer'}} color="link" className="px-0">ENROLLMENT FORM</a>
						  	
					</div>	
				  </ModalBody>	
                	
                </Modal>
				
		    <Col xs="12" sm="10" xl="10" md="10" lg="10" className="px-0">
              <Card className="uni-left-card uni-right-border">
                <CardBody className="pr-0">
				<Row>
				<div className="col-md-6 px-5">
				<h3>Draft Application</h3>
				</div>
				</Row>
				<div className="card-body table-responsive">
                        
 <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />

						</div>
				
                </CardBody>
              </Card>
            </Col>
		   </>  
           
        );
    }
}