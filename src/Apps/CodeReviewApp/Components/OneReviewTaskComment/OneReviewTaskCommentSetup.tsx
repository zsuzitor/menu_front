import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { CommentDelete } from "../../Models/Entity/CommentDelete";
import { CommentUpdate } from "../../Models/Entity/CommentUpdate";
import { OneTaskReviewComment } from "../../Models/Entity/OneTaskReviewComment";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";


interface IOneReviewTaskCommentOwnProps {
    Comment: OneTaskReviewComment;
    TaskId: number;
}


interface IOneReviewTaskCommentStateToProps {
    ProjectUsers: ProjectUser[];
    AuthInfo: IAuthState;

}

interface IOneReviewTaskCommentDispatchToProps {
    UpdateComment: (id: number, text: string) => void;
    DeleteComment: (id: number) => void;
}

export interface IOneReviewTaskCommentProps extends IOneReviewTaskCommentStateToProps, IOneReviewTaskCommentOwnProps, IOneReviewTaskCommentDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneReviewTaskCommentOwnProps) => {
    let res = {} as IOneReviewTaskCommentStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.AuthInfo = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneReviewTaskCommentOwnProps) => {
    let res = {} as IOneReviewTaskCommentDispatchToProps;
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