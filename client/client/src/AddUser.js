import React, { Component } from 'react';

class Welcome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:"";
        }
    }
    render(){
        return(
            <div>
                <h1>Test</h1>
            </div>
        );
    }
}

export default Welcome;