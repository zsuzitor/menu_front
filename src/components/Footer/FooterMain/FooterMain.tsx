import React, { useState, useEffect } from 'react';

import { PostFooter } from '../PostFooter/PostFooter';
import { SocialLinkGroup } from '../SocialLinkGroup';

// export interface IHeaderLogoProps {
// }

require('./FooterMain.css');

export interface IFooterMainProps {

}

const FooterMain = (props: IFooterMainProps) => {
    const [showDefaultFooter, setShowDefaultFooter] = useState(true);
    const emptyFooter = true;

    const renderFooterContent = () => {
        if (emptyFooter) {
            return <></>
        }

        return <>
            <div className="footer-cloud"
                //не удалять
                // onClick={() => setShowDefaultFooter(!showDefaultFooter)}>
                onClick={() => setShowDefaultFooter(true)}>
                {//не удалять
                }
                <img className='persent-100-width-height' src="/images/red_cloud.png" />
            </div>
            {!showDefaultFooter ? <div className="footer-eye">
                <img className='persent-100-width-height footer-eye-img' src="/images/eye3.png" />
            </div>
                :
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
            }
        </>
    }


    return <div className='main-footer'>
        {renderFooterContent()}
        <PostFooter />
    </div>
}


export default FooterMain;