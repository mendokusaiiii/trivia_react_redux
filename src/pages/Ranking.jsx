import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetScoreboard as resetScoreboardAction } from '../redux/action';

class Ranking extends React.Component {
  state = {
    // storage: [],
  };

  handleHome = () => {
    const { history } = this.props;
    history.push('/');
    resetScoreboardAction(0);
  };

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHome }
        >
          Home
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  resetScoreboard: (reset) => dispatch(resetScoreboardAction(reset)),
});

export default connect(null, mapDispatchToProps)(Ranking);
