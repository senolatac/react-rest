import React from 'react';
import './../login/LoginPage.css';
import UserService from '../../services/user.service';
import { User } from '../../models/user';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component{

    constructor(props) {
        super(props);

        if (UserService.currentUserValue) {
            this.props.history.push('/profile');
        }

        this.state = {
            user: new User('', '', ''),
            submitted: false,
            loading: false,
            errorMessage: '',
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        const user = this.state.user;
        user[name] = value;
        this.setState({ user: user });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({submitted: true });

        const { user } = this.state;

        //validate form
        if(!user.name || !user.password || !user.username) {
            return;
        }

        this.setState(({ loading: true }));

        UserService.register(user)
            .then(data => {
                this.props.history.push('/login');
            },
                error => {
                if (error?.response?.status === 409) {
                    this.setState({
                        errorMessage: 'Username is not available.',
                        loading: false,
                    });
                } else {
                    this.setState({
                        errorMessage: 'Unexpected error occurred.',
                        loading: false,
                    });
                }
                });
    }

    render() {
        const { user, submitted, loading, errorMessage } = this.state;
        return (
            <div className="form-container">
                <div className="card custom-card">
                    <div className="header-container">
                        <i className="fa fa-user"/>
                    </div>

                    {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                    }

                    <form
                        onSubmit={(e) => this.handleRegister(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}>
                        <div className={'form-group'}>
                            <label htmlFor="name">Full Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={user.name}
                                onChange={(e) => this.handleChange(e)}/>
                            <div className="invalid-feedback">
                                Full name is required.
                            </div>
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                required
                                value={user.username}
                                onChange={(e) => this.handleChange(e)}/>
                            <div className="invalid-feedback">
                                A valid username is required.
                            </div>
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="Password">Password: </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                required
                                value={user.password}
                                onChange={(e) => this.handleChange(e)}/>
                            <div className="invalid-feedback">
                                Password is required.
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 mt-3"
                            disabled={loading}>
                            Sign Up
                        </button>
                    </form>
                    <Link to="/login" className="btn btn-link" style={{color: 'darkgray'}}>
                        I have an Account!
                    </Link>
                </div>
            </div>
        );
    }
}

export { RegisterPage };
