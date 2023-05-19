/// <reference path="../typings/globals.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactDOMClient from 'react-dom/client';
import MainComponent from './components/MainComponent';
import { AjaxHelper, FetchHelper } from './Models/AjaxLogic';
import { AuthenticateController } from "./Models/Controllers/AuthenticateController";
import { CodeReviewCommentController } from "./Apps/CodeReviewApp/Models/Controllers/CodeReviewCommentController";
import { ArticleController } from "./Apps/MenuApp/Models/Controllers/ArticleController";
import { PlaningPokerController } from "./Apps/PlaningPoker/Models/Controllers/PlaningPokerController";
import { UsersController } from "./Models/Controllers/UsersController";
import { WordsCardsController } from "./Apps/WordsCardsApp/Models/Controllers/WordsCardsController";


import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
// import { AppAction } from './Models/Actions/Actions';
import { ReducerCombiner } from "./Models/Reducers/ReducerCombiner";
import { AppState } from './Models/Entity/State/AppState';
import { VaultController } from "./Apps/Vault/Models/Controllers/VaultController";
import { CodeReviewProjectController } from "./Apps/CodeReviewApp/Models/Controllers/CodeReviewProjectController";
import { CodeReviewTaskController } from "./Apps/CodeReviewApp/Models/Controllers/CodeReviewTaskController";
import { CodeReviewUserController } from "./Apps/CodeReviewApp/Models/Controllers/CodeReviewUserController";
import { WordsListController } from "./Apps/WordsCardsApp/Models/Controllers/WordsListController";
import { MainErrorHandler } from "./Models/BL/ErrorHandleLogic";


require('../style/main.css');
require('../style/body.css');
require('../style/alerts.css');


require('../style/menu_app.css');
require('../style/menu_app_one_card.css');

require('../style/word_cards.css');


//localstorage
//header_auth



//INIT CONST
// window.G_PathToBaseImages = "../../images/";
window.G_PathToBaseImages = "/images/";
window.G_EmptyImagePath = G_PathToBaseImages + "user_empty_image.png";
window.G_PreloaderPath = G_PathToBaseImages + "loading.gif";
window.G_PathToServer = "/";//"http://localhost:8000/";
window.G_PathToServerMenu = G_PathToServer + "menu/";
// window.G_AjaxHelper = new AjaxHelper();
window.G_AjaxHelper = new FetchHelper();

window.G_ErrorHandleLogic = new MainErrorHandler();

//controllers
window.G_AuthenticateController = new AuthenticateController();
window.G_UsersController = new UsersController();
window.G_ArticleController = new ArticleController();
window.G_WordsCardsController = new WordsCardsController();
window.G_WordsListController = new WordsListController();
window.G_PlaningPokerController = new PlaningPokerController();
window.G_CodeReviewProjectController = new CodeReviewProjectController();
window.G_CodeReviewTaskController = new CodeReviewTaskController();
window.G_CodeReviewUserController = new CodeReviewUserController();
window.G_CodeReviewCommentController = new CodeReviewCommentController();
window.G_VaultController = new VaultController();





let configureStore = (initialState: AppState) => {

    const store = createStore(ReducerCombiner, initialState,
        applyMiddleware(thunk));//подключаем thunk


    return store;
};


const store = configureStore(new AppState());



//
// G_AddAbsoluteAlertToState -->MainComponent
//

const container = document.getElementById('menu_all_main_content_start');

// Create a root.
// const root = ReactDOM.createRoot(container);
const root = ReactDOMClient.createRoot(container);
// Initial render
root.render(<Provider store={store}>
    <MainComponent /></Provider>);



// ReactDOM.render(
//     <MainComponent />,
//     // <div>test</div>,
//     document.getElementById("menu_all_main_content_start")
// );

