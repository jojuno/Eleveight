import * as React from "react";
import { Button, EditBtn, DeleteBtn } from '../../common/form/buttons';

const EducationLevelTypeList = props => {
    return (
        <div>
            <h3 className="font-weight-bold py-3 mb-4">Education Level List</h3>
            <table className="datatables-demo table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.getAllEducationLevelTypes.map((item, index) => (
                        <tr key={item.id}>
                            <td> {item.typeName} </td>
                            <td> {item.typeDescription} </td>
                            <td>
                                <EditBtn
                                    onClick={() => props.onEdit(item.id)}
                                />
                            </td>
                            <td>
                                <DeleteBtn
                                    disabled={!(item.canDelete)}
                                    onClick={() => props.onDelete(item.id)}
                                />
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EducationLevelTypeList;