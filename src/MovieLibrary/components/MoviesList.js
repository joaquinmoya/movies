import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { X } from 'react-feather'
import {getMoviesAction, fetchAscSortMovies, fetchDescSortMovies, fetchSortMoviesByRating, fetchSortMoviesByTopRated} from '../store/actions'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import {connect} from 'react-redux'
import {getMovies, getPage} from '../store/selectors'
import InfiniteScroll from 'react-infinite-scroll-component'


class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired
  }

  state = {
    selectedMovie: null,
    sortingType: null
  }

 
  handleSelectMovie = item => this.setState({selectedMovie: item})

  handleSortingChange = sortingType => { 
    this.setState({sortingType: sortingType})
    if(sortingType === 'name_asc') {
      const {fetchAscSortMovies} = this.props
      fetchAscSortMovies()
    }
    if(sortingType === 'name_desc'){
      const {fetchDescSortMovies} = this.props
      fetchDescSortMovies()
    }
    if(sortingType === 'rating'){
      const {fetchSortMoviesByRating} = this.props
      fetchSortMoviesByRating()
    }
    if(sortingType === ''){
      const {fetchSortMoviesByTopRated} = this.props
      fetchSortMoviesByTopRated()
    }
   
  }

  render() {
    const {page, movies, getMoviesAction} = this.props
    const {selectedMovie} = this.state
    return (
      <div className="movies-list">
        <div  >
          <div className="sort-section">
            <span>Sort by</span>
            <SortingOptions onChange={this.handleSortingChange}/>
          </div>
          <InfiniteScroll
          className="items"
          dataLength={movies.length}
          next={()=> setTimeout(()=>{getMoviesAction(page)},1500)}
          hasMore={true}
          loader={<div className='spinner'></div>}>
          {
            
            movies.map(movie =>
              <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={this.handleSelectMovie}/>
            )
          }
          </InfiniteScroll>
        </div>
        {
          selectedMovie && (
            <ExpandedMovieItem movie={selectedMovie} handleSelectMovie={this.handleSelectMovie} />
          )
        }
      </div>
    )
  }
}

const ExpandedMovieItem = ({movie: {title, poster_path, overview, vote_average, vote_count}, handleSelectMovie}) => {

  
  return (
  <div className="expanded-movie-item">
    <div className="description">
      <div className="description-image">
        <TMDBImage src={poster_path} className="poster" />
      </div>
      <div className="description-text">
        <X className='exit-icon' onClick={() => handleSelectMovie(null)}/>
        <h2 className="description-text-title">{title} </h2>
      <div className="description-text-rank-title"><h4><span className="description-text-rank">Rank </span>(votes count)</h4>: <span className="description-text-rank-number">{vote_average}</span> <span>({vote_count})</span></div>
      <h3 className="description-overview">Overview:</h3>
      <span className="description-text-about">{overview}</span>
      </div>
    </div>
  </div>)
}

class MovieListItem extends Component {


  handleClick = () => {
    const {movie, onSelect} = this.props
    onSelect(movie)
  }

  render() {
   
    const {movie: {vote_average, poster_path}, isSelected} = this.props
    return (
      <div className={classNames('movie-list-item', {'selected': isSelected})} onScroll={this.handleScroll} onClick={this.handleClick}><TMDBImage src={poster_path} className="poster" /><span className='vote_average'>{vote_average}</span></div>
    )
  }
}

class SortingOptions extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    const selectedValue = e.target.value
    const {onChange} = this.props
    this.setState({value: selectedValue})
    onChange(selectedValue)
  }

  render() {

    return (
      <select className='sort-select' value={this.state.value} onChange={this.handleChange}>
        <option className='option' value=""></option>
        <option className='option' value="name_asc">A -&gt; Z</option>
        <option className='option' value="name_desc">Z -&gt; A</option>
        <option className='option' value="rating">Rating</option>
      </select>
    )
  }
}
const mapDispatchToProps = {
  getMoviesAction,
  fetchAscSortMovies,
  fetchDescSortMovies,
  fetchSortMoviesByRating,
  fetchSortMoviesByTopRated
}

export default connect(state => ({
  movies: getMovies(state),
  page: getPage(state)
}), mapDispatchToProps)(MoviesList)
