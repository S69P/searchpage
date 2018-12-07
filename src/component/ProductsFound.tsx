import * as React from 'react'

interface IProductsFoundProps {
  numberOfProducts: number
}

export default function ProductsFound(props: IProductsFoundProps) {
  return (
    <div className="productsFound">
      <p className="productsFoundText">&nbsp;{props.numberOfProducts} PRODUTOS ENCONTRADOS</p>
      <hr className="golden-line" />
    </div>
  )
}
