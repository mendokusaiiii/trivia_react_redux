import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getAPIToken from '../helpers/getAPIToken';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isBtnDisabled: true,
  };

  verify = () => {
    const { name, email } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (name && re.test(email)) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verify);
  };

  submitForm = (event) => {
    event.preventDefault();
    console.log('teste');
  };

  handleBtn = async () => {
    const { history } = this.props;
    await getAPIToken();
    history.push('/game');
  };

  render() {
    const { email, name, isBtnDisabled } = this.state;
    return (
      <form onSubmit={ this.submitForm }>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          id="name"
          value={ name }
          onChange={ this.handleChanges }
          placeholder="nome"
        />
        <input
          type="text"
          name="email"
          data-testid="input-gravatar-email"
          id="email"
          value={ email }
          onChange={ this.handleChanges }
          placeholder="email"
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ isBtnDisabled }
          onClick={ this.handleBtn }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
