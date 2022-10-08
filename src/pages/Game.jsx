import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchAPIAnswer } from '../redux/action';

const INVALID_TOKEN_CODE = 3;
// const NUMBER_OF_QUESTIONS = 5;
const VALOR_INICIAL = -1;

class Game extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPIAnswer());
  }

  componentDidUpdate() {
    const { history, responseCode } = this.props;
    if (responseCode === INVALID_TOKEN_CODE) {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  render() {
    let index = VALOR_INICIAL;
    const { results } = this.props;
    const counter = 0;
    let alternatives = [];
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array randomizar um array
    if (results[counter]) {
      alternatives = [
        results[counter].correct_answer, ...results[counter].incorrect_answers,
      ];
      for (let i = alternatives.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
      }
    }

    return (
      <div>
        <Header />
        {
          results[counter] && (
            <div>
              <p data-testid="question-category">{results[counter].category}</p>
              <p data-testid="question-text">{results[counter].question}</p>
              <p>{results[counter].difficulty}</p>
              <div data-testid="answer-options">
                {results && (
                  alternatives.map((alternative) => {
                    if (alternative === results[counter].correct_answer) {
                      return (
                        <button
                          key={ alternative }
                          type="button"
                          data-testid="correct-answer"
                        >
                          {alternative}
                        </button>
                      );
                    }
                    index += 1;
                    return (
                      <button
                        key={ alternative }
                        type="button"
                        data-testid={ `wrong-answer-${index}` }
                      >
                        {alternative}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  responseCode: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  responseCode: state.questions.response_code,
  results: state.questions.results,
});

export default connect(mapStateToProps)(Game);
