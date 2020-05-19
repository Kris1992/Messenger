import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../Helpers/validation_helper';


export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        // teraz probujemy object
        this.state = ({
            emptyFieldErrors: {
                email: '',
                plainPassword: ''
            }
        });

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    handleFormSubmit(event) {
        event.preventDefault();
        this.clearFieldsErrors();
        const { onLoginAction } = this.props;
        
        const passwordInput = this.passwordInput.current;

        const email = this.emailInput.current.value;
        const plainPassword = passwordInput.value;

        //console.log(this.emailInput.current.name);

        const isValid = this.handleValidation(email, plainPassword);

        if (!isValid) {
            return;
        }

        onLoginAction(
            email,
            plainPassword
        );

        passwordInput.value = '';
    }
    clearFieldsErrors() {
        var emptyFieldErrors = this.state.emptyFieldErrors;
        emptyFieldErrors.email = '';
        emptyFieldErrors.plainPassword = '';
        this.setState({
            emptyFieldErrors: emptyFieldErrors
        });
    }
    handleValidation(emailInput, passwordInput) {
        //const emptyFieldErrors = [];
        var emptyFieldErrors = this.state.emptyFieldErrors;
        const message = 'This field cannot be empty';
        var isValid = true;

        if (isEmpty(emailInput)) {
            emptyFieldErrors.email = message;
            isValid = false;
        }

        if (isEmpty(passwordInput)) {
          emptyFieldErrors.plainPassword = message;          
          isValid = false;
        }
        this.setState({emptyFieldErrors: emptyFieldErrors});
        
        return isValid;
        //return emptyFieldErrors;
    };

    render() {

    const { emptyFieldErrors } = this.state;

    const { loginServerValidationErrorMessage, onRegisterClick } = this.props;

        return (
        <React.Fragment>
            <h1 className="brand"><span className="fas fa-comments">Messenger</span></h1>
            <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                    {loginServerValidationErrorMessage && (
                        <div className="col-md-8 mt-4 mx-auto">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {loginServerValidationErrorMessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="form-group col-md-6 mt-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text input-icon"><i className="fas fa-user"></i></div>
                            </div>
                            <label className="sr-only" htmlFor="InputEmail">E-mail</label>
                            <input type="email" name="email" ref={this.emailInput} className={`form-control green-outline ${emptyFieldErrors['email'] ? 'is-invalid' : ''}`} id="InputEmail" placeholder="E-mail" required/>
                            <div className="invalid-feedback">
                                <strong>{emptyFieldErrors['email']}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6 mt-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text input-icon"><i className="fas fa-key"></i></div>
                            </div>
                            <label className="sr-only" htmlFor="InputPassword">Password</label>
                            <input type="password" name="plainPassword" ref={this.passwordInput} className={`form-control green-outline ${emptyFieldErrors['plainPassword'] ? 'is-invalid' : ''}`} id="InputPassword" placeholder="Password" required/>
                            <div className="invalid-feedback">
                                <strong>{emptyFieldErrors['plainPassword']}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <strong><a href="#" className="anchor" onClick={() =>  onRegisterClick()}>Create new Account</a></strong>
                    </div>
                    <div className="col-md-6 mx-auto my-2">
                        <button type="submit" className="btn btn-block btn-white">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );

}}

LoginPage.propTypes = {
    onLoginAction: PropTypes.func.isRequired,
    loginServerValidationErrorMessage: PropTypes.string.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
};