import * as React from "react";

export interface ILoginState {
    Login: string;
    Password: string;
}




export class Login extends React.Component<{}, ILoginState> {

    constructor(props: any) {
        super(props);

        let newState: ILoginState = {
            Login: null,
            Password: null,
        };

        this.state = newState;

        this.LoginOnChange = this.LoginOnChange.bind(this);
        this.PasswordOnChange = this.PasswordOnChange.bind(this);
        this.TryLogin = this.TryLogin.bind(this);

    }

    LoginOnChange(e: any) {
        var newLogin = e.target.value.trim();
        let newState = { ...this.state };//Object.assign({}, this.state);
        newState.Login = newLogin;

        this.setState(newState);
    }

    PasswordOnChange(e: any) {
        var newPassword = e.target.value.trim();
        let newState = { ...this.state };//Object.assign({}, this.state);
        newState.Password = newPassword;

        this.setState(newState);
    }


    TryLogin() {
        //TODO отправляем запрос и чистим state
        let data = {
            'Email': "asdasd@mail.ru",
            'Password': "Password"
        };

        // $.post(G_PathToServer + 'api/Authenticate/login/',data,()=>{}, headers:);

        $.ajax({
            type: "POST",
            url: G_PathToServer + 'api/Authenticate/login/',
            data: data,
            // dataType: 'json',//'jsonp',
            // headers: {                    
            //     'Content-Type': 'application/json'
            // },

            // secure: true,

            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            // },

            //contentType: 'application/json',


            success: (plain, textStatus, jqXHR) => {
                debugger;
                alert();
            },
            complete: () => {
                debugger;
                alert();
            },
            // cors: true,

        });





        function goAjaxRequest(obj:any, fileLoad:boolean) {//TODO убрать any
            if (!obj.type)
                obj.type = 'GET';
            //if (!obj.dataType)
            //  obj.dataType = 'json';//html
        
            let ajaxObj : JQuery.AjaxSettings = {
                type: obj.type,
                data: obj.data,
                url: obj.url,
                //processData: false, // Не обрабатываем файлы
                //contentType: false, // Так jQuery скажет серверу что это строковой запрос
                success: function (xhr, status, jqXHR) {
                    //if(jqXHR.status==200){//EXAMPLE STATUS
                    //DO SOMETHING
                    //}
                    if (obj.funcSuccess) {
                        try {
                            obj.funcSuccess(xhr, status, jqXHR);
                        }
                        catch (e) {
                            console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
                        }
        
                    }
                },
                error: function (xhr, status, error) {
                    //alert("ошибка загрузки");
                    if (obj.funcError)
                        obj.funcError(xhr, status, error);
                },
                // shows the loader element before sending.
                beforeSend: function () {
                    if (obj.funcBeforeSend)
                        obj.funcBeforeSend();
                    //  PreloaderShowChange(true);
                },
                headers: { 'Authorization': localStorage.getItem('access_token') },
                // hides the loader after completion of request, whether successfull or failor.
                complete: function (jqXHR, status) {
                    if (jqXHR.status == 401) {
                        //refreshToken();
                    }
                    if (obj.funcComplete) {
                        try {
                            obj.funcComplete(jqXHR, status);
                        }
                        catch (e) {
                            console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
                        }
                    }
        
                    //PreloaderShowChange(false);
                },
                dataType: obj.dataType//'html'
            };
            // if(obj.dataType){
            //     ajaxObj.dataType=obj.dataType
            // }
        
            if (fileLoad) {
                //processData: false, // Не обрабатываем файлы
                //contentType: false,
                ajaxObj.processData = false;
                ajaxObj.contentType = false;
            }
        
            trySend(ajaxObj);
        
        
        }
        
        function trySend(ajaxObj: JQuery.AjaxSettings) {
            if (tokenRequested) {//TODO
                setTimeout(function () {
                    trySend(ajaxObj);
                }, 50);
            }
            else {
                $.ajax(ajaxObj);
            }
        }





        // $.ajax({
        //     url: G_PathToServer + 'api/Authenticate/login/',
        //     method: 'post',
        //     data: {
        //         'Email' : "asdasd@mail.ru",
        //         'Password' : "Password"
        //     },
        //         headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     dataType: 'jsonp',
        //     success: function (data) {
        //         console.info(data);
        //     }
        // });



        // $.ajax({
        //     url: 'https://localhost:44305/' + 'api/Authenticate/login/',
        //     method: 'post',
        //     data: {
        //         'Easdail' : "asdasru",
        //         'Passasddword' : "Passcczxword"
        //     },headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     dataType: 'json',
        //     success: function (data) {
        //         console.info(data);
        //     }
        // });


        // $.ajax({
        //     url: 'http://localhost:3000/',
        //     method: 'post',
        //     data: {
        //         'Easdail' : "asdasru",
        //         'Passasddword' : "Passcczxword"
        //     },headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     dataType: 'json',
        //     success: function (data) {
        //         console.info(data);
        //     }
        // });



    }
    //style={{align:"center"}}
    render() {
        return <div className='persent-100-width'>
            <div className='persent-100-width'>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='text' placeholder='login' onChange={this.LoginOnChange}></input>
                </div>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='password' placeholder='password' onChange={this.PasswordOnChange}></input>
                </div>
                <button className='btn persent-100-width' onClick={this.TryLogin}>Войти</button>
            </div>


        </div>
    }
}
// </helloprops>