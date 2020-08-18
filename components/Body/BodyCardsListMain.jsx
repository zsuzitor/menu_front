
import React from 'react'
import MenuCardList from './MenuCardList.jsx'


//export default 
export default class BodyCardsListMain extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        this.state = {
            FollowedCards: [],
            NotFollowedCards: [],
        };

        this.updateElement = this.updateElement.bind(this);

    }



    componentDidMount() {
        //грузим все
        let followed = [
            {
                OldState: {
                    Id: 1,
                    Title: 'header1',
                    Body: 'body1',
                    Image: '../../images/user_empty_image.png'
                },
                NewState: null,
                EditNow: false,
            },
            {
                OldState: {
                    Id: 2,
                    Title: 'header2',
                    Body: 'body2',
                    Image: '../../images/user_empty_image.png'
                },
                NewState: null,
                EditNow: false,
            },
        ];

        let notFollowed = [
            {
                OldState: {
                    Id: 1,
                    Title: 'header1',
                    Body: 'body1',
                    Image: '../../images/user_empty_image.png'
                },
                NewState: null,
                EditNow: false,
            },
            {
                OldState: {
                    Id: 2,
                    Title: 'header2',
                    Body: 'body2',
                    Image: '../../images/user_empty_image.png'
                },
                NewState: null,
                EditNow: false,
            },
        ];



        this.setState({
            FollowedCards: followed,
            NotFollowedCards: notFollowed,
        });


    }

    updateElement(newElement) {
        let newState = Object.assign({}, this.state);
        for(let i=0;i<newState.FollowedCards.length;++i){
            if(newState.FollowedCards[i].Id==newElement.Id){
                newState.FollowedCards[i]=newElement;
                this.setState(newState);
                return;
            }
        }

        for(let i=0;i<newState.NotFollowedCards.length;++i){
            if(newState.NotFollowedCards[i].Id==newElement.Id){
                newState.NotFollowedCards[i]=newElement;
                this.setState(newState);
                return;
            }
        }
    }



    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-body container'>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#body-chosen-cards-section" aria-expanded="false" aria-controls="body-chosen-cards-section">Избранные</button>
            </p>
            <div>
                <div className="collapse" id="body-chosen-cards-section">
                    <div className="card card-body">
                        <MenuCardList cardsList={this.state.FollowedCards} updateElement={this.updateElement}/>
                    </div>
                </div>
            </div>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#body-all-cards-section" aria-expanded="false" aria-controls="body-all-cards-section">Остальные</button>
            </p>
            <div>
                <div className="collapse" id="body-all-cards-section">
                    <div className="card card-body">
                        <MenuCardList cardsList={this.state.NotFollowedCards}  updateElement={this.updateElement}/>
                    </div>
                </div>
            </div>
        </div>

    }
}

// module.exports = MainHeader;