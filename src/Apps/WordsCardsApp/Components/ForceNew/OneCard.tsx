import * as React from "react";


export interface IOneCardState {
    Card: CreateCardEdit;
    WordOnChange: (id: number, e: any) => void;
    WordAnswerOnChange: (id: number, e: any) => void;
    WordDescriptionOnChange: (id: number, e: any) => void;
}

export class CreateCardEdit {
    Id: number;
    Word: string;
    WordAnswer: string;
    Description: string;
    MainImageSave?: File;//не хранится тут, проставляется при редактировании

    constructor() {
        this.Id = -1;
        this.Word = "";
        this.WordAnswer = "";
        this.Description = "";
        this.MainImageSave = null;
    }
}


export class OneCard extends React.Component<IOneCardState, {}> {
    constructor(props: any) {
        super(props);

        // this.AddNewTemplate = this.AddNewTemplate.bind(this);
    }




    // RenderCard(x: CreateCardState): JSX.Element {
    //     return <div key={x.Id}>
    //         <input type="text" onChange={this.WordOnChange} value={x.Word}></input>
    //         <input type="text" onChange={this.WordAnswerOnChange} value={x.WordAnswer}></input>
    //         <input type="text" onChange={this.WordDescriptionOnChange} value={x.Description}></input>
    //     </div>
    // }

    render() {
        return <div className="force-add-one-card padding-10-top col-sm-12">
            <div className="force-add-one-card-inner" key={this.props.Card.Id}>
                <div className="padding-10-top">
                    <input className="form-control" type="text" placeholder="слово"
                        onChange={(e) => { this.props.WordOnChange(this.props.Card.Id, e) }} value={this.props.Card.Word}></input>
                </div>
                <div className="padding-10-top">
                    <input className="form-control" type="text" placeholder="ответ"
                        onChange={(e) => { this.props.WordAnswerOnChange(this.props.Card.Id, e) }} value={this.props.Card.WordAnswer}></input>
                </div>
                <div className="padding-10-top">
                    <input className="form-control" type="text" placeholder="описание"
                        onChange={(e) => { this.props.WordDescriptionOnChange(this.props.Card.Id, e) }} value={this.props.Card.Description}></input>
                </div>
            </div>
        </div>

    }
}
