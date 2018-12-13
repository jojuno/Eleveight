import * as React from 'react';
import { SearchBarResultsApi } from './searchBarResultsApi';
import { RouteComponentProps } from 'react-router';
import { Card } from '../common/card';
import { Tab, Tabs } from '../common/tabs';
import { Pagination } from '../common/layout/pagination';
import * as moment from 'moment';

export interface ISearchResultEntity {
    searchResultTitle: string,
    id: number,
    resultDescription: string,
    resultType: string,
    avatarUrl: string,
    resultUrl: string,
    pageCount: number
}


//state
export interface ISearchResultsPage {
    searchResults: ISearchResultEntity[],
    routeId: any,
    currentPage: number,
    maxPage: number,
    recordCount: number
}

class SearchResultsPage extends React.Component<any, ISearchResultsPage>{
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            routeId: props.match.params.query,
            currentPage: 1,
            maxPage: 0,
            recordCount: 0
        }
    }




    componentDidMount() {
        console.log("this is the route Id: " + this.state.routeId);
        this.onSearch(this.state.routeId);
        console.log("this is the max amount of pages: " + this.state.maxPage)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.query != this.props.match.params.query) {
            this.setState({ ...this.state, routeId: nextProps.match.params.query }, () => {
                this.onSearch(nextProps.match.params.query);
            })
        }
    }

    onSearch = (query) => {


        // outputs: "00:39:30"
        SearchBarResultsApi.getSearchBarResults(query, this.state.currentPage)

            .then(resp => {

                let maxPage = 0;
                if (resp.items.length > 0) maxPage = resp.items[0].pageCount;

                this.setState({
                    ...this.state,
                    recordCount: resp.items[0].recordCount,
                    searchResults: resp.items,
                    // pass to pagination page as total pages to hide pagination if there's no search results
                    maxPage: maxPage
                }, () => { console.log(this.state) });

            })
            .catch(err => console.log('Err..', err));
    }

    onNavClick = (pageNumber) => {
        this.setState({
            ...this.state,
            currentPage: pageNumber
        }, () => this.onSearch(this.props.match.params.query))
    }

    onPreviousClick = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage - 1
            //get latest search query by url
        }, () => this.onSearch(this.props.match.params.query))
    }

    onForwardClick = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + 1
        }, () => this.onSearch(this.props.match.params.query))
    }

    render() {

        let resultsDisplay;

        {

            this.state.searchResults.length === 0 ?
                resultsDisplay = <div>The search didn't return any results.</div>
                :
                resultsDisplay =
                <React.Fragment>
                    <div> {this.state.recordCount} results</div>
                    <ul className="list-group list-group-flush">
                        {this.state.searchResults.map((item, index) => {
                            return (
                                <li key={index} className="list-group-item py-4">
                                    {item.avatarUrl ?
                                        <img src={item.avatarUrl} alt={""} className="d-block ui-w-40 rounded-circle mb-2" />
                                        :
                                        //hide the broken img icon
                                        <img src={""} className="d-block ui-w-40 rounded-circle mb-2" />}
                                    <a href={item.resultUrl} className="text-big">{item.searchResultTitle}</a>
                                    <div className="mt-2">
                                        {item.resultDescription}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </React.Fragment>

        }

        return (
            <React.Fragment>
                <div className="layout-content">
                    <div className="container-fluid flex-grow-1 container-p-y">
                        <Card>

                            {resultsDisplay}
                        </Card>
                        <Pagination
                            currentPage={this.state.currentPage}
                            onNavClick={this.onNavClick}
                            onPreviousClick={this.onPreviousClick}
                            onForwardClick={this.onForwardClick}
                            totalPages={this.state.maxPage}
                        />
                    </div>
                </div>
            </React.Fragment>)
    }

}

export default SearchResultsPage;

