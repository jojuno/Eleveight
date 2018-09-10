import * as React from 'react';
import { Input } from '../../common/form';
import { Button, UpdateBtn, SubmitBtn } from '../../common/form/buttons';
import { ILanguageTypeEntity } from './languageTypePage';
import { error } from 'util';

interface ILanguageTypeFormProps {
    languageTypeForm: ILanguageTypeEntity,
    onChange: (fieldName: string, fieldValue: string) => void,
    onClick: () => void,
    onUpdate: () => void,
    isLTUpdated: boolean,
    error?: any,
    disabled?: boolean
}

const LanguageTypeForm = (props: ILanguageTypeFormProps) => {
    return (
        <React.Fragment>
            <h3 className="font-weight-bold py-3 mb-4">Language Type</h3>
            <div className="card mb-4">
                <div className="card-body demo-vertical-spacing-sm">
                    <Input
                        type="text"
                        name="typeName"
                        className="form-control"
                        label="Name"
                        value={props.languageTypeForm.typeName}
                        onChange={props.onChange}
                        error={props.error.typeName}
                    />
                    <Input
                        type="text"
                        name="typeDescription"
                        className="form-control"
                        label="Description"
                        value={props.languageTypeForm.typeDescription}
                        onChange={props.onChange}
                        error={props.error.typeDescription}
                    />
                    {props.isLTUpdated
                        ?
                        <UpdateBtn
                            onClick={props.onUpdate}
                            disabled={props.disabled}
                        />
                        :
                        <SubmitBtn
                            onClick={props.onClick}
                            disabled={props.disabled}
                        />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default LanguageTypeForm;