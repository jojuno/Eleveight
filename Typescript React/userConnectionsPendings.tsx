import * as React from 'react';
import { Button } from '../common/form';
import { Card } from '../common/card';
import { UserConnectionsPendingsApi } from './userConnectionsPendingsApi';
import { userProfileApi } from '../userprofile/userProfileApi';
import * as toastr from 'toastr';


export interface IPersonEntity {
    id: number,
    userBaseId: number,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    avatarUrl: string,
    bgImageUrl: string,
    bio: string,
    createDate: Date,
    modifiedDate: Date
}

export interface IUserPendingsPage {
    connectionsList: IPersonEntity[],
    pendingsList: IPersonEntity[]
}

const divCenter = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50 %'
}

//closing tag with slash 
//remove bottom space on table with className="mb-0"
class UserPendings extends React.Component<{}, IUserPendingsPage> {
    constructor(props) {
        super(props);
        this.state = {
            connectionsList: [],
            pendingsList: []
        }
    }

    onGetConnections = () => {
        UserConnectionsPendingsApi.getAllConnections()
            .then(resp => {
                console.log(resp)
                this.setState({
                    connectionsList: resp.items
                })
            })
            .catch(err => console.log('Err..', err));
    }

    onGetPendings = () => {
        UserConnectionsPendingsApi.getAllPendings()
            .then(resp => {
                console.log(resp)
                this.setState({
                    pendingsList: resp.items
                })
            })
            .catch(err => console.log('Err..', err));
    }

    componentDidMount() {
        this.onGetConnections();
        this.onGetPendings();
    }

    //if you're using data, put it in backticks
    //map needs key in top parent element
    //div style={divCenter} with custom function
    render() {
        return (
            <React.Fragment>
                <div className="card mb-4">
                    <div className="card-header with-elements">
                        <span className="card-header-title">Pending &nbsp;
      <small className="text-muted">{this.state.pendingsList.length}</small>
                        </span>
                        <div className="card-header-elements ml-md-auto">
                            <a href="#" className="btn btn-default md-btn-flat btn-xs">Show All</a>
                        </div>
                    </div>
                    <div className="row no-gutters row-bordered row-border-light">
                        {this.state.pendingsList.map((item, index) => (
                            <a key={item.id} href={`/user/social/profile/${item.id}`} className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-dark py-3 px-2">

                                <img src={item.avatarUrl} style={divCenter} className="d-block ui-w-40 rounded-circle mb-2" />
                                <div className="text-center small">{item.firstName} {item.lastName}</div>
                            </a>
                        ))
                        }

                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header with-elements">
                        <span className="card-header-title">Connections &nbsp;
      <small className="text-muted">{this.state.connectionsList.length}</small>
                        </span>
                        <div className="card-header-elements ml-md-auto">
                            <a href="#" className="btn btn-default md-btn-flat btn-xs">Show All</a>
                        </div>
                    </div>
                    <div className="row no-gutters row-bordered row-border-light">
                        {this.state.connectionsList.map((item, index) => (
                            <a key={item.id} href={`/user/social/profile/${item.id}`} className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-dark py-3 px-2">

                                <img src={item.avatarUrl} className="d-block ui-w-40 rounded-circle mb-2" />
                                <div className="text-center small">{item.firstName} {item.lastName}</div>
                            </a>
                        ))
                        }

                    </div>
                </div>
            </React.Fragment >
        );
    }
}


export default UserPendings;