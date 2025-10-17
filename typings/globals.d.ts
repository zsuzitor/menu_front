// import * as AjaxHelper from "../src/components/_ComponentsLink/AjaxLogic";
// import("../src/components/_ComponentsLink/AjaxLogic").IAjaxInputObject;



declare var G_EmptyImagePath: string;
declare var G_PathToBaseImages: string;
declare var G_PathToServer: string;
declare var G_PathToServerMenu: string;
declare var G_PreloaderPath: string;
declare var G_AjaxHelper: import("../src/Models/AjaxLogic").IAjaxHelper;
declare var G_ErrorHandleLogic: import("../src/Models/BL/ErrorHandleLogic").IMainErrorHandler;
declare var G_AddAbsoluteAlertToState: (alert: import("../src/Models/Entity/AlertData").AlertData) => void;
// declare var G_PathToServerMenu: string;
// declare function GoAjaxRequest(obj:import("../src/components/_ComponentsLink/AjaxLogic").IAjaxInputObject, fileLoad:boolean=false):void;


declare var G_AuthenticateController: import("../src/Models/Controllers/AuthenticateController").IAuthenticateController;
declare var G_ArticleController: import("../src/Apps/MenuApp/Models/Controllers/ArticleController").IArticleController;
declare var G_WordsCardsController: import("../src/Apps/WordsCardsApp/Models/Controllers/WordsCardsController").IWordsCardsController;
declare var G_WordsListController: import("../src/Apps/WordsCardsApp/Models/Controllers/WordsListController").IWordsListController;
declare var G_UsersController: import("../src/Models/Controllers/UsersController").IUsersController;
declare var G_PlaningPokerController: import("../src/Apps/PlaningPoker/Models/Controllers/PlaningPokerController").IPlaningPokerController;
declare var G_TaskManagementProjectController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementProjectController").ITaskManagementProjectController;
declare var G_TaskManagementWorkTimeController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementWorkTimeController").ITaskManagementWorkTimeController;
declare var G_TaskManagementTaskController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementTaskController").ITaskManagementTaskController;
declare var G_TaskManagementTaskStatusController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementTaskStatusController").ITaskManagementTaskStatusController;
declare var G_TaskManagementUserController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementUserController").ITaskManagementUserController;
declare var G_TaskManagementCommentController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementCommentController").ITaskManagementCommentController;
declare var G_TaskManagementSprintController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementSprintController").ITaskManagementSprintController;
declare var G_TaskManagementLabelController: import("../src/Apps/TaskManagementApp/Models/Controllers/TaskManagementLabelController").ITaskManagementLabelController;
declare var G_VaultController: import("../src/Apps/Vault/Models/Controllers/VaultController").IVaultController;

declare var TaskManagementCounter: number;
declare var VaultCounter: number;



