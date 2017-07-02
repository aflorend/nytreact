// React
const React = require('react');

// Helper functions
var helpers = require('../utils/helpers.js');

// Search class
var Search = React.createClass({
  // Set generic state
  getInitialState: function() {
    return {
      term: '',
      start: '',
      end: ''
   };
 },

 // Function to handle user input on multiple forms
 handleTermChange: function(event) {
   this.setState({ term: event.target.value })
 },

 handleStartChange: function(event) {
   this.setState({ start: event.target.value })
 },

 handleEndChange: function(event) {
   this.setState({ end: event.target.value })
 },

 handleSubmit: function(event) {
   event.preventDefault();
   this.props.setSearch(this.state.term, this.state.start, this.state.end)
   this.setState( {
     term: '',
     start: '',
     end: ''
   })
 },

 render: function() {
   return (
     <div>
       <div className="row">
   		  <div className="col-sm-12">

   	    <br />

   			<div className="panel panel-primary">
   				<div className="panel-heading">
   					<h3 className="panel-title"><strong><i className="fa fa-list-alt"></i>  Search Parameters</strong></h3>
   				</div>

   				<div className="panel-body">

   					<form onSubmit={this.handleSubmit}>
   					  <div className="form-group">
   					    <h4>Search Term:</h4>
   					    <input
                value={this.state.term}
                type="text"
                className="form-control"
                id="term"
                onChange={this.handleTermChange}
                required
                />
   					  </div>

   					  <div className="form-group">
   					    <h4>Start Year:</h4>
   					    <input type="text"
                value={this.state.start}
                className="form-control"
                id="start"
                onChange={this.handleStartChange}
                required
                pattern="^\d{4}$"
                title="Year in four digits"
                />
   					  </div>

   					  <div className="form-group">
   					    <h4>End Year:</h4>
   					    <input type="text"
                value={this.state.end}
                className="form-control"
                id="end"
                onChange={this.handleEndChange}
                required
                pattern="^\d{4}$"
                title="Year in four digits"
                />
   					  </div>

   					  <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i>  Search</button>
   					</form>

   				  </div>
          </div>
        </div>
      </div>
      </div>

  );
 }

});

module.exports = Search;
