import * as React from 'react';
import { Button, Input, DropDownList, TextArea } from '../common/form';
import { ContactUsApi } from './contactUsApi';
import { Card } from '../common/card';
import { ITestCase, validateFields, formatTestCase } from '../common/DynamicRuleValidation';
import { error } from "util";
import * as toastr from 'toastr';

export interface IEmailObjEntity {
    email: string,
    firstName: string,
    lastName: string,
    subjectId: number,
    message: string
}

interface Subject {
    value: number,
    text: string
}

export interface IContactUsPage {
    emailObj: IEmailObjEntity,
    //option declared as option objects
    subjects: Subject[],
    error: any
    isFormValid: boolean
}

const asterikStyle = {
    color: 'red'
}

class ContactUsPage extends React.Component<{}, IContactUsPage> {
    constructor(props) {
        super(props);
        this.state = {
            emailObj: {
                email: "",
                firstName: "",
                lastName: "",
                subjectId: 0,
                message: ""
            },
            subjects: [
                {
                    value: 0,
                    text: "Student"
                },
                {
                    value: 1,
                    text: "School"
                },
                {
                    value: 2,
                    text: "Other"
                }
            ],
            error: {
                email: "",
                firstName: "",
                lastName: "",
                message: ""
            },
            isFormValid: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            emailObj: {
                ...this.state.emailObj,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => {
            this.validateFields(this.state.emailObj, fieldName);
        })
    }

    //look at the code
    //ITestCase
    validateFields = (form: any, fieldName: string) => {
        let tests: ITestCase[] = new Array<ITestCase>();
        for (let field in form) {
            let rules = {};
            switch (field) {
                case "email":
                    rules = {
                        minLength: 3,
                        maxLength: 200,
                        validEmail: true
                    }
                    break;
                case "firstName":
                    rules = {
                        minLength: 2,
                        maxLength: 50
                    }
                    break;
                case "lastName":
                    rules = {
                        minLength: 2,
                        maxLength: 50
                    }
                    break;
                case "message":
                    rules = {
                        minLength: 2,
                        maxLength: 4000
                    }
                default:
                    break;
            }
            tests.push(formatTestCase(form[field], field, rules, new Array<string>()))
        }
        tests = validateFields(tests);

        let newErrMsgs = { ...this.state.error };
        let currentFieldTest = tests.find(test => test.field == fieldName);
        if (currentFieldTest.errMsg.length > 0 && currentFieldTest.value)
            newErrMsgs = { ...this.state.error, [fieldName]: currentFieldTest.errMsg[0] };
        else newErrMsgs = { ...this.state.error, [fieldName]: "" }
        this.setState({ ...this.state, isFormValid: tests.every(test => test.errMsg.length == 0), error: newErrMsgs })
    }

    onClickSendContactUs = () => {
        if (this.state.isFormValid === true) {
            let data = this.state.emailObj;

            ContactUsApi.sendContactUs(data)
                .then(response => {
                    toastr.success(`Thank you. Your message has been sent.`);
                    this.setState({
                        ...this.state,
                        emailObj: {
                            email: "",
                            firstName: "",
                            lastName: "",
                            subjectId: 0,
                            message: ""
                        }
                    });
                })
                //add error toaster
                //ticket number on sending
                //resolved or not

                .catch(err => console.log(err))
        }
    }
    //validation with error message
    //every field required

    //put it in between two curly braces to do styling
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid flex-grow-1 container-p-y">

                    <h1 className="font-weight-bold py-3 mb-4">
                        Contact Us
                        <span className="text-muted font-weight-light"><h6>
                            <span style={asterikStyle}>*</span>
                            <span>All fields are required</span>
                        </h6></span>
                    </h1>

                    <Card>
                        <div>
                            <br></br>
                        </div>
                        <div className="FormContainer">
                            <div className="form-group" id="askForm">
                                <form>

                                    <strong><h5>Email</h5></strong>
                                    <Input
                                        type="text"
                                        label=""
                                        name="email"
                                        placeholder="Email..."
                                        value={this.state.emailObj.email}
                                        onChange={this.onChange}
                                        error={this.state.error.email}
                                    />
                                    <strong><h5>First Name</h5></strong>
                                    <Input
                                        type="text"
                                        label=""
                                        name="firstName"
                                        placeholder="First name..."
                                        value={this.state.emailObj.firstName}
                                        onChange={this.onChange}
                                        error={this.state.error.firstName}
                                    />
                                    <strong><h5>Last Name</h5></strong>
                                    <Input
                                        type="text"
                                        label=""
                                        name="lastName"
                                        placeholder="Last name..."
                                        value={this.state.emailObj.lastName}
                                        onChange={this.onChange}
                                        error={this.state.error.lastName}
                                    />
                                    <strong><h5>Subject</h5></strong>
                                    <DropDownList
                                        options={this.state.subjects}
                                        selectedValue={this.state.emailObj.subjectId}
                                        onChange={this.onChange}
                                        name="subjectId"
                                        label=""
                                    />

                                    <strong><h5>Please enter your thoughts, ideas or comments below</h5></strong>

                                    <TextArea
                                        name="message"
                                        type="text"
                                        label=""
                                        placeholder="Share your thoughts..."
                                        value={this.state.emailObj.message}
                                        onChange={this.onChange}
                                        error={this.state.error.message}
                                    />
                                    <div>
                                        <Button
                                            className="btn btn-primary" label="Submit" disabled={!this.state.isFormValid} onClick={this.onClickSendContactUs}
                                        />

                                    </div>
                                </form>
                            </div>
                        </div>
                    </Card>

                </div>
            </React.Fragment >
        )
    }
}

export default ContactUsPage;