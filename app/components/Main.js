// React Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

// require components
var Search = require('./children/Search');
var Results = require('./children/Results')
var helpers = require('./utils/helpers');

var Main = React.createClass({
  getInitialState: function() {
    return {
      searchTerm: '',
      searchStart: '',
      searchEnd: '',
      results: [
        {
          headline: { main: '' },
          web_url: ''
        }
      ]
    }
  },

  // When the component is updated by a search being performed
  componentDidUpdate: function () {
    helpers.runQuery(this.state.searchTerm, this.state.searchStart, this.state.searchEnd,).then(function(data) {
      // Ensures unique data
      if (JSON.stringify(data) !== JSON.stringify(this.state.results)) {
        this.setState( { results: data });
      }
    }.bind(this));
  },

  // Parent Main component can receive search terms from child Search
  setSearch: function(term, start, end) {
    this.setState({
      searchTerm: term,
      searchStart: start,
      searchEnd: end
    });
  },

  render: function() {
    return (
      <div className="container">

      	<div className="jumbotron" style={{backgroundColor: '#20315A', color: 'white'}}>
      		<h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
      	</div>
        <Search setSearch={this.setSearch} />
        <Results searchResults={this.state.results} />
      </div>
    );
  }
})

module.exports = Main;
