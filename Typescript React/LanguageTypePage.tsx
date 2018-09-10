import * as React from 'react';
import { LanguageTypeApi } from './languageTypeApi';
import LanguageTypeList from './languageTypeList';
import LanguageTypeForm from './languageTypeForm';
import { validateFields, formatTestCase, ITestCase } from "../../common/DynamicRuleValidation";
import { error } from 'util';
import { Card } from '../../common/card';

export interface ILanguageTypeEntity {
    id: number,
    typeName: string,
    typeDescription: string,
    canDelete: boolean
}

export interface ILanguageTypePage {
    languageTypeForm: ILanguageTypeEntity,
    languageTypeList: ILanguageTypeEntity[],
    isLTUpdated: boolean,
    isFormValid: boolean,
    error: any
}

class LanguageTypePage extends React.Component<{}, ILanguageTypePage>{
    constructor(props) {
        super(props);
        this.state = {
            languageTypeForm: {
                id: null,
                typeName: '',
                typeDescription: '',
                canDelete: true
            },
            languageTypeList: [],
            isLTUpdated: false,
            isFormValid: false,
            error: {
                typeName: '',
                typeDescription: ''
            }
        }
    }

    onGetLanguageTypes = () => {
        LanguageTypeApi.getAllLanguageTypes()
            .then(resp => {
                this.setState({
                    languageTypeList: resp.items
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.onGetLanguageTypes();
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,
            languageTypeForm: {
                ...this.state.languageTypeForm,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => this.validateFields(this.state.languageTypeForm, fieldName));
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
        LanguageTypeApi.postLanguageType(this.state.languageTypeForm)
            .then(resp => {
                this.setState({
                    languageTypeForm: {
                        id: null,
                        typeName: '',
                        typeDescription: '',
                        canDelete: true
                    }
                });
                this.onGetLanguageTypes();
            })
            .catch(err => console.log(err));
    }

    onEdit = id => {
        LanguageTypeApi.getLanguageTypeById(id)
            .then(resp => {
                let selected = resp.item;
                this.setState({
                    languageTypeForm: selected,
                    isLTUpdated: true
                })
            })
            .catch(err => console.log(err));
    }

    onUpdate = () => {
        LanguageTypeApi.updateLanguageType(this.state.languageTypeForm)
            .then(resp => {
                this.setState({
                    languageTypeForm: {
                        id: null,
                        typeName: '',
                        typeDescription: '',
                        canDelete: true
                    },
                    isLTUpdated: false
                });
                this.onGetLanguageTypes();
            })
            .catch(err => console.log(err));
    }

    onDelete = (id) => {
        //if someone else is changing the list, they would need to get the most current list from the database
        LanguageTypeApi.deleteLanguageType(id)
            .then(resp => {
                this.onGetLanguageTypes();
            })
    }

    render() {
        return (
            <div className="container col-md-12" >
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <LanguageTypeForm
                                languageTypeForm={this.state.languageTypeForm}
                                onChange={this.onChange}
                                onClick={this.onSubmit}
                                onUpdate={this.onUpdate}
                                isLTUpdated={this.state.isLTUpdated}
                                disabled={!this.state.isFormValid}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="font-weight-bold py-3 mb-4">Language List</h3>
                        <LanguageTypeList
                            getAllLanguageTypes={this.state.languageTypeList}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default LanguageTypePage;