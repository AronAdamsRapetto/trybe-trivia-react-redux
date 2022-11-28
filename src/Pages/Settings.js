import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUrl } from '../redux/actions';
import './styleSheet/Settings.css';

class Settings extends React.Component {
  state = {
    categories: [],
    category: '',
    difficulty: '',
    type: '',
  }

  async componentDidMount() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    this.setState({ categories: data.trivia_categories });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { category, difficulty, type } = this.state;
    const { changeUrl, history } = this.props;

    changeUrl({ category, difficulty, type });
    history.push('/trybe-trivia-react-redux');
  }

  render() {
    const { categories, category, difficulty, type } = this.state;
    return (
      <main>
        <section className="settings-container">
          <h1 className="title" data-testid="settings-title">Configurações</h1>
          <label htmlFor="select-category">
            Categorias:
            <select
              name="category"
              onChange={ this.handleChange }
              value={ category }
              id="select-category"
            >
              <option value="">All</option>
              {
                categories.map(({ id, name }) => (
                  <option key={ id } value={ `&category=${id}` }>{ name }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="select-difficulty">
            Dificuldade:
            <select
              name="difficulty"
              onChange={ this.handleChange }
              value={ difficulty }
              id="select-difficulty"
            >
              <option value="">All</option>
              <option value="&difficulty=easy">Fácil</option>
              <option value="&difficulty=medium">Médio</option>
              <option value="&difficulty=hard">Dificil</option>
            </select>
          </label>
          <label htmlFor="select-type">
            Tipos de questão:
            <select
              name="type"
              onChange={ this.handleChange }
              value={ type }
              id="select-type"
            >
              <option value="">All</option>
              <option value="&type=multiple">Múltipla escolha</option>
              <option value="&type=boolean">Verdadeiro ou Falso</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Salvar</button>
        </section>
      </main>
    );
  }
}

Settings.propTypes = {
  changeUrl: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (state) => dispatch(updateUrl(state)),
});

export default connect(null, mapDispatchToProps)(Settings);
