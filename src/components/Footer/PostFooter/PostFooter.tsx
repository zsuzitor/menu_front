import * as React from "react";

// export interface IHeaderLogoProps {
// }

require('./PostFooter.css');


export class PostFooter extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className='sub-footer-under' onClick={() => window.scrollTo(0, 0)}>
            <div className="footer-arrow-up">
                <img className='persent-100-width-height' src="/images/arrow1.png" />

            </div>
        </div>
    }
}
