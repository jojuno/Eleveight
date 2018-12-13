import * as React from 'react';
import { EducationLevelTypeApi } from './educationLevelTypeApi';
import EducationLevelTypeList from './educationLevelTypeList';
import EducationLevelTypeForm from './educationLevelTypeForm';
import { validateFields, formatTestCase, ITestCase } from "../../common/DynamicRuleValidation";
import { error } from 'util';
import { Card } from '../../common/card';

export interface IEducationLevelTypeEntity {
    id: number,
    typeName: string,
    typeDescription: string,
    canDelete: boolean
}

export interface IEducationLevelTypePage {
    educationLevelTypeForm: IEducationLevelTypeEntity,
    educationLevelTypeList: IEducationLevelTypeEntity[],
    isELTUpdated: boolean,
    isFormValid: boolean,
    error: any
}

class EducationLevelTypePage extends React.Component<{}, IEducationLevelTypePage>{
    constructor(props) {
        super(props);
        this.state = {
            educationLevelTypeForm: {
                id: null,
                typeName: '',
                typeDescription: '',
                canDelete: true
            },
            educationLevelTypeList: [],
            isELTUpdated: false,
            isFormValid: false,
            error: {
                typeName: '',
                typeDescription: ''
            }
        }
    }

    onGetEducationLevelTypes = () => {
        EducationLevelTypeApi.getAllEducationLevelTypes()
            .then(resp => {
                this.setState({
                    educationLevelTypeList: resp.items
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.onGetEducationLevelTypes();
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,
            educationLevelTypeForm: {
                ...this.state.educationLevelTypeForm,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => this.validateFields(this.state.educationLevelTypeForm, fieldName));
    }

    validateFields = (form: any, fieldName: string) => {
        let tests: ITestCase[] = new Array<ITestCase>();
        for (let field in form) {
            let rules = {};
            switch (field) {
                case "typeName":
                    rules = {
                        minLength: 2,
                        maxLength: 50
                    }
                    break;
                case "typeDescription":
                    rules = {
                        minLength: 2,
                        maxLength: 50
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

    onSubmit = () => {
        EducationLevelTypeApi.postEducationLevelType(this.state.educationLevelTypeForm)
            .then(resp => {
                this.setState({
                    educationLevelTypeForm: {
                        id: null,
                        typeName: '',
                        typeDescription: '',
                        canDelete: true
                    }
                });
                this.onGetEducationLevelTypes();
            })
            .catch(err => console.log(err));
    }

    onEdit = id => {
        EducationLevelTypeApi.getEducationLevelTypeById(id)
            .then(resp => {
                let selected = resp.item;
                this.setState({
                    educationLevelTypeForm: selected,
                    isELTUpdated: true
                })
            })
            .catch(err => console.log(err));
    }

    onUpdate = () => {
        EducationLevelTypeApi.updateEducationLevelType(this.state.educationLevelTypeForm)
            .then(resp => {
                this.setState({
                    educationLevelTypeForm: {
                        id: null,
                        typeName: '',
                        typeDescription: '',
                        canDelete: true
                    },
                    isELTUpdated: false
                });
                this.onGetEducationLevelTypes();
            })
            .catch(err => console.log(err));
    }

    onDelete = (id) => {
        EducationLevelTypeApi.deleteEducationLevelType(id)
            .then(resp => {
                this.onGetEducationLevelTypes();
            })
    }

    render() {
        return (
            <div className="container col-md-12" >
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <EducationLevelTypeForm
                                educationLevelTypeForm={this.state.educationLevelTypeForm}
                                onChange={this.onChange}
                                onClick={this.onSubmit}
                                onUpdate={this.onUpdate}
                                isELTUpdated={this.state.isELTUpdated}
                                disabled={!this.state.isFormValid}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">

                        <EducationLevelTypeList
                            getAllEducationLevelTypes={this.state.educationLevelTypeList}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default EducationLevelTypePage;
