import * as React from 'react'

interface IProduct {
  product: any
}

export default class Product extends React.Component<IProduct, any> {
  public render() {
    return (
      <div className="product">
        <img className="product-image" src={`https://dgn7v532p0g5j.cloudfront.net/unsafe/320x320${this.props.product.photoStill}`} />
        <div className="product-name">
          <h4>{this.props.product.title}</h4>
          <p className="product-description">{this.props.product.description} </p>
        </div>

        <p className="product-price"> R$<span style={{ textDecoration: "line-through" }}>{this.props.product.priceFrom}</span>&nbsp; por R${this.props.product.priceTo}</p>
      </div>
    );
  }
}
