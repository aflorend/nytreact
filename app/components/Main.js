// React Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

// require components
var Search = require('./children/Search');
var Results = require('./children/Results');
var Saved = require('./children/Saved');
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
      ],
      savedArticles: [],
      savedHeadline: '',
      savedUrl: ''
    }
  },

// On render, get saved articles
  componentDidMount: function () {
    helpers.getSaved().then(function(response) {
      this.setState({ savedArticles: response.data });
    }.bind(this));
  },

  // When the component is updated by a search being performed
  componentDidUpdate: function () {
    helpers.runQuery(this.state.searchTerm, this.state.searchStart, this.state.searchEnd).then(function(data) {
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

  setSaved: function(headline, url) {
    helpers.postSaved(headline, url).then(function(response) {
      this.setState({
        savedHeadline: headline,
        savedUrl: url
      });
    }.bind(this));
  },

  setDelete: function(id) {
    helpers.deleteSaved(id);
  },

  render: function() {
    return (
      <div className="container">

      	<div className="jumbotron" style={{backgroundColor: '#20315A', color: 'white'}}>
      		<h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
      	</div>
        <Search setSearch={this.setSearch} />
        <Results searchResults={this.state.results} setSaved={this.setSaved} />
        <Saved savedArticles={this.state.savedArticles} setDelete={this.setDelete} />
      </div>
    );
  }
})

module.exports = Main;
