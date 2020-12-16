===в основном взято отсюда, внесены исправления согласно обновленным версиям либ, поправлены опечатки
http://typescript-lang.ru/docs/tutorials/React%20&%20Webpack.html

===setup project
npm run setup
npm install -g typescript webpack webpack-cli
npm link typescript -- используем глобальную версию typescript, тут надо именно проследить, без этого будут проблемы(не сможет найти typescript).
npm link webpack
npm link webpack-cli
===build===
npm run build -- билдим
===run test server=======
---



===full empty project create===
npm init
npm install -g typescript typings webpack webpack-cli
npm install --save react react-dom react-router-dom
npm install --save-dev ts-loader source-map-loader
npm link typescript
{
npm install --save @types/react
npm install --save @types/react-dom
npm install --save @types/react-router-dom
===OR
typings install --save dt~react
typings install --save dt~react-dom
typings install --global --save dt~react-router-dom
}
добавить tsconfig.json
Создайте файл webpack.config.js
---



bs-config.json -- конфиг lite-server. можно удалить конфиг и убрать его из команды запуска





