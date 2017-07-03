const React = require('react');

var Results = React.createClass({
  componentWillReceiveProps: function() {

  },

  handleClick: function(i) {
    // Sends saved url and headline to parent with helper funciton
    var savedHeadline = this.props.results[i].headline.main;
    var savedUrl = this.props.results[i].web_url;

    this.props.setSaved(savedHeadline, savedUrl);
  },

  render: function() {
    return (
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
    )
  }
});

module.exports = Results;
