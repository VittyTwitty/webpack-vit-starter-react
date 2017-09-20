import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import searchData from '../data';


class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.searchInput = this.searchInput.bind(this);
  }

  searchInput(e) {
    let searchQuery = e.target.value.toLowerCase();

    let displayedData = this.props.items.filter(function (item) {
      let searchValue = item.toLowerCase();

      return searchValue.indexOf(searchQuery) !== -1;
    });

    if (searchQuery.length === 0) {
      this.setState({
        data: []
      });
    } else {
      this.setState({
        data: displayedData
      });
    }

  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.searchInput}
        />
        <ResultsList data={this.state.data}/>
      </div>
    )
  }
}

class ResultsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.data.map((item, i) =>
              <ResultsItem key={i} item={item}/>
            )}
        </ul>
      </div>
    )
  }
}

class ResultsItem extends Component {
  render() {
    return (
      <li>
        {this.props.item}
      </li>
    )
  }
}

ReactDOM.render(
  <SearchForm items={searchData}/>,
  document.getElementById('rr-find-home')
);
