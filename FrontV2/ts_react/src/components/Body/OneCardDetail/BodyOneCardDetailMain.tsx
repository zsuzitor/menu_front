import * as React from "react";
// export interface IHeaderLogoProps {
// }

export interface IBodyOneCardDetailMainProps {
    Id: number;
}


export class BodyOneCardDetailMain extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        //TODO запрос для определения?
        let auth: IAuthState = {
            AuthSuccess: false,
            User: {
                Name: "Тестовое имя",
                Image: "../../images/user_empty_image.png"
            }
        };

        this.setState({
            Auth: auth,
            // FollowedCards: followed,
            // NotFollowedCards: notFollowed,
        });

    }


    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        // return <BodyCardsListMain />
        return <p>detail</p>
    }
}
// </helloprops>