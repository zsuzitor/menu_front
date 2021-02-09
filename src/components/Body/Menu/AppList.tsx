import * as React from "react";



export class AppList extends React.Component<{}, {}> {
    render() {
        return <div>
            <p><a href="/menu">Меню</a></p>
            <p><a href="/menu-app">Меню статей</a></p>
            <p><a href="/menu/#">Словарь</a></p>
            <p><a href="/menu/#">БУК</a></p>


        </div>
    }
}
