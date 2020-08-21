
import React from 'react'
import MenuCardList from './MenuCardList.jsx'


//export default 
export default class BodyCardsListMain extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        this.state = {
            AllCardsData: [],
            NewCardTemplate: null,
            CardsListFilters: {
                FollowOnly: false,
            },
        };

        this.updateElement = this.updateElement.bind(this);
        this.followRequstSuccess = this.followRequstSuccess.bind(this);
        this.showCreateTemplate = this.showCreateTemplate.bind(this);
        this.changeFilterFollow = this.changeFilterFollow.bind(this);


        this.state.EmptyImagePath = '../../images/user_empty_image.png';

    }



    componentDidMount() {
        //грузим все
        let cardsData = [
            {
                Id: 1,
                Title: 'header1',
                Body: 'body1',
                Image: this.state.EmptyImagePath,
                Followed: false

            },
            {
                Id: 2,
                Title: 'header2',
                Body: 'body2',
                Image: this.state.EmptyImagePath,
                Followed: false
            },
            {
                Id: 3,
                Title: 'header3',
                Body: 'body3',
                Image: this.state.EmptyImagePath,
                Followed: true
            },
            {
                Id: 4,
                Title: 'header4',
                Body: 'body4',
                Image: this.state.EmptyImagePath,
                Followed: true
            },
        ];





        this.setState({
            AllCardsData: cardsData,
            // FollowedCards: followed,
            // NotFollowedCards: notFollowed,
        });


    }

    updateElement(newElement) {
        // console.log(newElement);
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


        if (updEl(newState.AllCardsData)) {
            return;
        }

        // if (updEl(newState.NotFollowedCards)) {
        //     return;
        // }
        // newElement.Id+=Math.floor(Math.random() * Math.floor(20));//TODO для теста
        newState.AllCardsData.push(newElement);
        newState.NewCardTemplate = null;
        // console.log(newState);
        this.setState(newState);
    }


    followRequstSuccess(id) {
        // let moveFollow = (from, to) => {
        //     for (let i = 0; i < from.length; ++i) {
        //         if (from[i].Id == id) {
        //             to.push(from[i]);
        //             from.splice(i, 1);
        //             this.setState(newState);
        //             return true;
        //         }
        //     }
        // };

        let SetFollow = (arr) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == id) {
                    arr[i].Followed = !arr[i].Followed;
                    // to.push(from[i]);
                    // from.splice(i, 1);
                    // this.setState(newState);
                    return true;
                }
            }
        };

        let newState = Object.assign({}, this.state);
        SetFollow(newState.AllCardsData);

        // console.log('follow-' + id);


        // if (moveFollow(newState.FollowedCards, newState.NotFollowedCards)) {
        //     return;
        // }

        // moveFollow(newState.NotFollowedCards, newState.FollowedCards);


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


    changeFilterFollow(e) {
        // e.persist();
        let newState = Object.assign({}, this.state);
        // console.log(e);
        // if(e.target.value){
        //     newState.CardsListFilters.FollowOnly=true;
        // }
        // else{
        //     newState.CardsListFilters.FollowOnly=false;
        // }
        newState.CardsListFilters.FollowOnly = !newState.CardsListFilters.FollowOnly;
        this.setState(newState);
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-body container'>

            {/* <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#body-chosen-cards-section" aria-expanded="false" aria-controls="body-chosen-cards-section">Избранные</button>
            </p>
            <div>
                <div className="collapse" id="body-chosen-cards-section">
                    <div className="card card-body">

                        <MenuCardList CardsList={this.state.FollowedCards} updateElement={this.updateElement} FollowRequstSuccess={this.followRequstSuccess} />
                    </div>
                </div>
            </div> */}
            <div>
                <p>Фильтры</p>
                <div><input type="checkbox" defaultChecked={this.state.CardsListFilters.FollowOnly} onChange={this.changeFilterFollow} /></div>
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
                        <MenuCardList CardFilters={this.state.CardsListFilters} NewCardTemplate={this.state.NewCardTemplate}
                            CardsList={this.state.AllCardsData} updateElement={this.updateElement} FollowRequstSuccess={this.followRequstSuccess} />
                    </div>
                </div>
            </div>
        </div>

    }
}

// module.exports = MainHeader;