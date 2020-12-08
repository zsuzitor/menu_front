import * as React from "react";
import { PostFooter } from './PostFooter'
import { SocialLinkGroup } from './SocialLinkGroup'

// export interface IHeaderLogoProps {
// }

export class FooterMain extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-footer'>
            <div className='main-footer-inner container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <ul>
                            <li><a href='#'>О проекте</a></li>
                            <li> <a href='#'>Пользовательское соглашение</a></li>
                            <li><a href='#'>Политика обработки персональных данных</a></li>
                        </ul>


                    </div>
                    <SocialLinkGroup />

                    <div className='col-md-4 footer-contacts'>
                        <p className='contacts-head'>Контакты</p>
                        <ul>
                            <li>Почта</li>
                            <li>Номер телефона</li>
                        </ul>
                    </div>
                </div>

            </div>
            <PostFooter />
        </div>

    }
}
// </helloprops>