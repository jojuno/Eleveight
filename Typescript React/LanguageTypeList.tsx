import * as React from "react";
import { EditBtn, DeleteBtn } from '../../common/form/buttons';

const LanguageTypeList = props => {
    return (
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
                {props.getAllLanguageTypes.map((item, index) => (
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
    )
}

export default LanguageTypeList;