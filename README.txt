===� �������� ����� ������, ������� ����������� �������� ����������� ������� ���, ���������� ��������
http://typescript-lang.ru/docs/tutorials/React%20&%20Webpack.html

===setup project
npm run setup
npm install -g typescript webpack webpack-cli
npm link typescript -- ���������� ���������� ������ typescript, ��� ���� ������ ����������, ��� ����� ����� ��������(�� ������ ����� typescript).
npm link webpack
npm link webpack-cli
===build===
npm run build -- ������
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
�������� tsconfig.json
�������� ���� webpack.config.js
---



bs-config.json -- ������ lite-server. ����� ������� ������ � ������ ��� �� ������� �������





