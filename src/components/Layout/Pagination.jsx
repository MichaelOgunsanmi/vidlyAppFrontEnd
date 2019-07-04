import React, { Component } from 'react'
import PropTypes from "prop-types";

import _ from "lodash";

import {Consumer} from "../../Context";

 class Pagination extends Component {

    handlePages = (page, value) => {
        const { dispatch, movies, numberPerPage } = value

        let { currentPage } = value

        const startIndex = ( ( page - 1 ) * numberPerPage) 

        let endIndex = (page * numberPerPage) - 1

        if( movies.length - 1 <= endIndex) endIndex = movies.length - 1
        
        currentPage = page
       
        const payload = {
            startIndex,
            endIndex,
            currentPage
        } 

        dispatch({
           type: 'PAGINATION',
           payload 
        })
    }


    render() {

    
        return (          
            <Consumer>
                { value => {
                    const { items } = this.props

                    const { numberPerPage, currentPage } = value

                    let Pages = Math.ceil(items / numberPerPage)

                    if(Pages === 1) return null

                    Pages = _.range(1, Pages + 1)

                    return(
                        <nav>
                            <ul className="pagination justify-content-center">
                                {Pages.map( page => (
                                    <li 
                                    className={ page === currentPage ? 
                                        "page-item active" : "page-item" } 
                                    key = {page}>
                                        <button className="page-link" onClick= {() => this.handlePages(page, value)}>{page}</button>
                                    </li>
                                ))}     
                            </ul>
                        </nav>
                    )
                }}
            
            </Consumer>
                    )
    }
}

Pagination.propTypes = {
    items: PropTypes.number.isRequired
}

export default Pagination

 