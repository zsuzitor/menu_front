
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
            NewCardTemplate: null,
        };

        this.updateElement = this.updateElement.bind(this);
        this.followRequstSuccess = this.followRequstSuccess.bind(this);
        this.showCreateTemplate = this.showCreateTemplate.bind(this);

        this.state.EmptyImagePath = '../../images/user_empty_image.png';

    }



    componentDidMount() {
        //грузим все
        let followed = [
            {
                Id: 1,
                Title: 'header1',
                Body: 'body1',
                Image: this.state.EmptyImagePath

            },
            {
                Id: 2,
                Title: 'header2',
                Body: 'body2',
                Image: this.state.EmptyImagePath
            }
        ];

        let notFollowed = [
            {
                Id: 3,
                Title: 'header3',
                Body: 'body3',
                Image: this.state.EmptyImagePath
            },
            {
                Id: 4,
                Title: 'header4',
                Body: 'body4',
                Image: this.state.EmptyImagePath
            },
        ];



        this.setState({
            FollowedCards: followed,
            NotFollowedCards: notFollowed,
        });


    }

    updateElement(newElement) {

        let newState = Object.assign({}, this.state);

        let updEl = (arr) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == newElement.Id) {
                    arr[i] = newElement;
                    this.setState(newState);
                    return true;
                }
            }
        }

        // console.log(newElement);


        if (updEl(newState.FollowedCards)) {
            return;
        }

        if (updEl(newState.NotFollowedCards)) {
            return;
        }
        // newElement.Id+=Math.floor(Math.random() * Math.floor(20));//TODO для теста
        newState.NotFollowedCards.push(newElement);
        newState.NewCardTemplate=null;
        // console.log(newState);
        this.setState(newState);
    }


    followRequstSuccess(id) {
        let moveFollow = (from, to) => {
            for (let i = 0; i < from.length; ++i) {
                if (from[i].Id == id) {
                    to.push(from[i]);
                    from.splice(i, 1);
                    this.setState(newState);
                    return true;
                }
            }
        };

        // console.log('follow-' + id);
        let newState = Object.assign({}, this.state);

        if (moveFollow(newState.FollowedCards, newState.NotFollowedCards)) {
            return;
        }

        moveFollow(newState.NotFollowedCards, newState.FollowedCards);


    }

    showCreateTemplate() {
        if (this.state.NewCardTemplate) {
            return;
        }

        let newState = Object.assign({}, this.state);
        newState.NewCardTemplate = {
            Id: -1,
            Title: 'Новая',
            Body: 'Новая',
            Image: this.state.EmptyImagePath
        };
        this.setState(newState);
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

                        <MenuCardList CardsList={this.state.FollowedCards} updateElement={this.updateElement} FollowRequstSuccess={this.followRequstSuccess} />
                    </div>
                </div>
            </div>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#body-all-cards-section" aria-expanded="false" aria-controls="body-all-cards-section">Остальные</button>
            </p>
            <div>
                <div className="collapse" id="body-all-cards-section">
                    <div className="card card-body">
                        <div>
                            <button className='btn btn-primary' onClick={this.showCreateTemplate}>Добавить</button>
                        </div>
                        <MenuCardList NewCardTemplate={this.state.NewCardTemplate} CardsList={this.state.NotFollowedCards} updateElement={this.updateElement} FollowRequstSuccess={this.followRequstSuccess} />
                    </div>
                </div>
            </div>
        </div>

    }
}

// module.exports = MainHeader;