import React    from "react";
import axios from 'axios';
import template from "./Leftoverview.jsx";
import config from '../../config.json';
var baseurl = `${config.baseurl}`;


class Leftoverview extends React.Component {
	constructor(props) {
    super(props);
	this.state = {
				cat_count : '',
				fac_count : '',
				dep_count : '',
				cou_count : '',
				res1 : '',
				res2 : '',
				res3 : '',
				res4 : ''
    };
	var param = localStorage.getItem('universityid');
	axios.get(baseurl+'/get_programdetails/'+param).then(response => {	
			
         this.setState({
                   cat_count: response.data.cat_count,
                   fac_count: response.data.fac_count,
                   dep_count: response.data.dep_count,
				   cou_count: response.data.cou_count,
				   res1: response.data.res1,
                   res2: response.data.res2,
                   res3: response.data.res3,
				   res4: response.data.res4
               });
        })
	}
  render() {
    return template.call(this);
  }
}

export default Leftoverview;
