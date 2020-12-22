/// <reference path="../typings/globals.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";
import { MainComponent } from './components/MainComponent';
import { AjaxHelper } from './components/_ComponentsLink/AjaxLogic';

//относительный путь к index.tsx — это важно. Если бы это было не так, то TypeScript искал бы этот файл в папке node_modules
// import { Hello } from "./components/Hello";

// ReactDOM.render(
//     <Hello compiler="TypeScript" framework="React"/>,
//     document.getElementById("example")
// );

//INIT CONST
// window.G_PathToBaseImages = "../../images/";
window.G_PathToBaseImages = "/images/";
window.G_EmptyImagePath = G_PathToBaseImages + "user_empty_image.png";
window.G_PathToServer = "/";//"http://localhost:8000/";
window.G_PathToServerMenu = G_PathToServer + "menu/";
window.G_AjaxHelper = new AjaxHelper();
//



ReactDOM.render(
    <MainComponent />,
    // <div>test</div>,
    document.getElementById("example")
);

