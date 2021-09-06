import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchTopRatedMovies} from '../store/actions'


import logo from './logo.svg'
import './MovieLibrary.css'
import {getMovies} from '../store/selectors'
import MoviesList from './MoviesList'

class MovieLibrary extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  componentDidMount() {
    const {fetchTopRatedMovies} = this.props
    fetchTopRatedMovies()
  }

  render() {
    const {movies} = this.props
    return (
      <div className="MovieLibrary">
        <header className="ML-header">
          <h1 className="ML-title">React Movies</h1>
          <img src={logo} className="ML-logo" alt="Logo" />
        </header>
        <div className="ML-intro">
          { movies.length && <MoviesList movies={movies}/> }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  movies: getMovies(state)
}), {fetchTopRatedMovies})(MovieLibrary)
