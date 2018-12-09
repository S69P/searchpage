import axios from 'axios'
import * as React from 'react';
import './App.css';
import Header from './component/Header'
import Query from './component/Query'
import { debounce } from 'lodash'
import ProductsList from './component/ProductsList'
import Footer from './component/Footer'
import * as https from "https";

interface IAppState {
  first?: string
  last?: string
  query: string
  next?: string
  prev?: string
  products?: any
  productsPerPage: number
  numberOfProducts: number
  searchActive: boolean
}
const agent = new https.Agent({  
  rejectUnauthorized: false
});

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      next: "",
      numberOfProducts: 0,
      products: [],
      productsPerPage: 10,
      query: "Lista de produtos",
      searchActive: false,

    }

  }

  public componentDidMount() {
    this.getInitialProducts(this.state.productsPerPage)
  }

  public render() {
    return (
      <div className="App">
        <header >
          <Header handleChange={this.handleChange} />
          <Query query={this.state.query} />
          <ProductsList numberOfProducts={this.state.numberOfProducts} productsPerPage={this.state.productsPerPage} products={this.state.products} />
          <Footer prev={this.state.prev} pagination={this.pagination} productsPerPage={this.state.productsPerPage} handleSelect={this.handleSelect} />
        </header>

      </div>
    );
  }

  private search: (productsPerPage: number) => void = (productsPerPage: number) => {
    axios.get(`https://search--api.herokuapp.com/products?keywords_like=${this.state.query}&_page=1&_limit=${productsPerPage}`, { httpsAgent: agent })
      .then(res => {
        this.getPaginationLInks(res.headers.link)
        this.setState({ products: res.data, numberOfProducts: res.headers['x-total-count'], productsPerPage })
      })
  }

  private defaltSearch: () => any = () => {
    axios.get(`https://search--api.herokuapp.com/products?keywords_like=${this.state.query}&_page=1&_limit=${this.state.productsPerPage}`, { httpsAgent: agent })
      .then(res => {
        this.getPaginationLInks(res.headers.link)
        this.setState({ products: res.data, numberOfProducts: res.headers['x-total-count'], productsPerPage: this.state.productsPerPage })
      })
  }

  private handleChange: (query: string) => void = (query: string) => {
    if (query === "") {
      this.setState({ query: "Lista de produtos", searchActive: false })
      this.getPaginatedProducts(this.state.productsPerPage)

      return
    }
    this.setState({ query, searchActive: true })
    const debounced = debounce(this.defaltSearch, 250)
    debounced()
  }

  private handleSelect: (productsPerPage: number) => void = (productsPerPage: number) => {
    if (this.state.searchActive) {

      this.search(productsPerPage)

      return
    }
    this.getPaginatedProducts(productsPerPage)
    this.forceUpdate()
  }

  private getPaginatedProducts(productsPerPage: number, ) {
    axios.get(`https://search--api.herokuapp.com/products?_page=1&_limit=${productsPerPage}`, { httpsAgent: agent })
      .then(res => {
        this.getPaginationLInks(res.headers.link)
        this.setState({ products: res.data, numberOfProducts: res.headers['x-total-count'], productsPerPage })
      })
  }

  private getInitialProducts(productsPerPage: number) {
    axios.get(`https://search--api.herokuapp.com/products?_page=1&_limit=${productsPerPage}`, { httpsAgent: agent })
      .then(res => {
        this.getPaginationLInks(res.headers.link)
        this.setState({ products: res.data, numberOfProducts: res.headers['x-total-count'] })
      })
  }

  private getPaginationLInks(links: string) {
    const regex = /[<>]/gi;
    const linkArray = links.replace(regex, '').split(",")
    linkArray.forEach((link, index) => {
      
      link = link.replace('http', 'https')
      
      if (link.includes("first")) {
        const first = link.split(";")[0]
        this.setState({ first })
      } else if (link.includes("next")) {
        const next = link.split(";")[0]
        this.setState({ next })
      } else if (link.includes("last")) {
        const last = link.split(";")[0]
        this.setState({ last })
      } else if (link.includes("prev")) {
        const prev = link.split(";")[0]
        this.setState({ prev })
      }

    })
    

  }

  private getProducts(url: string) {
    axios.get(url)
      .then(res => {
        this.getPaginationLInks(res.headers.link)
        this.setState({ products: res.data, numberOfProducts: res.headers['x-total-count'] })
      })
  }

  private pagination: (e: React.SyntheticEvent) => void = (e: React.SyntheticEvent) => {
    switch (e.currentTarget.getAttribute('value')) {
      case 'first':
        if (this.state.first) {
          this.setState({ prev: "" })
          this.getProducts(this.state.first)
        }
        break
      case 'prev':
        if (this.state.prev) {
          this.getProducts(this.state.prev)
          if (this.state.prev.includes("page=1")) {
            this.setState({ prev: "" })
          }
        }
        break
      case 'next':
        if (this.state.next) {
          this.getProducts(this.state.next)
        }
        break
      case 'last':
        if (this.state.last) {
          this.getProducts(this.state.last)
          this.setState({ next: this.state.last })
        }
        break
      default:
        break
    }
  }

}

export default App;
