import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Highlighter from 'react-highlight-words';
import './main.scss';
import axios from 'axios';

let dataPeoples = require('./data.json');

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCategories: ['1', '2', '3'],
      names: [],
      searchTerm: 'results'
    };
    this.searchInput = this.searchInput.bind(this);
  }
  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=${this.state.searchTerm}`)
      .then(res => {
        let names = [];
        res.data.results.map((element) => {
          names.push(element.name.first);
        });
        console.log(names)

        this.setState({
          names: names
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentWillUpdate() {
    this.searchTerm = this.searchInputReference.value
    console.log('this.searchTerm = this.searchInputReference.value', this.searchTerm)
  }

  searchInput(e) {
    console.log('this.state.names', this.state.names);
    console.log('this.props.items', this.props.items);

    let searchQuery = e.target.value.toLowerCase();
    let displayedData = this.props.items.filter((item) => {
      let searchValue = item.name.toLowerCase();
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
    let dataCategories = this.state.dataCategories;
    return (
      <div>
        <input id='tab1' type='radio' name='rad-search' defaultChecked='true'/>
        <label htmlFor='tab1' className='v-slider-wrapper_search-button1'>Find home</label>
        <input id='tab2' type='radio' name='rad-search'/>
        <label htmlFor='tab2' className='v-slider-wrapper_search-button2'>Sell my home</label>
        <div id='search-1'>
          <input
            id='search-1-input'
            type='text'
            placeholder='Find home'
            onChange={this.searchInput}
            ref={(input) => {
              this.searchInputReference = input
            }}
          />
          <button>
            <img src='../../assets/img/search-home/search-icon.svg' alt=""/>
          </button>
        </div>
        <div id='search-2'>
          <input id='search-2-input' type='text' placeholder='Find home'/>
          <button>
            <img src='../../assets/img/search-home/search-icon.svg' alt=""/>
          </button>
        </div>
        <ResultsList
          a={this.searchInputReference}
          data={dt}
          dataCategories={dataCategories}
        />
      </div>
    )
  }
}

class ResultsList extends Component {
  render() {
    let arrayResults = this.props.data;
    let input = this.props.a;
    let dataCategories = this.props.dataCategories;

    return (
      <div className='list-search-wrapper'>
        {arrayResults.length !== 0 ? <div>
          {
            dataCategories.map((elem, index) =>
              <ul key={index} className='list-search-items'>
                <li>{elem}</li>
                {
                  arrayResults.map((item, i) =>
                    <ResultsItem key={i} item={item} in={input}/>
                  )
                }
              </ul>
            )
          }
        </div> : ''
        }
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
        <a href="/">
          <Highlighter
            highlightClassName={'Highlight'}
            searchWords={[`${input.value}`]}
            textToHighlight={selfItem.name}
          />
        </a>
      </li>
    )
  }
}

ReactDOM.render(
  <SearchForm items={dataPeoples}/>,
  document.getElementById('v-slider-wrapper_search-body')
);
