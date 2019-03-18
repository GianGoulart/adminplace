import React, { Component } from 'react';
import ReactLoading from 'react-loading';

export default class Loader extends Component {

     static showLoading() {
        let isLoading = true;
        return dispatch => {
            dispatch({ type: 'LOADING', isLoading });
            return isLoading;
        }
    }
    static hideLoading() {
        let isLoading = false;
        return dispatch => {
            dispatch({ type: 'LOADING', isLoading });
            return isLoading;
        }
    }

    render() {
        return (
            <div>
            {this.props.store.loader === true &&    
                <div className="loader ">
                    <div className="loading" >
                        <ReactLoading type="cylon" color="#000" height={150} width={80} />  
                    </div>
                </div>
            }
            </div>
        )
    }
}