import * as React from 'react';
import { PrivacyPolicyForm, IPrivacyPolicyEntity } from './privacyPolicyForm';
import { PrivacyPolicyApi } from './privacyPolicyApi';
import { Button } from '../common/form';
import { PrivacyPolicyList } from './privacyPolicyList';
import { ITestCase, formatTestCase, validateFields } from '../common/DynamicRuleValidation';

export interface IPrivacyPolicyPage {
    privacyPolicyObj: IPrivacyPolicyEntity,
    privacyPolicyList: IPrivacyPolicyEntity[],
    error: any,
    isFormValid: boolean
}

class PrivacyPolicyPage extends React.Component<{}, IPrivacyPolicyPage> {
    constructor(props) {
        super(props);
        this.state = {
            privacyPolicyObj: {
                id: 0,
                heading: "",
                body: "",
                displayOrder: 0
            },
            error: {
                heading: '',
                body: '',
                displayOrder: ''
            },
            isFormValid: false,
            privacyPolicyList: []
        }
    }
    componentDidMount() {
        this.onGetPrivacyPolicies();
    }

    onGetPrivacyPolicies = () => {
        PrivacyPolicyApi.getPrivacyPolicies()
            .then(response => {
                let privacyPolicyList = response.items;
                this.setState({
                    privacyPolicyList: privacyPolicyList
                })
            })
            .catch(err => console.log("ERROR:", err));
    }

    onGetPrivacyPolicyById = (id) => {
        PrivacyPolicyApi.getPrivacyPolicyById(id)
            .then(response => {
                this.setState({
                    privacyPolicyObj: response.item
                });
            })
            .catch(err => console.log("Error:", err));
    }

    onAddPrivacyPolicy = () => {
        let data = this.state.privacyPolicyObj;
        PrivacyPolicyApi.postPrivacyPolicy(data)
            .then(response => {
                this.setState({
                    ...this.state,
                    privacyPolicyObj: {
                        ...this.state.privacyPolicyObj,
                        id: 0,
                        heading: "",
                        body: "",
                        displayOrder: 0,
                    }
                })

                this.onGetPrivacyPolicies();
            })
            .catch(err => console.log("Error:", err));
    }

    onEditPrivacyPolicy = () => {
        let data = this.state.privacyPolicyObj;
        PrivacyPolicyApi.editPrivacyPolicy(data)
            .then(response => {
                this.setState({
                    privacyPolicyObj: {
                        ...this.state.privacyPolicyObj,
                        id: 0,
                        heading: "",
                        body: "",
                        displayOrder: 0
                    },
                })
                this.onGetPrivacyPolicies()
            })
            .catch(err => console.log("Error:", err));
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            privacyPolicyObj: {
                ...this.state.privacyPolicyObj,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => {
            this.validateFields(this.state.privacyPolicyObj, fieldName);
        });
    }

    validateFields = (form: any, fieldName: string) => {
        if (this.state.error[fieldName] != undefined) {
            let tests: ITestCase[] = new Array<ITestCase>();
            for (let field in form) {
                let rules = {};
                switch (field) {
                    case "heading":
                        rules = {
                            minLength: 5,
                            maxLength: 200
                        }
                        break;
                    case "body":
                        rules = {
                            minLength: 5,
                            maxLength: 4000
                        }
                        break;
                    case "displayOrder":
                        rules = {
                            isNumber: true
                        }
                        break;
                    default:
                        break;
                }
                tests.push(formatTestCase(form[field], field, rules, new Array<string>()));
            }
            tests = validateFields(tests);
            let newErrMsgs = { ...this.state.error };
            let currentFieldTest = tests.find(test => test.field == fieldName);
            if (currentFieldTest.errMsg.length > 0 && currentFieldTest.value)
                newErrMsgs = { ...this.state.error, [fieldName]: currentFieldTest.errMsg[0] };
            else newErrMsgs = { ...this.state.error, [fieldName]: "" }
            this.setState({ ...this.state, isFormValid: tests.every(test => test.errMsg.length == 0), error: newErrMsgs })
        }
    }

    onClick = () => {
        let data = this.state.privacyPolicyObj;
        if (this.state.privacyPolicyObj.id === 0) {
            this.onAddPrivacyPolicy();
        } else {
            this.onEditPrivacyPolicy();
        }
    }

    onEditButtonClick = (id) => {
        this.onGetPrivacyPolicyById(id);
    }

    onDeleteButtonClick = (id) => {
        PrivacyPolicyApi.deletePrivacyPolicy(id);
        this.onGetPrivacyPolicies();
    }

    clearData = () => {
        this.setState({
            privacyPolicyObj: {
                ...this.state.privacyPolicyObj,
                id: 0,
                heading: '',
                body: '',
                displayOrder: 0
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid flex-grow-1 container-p-y">
                    <div className="card-header mb-4">
                        <button
                            className="btn btn-primary float-right"
                            data-toggle="modal"
                            data-target="#privacyPolicyForm"
                            onClick={this.clearData}
                        >Add Privacy Policy</button>
                        <h2>Privacy Policy List</h2>
                    </div>

                    <PrivacyPolicyList
                        privacyPolicyList={this.state.privacyPolicyList}
                        onEditButtonClick={this.onEditButtonClick}
                        onDeleteButtonClick={this.onDeleteButtonClick}
                    />
                </div>
                <div>
                    <div className="modal fade" id="privacyPolicyForm" style={{ display: "none", ariaHidden: "true" }}>
                        <div className="modal-dialog modal-lg card-body">
                            <div className="modal-body">
                                <PrivacyPolicyForm
                                    privacyPolicy={this.state.privacyPolicyObj}
                                    onChange={this.onChange}
                                    onClick={this.onClick}
                                    error={this.state.error}
                                    isFormValid={this.state.isFormValid}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default PrivacyPolicyPage;