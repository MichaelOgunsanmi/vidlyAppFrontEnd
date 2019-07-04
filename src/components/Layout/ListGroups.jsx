import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Consumer } from "../../Context";

class ListGroup extends Component {

    handleSortByList = (sortParamName, value) => {
        const {dispatch, movies } = value

        let { selectedGenre } = value

        selectedGenre = sortParamName

        if(sortParamName === 'All Genres'){           
            const payload = {
                ...movies,
                movieSortArray: movies,
                selectedGenre   
            }
            
            dispatch({
                type: "LIST_GROUP_SORT",
                payload
            })

            return
        }


        const payload = {
            ...movies,
            movieSortArray: movies.filter( movie => 
                movie.genre.name === sortParamName ),
            selectedGenre
        }

        dispatch({
                type: "LIST_GROUP_SORT",
                payload
            })
    }


    render() {
        return(
            <Consumer>
                {value => {
                        const { sortBy, textProperty, valueProperty }  = this.props

                        const { selectedGenre } = value
                    return (
                        <ul className="list-group">
                            {sortBy.map( sortParam =>
                                <li 
                                key = {sortParam[valueProperty]}
                                className= { sortParam[textProperty] === selectedGenre ? "list-group-item active" : "list-group-item"}
                                onClick = { () => this.handleSortByList(sortParam[textProperty], value)}
                                >
                                {sortParam[textProperty]}
                                </li> 
                            )}
                        </ul>
                    )
                }}
            
            </Consumer>
        )

    }
}

ListGroup.defaultProps = {
    textProperty : "name",
    valueProperty: "_id"
}

export default ListGroup

