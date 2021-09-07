import {FETCH_MOVIES, FETCH_SORT_MOVIES_ASC, FETCH_SORT_MOVIES_DESC, FETCH_SORT_MOVIES_BY_RATING} from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

export function fetchTopRatedMovies() {
  return {
    type: FETCH_MOVIES,
    payload: topRatedMovies
  }
}

export function fetchAscSortMovies() {
  return {
    type: FETCH_SORT_MOVIES_ASC,
    payload: topRatedMovies
  }
}

export function fetchDescSortMovies() {
  return {
    type: FETCH_SORT_MOVIES_DESC,
    payload: topRatedMovies
  }
}

export function fetchSortMoviesByRating() {
  return {
    type: FETCH_SORT_MOVIES_BY_RATING,
    payload: topRatedMovies
  }
}

