import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Consumer } from "../../Context";

class Like extends Component {
    
    handleLike = (_id, value) => {
        const { dispatch, movies, comments } = value

        movies.forEach(movie => {
            if(movie._id === _id){
                const payload = {
                    ...movie,
                    like: !movie.like
                }

                dispatch({
                    type: "TOGGLE_LIKE",
                    payload
                })
            }

            return
        });

        comments.forEach(comment => {
            if(comment._id === _id){
                const payload = {
                    ...comment,
                    like: !comment.like
                }

                dispatch({
                    type: "TOGGLE_LIKE",
                    payload
                })
            }

            return
        });     
    }

    render() {
        const { _id, like } = this.props.liked

        return(
            <Consumer>
            {value => {

                return (
                    <div>
                        <FontAwesomeIcon 
                        style = {{ cursor: "pointer" }} 
                        onClick={ () => this.handleLike(_id, value) } 
                        icon={ like ? [ "fas", "heart"] : [ "far", "heart"] } />           
                    </div>
                 )
            }}           
            </Consumer>
        )


    }
}

Like.propTypes = {
    liked: PropTypes.object.isRequired
}

export default Like