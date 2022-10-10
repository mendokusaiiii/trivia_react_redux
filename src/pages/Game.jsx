import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchAPIAnswer } from '../redux/action';

const INVALID_TOKEN_CODE = 3;
// const NUMBER_OF_QUESTIONS = 5;

class Game extends Component {
  state = {
    category: '',
    question: '',
    alternatives: [],
    counter: 0,
    difficulty: '',
    correctAnswer: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPIAnswer())
      .then(() => { this.handleQuestion(); });
  }

  componentDidUpdate() {
    const { history, responseCode } = this.props;
    if (responseCode === INVALID_TOKEN_CODE) {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  handleQuestion = () => {
    const { results } = this.props;
    const { counter } = this.state;
    if (results[counter]) {
      const alternatives = [
        results[counter].correct_answer,
        ...results[counter].incorrect_answers,
      ];
      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array randomizar um array
      for (let i = alternatives.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
      }

      this.setState({
        category: results[counter].category,
        question: results[counter].question,
        difficulty: results[counter].difficulty,
        correctAnswer: results[counter].correct_answer,
        alternatives,
      });
    }
  };

  render() {
    const {
      category,
      question,
      alternatives,
      correctAnswer,
      difficulty } = this.state;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          <p>{difficulty}</p>
          <div data-testid="answer-options">
            {
              alternatives.map((alternative, index) => {
                if (alternative === correctAnswer) {
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
            }
          </div>
        </div>
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
