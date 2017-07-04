// React Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

// require components
var Search = require('./children/Search');
var Saved = require('./children/Saved');
var helpers = require('./utils/helpers');

var Main = React.createClass({
  render: function() {
    return (
      <div className="container">

      	<div className="jumbotron" style={{backgroundColor: '#20315A', color: 'white'}}>
      		<h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
      	</div>
        <Search />
      </div>
    );
  }
})

module.exports = Main;
