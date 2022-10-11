import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetScoreboard } from '../redux/action';

class Ranking extends React.Component {
  state = {
    // storage: [],
  };

  handleHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScoreboard());
    history.push('/');
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

export default connect()(Ranking);
