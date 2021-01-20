/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
// export interface IHeaderLogoProps {
// }


//TODO сейчас не используется, что бы добавить такое надо вроде норм переписать логику, нужно ли это? походу нет
//или вообще выпилить?
export interface IAdditionalImagesProps {
}

export interface IAdditionalImagesState {
}


export class AdditionalImages extends React.Component<IAdditionalImagesProps, IAdditionalImagesState> {

    constructor(props: any) {
        super(props);
        //this.props.location.search


    }

    render() {
        return <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="..." className="d-block w-100" alt="..."/>
          </div>
         
        </div>
        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

    }

}