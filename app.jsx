var ReactDOM = require('react-dom');
var React = require('react');
// var HeaderMain = require('./components/Header/HeaderMain.jsx');
import HeaderMain from './components/Header/HeaderMain.jsx'
import BodyMain from './components/Body/BodyMain.jsx'
import FooterMain from './components/Footer/FooterMain.jsx'

const propsValues = {
    title: "Список смартфонов",
    items: [
        "HTC U Ultra",
        "iPhone 7",
        "Google Pixel",
        "Huawei P9",
        "Meizu Pro 6",
        "Asus Zenfone 3"
    ]
};

ReactDOM.render(<div>
    <HeaderMain data={propsValues} />
    <BodyMain data={propsValues} />
    <FooterMain data={propsValues} />
</div>,
    document.getElementById("app")
)