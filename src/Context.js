import React, { Component } from 'react'
import { getMovies } from './services/fakeMovieService';

const Context = React.createContext()

const reducer = (state, action) => {
    switch(action.type) {
        case 'TOGGLE_LIKE':
            return {
                ...state,
                movies: state.movies.map( movie => 
                    movie._id === action.payload._id ? (movie = action.payload) : movie),
                displayMovies: state.displayMovies.map( movie => 
                movie._id === action.payload._id ? (movie = action.payload) : movie),
                movieSortArray: state.movies.map( movie => 
                    movie._id === action.payload._id ? (movie = action.payload) : movie),
                comments: state.comments.map( comment => 
                comment._id === action.payload._id ? (comment = action.payload) : comment)

            }

        case 'DELETE_MOVIE':
            return {
                movies: action.payload.movies,
                movieSortArray: action.payload.movies,
                displayMovies: action.payload.movies.filter( ( movie, index ) => ((( index >= 0 ) && ( index <= state.numberPerPage - 1 )) ? movie : null)),
                currentPage: 1
            }

        case 'PAGINATION':
            return {
                ...state,
                displayMovies: state.movieSortArray.filter( ( movie, index ) => ((( index >= action.payload.startIndex ) && ( index <= action.payload.endIndex )) ? movie : null)),
                currentPage : action.payload.currentPage
            }

        case 'LIST_GROUP_SORT':
            return {
                movieSortArray: action.payload.movieSortArray,
                displayMovies: action.payload.movieSortArray.filter( ( movie, index ) => ((( index >= 0 ) && ( index <= state.numberPerPage - 1 )) ? movie : null)),
                selectedGenre: action.payload.selectedGenre
            }

        default:
            return state
    }
}


export class Provider extends Component {
    state = {
        movies: [],
        displayMovies: [],
        comments: [
            {_id: 1, type: 'good', like: true},
            {_id: 2, type: 'good',like: true},
            {_id: 3, type: 'good',like: true},
            {_id: 4, type: 'good',like: true},
            {_id: 5, type: 'good',like: true}
        ],
        movieSortArray: [],
        numberPerPage: 4,
        currentPage : 1,
        selectedGenre: "All Genres",

        dispatch: action => this.setState( state => reducer (state, action))
    }

    componentDidMount () {
        const movies = getMovies()
        const movieSortArray = [...movies]
        const displayMovies = movieSortArray.filter( ( movie, index ) => ((( index >= 0 ) && ( index <= this.state.numberPerPage - 1 )) ? movie : null))
        this.setState({ movies, displayMovies, movieSortArray })
    }


    render() {
        return (
            <Context.Provider value= { this.state }>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
