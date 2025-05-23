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
declare var G_CodeReviewProjectController: import("../src/Apps/CodeReviewApp/Models/Controllers/CodeReviewProjectController").ICodeReviewProjectController;
declare var G_CodeReviewTaskController: import("../src/Apps/CodeReviewApp/Models/Controllers/CodeReviewTaskController").ICodeReviewTaskController;
declare var G_CodeReviewTaskStatusController: import("../src/Apps/CodeReviewApp/Models/Controllers/CodeReviewTaskStatusController").ICodeReviewTaskStatusController;
declare var G_CodeReviewUserController: import("../src/Apps/CodeReviewApp/Models/Controllers/CodeReviewUserController").ICodeReviewUserController;
declare var G_CodeReviewCommentController: import("../src/Apps/CodeReviewApp/Models/Controllers/CodeReviewCommentController").ICodeReviewCommentController;
declare var G_VaultController: import("../src/Apps/Vault/Models/Controllers/VaultController").IVaultController;

declare var CodeReviewCounter: number;


