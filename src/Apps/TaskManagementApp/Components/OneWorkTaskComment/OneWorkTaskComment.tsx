import React, { useState, useEffect } from 'react';
import connectToStore, { IOneWorkTaskCommentProps } from './OneWorkTaskCommentSetup';


require('./OneWorkTaskComment.css');





const OneWorkTaskComment = (props: IOneWorkTaskCommentProps) => {
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

        props.DeleteComment(props.Comment.Id);
    }


    const updateComment = () => {
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
        return <div className='one-work-task-comment-block'>
            <div className='one-work-task-comment-block-data'>
                <span>{user?.Name || "id:" + props.Comment.CreatorId}</span>
                <textarea className='form-control-b persent-100-width' value={changedText}
                    onChange={e => setChangedText(e.target.value)}></textarea>
            </div>
            <div className='one-work-task-comment-block-buttons'>
                <div className='work-task-comment-cancel-button' onClick={() => cancelEditMode()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'}
                        alt="Cancel" title='отменить изменения' />
                </div>
                {haveChenges ? <>
                    <div className='work-task-comment-save-button' onClick={() => updateComment()}>
                        <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'}
                            alt="Save" title='сохранить' />
                    </div></> : <></>}
            </div>
        </div>
    }

    return <div className='one-work-task-comment-block'>
        <div className='one-work-task-comment-block-data'>
            <span>{user?.Name || "id:" + props.Comment.CreatorId}</span>
            <br />
            <span>{props.Comment.Text}</span>
        </div>
        <div className='one-work-task-comment-block-buttons'>
            {commentOwner ? <>
                <div className='work-task-comment-delete-button' onClick={() => deleteComment()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'}
                        alt="Delete" title='удалить задачу' />
                </div>
                <div className='work-task-comment-edit-button' onClick={() => setEditMode(st => true)}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'edit-1.svg'}
                        alt="Edit" title='Редактировать' />
                </div></> : <></>}
        </div>
    </div>

}





// and that function returns the connected, wrapper component:
export default connectToStore(OneWorkTaskComment);