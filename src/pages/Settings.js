import React from 'react';
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
    console.log(data);
    this.setState({ categories: data.trivia_categories });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
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
                  <option key={ id } value={ id }>{ name }</option>
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
            </select>
          </label>
        </section>
      </main>
    );
  }
}

export default Settings;
