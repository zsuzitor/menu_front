/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { CustomImage } from "../../_ComponentsLink/Models/CustomImage";
// export interface IHeaderLogoProps {
// }


//TODO сейчас не используется, что бы добавить такое надо вроде норм переписать логику, нужно ли это? походу нет
//или вообще выпилить?
export interface IAdditionalImagesProps {
  Images: CustomImage[];
  EditNow: boolean;
}

export interface IAdditionalImagesState {
}


export class AdditionalImages extends React.Component<IAdditionalImagesProps, IAdditionalImagesState> {

  constructor(props: any) {
    super(props);
    //this.props.location.search


  }

  render() {
    let LoadlFileInput = <div></div>
    if (this.props.EditNow) {
      LoadlFileInput = <input id="additional_images_input" multiple={true} type="file"></input>
    }

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