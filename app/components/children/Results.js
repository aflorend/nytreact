const React = require('react');

const helpers = require('../utils/helpers');

var Saved = require('./Saved');

var Results = React.createClass({
  getInitialState: function () {
    return {
      savedArticles: []
    }
  },

  setDelete: function(id) {
    helpers.deleteSaved(id).then(function(response) {
      console.log(response);
      helpers.getSaved().then(function(response) {
        this.setState({ savedArticles: response.data });
      }.bind(this));
    }.bind(this));
  },

  componentDidMount: function () {
    helpers.getSaved().then(function(response) {
      this.setState({ savedArticles: response.data });
    }.bind(this));
  },

  handleClick: function(i) {
    // Sends saved url and headline to parent with helper funciton
    var savedHeadline = this.props.results[i].headline.main;
    var savedUrl = this.props.results[i].web_url;

    // Save to DB
    helpers.postSaved(savedHeadline, savedUrl).then(function() {
      // Then get all saved articles to display
      helpers.getSaved().then(function(response) {
        console.log('getting saved')
        this.setState({ savedArticles: response.data });
      }.bind(this));
    }.bind(this));
    

  },

  render: function() {
    return (
      <div>
      <div className="row">
    		<div className="col-sm-12">
    		<br />
    			<div className="panel panel-primary">
    			  <div className="panel-heading">
    					<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Results</strong></h3>
            </div>
      		  <div className="panel-body" id="wellSection">
            {this.props.results.map(function (article, index) {
              return (
                <div key={index} >
            <button
            style={{margin: '5px'}}
            onClick={this.handleClick.bind(null, index)}
            type="button"
            className="btn btn-xs btn-warning">
              <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
            </button>
            <a key={article._id}
            href={article.web_url}
            target="_blank">
              {article.headline.main}
            </a>
          </div>
                )
            }, this)}
      		  </div>
          </div>
        </div>
    	</div>
        <Saved savedArticles={this.state.savedArticles} setDelete={this.setDelete} />
      </div>
    )
  }
});

module.exports = Results;