import * as React from 'react'
import Product from './Product'
import ProductsFound from './ProductsFound'

interface IProducts {
  products: object[]

}
interface IProductsProps {

  numberOfProducts: number
  products: object[]
  productsPerPage: number
}

export default class ProductsList extends React.Component<IProductsProps, any> {
  public render() {
    return (
      <div className="products-list">
        <ProductsFound numberOfProducts={this.props.numberOfProducts} />
        {this.props.products.slice(0, this.props.productsPerPage).map((product: IProducts, index) => {
          return <Product key={index} product={product} />
        }
        )}
      </div>
    );
  }
}
