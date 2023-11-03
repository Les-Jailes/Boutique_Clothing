import React from "react"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import '@/css/Products/Pagination.css'

export const Pagination = ( { currentlyPagination, changePaginationRight, changePaginationLeft, leftIsDisable, rightIsDisable } ) => {
    return (
        <div className="pagination-container">
            <div className="pagination-object">
            <button
                    className={ ` pagination-button ${ leftIsDisable ? 'disable' : '' } left-button ` }
                    onClick={ changePaginationLeft }
                >
                    <AiOutlineLeft color="#fff" size={ 24 } />
                </button>
                <p className="currently-pagination">
                    {
                        currentlyPagination + 1
                    }
                </p>
                <button
                    className={ ` pagination-button ${ rightIsDisable ? 'disable' : '' } right-button ` }
                    onClick={ changePaginationRight }
                >
                    <AiOutlineRight color="#fff" size={ 24 } />
                </button>
            </div>
        </div>
    )
}
