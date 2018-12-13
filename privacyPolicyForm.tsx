import * as React from 'react';
import { Button, Input, TextArea } from '../common/form';

export interface IPrivacyPolicyEntity {
    id: number,
    heading: string,
    body: string,
    displayOrder: number,
}

interface IPrivacyPolicyFormProps {
    privacyPolicy: IPrivacyPolicyEntity,
    onChange: (fieldName: string, value: string) => void;
    onClick: () => void;
    error?: any
    isFormValid: boolean
}

export const PrivacyPolicyForm = (props: IPrivacyPolicyFormProps) => (
    <React.Fragment>
        <div className="container">
            <form className="modal-content">
                <div className="modal-header">
                    <h2>Privacy Policy Form</h2>
                    <button
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                        className="close"
                    >
                        &times;
                        </button>
                </div>
                <div className="modal-body">
                    <label>Heading</label>
                    <Input
                        type="text"
                        label=""
                        name="heading"
                        placeholder="Heading..."
                        value={props.privacyPolicy.heading}
                        onChange={props.onChange}
                        error={props.error.heading}
                    />
                    <label>Body</label>
                    <TextArea
                        type="text"
                        label=""
                        name="body"
                        placeholder="Body..."
                        value={props.privacyPolicy.body}
                        onChange={props.onChange}
                        error={props.error.body}
                    />
                    <label>Display Order</label>
                    <Input
                        type="number"
                        label=""
                        name="displayOrder"
                        placeholder="Display order..."
                        value={props.privacyPolicy.displayOrder}
                        onChange={props.onChange}
                        error={props.error.displayOrder}
                    />
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            disabled={!props.isFormValid}
                            onClick={props.onClick}
                            data-dismiss="modal"
                        >Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </React.Fragment >

)
