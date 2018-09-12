import * as React from 'react';
import { PrivacyPolicyApi } from './privacyPolicyApi';
import { IPrivacyPolicyEntity } from './privacyPolicyForm';
import { Button } from '../common/form';

export interface IPrivacyPolicyListProps {
    privacyPolicyList: IPrivacyPolicyEntity[],
    onEditButtonClick: (id: number) => void;
    onDeleteButtonClick: (id: number) => void;
}

//remove bottom space on table with className="mb-0"
export const PrivacyPolicyList = (props: IPrivacyPolicyListProps) => (
    <React.Fragment>
        <div className="card">
            <div className="card-datatable table-responsive">
                <table className="datatables-demo table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th>Heading</th>
                            <th>Body</th>
                            <th>Order</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.privacyPolicyList.map((item, index) => (
                            <tr key={item.id}>
                                <td> {item.heading} </td>
                                <td> {item.body} </td>
                                <td> {item.displayOrder} </td>
                                <td>
                                    <button
                                        className="btn btn-secondary waves-effect"
                                        data-toggle="modal"
                                        data-target="#privacyPolicyForm"
                                        onClick={() => props.onEditButtonClick(item.id)}
                                    >Edit
                                    </button>
                                </td>
                                <td>
                                    <Button
                                        label="Delete"
                                        className="btn btn-danger waves-effect"
                                        onClick={() => props.onDeleteButtonClick(item.id)}
                                    />
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </React.Fragment>
);

export default PrivacyPolicyList;