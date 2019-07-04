import React, { Component } from 'react'

import { getGenres } from "../../services/fakeGenreService";

import Like from "../Layout/Like";
import Pagination from "../Layout/Pagination";
import ListGroup from "../Layout/ListGroups";


import { Consumer } from '../../Context';


class DisplayMovies extends Component {

    handleDelete = (_id, value) => {
        const { dispatch, movies } = value

        movies.forEach(movie => {
            if(movie._id === _id){
                const payload = {
                    ...movies,
                    movies: movies.filter( movie => movie._id !== _id)
                }

                dispatch({
                     type: 'DELETE_MOVIE',
                     payload
                })
            }

            return 
        });       
    }
    
    render() {
        return(
            <Consumer>
            {value => {
                const { movieSortArray, displayMovies } = value

                let genres = getGenres()
                genres = [{ _id: "allGenres", name: "All Genres"}, ...genres]

                if (movieSortArray.length === 0 ) return <p className= "lead mt-3">There are no movies in the database</p>

                return (
                    <React.Fragment>
                        <div className= "my-3 row">
                           <div className="col-2">
                               <ListGroup 
                               sortBy={genres} 
                               />
                           </div>
 
                           <div className="col">
                                <div className="lead">
                                    { movieSortArray.length === 1 ? <p>Showing {movieSortArray.length} movie in the database</p> : <p>Showing {movieSortArray.length} movies in the database</p> }  
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Genre</th>
                                            <th>Stock</th>
                                            <th>Rate</th>
                                            <th/>
                                            <th/>
                                        </tr>           
                                    </thead>

                                    <tbody>
                                    { displayMovies.map( movie => (
                                        <tr key = { movie._id }>
                                            <td>{ movie.title }</td>
                                            <td>{ movie.genre.name}</td>
                                            <td>{ movie.numberInStock }</td>
                                            <td>{ movie.dailyRentalRate }</td>
                                            <td><Like liked = { movie } /></td>
                                            <td><button className="btn btn-danger btn-sm" onClick = { () => this.handleDelete(movie._id, value)}>Delete</button></td>
                                        </tr>
                                    ))}  
                                    </tbody>         
                                </table>
                           </div>       
                        </div>
                        <Pagination 
                            items={movieSortArray.length}
                        />
                    </React.Fragment>
                )
                }}            
            </Consumer>
        )   
    }
        
} 

export default DisplayMovies
