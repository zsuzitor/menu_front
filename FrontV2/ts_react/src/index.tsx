import * as React from "react";
import * as ReactDOM from "react-dom";
import {MainComponent} from './components/MainComponent';


//относительный путь к index.tsx — это важно. Если бы это было не так, то TypeScript искал бы этот файл в папке node_modules
// import { Hello } from "./components/Hello";
 
// ReactDOM.render(
//     <Hello compiler="TypeScript" framework="React"/>,
//     document.getElementById("example")
// );

ReactDOM.render(
    <MainComponent />,
    document.getElementById("example")
);

