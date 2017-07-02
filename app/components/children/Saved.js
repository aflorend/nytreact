const React = require('react');

var Saved = React.createClass({
  handleClick: function(id) {
    this.props.setDelete(id);
  },

  render: function() {
    return (
      <div className="panel panel-primary">

  				<div className="panel-heading">
  					<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
  				</div>

  				<div className="panel-body" id="wellSection">
          {this.props.savedArticles.map(function(article, i) {
            return (
              <div key={i} >
                <button
                style={{margin: '5px'}}
                onClick={()=>this.handleClick(article._id)}
                type="button"
                className="btn btn-xs btn-danger">
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
                <a key={article._id}
                href={article.url}
                target="_blank">
                  {article.headline}
                </a>
                <p style={{fontSize: '11px', color: 'grey'}}>Date saved: {article.date}</p>
              </div>
            );
          }, this)}
  				</div>
  			</div>
      );
  }
});

module.exports = Saved;
