import React    from "react";
import template from "./SecondaryHeader.jsx";

class SecondaryHeader extends React.Component {
	constructor(props) {
    super(props);

	 this.state = {
	  large: false
	 };
	 this.toggleLarge = this.toggleLarge.bind(this);
	}
	
	toggleLarge() {
	this.setState({
	large: !this.state.large,

	});
	}
  render() {
    return template.call(this);
  }
}

export default SecondaryHeader;
