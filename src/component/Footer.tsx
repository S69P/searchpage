import * as React from 'react';
import Pagination from './Pagination'
import Selector from './Selector'

export interface IFooterProps {
    prev: any
    productsPerPage: any,
    handleSelect: any
    pagination: any
}

export default function Footer(props: IFooterProps) {
    return (
        <div className="footer">
            <Selector productsPerPage={props.productsPerPage} handleSelect={props.handleSelect} />
            <Pagination prev={props.prev} pagination={props.pagination} />
        </div>

    );
}
