import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postReview } from '../actions/index.jsx';
import { addReview } from '../actions/index.jsx';

class ReviewSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      submitted: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    var state = {};
    state[event.target.name] = event.target.value;
    this.setState(state)
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log('reviewing -----------', this.state, this.props.neighborhood);
    this.props.postReview(this.state, this.props.neighborhood, this.props.user.token, function() {
      this.setState({
        rating: '',
        submitted: true
      });
      console.log('whats the state?----------', this.state)
      this.props.loadReviewsFromServer();
    }.bind(this));

}

  render() {
    //list of review values and their descriptions
    var categories = [
      ['stars_overall', 'Overall', true],
      ['singles_friendly', 'Singles Friendly'],
      ['kid_friendly', 'Kid Friendly'],
      ['retirees', 'Retiree Friendly'],
      ['sense_of_community', 'Sense of Community'],
      ['nightlife', 'Nightlife'],
      ['entertainment', 'Entertainment'],
      ['affordability', 'Affordability'],
      ['ameneties', 'Ameneties'],
      ['safety', 'Safety'],
      ['culture_arts', 'Culture and Arts'],
      ['schools', 'School Quality'],
      ['crime', 'Crime'],
      ['hipster_rating', 'Hipster Rating']
    ];
    if (this.state.submitted) {
      return (<div className="neighborhood-header">Thanks for your feedback!</div>)
    }
    return (
      <div className="media-body post_reply_comments">
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="What do you think? "
            className="form-control"
            value={this.state.text}
            name='text'
            onChange={this.onInputChange}
            required
          />
          {categories.map((category) => {
            //map each category to jsx
            //can add "required" to the select tag if we want to validate the forms
            return (
              <label className="review-submit-category">
                {category[1]}
                <select name={category[0]} onChange={this.onInputChange} required={category[2] ? "true": false}>
                  <option value="" disabled selected>Stars</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            )
          })}
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary btn-lg">Submit Review</button>
          </span>
        </form>
      </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postReview }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.user,
    neighborhood: state.activeNeighborhood
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmit);