import * as React from 'react';
import { OrganizationTypeApi } from './organizationTypeApi';
import OrganizationTypeList from './organizationTypeList';
import OrganizationTypeForm from './organizationTypeForm';
import { validateFields, formatTestCase, ITestCase } from "../../common/DynamicRuleValidation";
import { error } from 'util';
import { Card } from '../../common/card';

export interface IOrganizationTypeEntity {
    id: number,
    typeName: string,
    typeDescription: string,
    canDelete: boolean
}

export interface IOrganizationTypePage {
    organizationTypeForm: IOrganizationTypeEntity,
    organizationTypeList: IOrganizationTypeEntity[],
    isOTUpdated: boolean,
    isFormValid: boolean,
    error: any
}

class OrganizationTypePage extends React.Component<{}, IOrganizationTypePage>{
    constructor(props) {
        super(props);
        this.state = {
            organizationTypeForm: {
                id: null,
                typeName: '',
                typeDescription: '',
                canDelete: true
            },
            organizationTypeList: [],
            isOTUpdated: false,
            isFormValid: false,
            error: {
                typeName: '',
                typeDescription: ''
            }
        }
    }

    onGetOrganizationTypes = () => {
        OrganizationTypeApi.getAllOrganizationTypes()
            .then(resp => {
                this.setState({
                    organizationTypeList: resp.items
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.onGetOrganizationTypes();
    }

    onChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,
            organizationTypeForm: {
                ...this.state.organizationTypeForm,
                [fieldName]: fieldValue
            }
        }
        this.setState(nextState, () => this.validateFields(this.state.organizationTypeForm, fieldName));
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
        OrganizationTypeApi.postOrganizationType(this.state.organizationTypeForm)
            .then(resp => {
                this.setState({
                    organizationTypeForm: {
                        id: null,
                        typeName: '',
                        typeDescription: '',
                        canDelete: true
                    }
                });
                this.onGetOrganizationTypes();
            })
            .catch(err => console.log(err));
    }

    onEdit = id => {
        OrganizationTypeApi.getOrganizationTypeById(id)
            .then(resp => {
                let selected = resp.item;
                this.setState({
                    organizationTypeForm: selected,
                    isOTUpdated: true
                })
            })
            .catch(err => console.log(err));
    }

    onUpdate = () => {
        OrganizationTypeApi.updateOrganizationType(this.state.organizationTypeForm)
            .then(resp => {
                this.setState({
                    organizationTypeForm: {
                        id: null,
                        typeName: '',
                        typeDescription: '',
                        canDelete: true
                    },
                    isOTUpdated: false
                });
                this.onGetOrganizationTypes();
            })
            .catch(err => console.log(err));
    }

    onDelete = (id) => {
        OrganizationTypeApi.deleteOrganizationType(id)
            .then(resp => {
                this.onGetOrganizationTypes();
            })
    }

    render() {
        return (
            <div className="container col-md-12">
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <OrganizationTypeForm
                                organizationTypeForm={this.state.organizationTypeForm}
                                onChange={this.onChange}
                                onClick={this.onSubmit}
                                onUpdate={this.onUpdate}
                                isOTUpdated={this.state.isOTUpdated}
                                disabled={!this.state.isFormValid}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="font-weight-bold py-3 mb-4">Organization List</h3>
                        <OrganizationTypeList
                            getAllOrganizationTypes={this.state.organizationTypeList}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default OrganizationTypePage;
