import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";



interface IFinancialAssistantMainOwnProps {
}


interface IFinancialAssistantMainStateToProps {
    Auth: IAuthState;
}

interface IFinancialAssistantMainDispatchToProps {
}

export interface IFinancialAssistantMainProps extends IFinancialAssistantMainStateToProps, IFinancialAssistantMainOwnProps, IFinancialAssistantMainDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IFinancialAssistantMainOwnProps) => {
    let res = {} as IFinancialAssistantMainStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IFinancialAssistantMainOwnProps) => {
    let res = {} as IFinancialAssistantMainDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);