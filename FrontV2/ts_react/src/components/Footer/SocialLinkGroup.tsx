import * as React from "react";

// export interface IHeaderLogoProps {
// }

export class SocialLinkGroup extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
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
// </helloprops>