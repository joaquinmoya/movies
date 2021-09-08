import {FETCH_MOVIES, FETCH_SORT_MOVIES_ASC, FETCH_SORT_MOVIES_DESC, FETCH_SORT_MOVIES_BY_RATING, FETCH_SORT_MOVIES_BY_TOP_RATED} from '../../actionTypes'
import axiosClient from '../../config/axios'



export function fetchTopRatedMovies(data) {
  return {
    type: FETCH_MOVIES,
    payload: data
  }
}
export function fetchSortMoviesByTopRated() {
  return {
    type: FETCH_SORT_MOVIES_BY_TOP_RATED
  }
}
export function fetchAscSortMovies() {
  return {
    type: FETCH_SORT_MOVIES_ASC
  }
}

export function fetchDescSortMovies() {
  return {
    type: FETCH_SORT_MOVIES_DESC
  }
}

export function fetchSortMoviesByRating() {
  return {
    type: FETCH_SORT_MOVIES_BY_RATING
  }
}

export function getMoviesAction(page){
  return async (dispatch) => {
      try {
        let moviesArray = []
        
          for(let i = page; i <= page + 2; i++){ 
            const res = await axiosClient.get(`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${i}`)
            moviesArray = moviesArray.concat(res.data.results)
          }     
          dispatch(fetchTopRatedMovies({moviesArray: moviesArray, page: page + 3}))
      } catch (error) {
          console.log(error.response)
      }
  }
}

