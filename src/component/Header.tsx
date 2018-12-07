import * as React from 'react'
import { IFormControlEvent } from 'src/models/form-control-event';
import logo from '../logo.svg';

interface IHeaderProps {
    handleChange: (e: string) => void;
}

export default class Header extends React.Component<IHeaderProps, {}> {

  public render() {
    return (
      <div className="header">
     
        <div className="logo">
        <a href="/">
            <img className="logo-mm" src={logo} alt="logo" />
        </a>
        </div>
       
        <div className="search-input">
            <form >
	            <input onChange={this.onChange} type="search" placeholder="Buscar"/>
            </form>
        </div>
        
      </div>
    )
  }

  private onChange = (e:IFormControlEvent):void => {
    this.props.handleChange(e.currentTarget.value.trim())
  }
  
}
