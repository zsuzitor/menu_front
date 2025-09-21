import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";



interface IAddEditSprintOwnProps {
    Id: number;
    ProjectId: number;
    Name: string;
    StartDate: Date;
    EndDate: Date;

    CreateSprint: (projectId: number, sprintName: string, dateFrom: Date, dateTo: Date) => void;
    UpdateSprint: (id: number, sprintName: string, dateFrom: Date, dateTo: Date) => void;
}


interface IAddEditSprintStateToProps {
}

interface IAddEditSprintDispatchToProps {
}

export interface IAddEditSprintProps extends IAddEditSprintStateToProps, IAddEditSprintOwnProps, IAddEditSprintDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddEditSprintOwnProps) => {
    let res = {} as IAddEditSprintStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddEditSprintOwnProps) => {
    let res = {} as IAddEditSprintDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);