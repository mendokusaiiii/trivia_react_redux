import React from 'react';
import { connect } from 'react-redux';

const QUESTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <div>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <div>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <h3 data-testid="feedback-text">
          {
            QUESTIONS <= assertions ? 'Well Done!' : 'Could be better...'
          }
        </h3>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
