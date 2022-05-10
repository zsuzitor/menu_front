import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../_ComponentsLink/BackModel/BoolResultBack';
import { IOneTaskReviewCommentDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';


 require('./OneReviewTaskComment.css');


export interface IOneReviewTaskCommentProps {
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
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {
                props.DeleteComment(props.Comment.Id);
            }
        };

        window.G_CodeReviewController.DeleteComment(props.Comment.Id, deleteComment);
    }


    const updateComment = () => {
        let updateComment = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {
                props.UpdateComment(props.Comment.Id, changedText);
                setEditMode(false);
            }
        };

        window.G_CodeReviewController.UpdateComment(props.Comment.Id, changedText, updateComment);
    }

    const cancelEditMode = () => {
        setEditMode(false);
        setChangedText(props.Comment.Text);
    }

    let user = props.ProjectUsers.find(x => x.Id == props.Comment.CreatorId);

    if (editMode) {
        return <div className='one-review-comment-block'>
            <p>{user?.Name || "id:" + props.Comment.CreatorId}</p>
            <textarea value={changedText} onChange={e => setChangedText(e.target.value)} className='persent-100-width'></textarea>
            <button onClick={() => cancelEditMode()}>Отменить</button>
            <button onClick={() => updateComment()}>Сохранить изменения</button>
        </div>
    }

    return <div className='one-review-comment-block'>
        <p>{user?.Name || "id:" + props.Comment.CreatorId}</p>
        <p>{props.Comment.Text}</p>
        <button onClick={() => deleteComment()}>Удалить</button>
        <button onClick={() => setEditMode(st => true)}>Изменить</button>
    </div>

}




export default OneReviewTaskComment