===� �������� ����� ������, ������� ����������� �������� ����������� ������� ���, ���������� ��������
http://typescript-lang.ru/docs/tutorials/React%20&%20Webpack.html

===������ ������
npm run pre-first-run
===


===����===
npm install -g typescript webpack

npm link typescript -- ���������� ���������� ������ typescript, ��� ���� ������ ����������, ��� ����� ����� ��������(�� ������ ����� typescript).
npm run build -- ������

---
===full empty project create===
npm init
npm install -g typescript typings webpack
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


d webpack ������� ������ loaders ��������
https://webpack.js.org/concepts/loaders/
https://stackoverflow.com/questions/42060243/invalid-configuration-object-webpack-has-been-initialised-using-a-configuration


---typings - ��� react ���� �� ts

---npm install --save @types/react-router-dom
npm rm --save @types/react-router-dom


typings rm --save react
typings rm --save react-dom




