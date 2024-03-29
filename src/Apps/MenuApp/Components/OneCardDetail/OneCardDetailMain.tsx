/// <reference path="../../../../../typings/globals.d.ts" />

import * as React from "react";

import { AdditionalImages, CustomImageEdit } from "./AdditionalImages";
import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";

import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { IOneCardFullDataBack } from "../../Models/BackModels/OneCardFullDataBack";
import { IOneCardFullDataEdit, OneCardFullDataEdit } from "../../Models/Entity/IOneCardFullDataEdit";
import { IOneCardInListData, OneCardInListData } from "../../Models/Entity/OneCardInListData";


//TODO сейчас не используется, что бы добавить такое надо вроде норм переписать логику, нужно ли это? походу нет
//или вообще выпилить?
export interface IBodyOneCardDetailMainProps {
    Id?: number;
    CardDataFromList?: IOneCardInListData;
    UpdateElement: (newElementData: IOneCardInListData, isNew: boolean) => void;
}

export interface IOneCardDetailMainState {
    Card?: OneCardFullDataView;
    NewCardData?: IOneCardFullDataEdit;//IOneCardFullData;
    EditNow: boolean;

}



export class OneCardFullDataView implements MappedWithBack<IOneCardFullDataBack> {
    Id: number;
    Title: string;
    Body: string;
    Image?: string;
    Followed: boolean;
    AdditionalImages: CustomImageEdit[];

    FillByBackModel(newData: IOneCardFullDataBack): void {
        this.Id = newData.id;
        this.Title = newData.title;
        this.Body = newData.body;
        this.Image = newData.main_image_path;
        this.Followed = newData.followed;
        this.AdditionalImages = newData.additional_images.map(x => {//какая то проверка мб? что бы массив был в любом случае не null
            let res = new CustomImageEdit();
            res.FillByBackModel(x);
            return res;
        });
    }
}


export class OneCardDetailMain extends React.Component<IBodyOneCardDetailMainProps, IOneCardDetailMainState> {

    constructor(props: any) {
        super(props);
        //this.props.location.search

        let newState: IOneCardDetailMainState = {
            EditNow: false,
        };

        if (this.props.CardDataFromList) {
            //что то передали из списка, можно это отобразить пока грузятся норм данные
            newState.Card = new OneCardFullDataView();
            newState.Card.Id = this.props.CardDataFromList.Id;
            newState.Card.Body = this.props.CardDataFromList.Body;
            newState.Card.Followed = this.props.CardDataFromList.Followed;
            newState.Card.Image = this.props.CardDataFromList.Image;
            newState.Card.Title = this.props.CardDataFromList.Title;
        }

        this.state = newState;

        this.RenderFollowBlock = this.RenderFollowBlock.bind(this);
        this.FollowButtonClick = this.FollowButtonClick.bind(this);

        this.RenderTitle = this.RenderTitle.bind(this);
        this.BodyTextRender = this.BodyTextRender.bind(this);
        this.RenderImage = this.RenderImage.bind(this);
        this.RenderCardOrPreloader = this.RenderCardOrPreloader.bind(this);
        this.RenderEditBlock = this.RenderEditBlock.bind(this);
        this.EditButtonClick = this.EditButtonClick.bind(this);
        this.CancelButtonClick = this.CancelButtonClick.bind(this);
        this.RenderCancelBlock = this.RenderCancelBlock.bind(this);
        this.TitleOnChange = this.TitleOnChange.bind(this);
        this.BodyOnChange = this.BodyOnChange.bind(this);
        this.SaveButtonClick = this.SaveButtonClick.bind(this);
        this.DeleteMainImageClick = this.DeleteMainImageClick.bind(this);
        this.AddToRemoveAdditionalImage = this.AddToRemoveAdditionalImage.bind(this);
        this.RestoreRemovedAdditionalImage = this.RestoreRemovedAdditionalImage.bind(this);


    }

    componentDidMount() {
        //TODO по
        //надо как то прокинуть из урла
        let cardId: number = -1;

        if (this.props.Id) {
            cardId = this.props.Id;
        }
        else {
            let urlArr = window.location.pathname.split('/');

            // cardId = urlArr[urlArr.length - 1];
            let idStr = urlArr[urlArr.length - 1];
            // console.log(JSON.stringify(idStr));
            if (/^\d+$/.test(idStr)) {//TODO вынести в метод strContainsNum

                cardId = +idStr;
            }
            // console.log(JSON.stringify(cardId));
        }

        let thisRef = this;
        let success = (error: MainErrorObjectBack, data: IOneCardFullDataBack) => {
            if (error || !data) {
                return;
            }
            let newState = { ...thisRef.state };
            newState.Card = new OneCardFullDataView();
            newState.Card.FillByBackModel(data);
            thisRef.setState(newState);
        }

        window.G_ArticleController.Detail(
            { Id: cardId },
            success);

    }

    componentWillUnmount() {
        this.state = null;
    }


    RenderFollowBlock() {

        if (!this.state) {
            return <div></div>
        }

        let imgPath = G_PathToBaseImages;
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (this.state.Card && this.state.Card.Followed) {
            imgPath += 'red_heart.png';
        }
        else {
            imgPath += 'white_heart.jpg';
        }

        return <div className='one-card-page-follow-button datail-one-card-button' onClick={this.FollowButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Follow" />
        </div>
    }


    RenderCancelBlock() {
        if (!this.state) {
            return null;
        }

        let imgPath = G_PathToBaseImages + 'cancel.png';
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (!this.state.EditNow) {
            return null;
        }

        return <div className='one-card-page-cancel-button datail-one-card-button' onClick={this.CancelButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Edit" />
        </div>
    }

    RenderEditBlock() {

        if (!this.state) {
            return null;
        }

        let imgPath = G_PathToBaseImages + 'edit-1.svg';
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (this.state.EditNow) {
            return null;
        }

        return <div className='one-card-page-edit-button datail-one-card-button' onClick={this.EditButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Edit" />
        </div>
    }

    RenderSaveBlock() {

        if (!this.state) {
            return null;
        }

        let imgPath = G_PathToBaseImages + 'save-icon.png';
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (!this.state.EditNow) {
            return null;
        }

        return <div className='one-card-page-save-button datail-one-card-button' onClick={this.SaveButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Save" />
        </div>
    }



    EditButtonClick() {
        let newState = { ...this.state };
        newState.EditNow = true;
        newState.NewCardData = Object.assign(new OneCardFullDataEdit(), { ...newState.Card, NeedDeleteMainImage: false });
        // newState.NewCardData.AdditionalImages = newState.Card.AdditionalImages.map(x => {
        //     let res = new CustomImageEdit();
        //     res.FillByCustomImage(x);
        //     return res;
        // });
        this.setState(newState);
    }

    SaveButtonClick() {
        let cardForUpdate: IOneCardFullDataEdit = { ...this.state.NewCardData };
        cardForUpdate.Id = this.state.Card.Id;
        cardForUpdate.MainImageSave = ($('#main_image_input')[0] as HTMLInputElement).files[0];
        cardForUpdate.AdditionalImagesSave = Array.from(($('#additional_images_input')[0] as HTMLInputElement).files);

        //...Array.from(($('#additional_images_input')[0] as HTMLInputElement).files)

        this.EditCardInListRequest(cardForUpdate,
            (fromBack: IOneCardFullDataBack) => {
                // let newCardData = new OneCardInListData(cardForUpdate);
                let newState = { ...this.state };
                newState.Card.FillByBackModel(fromBack);
                // newState.Card.Title=newState.NewCardData.Title;
                // newState.Card.Title=newState.NewCardData.body;
                newState.NewCardData = null;

                newState.EditNow = false;
                this.setState(newState);
                if (this.props.UpdateElement) {
                    let upd = new OneCardInListData();
                    upd.FillByFullModel(newState.Card);
                    this.props.UpdateElement(upd, false);
                }
            });
    }

    CancelButtonClick() {
        let newState = { ...this.state };
        newState.EditNow = false;
        newState.NewCardData = null;
        this.setState(newState);
    }


    FollowButtonClick() {

        let thisRef = this;
        let success = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error || !data) {
                return;
            }
            let newState = { ...thisRef.state };
            if (data.result === true) {

                newState.Card.Followed = true;
                thisRef.setState(newState);
            }
            else if (data.result === false) {
                newState.Card.Followed = false;
                thisRef.setState(newState);
            }
        }
        window.G_ArticleController.Follow({ Id: this.state.Card.Id }, success);

    }

    DeleteMainImageClick() {
        if (!this.state.EditNow) {
            return;
        }

        let newState = { ...this.state };
        newState.NewCardData.NeedDeleteMainImage = !newState.NewCardData.NeedDeleteMainImage;
        this.setState(newState);
    }

    TitleOnChange(e: any) {
        // console.log(this.state);
        let newState = Object.assign({}, this.state);
        newState.NewCardData.Title = e.target.value;
        // console.log(newState);
        this.setState(newState);
    }

    BodyOnChange(e: any) {
        let newState = Object.assign({}, this.state);
        newState.NewCardData.Body = e.target.value;
        this.setState(newState);
    }

    AddToRemoveAdditionalImage(id: number) {
        this.ChangeRemoveStatusAdditionalImage(id, true);
    }

    RestoreRemovedAdditionalImage(id: number) {
        this.ChangeRemoveStatusAdditionalImage(id, false);
    }



    RenderTitle() {
        if (this.state?.Card) {
            let title = this.state.Card.Title;
            if (this.state.NewCardData) {
                title = this.state.NewCardData.Title;
            }

            if (this.state.EditNow) {
                return <input type="text" className='persent-100-width form-control' value={title} onChange={this.TitleOnChange} />
            }
            else {
                return <h1>{title}</h1>
            }

        }
        else {
            return <h1>WAITING</h1>
        }

    }

    BodyTextRender() {
        if (this.state?.Card) {
            let body = this.state.Card.Body;
            if (this.state.NewCardData) {
                body = this.state.NewCardData.Body;
            }

            if (this.state.EditNow) {
                // return <input type="text" className='persent-100-width form-control' value={body} onChange={this.BodyOnChange} />
                return <textarea className='persent-100-width form-control' value={body} onChange={this.BodyOnChange} />
            }
            else {
                return <p>{body}</p>
            }

        }
        else {
            return <p>WAITING</p>
        }

    }

    RenderImage() {
        let imgPath = G_EmptyImagePath;
        if (this.state.Card && this.state.Card.Image) {
            imgPath = this.state.Card.Image;
        }

        let editFunc: JSX.Element = <div></div>;
        if (this.state.EditNow) {
            editFunc = <div>
                <input id="main_image_input" type="file"></input>
                <p>удалить картинку</p>
                <input onClick={this.DeleteMainImageClick} type='checkbox'></input>
            </div>
        }

        return <div><img className="persent-100-width-height" src={imgPath} />{editFunc}</div>
    }

    // AdditionalImageRender() {

    // }

    RenderActionButton() {
        return <div>
            {this.RenderTitle()}
            {this.RenderFollowBlock()}
            {this.RenderEditBlock()}
            {this.RenderSaveBlock()}
            {this.RenderCancelBlock()}
        </div>
    }


    RenderCardOrPreloader() {
        if (!this.state.Card) {
            return <div className='card-list-preloader'>
                {/* <img src={G_PreloaderPath} className='persent-100-width-height'></img> */}
                <div className="spinner-border persent-100-width-height" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }

        return <div className="container">
            <div>
                <div className="one-card-header row padding-10-top">
                    <div className='col-sm-6 col-md-7 one-card-header-info'>
                        {/* <p>{this.state ? this.state.Title : 'Loading'}</p> */}
                        {this.RenderActionButton()}
                    </div>
                    <div className='col-md-1 col-sm-1 padding-10-top'></div>
                    <div className='col-sm-5 col-md-4 one-card-header-image padding-10-top'>

                        {/* <img src={this.state?.Image} /> */}
                        {this.RenderImage()}

                    </div>
                </div>
                <div className='padding-10-top'></div>
                <div className="one-card-body-info row padding-10-top">
                    {/* <div className='col-sm-12'>{this.AdditionalImageRender()}</div> */}
                    <AdditionalImages Images={this.state.Card.AdditionalImages}
                        EditNow={this.state.EditNow} AddToRemoveAdditionalImage={this.AddToRemoveAdditionalImage}
                        RestoreRemovedAdditionalImage={this.RestoreRemovedAdditionalImage}></AdditionalImages>
                    <div className='col-sm-12'>{this.BodyTextRender()}</div>
                    <div className='col-sm-12'>MORE INFO</div>
                </div>
            </div>

        </div>

    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        // return <BodyCardsListMain />
        return this.RenderCardOrPreloader();

    }






    private EditCardInListRequest(newElement: IOneCardFullDataEdit, callBack: any) {//TODO схожий метод уже есть, вынести куда нибудь?? #any

        let success = (error: MainErrorObjectBack, data: IOneCardFullDataBack) => {
            if (error || !data) {
                return;
            }
            callBack(data);
        }
        window.G_ArticleController.Edit(newElement, success);


    }

    private ChangeRemoveStatusAdditionalImage(id: number, newStatus: boolean) {
        let newState = { ...this.state };
        newState.Card.AdditionalImages.forEach(img => {
            if (img.Id == id) {
                img.NeedRemove = newStatus;
                this.setState(newState);
                return;
            }
        });
    }





}
