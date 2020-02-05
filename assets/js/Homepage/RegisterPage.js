import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../Helpers/validationHelper';
import ReCAPTCHA from "react-google-recaptcha";



export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.emailInput = React.createRef();
        this.loginInput = React.createRef();
        this.passwordInput = React.createRef();
        this.passwordSecondInput = React.createRef();
        this.agreeTermsCheck = React.createRef();
        this.recaptchaRef = React.createRef();

        this.state = {
            recaptchaError: ''
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldValidation = this.handleFieldValidation.bind(this);
    }

    handleFieldValidation(event) {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const { onFieldValidation } = this.props;
        onFieldValidation(
            fieldName,
            fieldValue
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();

        //Check is not robot
        const recaptcha = this.recaptchaRef.current.getValue();
        if(recaptcha != '') {
            const { onRegisterAction } = this.props;
            const userData = {
                email: this.emailInput.current.value,
                login: this.loginInput.current.value,
                plainPassword: {
                    first: this.passwordInput.current.value,
                    second: this.passwordSecondInput.current.value,
                },
                agreeTerms: this.agreeTermsCheck.current.checked,
                recaptcha: recaptcha
            };

            onRegisterAction(
                userData
            );
        } else {
            this.setState({
                recaptchaError: 'ReCAPTCHA fails.'
            });
        }

    }

    render() {

    const { recaptchaError } = this.state;
    const { registerServerValidationMessages, successMessage } = this.props;


        return (
        <React.Fragment>
            <h1 className="brand"><span className="fas fa-comments">Messenger</span></h1>
            <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                    {successMessage && (
                        <div className="col-md-8 mt-4 mx-auto">
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                {successMessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {recaptchaError && (
                        <div className="col-md-8 mt-4 mx-auto">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {recaptchaError}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {registerServerValidationMessages['recaptcha'] && (
                        <div className="col-md-8 mt-4 mx-auto">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {registerServerValidationMessages['recaptcha']}
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
                            <input onBlur={this.handleFieldValidation} type="email" name="email" ref={this.emailInput} 
                            className={`form-control green-outline 
                                ${(() => {
                                    if (registerServerValidationMessages['email']) {
                                        if(registerServerValidationMessages['email'] == 'ok') {
                                            return `is-valid`;
                                        }
                                        return `is-invalid`;
                                    } else {
                                        return ``;
                                    }
                                })()} `} id="InputEmail" placeholder="E-mail"/>
                            <div className="invalid-feedback">
                                <strong>{registerServerValidationMessages['email']}</strong>
                            </div>
                            <div className="valid-feedback">
                                <strong className="text-green">Looks good!</strong>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6 mt-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text input-icon"><i className="fas fa-user"></i></div>
                            </div>
                            <label className="sr-only" htmlFor="InputLogin">Login</label>
                            <input onBlur={this.handleFieldValidation} type="text" name="login" ref={this.loginInput} 
                            className={`form-control green-outline 
                                ${(() => {
                                    if (registerServerValidationMessages['login']) {
                                        if(registerServerValidationMessages['login'] == 'ok') {
                                            return `is-valid`;
                                        }
                                        return `is-invalid`;
                                    } else {
                                        return ``;
                                    }
                                })()} `}
                             id="InputLogin" placeholder="Login"/>
                            <div className="invalid-feedback">
                                <strong>{registerServerValidationMessages['login']}</strong>
                            </div>
                            <div className="valid-feedback">
                                <strong className="text-green">Looks good!</strong>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6 mt-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text input-icon"><i className="fas fa-key"></i></div>
                            </div>
                            <label className="sr-only" htmlFor="InputPassword">Password</label>
                            <input type="password"  onBlur={this.handleFieldValidation} name="plainPassword" ref={this.passwordInput} 
                            className={`form-control green-outline 
                                ${(() => {
                                    if (registerServerValidationMessages['plainPassword']) {
                                        if(registerServerValidationMessages['plainPassword'] == 'ok') {
                                            return `is-valid`;
                                        }
                                        return `is-invalid`;
                                    } else {
                                        return ``;
                                    }
                                })()} `} id="InputPassword" placeholder="Password"/>
                            <small id="passwordHelp" className="form-text text-warning">Password should contain at least 5 chars(Uppercase, Lowercase and number)</small>
                            <div className="invalid-feedback ">
                                <strong>{registerServerValidationMessages['plainPassword']}</strong>
                            </div>
                            <div className="valid-feedback">
                                <strong className="text-green">Looks good!</strong>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6 mt-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text input-icon"><i className="fas fa-key"></i></div>
                            </div>
                            <label className="sr-only" htmlFor="InputPasswordSecond">Repeat password</label>
                            <input type="password" name="plainPasswordSecond" ref={this.passwordSecondInput} className="form-control green-outline" id="InputPasswordSecond" placeholder="Repeat password"/>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-check">
                            
                            <input type="checkbox" name="agreeTerms" id="CheckboxTerms" ref={this.agreeTermsCheck} className={`form-check-input ${registerServerValidationMessages['agreeTerms'] ? 'is-invalid' : ''}`} required/>
                            <label className="form-check-label" htmlFor="CheckboxTerms">Agree to Terms</label>
                                <div className="invalid-feedback">
                                    <strong>{registerServerValidationMessages['agreeTerms']}</strong>
                                </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6" id="captcha-container">
                        <ReCAPTCHA
                            ref={this.recaptchaRef}
                            sitekey="6LdDBZ4UAAAAAOX0j6KiM7KoUjI8TIt0V8I7mxFg"
                            size="normal"
                        />
                    </div>
                    <div className="col-md-6 mx-auto my-2">
                        <button type="submit" className="btn btn-block btn-black">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}}

RegisterPage.propTypes = {
    onRegisterAction: PropTypes.func.isRequired,
    onFieldValidation: PropTypes.func.isRequired,
    registerServerValidationMessages: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired
};
