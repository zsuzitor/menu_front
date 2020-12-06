import * as React from "react";

export interface IHelloProps {
    compiler: string;
    framework: string;
    // children: JSX.Element;//указав так, можно рендерить компонент вкладывая в него другой <HelloComponent name="foo"><h1>Hello World</h1></HelloComponent>
}

export class Hello extends React.Component<IHelloProps, {}> {
    render() {
        return <h1>Привет от {this.props.compiler} и {this.props.framework}!</h1>;
    }
}
// </helloprops>