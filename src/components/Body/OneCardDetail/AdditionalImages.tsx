/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { CustomImage } from "../../_ComponentsLink/Models/CustomImage";
// export interface IHeaderLogoProps {
// }



export class CustomImageEdit extends CustomImage {
  NeedRemove: boolean;

  constructor() {
    super();
    this.NeedRemove = false;
  }

  FillByCustomImage(newData: CustomImage) {
    Object.assign(this, newData);
  }
}



//TODO сейчас не используется, что бы добавить такое надо вроде норм переписать логику, нужно ли это? походу нет
//или вообще выпилить?
export interface IAdditionalImagesProps {
  Images?: CustomImageEdit[];
  // Images: CustomImage[];
  EditNow: boolean;

  // AddToRemoveAdditionalImage: (id: number) => void;
  // CancelRemoveAdditionalImage: (id: number) => void;
}

export interface IAdditionalImagesState {
}


export class AdditionalImages extends React.Component<IAdditionalImagesProps, IAdditionalImagesState> {

  constructor(props: any) {
    super(props);
    //this.props.location.search

    this.RenderOneAdditionalImageActions = this.RenderOneAdditionalImageActions.bind(this);
  }

  RenderOneAdditionalImageActions() {
    if (this.props.EditNow) {
      return <div>УДАЛИТЬ КАРТИНКУ</div>
    }
  }

  render() {
    let LoadlFileInput = <div></div>
    if (this.props.EditNow) {
      LoadlFileInput = <input id="additional_images_input" multiple={true} type="file"></input>
    }

    // let imageArr: CustomImage[] | CustomImageEdit[];
    // if (this.props.EditNow) {
    //   imageArr = this.props.ImagesEdit;
    // }
    // else {
    //   imageArr = this.props.Images;
    // }

    if (this.props.Images) {
      return <div>{LoadlFileInput}
        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-ride="carousel" data-pause={false}>
          <div className="carousel-inner">
            {this.props.Images.map((x, index) => {
              let actv = '';
              if (index == 0) {
                actv = ' active';
              }

              return <div className={"carousel-item" + actv} key={index}>
                {this.RenderOneAdditionalImageActions()}
                <img src={G_PathToBaseImages + x.Path} className="d-block w-100" alt="..." />
              </div>

            })}

          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    }

    return <div></div>

  }

}