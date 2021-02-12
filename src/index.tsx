/// <reference path="../typings/globals.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";
import { MainComponent } from './components/MainComponent';
import { AjaxHelper } from './components/_ComponentsLink/AjaxLogic';
import { MainErrorHandler } from './components/_ComponentsLink/Models/ErrorHandleLogic';




require('../style/main.css');
require('../style/auth.css');
require('../style/body.css');
require('../style/footer.css');
require('../style/header.css');
require('../style/alerts.css');

require('../style/menu.css');

require('../style/menu_app.css');
require('../style/menu_app_one_card.css');

require('../style/word_cards.css');


//localstorage
//header_auth



//INIT CONST
// window.G_PathToBaseImages = "../../images/";
window.G_PathToBaseImages = "/images/";
window.G_EmptyImagePath = G_PathToBaseImages + "user_empty_image.png";
window.G_PreloaderPath =  G_PathToBaseImages + "loading.gif";
window.G_PathToServer = "/";//"http://localhost:8000/";
window.G_PathToServerMenu = G_PathToServer + "menu/";
window.G_AjaxHelper = new AjaxHelper();
window.G_ErrorHandleLogic = new MainErrorHandler();
//



ReactDOM.render(
    <MainComponent />,
    // <div>test</div>,
    document.getElementById("example")
);

