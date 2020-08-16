
import React from 'react'
import PostFooter from './PostFooter.jsx'
import SocialLinkGroup from './SocialLinkGroup.jsx'


//export default 
export default class FooterMain extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
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
                    <SocialLinkGroup/>
                   
                    <div className='col-md-4 footer-contacts'>
                        <p className='contacts-head'>Контакты</p>
                        <ul>
                            <li>Почта</li>
                            <li>Номер телефона</li>
                        </ul>
                    </div>
                </div>

            </div>
            <PostFooter/>
        </div>

    }
}

// module.exports = MainHeader;