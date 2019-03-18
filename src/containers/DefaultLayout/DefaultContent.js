import React, { Component } from 'react';

export default class DefaultContent extends Component {
    render() {
        return (
          this.props.renderizarComponente()
        )
    }
}