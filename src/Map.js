import React, { Component } from 'react'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    fetch(`/places/map/${this.props.placeId}`)
      .then(res => res.json())
      .then(url => this.setState({ url }))
  }

  render() {
    return (
      <iframe className="mappad"
        width="450"
        height="250"
        frameBorder="0" style={{ border: '0p' }}
        src={this.state.url} >
      </iframe>
    )
  }
}
