// React Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

// require components
var Search = require('./children/Search');
var Saved = require('./children/Saved');
var helpers = require('./utils/helpers');

var Main = React.createClass({
  getInitialState: function() {
    return {
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
    // helpers.getSaved().then(function(response) {
    //   this.setState({ savedArticles: response.data });
    // }.bind(this));
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
        <Search setSaved={this.setSaved} />
        <Saved savedArticles={this.state.savedArticles} setDelete={this.setDelete} />
      </div>
    );
  }
})

module.exports = Main;
