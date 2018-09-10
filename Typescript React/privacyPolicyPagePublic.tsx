import * as React from 'react';
import { IPrivacyPolicyEntity } from './privacyPolicyForm';
import { PrivacyPolicyApi } from './privacyPolicyApi';
import { Card } from '../common/card';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export interface IPrivacyPolicyPagePublic {
    privacyPolicyList: IPrivacyPolicyEntity[]
}

const divStyle = {
    minHeight: '478'
}

class PrivacyPolicyPagePublic extends React.Component<{}, IPrivacyPolicyPagePublic> {
    constructor(props) {
        super(props);
        this.state = {
            privacyPolicyList: []
        }
    }
    componentDidMount() {
        this.onGetPrivacyPolicies();
    }

    //refactor code
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

    render() {
        return (
            <React.Fragment>
                <h2 className="card-header">Eleveight Privacy Statement</h2>
                <Card>
                    <div>
                        <p>
                            Your privacy is important to us. This privacy statement explains the personal data Microsoft processes, how Microsoft processes it, and for what purposes.
                        </p>
                        <p>
                            Eleveight offers server products used to help operate enterprises worldwide, devices you use in your home, software students use at school, and services developers use to create and host what’s next. References to Eleveight products in this statement include Microsoft services, websites, apps, software, servers, and devices.</p>
                        <p>
                            Please read the product-specific details in this privacy statement, which provide additional relevant information. This statement applies to Eleveight’s interactions with you and the Eleveight products listed below, as well as other Eleveight products that display this statement.</p>
                    </div>
                </Card>
                <br></br>
                <div className="row">
                    <div className="col-3">
                        <Card>
                            <div id="menu_cookie_div">
                                <div className="div_side_comp">
                                    {this.state.privacyPolicyList.map((item, index) => (
                                        <div key={item.id}>
                                            <div className="row col">
                                                <div className="c-list">
                                                    <a href={`#${item.id}`} className="c-hyperlink">{item.heading}</a>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                    )
                                    }
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-9">
                        <Card>
                            {this.state.privacyPolicyList.map((item, index) => (
                                <div className="div_heading_OnePSTemplete header-small" key={item.id}>
                                    <div key={item.id}>
                                        <h4>{item.heading}</h4>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <p>
                                            {item.body}
                                        </p>
                                    </div>
                                    <br></br>
                                </div>
                            )
                            )
                            }
                        </Card>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
export default PrivacyPolicyPagePublic;