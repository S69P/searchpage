import * as React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'

interface IProduct {
  product: any
}

export default class Product extends React.Component<IProduct, any> {
  public render() {
    return (
      <div className="product">
        <LazyLoadImage
          className="product-image"
          effect="blur"
          src={`https://dgn7v532p0g5j.cloudfront.net/unsafe/320x320${this.props.product.photoStill}`} />

        <div className="product-name">
          <h4>{this.props.product.title}</h4>
          <p className="product-description">{this.props.product.description} </p>
        </div>

        <p className="product-price"> R$<span style={{ textDecoration: "line-through" }}>{this.props.product.priceFrom}</span>&nbsp; por R${this.props.product.priceTo}</p>
      </div>
    );
  }
}
