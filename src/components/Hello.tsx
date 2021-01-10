import * as React from "react";

export interface IHelloProps {
    compiler: string;
    framework: string;
}

export class Hello extends React.Component<IHelloProps, {}> {
    render() {
        return <h1>Привет от {this.props.compiler} и {this.props.framework}!</h1>;
    }
}
