
import * as React from 'react';
import { IFormControlEvent } from 'src/models/form-control-event';

export interface ISelectorProps {
    handleSelect: (productsPerPage: number) => void;
    productsPerPage: number
}

export default class Selector extends React.Component<ISelectorProps, any> {
    constructor(props: ISelectorProps) {
        super(props)
        this.state = {
            productsPerPage: this.props.productsPerPage,

        }
    }

    public render() {
        return (
            <div>
                <select className="selector"
                    defaultValue={this.state.productsPerPage}
                    onChange={this.onChange}
                >
                    <option value="10">Produtos por página 10</option>
                    <option value="20">Produtos por página 20</option>
                    <option value="30">Produtos por página 30</option>
                    <option value="50">Produtos por página 50</option>
                </select>
            </div>

        );
    }
    private onChange = (e: IFormControlEvent): void => {

        this.setState({
            productsPerPage: parseFloat(e.currentTarget.value)
        })
        this.props.handleSelect(parseFloat(e.currentTarget.value))

    }


}
