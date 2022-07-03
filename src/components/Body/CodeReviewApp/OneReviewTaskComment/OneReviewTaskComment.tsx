import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { IOneTaskReviewCommentDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { IAuthState } from '../../../../Models/Models/AuthState';
import { CommentDelete } from '../../../../Models/Models/CodeReviewApp/CommentDelete';
import { CommentUpdate } from '../../../../Models/Models/CodeReviewApp/CommentUpdate';
import { AppState } from '../../../../Models/Models/State/AppState';


require('./OneReviewTaskComment.css');




interface IOneReviewTaskCommentOwnProps {
    AuthInfo: IAuthState;
    Comment: IOneTaskReviewCommentDataBack;
    TaskId: number;
}


interface IOneReviewTaskCommentStateToProps {
    ProjectUsers: IProjectUserDataBack[];
}

interface IOneReviewTaskCommentDispatchToProps {
    UpdateComment: (id: number, text: string) => void;
    DeleteComment: (id: number) => void;
}

interface IOneReviewTaskCommentProps extends IOneReviewTaskCommentStateToProps, IOneReviewTaskCommentOwnProps, IOneReviewTaskCommentDispatchToProps {
}



const OneReviewTaskComment = (props: IOneReviewTaskCommentProps) => {
    const [editMode, setEditMode] = useState(false);
    const [changedText, setChangedText] = useState(props.Comment.Text);

    useEffect(() => {
        // setChangedText(props.Comment.Text);
        cancelEditMode();
    }, [props.Comment.Text]);

    const deleteComment = () => {
        if (!confirm('Удалить комментарий?')) {
            return;
        }

        // let deleteComment = (error: MainErrorObjectBack, data: BoolResultBack) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data?.result) {
        //         props.DeleteComment(props.Comment.Id);
        //     }
        // };

        // window.G_CodeReviewCommentController.DeleteCommentRedux(props.Comment.Id);
        props.DeleteComment(props.Comment.Id);
    }


    const updateComment = () => {
        // let updateComment = (error: MainErrorObjectBack, data: BoolResultBack) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data?.result) {
        //         props.UpdateComment(props.Comment.Id, changedText);
        //         setEditMode(false);
        //     }
        // };

        // window.G_CodeReviewCommentController.UpdateCommentRedux(props.Comment.Id, changedText);
        props.UpdateComment(props.Comment.Id, changedText);

    }

    const cancelEditMode = () => {
        setEditMode(false);
        setChangedText(props.Comment.Text);
    }

    let user = props.ProjectUsers.find(x => x.Id == props.Comment.CreatorId);
    // let userCurrent = props.ProjectUsers.find(x => x.MainAppUserId == props.AuthInfo?.User?.Id);
    let commentOwner = user && user.MainAppUserId === props.AuthInfo?.User?.Id;

    let haveChenges = changedText !== props.Comment.Text;

    if (editMode) {
        return <div className='one-review-comment-block'>
            <span>{user?.Name || "id:" + props.Comment.CreatorId}</span>
            <textarea className='form-control-b persent-100-width' value={changedText} onChange={e => setChangedText(e.target.value)}></textarea>
            <div className='review-task-comment-cancel-button' onClick={() => cancelEditMode()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'} alt="Cancel" title='отменить изменения' />
            </div>
            {haveChenges ? <>
                <div className='review-task-comment-save-button' onClick={() => updateComment()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'} alt="Save" title='сохранить' />
                </div></> : <></>}

        </div>
    }

    return <div className='one-review-comment-block'>
        <span>{user?.Name || "id:" + props.Comment.CreatorId}</span>
        <br />
        <span>{props.Comment.Text}</span>
        {commentOwner ? <>
            <div className='review-task-comment-delete-button' onClick={() => deleteComment()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='удалить задачу' />
            </div>
            <div className='review-task-comment-edit-button' onClick={() => setEditMode(st => true)}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'edit-1.svg'} alt="Edit" title='Редактировать' />
            </div></> : <></>}

    </div>

}






const mapStateToProps = (state: AppState, ownProps: IOneReviewTaskCommentOwnProps) => {
    let res = {} as IOneReviewTaskCommentStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
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


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(OneReviewTaskComment);