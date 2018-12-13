import * as React from "react";
import { Input, labelBoldStyle } from '../common/form';
import { ChangePasswordApi } from './changePasswordApi';
import { Card } from '../common/card';
import { ITestCase, validateFields, formatTestCase } from '../common/DynamicRuleValidation';
import { error } from "util";
import * as toastr from 'toastr';
import { Button } from "../common/form/buttons/button";


export interface IChangePasswordForm {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface IChangePasswordPage {
    changePasswordForm: IChangePasswordForm,
    error: any,
    isFormValid: boolean
}

class ChangePasswordPage extends React.Component<{}, IChangePasswordPage> {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordForm: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            error: {
                oldPassword: "",
                newPassword: "",
                confirmpassword: ""
            },
            isFormValid: false
        }
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,
            changePasswordForm: {
                ...this.state.changePasswordForm,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => {
            this.validateFields(this.state.changePasswordForm, fieldName);
        })
    }


    onChangePassword = () => {
        let oldPassword = this.state.changePasswordForm.oldPassword;
        let newPassword = this.state.changePasswordForm.newPassword;
        let changePasswordData = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        ChangePasswordApi.changePassword(changePasswordData)
            .then(resp => {
                toastr.success(`Your password has been successfully changed.`);
                this.setState({
                    changePasswordForm: {
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    }
                })
            })
            .catch(err => {
                toastr.error(`Error: Your old password doesn't match the current password.`);
                console.log("Error:", err)
            })
    }

    validateFields = (form: any, fieldName: string) => {
        let tests: ITestCase[] = new Array<ITestCase>();
        for (let field in form) {
            let rules = {};
            switch (field) {
                case "oldPassword":
                    rules = {
                        validPassword: true
                    }
                    break;
                case "newPassword":
                    rules = {
                        validPassword: true
                    }
                    break;
                case "confirmPassword":
                    rules = {
                        validPassword: true,
                        //pass it into validateFields to compare to "confirm pasword"
                        newPassword: this.state.changePasswordForm.newPassword,
                        confirmPassword: true
                    }
                default:
                    break;
            }
            tests.push(formatTestCase(form[field], field, rules, new Array<string>()))
        }
        tests = validateFields(tests);

        let newErrMsgs = {
            ...this.state.error
        };
        let currentFieldTest = tests.find(test => test.field == fieldName);
        if (currentFieldTest.errMsg.length > 0 && currentFieldTest.value)
            newErrMsgs = {
                ...this.state.error,
                [fieldName]: currentFieldTest.errMsg[0]
            };
        else newErrMsgs = {
            ...this.state.error,
            [fieldName]: ""
        }
        this.setState({
            ...this.state,
            isFormValid: tests.every(test => test.errMsg.length == 0),
            error: newErrMsgs
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="card-body">
                    <Input
                        type="password"
                        name="oldPassword"
                        label="Current password"
                        labelStyle={labelBoldStyle}
                        value={this.state.changePasswordForm.oldPassword}
                        onChange={this.onChange}
                        error={this.state.error.oldPassword}
                    />
                    <Input
                        type="password"
                        name="newPassword"
                        label="New password"
                        labelStyle={labelBoldStyle}
                        value={this.state.changePasswordForm.newPassword}
                        onChange={this.onChange}
                        error={this.state.error.newPassword}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        labelStyle={labelBoldStyle}
                        value={this.state.changePasswordForm.confirmPassword}
                        onChange={this.onChange}
                        error={this.state.error.confirmPassword}
                    />
                    <Button
                        className="btn btn-primary float-right"
                        label="Change Password"
                        onClick={this.onChangePassword}
                        disabled={!this.state.isFormValid}
                    />
                </div>
            </React.Fragment >
        );
    }

}


export default ChangePasswordPage;
