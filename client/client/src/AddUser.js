import React, { Component } from 'react';

class AddUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:"";
        }
    }

    submitAddUserForm = (e) => {
        e.preventDefault();
        fetch({
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value,
            }),
        })

            .then(data => data.text())
            .then(response => this.setState({data:response}))
            .catch((errors)=>console.log(errors))
    };
    render(){
        return(
            <div>
                <h1>Add User</h1>

                <form onSubmit={this.submitAddUserForm}>
                    <p>
                        <label htmlFor={"username"}>Enter Username:</label>
                        <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                    </p>
                    <p>
                        <label htmlFor={"password"}>Enter password:</label>
                        <input id={"password"} type="password" name='password' placeholder="Enter password"/>
                    </p>
                    <button>Sign In</button>
                </form>
                {this.state.data}
            </div>
        );
    }
}

export default AddUser;