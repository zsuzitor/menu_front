

//
// entry: "./src/index.tsx",   // time.js

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./bundle.js",
    },

    // Включить карты кода для отладки вывода webpack
    devtool: "source-map",

    resolve: {
        // Добавить разрешения '.ts' и '.tsx' к обрабатываемым
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]// тут не должно быть пустых строк
    },

    module: {
        rules: [//        loaders:
            {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: "pre"//новый синтаксис заменяющий preLoaders блок 'pre' | 'post'
                ,
                exclude: /node_modules/,//возможно не нужно
            },
            // Все файлы с разрешениями '.ts' или '.tsx' будет обрабатывать 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,//возможно не нужно
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },

    // При импортировании модуля, чей путь совпадает с одним из указанных ниже,
    // предположить, что соответствующая глобальная переменная существует, и использовать
    // ее взамен. Это важно, так как позволяет избежать добавления в сборку всех зависимостей,
    // что дает браузерам возможность кэшировать файлы библиотек между различными сборками.
    //если так делать скрипты придется подключать отдельно и с правильными версиями
    // @*<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    // <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    // <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>*@
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};