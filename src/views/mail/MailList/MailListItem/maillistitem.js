import React, { Component } from 'react';
import config from "../../../config.json";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "../../MailDraft/node_modules/react-toastify/dist/ReactToastify.css";
var baseurl = `${config.baseurl}`;

class MailListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            large: false,
           
        };
    }

    componentDidMount() {

    }

    render() {
        const imgpath = `${config.baseurl}`;
        return (
            <div>
                MailListItem
            </div>
        )
    }

}

export default MailListItem;