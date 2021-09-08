import {FETCH_MOVIES, FETCH_SORT_MOVIES_ASC, FETCH_SORT_MOVIES_DESC, FETCH_SORT_MOVIES_BY_RATING, FETCH_SORT_MOVIES_BY_TOP_RATED} from '../../actionTypes'

const initialState = {
  movies: [],
  page: null
}

export default function movies(state = initialState, action) {
  const {type, payload} = action
  switch (type) {

    case FETCH_MOVIES:
      return {
        ...state,
        movies: state.movies.concat(payload.moviesArray),
        page: payload.page
      }
    case FETCH_SORT_MOVIES_BY_TOP_RATED:
      return{
        ...state,
        movies: state.movies.sort((a,b) => (b.vote_average-a.vote_average))
      }  
    case FETCH_SORT_MOVIES_ASC:
        return {
          ...state,
          movies: state.movies.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        }
    case FETCH_SORT_MOVIES_DESC:
        return {
          ...state,
          movies: state.movies.sort((a,b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0))
          }
    case FETCH_SORT_MOVIES_BY_RATING:
        return {
          ...state,
          movies: state.movies.sort((a,b) => (b.popularity-a.popularity))
          }

    default:
      return state
  }
}
