import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.user = sessionStorage.getItem('currentUser') 
    this.name = sessionStorage.getItem('nameUser') 
    this.idUser = sessionStorage.getItem('IDUser') 
    this.groupAccess = sessionStorage.getItem('groupAccess') 
  }

  logout(){
    this.props.history.push('/')
    sessionStorage.removeItem('currentUser')
    sessionStorage.removeItem('nameUser')
    sessionStorage.removeItem('IDUser')
    sessionStorage.removeItem('groupAccess')
  }
  
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav>
            <Button color="link" className={classNames({  })}
                     onClick={() => {
                       this.logout();
                     }}>
              <label className="text-muted"><i className="icon-logout"></i>  Sair</label>
            </Button>
        </Nav>
        
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
