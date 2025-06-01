import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { CommentDelete } from "../../Models/Entity/CommentDelete";
import { CommentUpdate } from "../../Models/Entity/CommentUpdate";
import { OneWorkTaskComment } from "../../Models/Entity/OneTaskWorkComment";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";


interface IOneWorkTaskCommentOwnProps {
    Comment: OneWorkTaskComment;
    TaskId: number;
}


interface IOneWorkTaskCommentStateToProps {
    ProjectUsers: ProjectUser[];
    AuthInfo: IAuthState;

}

interface IOneWorkTaskCommentDispatchToProps {
    UpdateComment: (id: number, text: string) => void;
    DeleteComment: (id: number) => void;
}

export interface IOneWorkTaskCommentProps extends IOneWorkTaskCommentStateToProps, IOneWorkTaskCommentOwnProps, IOneWorkTaskCommentDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneWorkTaskCommentOwnProps) => {
    let res = {} as IOneWorkTaskCommentStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.AuthInfo = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneWorkTaskCommentOwnProps) => {
    let res = {} as IOneWorkTaskCommentDispatchToProps;
    res.DeleteComment = (id: number) => {
        let forDel = new CommentDelete();
        forDel.Id = id;
        forDel.TaskId = ownProps.TaskId;
        dispatch(window.G_CodeReviewCommentController.DeleteCommentRedux(forDel));
    };

    res.UpdateComment = (id: number, text: string) => {
        let comm = new CommentUpdate();
        comm.TaskId = ownProps.TaskId;
        comm.Id = id;
        comm.Text = text;
        dispatch(window.G_CodeReviewCommentController.UpdateCommentRedux(comm));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);