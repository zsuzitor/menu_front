;



;; (() => {
    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function ToHtmlTag1(arr) {
        let tdBorder = "1px solid black";
        let mainDiv = document.createElement("div");
        let table = document.createElement("table");
        arr.forEach(x => {
            let tr = document.createElement("tr");
            let tdAuthor = document.createElement("td");
            tdAuthor.style.border = tdBorder;
            tdAuthor.innerHTML = x.Assignee;
            tr.append(tdAuthor);

            let tdComment = document.createElement("td");
            tdComment.style.border = tdBorder;
            tdComment.innerHTML = x.Comment;
            tr.append(tdComment);

            let tdTimeSpent = document.createElement("td");
            tdTimeSpent.style.border = tdBorder;
            tdTimeSpent.innerHTML = x.TimeSpent;
            tr.append(tdTimeSpent);

            let tdStarted = document.createElement("td");
            tdStarted.style.border = tdBorder;
            tdStarted.innerHTML = x.Started;
            tr.append(tdStarted);

            let tdNumber = document.createElement("td");
            tdNumber.style.border = tdBorder;
            tdNumber.innerHTML = x.Number;
            tr.append(tdNumber);


            let tdName = document.createElement("td");
            tdName.style.border = tdBorder;
            tdName.innerHTML = x.Name;
            tr.append(tdName);

            table.append(tr);
        });

        mainDiv.appendChild(table);
        let endSeparator = document.createElement("p");
        endSeparator.innerHTML = '='.repeat(100);
        mainDiv.appendChild(endSeparator);
        return mainDiv;
    }



    function ToHtmlTag2(arr) {
        let tdBorder = "1px solid black";
        let mainDiv = document.createElement("div");
        let table = document.createElement("table");
        Object.keys(arr).forEach(x1 => {
            let x = arr[x1];
            let tr = document.createElement("tr");
            let tdNumber = document.createElement("td");
            tdNumber.style.border = tdBorder;
            tdNumber.innerHTML = x.Number;
            tr.append(tdNumber);

            let tdName = document.createElement("td");
            tdName.style.border = tdBorder;
            tdName.innerHTML = x.Name;
            tr.append(tdName);

            for (let i = 0; i < 7; ++i) {
                let tdTime = document.createElement("td");
                tdTime.style.border = tdBorder;
                tdTime.innerHTML = x.DataLogs[i] || 0;
                tr.append(tdTime);

            };

            table.append(tr);
        });

        mainDiv.appendChild(table);
        let endSeparator = document.createElement("p");
        endSeparator.innerHTML = '='.repeat(100);
        mainDiv.appendChild(endSeparator);
        return mainDiv;
    }




    function ToOneString1(arr) {
        let str = "";
        let strTabStr = "\t";
        let strNewLine = "\r\n";
        arr.forEach(x => {
            str += "|" + strTabStr + x.Assignee + strTabStr + "|" + strTabStr;
            str += strTabStr + x.Comment + strTabStr + "|" + strTabStr;
            str += strTabStr + x.TimeSpent + strTabStr + "|" + strTabStr;
            str += strTabStr + x.Started + strTabStr + "|" + strTabStr;
            str += strTabStr + x.Number + strTabStr + "|" + strTabStr;
            str += strTabStr + x.Name + strTabStr + "|";
            str += strNewLine;
        });

        return str;
    }

    function ToOneString2(arr) {
        let str = "";
        let strTabStr = "\t";
        let strNewLine = "\r\n";
        Object.keys(arr).forEach(x1 => {
            let x = arr[x1];
            str += "|" + strTabStr + x.Number + strTabStr;
            str += x.Name + strTabStr + "|" + strTabStr;
            for (let i = 0; i < 7; ++i) {
                let timeVal = x.DataLogs[i] || 0;
                str += strTabStr + timeVal + strTabStr + "|" + strTabStr;

            };

            str += strNewLine;
        });

        return str;
    }



    let features = [];
    let promises = [];
    let userFio = document.querySelector("meta[name=ajs-remote-user-fullname]").content;

    let weekDates = [];
    document.querySelectorAll("div[name=calendarCanvasDayHeader]>h3>span").forEach((x, xNum) => {
        if (xNum % 2 == 0) {
            weekDates.push(x.title.split(' ')[1]);

        }
    });

    let currentDateMin = weekDates[0].split(".");//[0]число, [1] месяц
    let currentDateMax = weekDates[6].split(".");

    // let existedTickets = [];
    // (Array.from(document.getElementsByName('tempoWorklogCard'))).forEach(element => {
    //     let numTicket = element.childNodes[1].innerText.split('\n')[0];
    //     if (!existedTickets.find(x => x == numTicket)) {
    //         existedTickets.push(numTicket);
    //         let pr = fetch("https://jira.vsk.ru/rest/api/latest/issue/" + numTicket)
    //             .then(d => d.json()
    //                 .then(x => {
    //                     // console.log(x);
    //                     let ticketId = x.id;
    //                     x.fields.worklog.worklogs.forEach(tmLog => {
    //                         // console.log("11");
    //                         let resObj = {};
    //                         if (tmLog.author.displayName == userFio) {
    //                             // console.log("22");
    //                             resObj.Author = tmLog.author.emailAddress;
    //                             resObj.Comment = tmLog.comment;
    //                             resObj.TimeSpent = tmLog.timeSpent;
    //                             resObj.Started = tmLog.started;
    //                             let st = new Date(tmLog.started);
    //                             let currentDateMin = weekDates[0].split(".");
    //                             let currentDateMax = weekDates[6].split(".");
    //                             //  console.log(weekDates);
    //                             //  console.log(st);
    //                             if (st.getUTCDate() >= currentDateMin[0] && (st.getUTCMonth() + 1) >= currentDateMin[1]
    //                                 && st.getUTCDate() <= currentDateMax[0] && (st.getUTCMonth() + 1) <= currentDateMax[1]) {//todo надо проверять год?
    //                                 // console.log("=====");
    //                                 features.push(resObj);
    //                             }

    //                         }
    //                     });
    //                 }));
    //         promises.push(pr);

    //     }






    var existedTickets = [];
    (Array.from(document.getElementsByName('tempoWorklogCard'))).forEach(element => {
        let numTicket = element.childNodes[1].innerText.split('\n')[0];
        if (!existedTickets.find(x => x == numTicket)) {
            existedTickets.push(numTicket);
            let pr = fetch("https://jira.vsk.ru/rest/api/latest/issue/" + numTicket)
                .then(async d => {
                    let jsn = await d.json();
                    let ticketId = jsn.id;
                    let tickedName = jsn.fields.summary;
                    let timeJsn = await ((await fetch("https://jira.vsk.ru/rest/tempo-time-activities/1/issue/" + ticketId)).json());
                    timeJsn.activities.forEach(tmLog => {
                        let resObj = {};
                        //assignee
                        resObj.Assignee = tmLog.assignee;
                        resObj.Number = numTicket;
                        resObj.Comment = tmLog.description;
                        resObj.Name = tickedName;
                        let hourInWork = Math.floor(tmLog.value / 3600);
                        let minuteInWork = Math.floor((tmLog.value - (hourInWork * 3600)) / 60);
                        resObj.TimeSpent = `${hourInWork}.${minuteInWork}`;
                        resObj.Started = tmLog.dateTime;
                        resObj.StartedDate = new Date(resObj.Started);

                        if (resObj.StartedDate.getUTCDate() >= currentDateMin[0] && (resObj.StartedDate.getUTCMonth() + 1) >= currentDateMin[1]
                            && resObj.StartedDate.getUTCDate() <= currentDateMax[0] && (resObj.StartedDate.getUTCMonth() + 1) <= currentDateMax[1]) {//todo надо проверять год?

                            features.push(resObj);
                        }
                    });
                });
            promises.push(pr);
            //return;

        }



    });


    Promise.all(promises).then(() => {
        features = features.sort((x1, x2) => {
            let dt1 = new Date(x1.Started);
            let dt2 = new Date(x2.Started);
            return dt1 - dt2;
        });

        document.body.classList.remove("tempo-my-work-body");
        workFirstPart(features);
        workSecondPart(features);

    });

    function workSecondPart(features) {
        let res = [];
        // res[""];

        features.forEach(x => {
            let numDay = Math.abs(currentDateMin[0] - x.StartedDate.getUTCDate());
            // if (x.Number in res) {
            // if (!res.includes(xIn=>xIn)) {
            if (!res[x.Number]) {
                res[x.Number] = { Name: x.Name, Number: x.Number };
                res[x.Number].DataLogs = [];
                for (let i = 0; i < numDay; ++i) {
                    res[x.Number].DataLogs[i] = 0;
                }
            }

            res[x.Number].DataLogs[numDay] = x.TimeSpent;

        });

        let strres = ToOneString2(res);
        download("time_info_by_ticket" + new Date() + ".txt", strres);

        let mainDiv = ToHtmlTag2(res);
        document.body.prepend(mainDiv);
    }

    function workFirstPart(features) {
        let lastDate = null;
        let res = [];
        let endSeparator = '-'.repeat(7);
        features.forEach(x => {
            let dateLog = x.Started.split(" ")[0];//"T"
            if (lastDate !== dateLog) {
                lastDate = dateLog;
                res.push({ Number: endSeparator, Assignee: endSeparator, Comment: endSeparator, TimeSpent: endSeparator, Started: endSeparator, Name: endSeparator });
            }
            res.push(x);
        });


        let strres = ToOneString1(res);
        download("time_info_by_day" + new Date() + ".txt", strres);

        let mainDiv = ToHtmlTag1(res);
        document.body.prepend(mainDiv);
        // document.body.style.overflow = "scroll !important";

        console.log(res);
    }


})();;






///https://jira.vsk.ru/rest/api/latest/issue/ -- возвращает не все сразу, там page number и totalpageCount

// для https://jira.vsk.ru/browse/DEF-14127
// https://jira.vsk.ru/rest/tempo-time-activities/1/issue/816191/?page=1&size=5&activityType=all&currentUser=true
// https://jira.vsk.ru/secure/AjaxIssueEditAction!default.jspa?decorator=none&issueId=816191&_=1624629419361 -- вот тут описание но оно какое то json\html
// !!!!тут походу все есть https://jira.vsk.ru/rest/api/latest/issue/DEF-14140
// !!!!https://jira.vsk.ru/rest/api/2/myself
// !!!! https://jira.vsk.ru/rest/tempo-time-activities/1/issue/452643/?page=1&size=5&activityType=all&currentUser=true
