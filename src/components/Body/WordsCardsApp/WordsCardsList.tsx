import * as React from "react";



export class WordsCardsList extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className="word-card-cards-list-main offset-sm-1 col-md-3">
            <p>item1</p>
            <p>item2</p>
            <p>item3</p>
            <p>item4</p>
        </div>

    }
}
