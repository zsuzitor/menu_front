import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ReactNode } from "react";


interface IPopupWindowOwnProps {
    ButtonContent: ReactNode;
    PopupContent: ReactNode; // Любое React-содержимое (строка, JSX, компонент)
    Position?: 'top' | 'bottom' | 'left' | 'right';
}


interface IPopupWindowStateToProps {
}

interface IPopupWindowDispatchToProps {

}

export interface IPopupWindowProps extends IPopupWindowStateToProps, IPopupWindowOwnProps, IPopupWindowDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPopupWindowOwnProps) => {
    let res = {} as IPopupWindowStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPopupWindowOwnProps) => {
    let res = {} as IPopupWindowDispatchToProps;


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);