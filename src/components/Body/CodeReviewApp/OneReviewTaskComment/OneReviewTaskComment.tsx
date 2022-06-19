import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { IOneTaskReviewCommentDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { IAuthState } from '../../../../Models/Models/AuthState';


require('./OneReviewTaskComment.css');


export interface IOneReviewTaskCommentProps {
    AuthInfo: IAuthState;
    Comment: IOneTaskReviewCommentDataBack;
    ProjectUsers: IProjectUserDataBack[];
    DeleteComment: (id: number) => void;
    UpdateComment: (id: number, text: string) => void;
}



const OneReviewTaskComment = (props: IOneReviewTaskCommentProps) => {
    const [editMode, setEditMode] = useState(false);
    const [changedText, setChangedText] = useState(props.Comment.Text);

    useEffect(() => {
        setChangedText(props.Comment.Text);
    }, [props.Comment.Text]);

    const deleteComment = () => {
        if (!confirm('Удалить комментарий?')) {
            return;
        }

        let deleteComment = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                return;
            }

            if (data?.result) {
                props.DeleteComment(props.Comment.Id);
            }
        };

        window.G_CodeReviewCommentController.DeleteComment(props.Comment.Id, deleteComment);
    }


    const updateComment = () => {
        let updateComment = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                return;
            }

            if (data?.result) {
                props.UpdateComment(props.Comment.Id, changedText);
                setEditMode(false);
            }
        };

        window.G_CodeReviewCommentController.UpdateComment(props.Comment.Id, changedText, updateComment);
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
            {haveChenges ? <>
                <div className='review-task-comment-cancel-button' onClick={() => cancelEditMode()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'} alt="Cancel" title='отменить изменения' />
                </div>
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




export default OneReviewTaskComment