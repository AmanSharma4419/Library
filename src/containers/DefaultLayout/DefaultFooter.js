import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer_Blocks from './../../views/Footer_Blocks/index';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
       <div className="foe-footer-box py-5"><Footer_Blocks />
        {/* <span><a href="https://coreui.io">CoreUI</a> &copy; 2020 creativeLabs.</span>
        <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span> */}
        </div> 
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
