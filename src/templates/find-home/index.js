import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import searchData from '../data';
import Highlighter from 'react-highlight-words';
import './Higlight.scss';
import load from '../load';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.searchInput = this.searchInput.bind(this);
  }

  loadData() {
    load(this.props.data).then(users => {
      this.setState({
        data: JSON.parse(users)
      });
    });
  }

  searchInput(e) {
    let searchQuery = e.target.value.toLowerCase();
    let displayedData = this.props.items.filter((item) => {
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
    let dt = this.state.data;
    return (
      <div>
        <input
          type="text"
          onChange={this.searchInput}
          ref={(input) => {
            this.searchInputReference = input
          }}
        />
        <ResultsList a={this.searchInputReference} data={dt}/>
      </div>
    )
  }
}

class ResultsList extends Component {
  render() {
    let arrayResults = this.props.data;
    let input = this.props.a;
    return (
      <div>
        <ul>
          {
            arrayResults.map((item, i) =>
              <ResultsItem key={i} item={item} in={input}/>
            )}
        </ul>
      </div>
    )
  }
}

class ResultsItem extends Component {
  render() {
    let selfItem = this.props.item;
    let input = this.props.in;
    return (
      <li>
        <Highlighter
          highlightClassName={'Highlight'}
          searchWords={[`${input.value}`]}
          textToHighlight={selfItem}
        />
      </li>
    )
  }
}

ReactDOM.render(
  <SearchForm items='data.json'/>,
  document.getElementById('rr-find-home')
);
