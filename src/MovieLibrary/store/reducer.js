import {FETCH_MOVIES, FETCH_SORT_MOVIES_ASC, FETCH_SORT_MOVIES_DESC, FETCH_SORT_MOVIES_BY_RATING} from '../../actionTypes'

const initialState = {
  movies: []
}

export default function movies(state = initialState, action) {
  const {type, payload} = action
  switch (type) {

    case FETCH_MOVIES:
      return {
        ...state,
        movies: payload.sort((a,b) => (b.vote_average-a.vote_average))
      }
    case FETCH_SORT_MOVIES_ASC:
        return {
          ...state,
          movies: payload.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        }
    case FETCH_SORT_MOVIES_DESC:
        return {
          ...state,
          movies: payload.sort((a,b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0))
          }
    case FETCH_SORT_MOVIES_BY_RATING:
        return {
          ...state,
          movies: payload.sort((a,b) => (b.popularity-a.popularity))
          }

    default:
      return state
  }
}
