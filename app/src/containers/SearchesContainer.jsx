import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { tokenSelector, userSearchesSelector } from '../selectors/userSelectors';
import Search from '../components/Search';

const propTypes = {
  token: T.string,
  searches: T.array,

  getUserSearches: T.func,
  routeToSearch: T.func,
};

class SearchesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSearches: [],
      pages: [],
      searchesPerPage: 3,
      currentPage: 1,
    };
    this.switchPage = this.switchPage.bind(this);
  }

  componentWillMount() {
    const { getUserSearches, token } = this.props;
    getUserSearches({ token });
  }

  componentWillReceiveProps(nextProps) {
    const { searchesPerPage, currentPage } = this.state;
    if (this.props.searches !== nextProps.searches) {
      for (let i = 0; i < 22; i++) {
        nextProps.searches.push(nextProps.searches[0])
      }
      const start = (currentPage - 1) * searchesPerPage;
      const numOfPages = Math.ceil(nextProps.searches.size / searchesPerPage);
      const pages = [];
      for (let i = 0; i < numOfPages; i++) {
        pages.push(i + 1);
      }
      this.setState({
        visibleSearches: nextProps.searches.slice(start, start + searchesPerPage),
        pages,
      });
    }
  }

  switchPage(page) {
    const { searchesPerPage } = this.state;
    const { searches } = this.props;
    const start = (page - 1) * searchesPerPage;
    this.setState({
      visibleSearches: searches.slice(start, start + searchesPerPage),
      currentPage: page,
    });
  }

  render() {
    const { visibleSearches, pages } = this.state;
    const { searches, routeToSearch } = this.props;
    return (
      <section className="searches">
        <div className="searches-info">
          <div className="searches-info-search">
            {visibleSearches.map(search => <Search key={search.get('id')} search={search} />)}
            <h2 className={`searches-info-get-started ${searches.size ? 'hidden' : ''}`}>
              No searches yet? <a onClick={routeToSearch}>Get started!</a>
            </h2>
          </div>
          <div className="searches-info-pages">
            {pages.map(page => <div key={page} onClick={() => this.switchPage(page)}>{page}</div>)}
          </div>
        </div>
        <img src="https://s3-us-west-1.amazonaws.com/dishassist/searches.jpg" />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    searches: userSearchesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserSearches: bindActionCreators(actions.getUserSearches, dispatch),
    routeToSearch: () => dispatch(push('/search')),
  };
}

SearchesContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SearchesContainer);
