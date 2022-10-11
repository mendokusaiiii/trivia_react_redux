import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const QUESTIONS = 3;

class Feedback extends React.Component {

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <div>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <h3 data-testid="feedback-text">
          {
            assertions >= QUESTIONS ? 'Well Done!' : 'Could be better...'
          }
        </h3>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleRanking }
        >
          Ranking
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Play Again
          
        </button>
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
