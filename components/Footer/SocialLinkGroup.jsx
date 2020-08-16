import React from 'react'


//export default 
export default class SocialLinkGroup extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
    }

    render() {
        return <div className='col-md-4'>
            <p className='social-link-head'>Социальные сети </p>

            <div className='row'>
                <div className='col-3'>
                    <div className='footer-social-link'></div>

                </div>
                <div className='col-3'>
                    <div className='footer-social-link'></div>

                </div>
                <div className='col-3'>
                    <div className='footer-social-link'></div>

                </div>
                <div className='col-3'>
                    <div className='footer-social-link'></div>

                </div>
            </div>
        </div>
    }

}

