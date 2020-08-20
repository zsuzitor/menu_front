
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
        this.followRequstSuccess = this.followRequstSuccess.bind(this);


    }



    componentDidMount() {
        //грузим все
        let followed = [
            {
                Id: 1,
                Title: 'header1',
                Body: 'body1',
                Image: '../../images/user_empty_image.png'

            },
            {
                Id: 2,
                Title: 'header2',
                Body: 'body2',
                Image: '../../images/user_empty_image.png'
            }
        ];

        let notFollowed = [
            {
                Id: 3,
                Title: 'header3',
                Body: 'body3',
                Image: '../../images/user_empty_image.png'
            },
            {
                Id: 4,
                Title: 'header4',
                Body: 'body4',
                Image: '../../images/user_empty_image.png'
            },
        ];



        this.setState({
            FollowedCards: followed,
            NotFollowedCards: notFollowed,
        });


    }

    updateElement(newElement) {
        let updEl = (arr) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == newElement.NewState.Id) {
                    arr[i] = newElement.NewState;
                    this.setState(newState);
                    return true;
                }
            }
        }

        // console.log(newElement);
        let newState = Object.assign({}, this.state);

        if (updEl(newState.FollowedCards)) {
            return;
        }

        updEl(newState.NotFollowedCards)

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
                        <MenuCardList CardsList={this.state.NotFollowedCards} updateElement={this.updateElement} FollowRequstSuccess={this.followRequstSuccess} />
                    </div>
                </div>
            </div>
        </div>

    }
}

// module.exports = MainHeader;