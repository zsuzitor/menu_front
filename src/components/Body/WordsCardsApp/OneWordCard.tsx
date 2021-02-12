import * as React from "react";
import { WordActions } from "./WordActions";
import { OneWordCard as OneWordCardModel } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordCard";

export interface IOneWordCardStase {
    // EditNow: boolean;

    AlwaysShowWordAnswer: boolean;
    AlwaysShowWordImage: boolean;

}

export interface IOneWordCardProps {
    // EditNow: boolean;
    CurrentCard: OneWordCardModel;
    EditCurrentCard: OneWordCardModel;//надо будет поменять думаю
    ShowCurrentWordAnswer: boolean;
    ShowCurrentWordImage: boolean;
    ChangeShowCurrentWordImage: () => void;
    ChangeShowCurrentWordAnswer: () => void;
    SearchStrChanged:(e:any)=>void;
    SearchedString:string;
}


export class OneWordCard extends React.Component<IOneWordCardProps, IOneWordCardStase> {
    constructor(props: any) {
        super(props);

        this.state = {
            AlwaysShowWordAnswer: false,
            AlwaysShowWordImage: false,
            // ShowCurrentWordAnswer: false,
            // ShowCurrentWordImage: false,
        };

        this.ChangeAlwaysShowWordAnswer = this.ChangeAlwaysShowWordAnswer.bind(this);
        this.ChangeAlwaysShowWordImage = this.ChangeAlwaysShowWordImage.bind(this);


    }


    // componentDidUpdate() {
    //     console.log('---------');
    //     if(this.state.ShowCurrentWordAnswer||this.state.ShowCurrentWordImage){
    //         let newState = { ...this.state };
    //         newState.ShowCurrentWordAnswer = false;
    //         newState.ShowCurrentWordImage = false;
    //         this.setState(newState);
    //     }

    // }

    ChangeAlwaysShowWordImage() {
        let newState = { ...this.state };
        newState.AlwaysShowWordImage = !newState.AlwaysShowWordImage;
        this.setState(newState);
    }

    ChangeAlwaysShowWordAnswer() {
        let newState = { ...this.state };
        newState.AlwaysShowWordAnswer = !newState.AlwaysShowWordAnswer;
        this.setState(newState);
    }



    RenderCardBody() {
        if (this.props.EditCurrentCard) {
            return <div>edit</div>
        }

        if (!this.props.CurrentCard) {
            return <div></div>
        }

        let wordAnswer: JSX.Element = <div>ответ скрыт</div>;
        if (this.state.AlwaysShowWordAnswer || this.props.ShowCurrentWordAnswer) {
            wordAnswer = <div>
                <p>WordAnswer - {this.props.CurrentCard.WordAnswer}</p>
                <p>Description - {this.props.CurrentCard.Description}</p>
            </div>
        }

        let imageRender: JSX.Element = <div>изображение скрыто</div>;
        if (this.state.AlwaysShowWordImage || this.props.ShowCurrentWordImage) {
            imageRender = <div>
                <p>ImagePath - {this.props.CurrentCard.ImagePath}</p>
            </div>
        }

        return <div>
            <p>id - {this.props.CurrentCard.Id}</p>
            <p>Word - {this.props.CurrentCard.Word}</p>
            {wordAnswer}
            {imageRender}

            <p>Hided - {this.props.CurrentCard.Hided}</p>
        </div>
    }

    render() {
        return <div className="word-card-card-main col-md-8">
            <div className="word-card-card-inner">
                {this.RenderCardBody()}


            </div>
            <WordActions ChangeAlwaysShowWordImage={this.ChangeAlwaysShowWordImage}
                ChangeAlwaysShowWordAnswer={this.ChangeAlwaysShowWordAnswer}
                ChangeShowCurrentWordImage={this.props.ChangeShowCurrentWordImage}
                ChangeShowCurrentWordAnswer={this.props.ChangeShowCurrentWordAnswer}
                SearchStrChanged={this.props.SearchStrChanged} 
                SearchedString={this.props.SearchedString}
                />
        </div>

    }
}
