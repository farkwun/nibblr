import React, { Component } from 'react'
import Stack from './Card'
import Cards, { Card } from 'react-swipe-card'
import Navbar from './Navbar'
import Selections from './Selections'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import store, { gettingPlacesData } from './store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selections: [],
      places: store.getState()
    }
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  componentDidMount () {
    const placesThunk = gettingPlacesData()
    store.dispatch(placesThunk)
  }

  handleSwipe (food, direction) {
    console.log(this.state)
    if (direction === 'right') {
      this.setState({selections: [...this.state.selections, food] })
      // this.setState({places: this.state.places.slice(1)})
    }
    // else {
    //   this.setState({places: this.state.places.slice(1)})
    // }
  }

  render() {
    console.log(this.state.selections)

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/selections" render = {() => <Selections selections={this.state.selections} />} />
            <Route path="/" render = {() => <Main handleSwipe={this.handleSwipe} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
