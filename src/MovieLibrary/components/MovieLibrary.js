import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getMoviesAction} from '../store/actions'


import logo from './logo.svg'
import './MovieLibrary.css'
import {getMovies, getPage} from '../store/selectors'
import MoviesList from './MoviesList'

class MovieLibrary extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  componentDidMount() {
    const {getMoviesAction} = this.props
    getMoviesAction(1)
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
  movies: getMovies(state),
  page: getPage(state)
}), {getMoviesAction})(MovieLibrary)
