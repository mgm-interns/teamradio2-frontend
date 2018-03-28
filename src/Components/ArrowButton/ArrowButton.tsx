import * as React from 'react';
import { Component } from 'react';
import './ArrowButton.scss';

export class ArrowButton extends Component {
    constructor(props:any) {
        super(props);
        this.loadStation = this.loadStation.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
    }

	loadStation() {
    }

    scrollLeft() {
    }

    render() {
        return (
            <div>
                <nav className="nav-circlepop">
                    <a className="prev" onClick={this.scrollLeft}>
                        <span className="icon-wrap"></span>
                    </a>
                    <a className="next" onClick={this.loadStation}>
                        <span className="icon-wrap"></span>
                    </a>
                </nav>
            </div>
        )
    }
}
