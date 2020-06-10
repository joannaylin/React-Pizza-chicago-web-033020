import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pizzas: [],
      edit: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then((resp) => resp.json())
      .then((pizzas) => this.setState({ pizzas: pizzas }));
  }

  toggleForm = (props) => {
    this.setState({ edit: props.pizza });
  };

  handleChange = (event) => {
    let value = event.target.value
    let name =event.target.name
    if (name === "vegetarian") {
      value === "Vegetarian" ? (value=true) : (value=false)
    }
    this.setState({
      edit: {...this.state.edit, [name]: value}
    })
  };

  handleSubmit = (event) => {
    const updatedPizza = this.state.edit

    const formObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPizza)
    }

    fetch(`http://localhost:3000/pizzas/${updatedPizza.id}`, formObj)
    .then(resp=> resp.json())
    .then(json => {
      const updatedPizzaList = this.state.pizzas.map(pizza=> pizza.id === json.id ? json : pizza)
      this.setState({
        pizzas: updatedPizzaList,
        edit: {}
      })
    })

  }

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm pizza={this.state.edit} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <PizzaList pizzas={this.state.pizzas} toggleForm={this.toggleForm} />
      </Fragment>
    );
  }
}

export default App;
