import React from 'react';
import ReactDOM from 'react-dom';
import searchData from "../data";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.items);
    this.state = {
      data: this.props.items,
      items: []
    }
  }

  searchData(e) {
    let queryData = [];
    if (e.target.value != '') {
      this.state.data.forEach(function (person) {

        if (person.toLowerCase().indexOf(e.target.value) != -1) {
          if (queryData.length < 10) {
            queryData.push(person);
          }
        }
      });
    }
    this.setState({list: queryData});
  }

  render() {
    return (
      <div>
        <SearchBar search={this.searchData.bind(this)}/>
        {(this.state.list) ? <SearchResult data={this.state.list}/> : null}
      </div>
    )
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input onChange={this.props.search} placeholder="Search Pokemon"/>
      </div>
    )
  }
}

class SearchResult extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.data.map(function (value) {
            return <Item key={value} val={value}/>
          })}
        </ul>
      </div>
    )

  }

}


class Item extends React.Component {
  render() {
    return (
      <li>
        {this.props.val}
      </li>
    )
  }

}


ReactDOM.render(
  <SearchForm items={searchData}/>,
  document.getElementById('rr-find-home')
);