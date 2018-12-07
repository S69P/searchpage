import * as React from 'react';

export interface IPaginationProps {
  prev: any
  pagination: any
}



export default class Pagination extends React.Component<IPaginationProps, any> {
  public render() {
    return (
      <nav >
        <ul className="pagination">
          <li onClick={this.getAction} value="first" className="page-item">
            <a className={"page-link"} >
              <span >&laquo;</span>
            </a>
          </li>
          <li onClick={this.getAction} value="prev" className="page-item">
            <a className={"page-link"}>
              <span>&lt;</span>
            </a>
          </li>
          <li onClick={this.props.pagination} value="next" className="page-item" >
            <a className="page-link">
              <span>&gt;</span>
            </a>
          </li>
          <li onClick={this.props.pagination} value="last" className="page-item">
            <a className="page-link">
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
  private getAction:() => any = () =>{
    return (this.props.prev ? this.props.pagination : null)
  }
  private getClass:() => any = () =>{
    return this.props.prev ? "page-link" : "page-link disabled"
  }
}
