import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Accordion } from './Accordion'
import { useQnaContext } from '../hooks/useQnaContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommentsContext } from '../hooks/useCommentsContext'
import { FaTrash } from "react-icons/fa";

import { useEffect, useState } from "react"
import { TiArrowUpThick } from "react-icons/ti";
import { Link } from 'react-router-dom'

const QnaDetails = ({ qna }) => {
    const { dispatch: disp } = useCommentsContext()
    const { dispatch } = useQnaContext()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const { user } = useAuthContext()
    const [clicked, setClicked] = useState(true)
    const [isUser, setIsUser] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const YOU = 'me'

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`/api/comments/${qna._id}`)
            const json = await response.json()
            if (response.ok) {
                disp({ type: 'SET_COMMENTS', payload: json })
                setComments(json)
            }
        }

        fetchComments()
    }, [clicked])


    const handleClickAdd = async (event) => {
        event.preventDefault()
        if (!user) {
            setIsUser(false)
            return
        }
        const response = await fetch(`/api/comments/${qna._id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok) {
            setComment('')
            disp({ type: 'CREATE_COMMENTS', payload: json })
        }

        setClicked(!clicked)
    }

    const handleClick = async () => {
        if (!user) return
        const response = await fetch(`/api/qna/${qna._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_QNA', payload: json })
        }
    }

    return (
        <div className='problem'>
            {
                qna.ispublic ? (
                    <div>
                        <p style={{ float: 'right' }}>{formatDistanceToNow(new Date(qna.createdAt), { addSuffix: true })}</p>
                        <p>question asked by: <u><Link className='user-link' to={`/profile/${qna.username}`}>{qna.username}</Link></u></p>
                        <hr />
                        <p style={{ fontSize: '23px' }}>Title: <b><u>{qna.title}</u></b></p>
                        <pre style={{ fontFamily: 'inherit', overflow: 'auto' }}><i>Question</i>:      {qna.question}</pre>
                        {qna.answer &&
                            <pre style={{ fontFamily: 'inherit', overflow: 'auto' }}><i>Query</i>:      {qna.answer}</pre>
                        }
                        {/* <button style={{ float: 'right' }} onClick={handleClick}>delete</button> */}
                        {
                            <div className="comment-section">
                                <hr />
                                <button className='view-comments' onClick={() => { setShowComments(!showComments) }}>{showComments ? (
                                    <>hide all comments</>
                                ) : (
                                    <>show all comments</>
                                )}</button>
                                {
                                    showComments && (
                                        <div>
                                            {comments ? comments?.map(c => (
                                                <div className={c.username === user?.username ? 'same-user-comment' : 'other-user-comment'}>
                                                    <p><u><Link className='user-link' to={`/profile/${c.username}`}>{c.username === user?.username ? YOU : c.username}</Link></u>: <pre style={{ fontStyle: 'inherit' }}>{c.comment}</pre></p>
                                                </div>
                                            )) : (
                                                <p>nothing is here</p>
                                            )}
                                            <hr />
                                        </div>
                                    )
                                }
                                <div >
                                    <form onSubmit={handleClickAdd} className='add-comment'>
                                        <input
                                            type="text"
                                            value={comment}
                                            placeholder='add a comment...'
                                            rows="2"
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <button ><TiArrowUpThick size={25} /></button>
                                    </form>
                                    {
                                        !isUser && (
                                            <p style={{ fontSize: '13px' }}>you need to login first</p>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                ) : (<p></p>)
            }

            {
                !qna.ispublic ? (
                    <div>
                        <button className='delete-icon' onClick={handleClick}><FaTrash style={{ color: '#181a18' }} /></button>
                        <p style={{ fontSize: '23px' }}><b><u>{qna.title}</u></b> \ rating: {qna.rating ? qna.rating : 'n/a'}</p>
                        <Accordion title="Question">
                            <pre style={{ fontFamily: 'inherit', overflow: 'auto' }}>{qna.question}</pre>
                        </Accordion>
                        <Accordion title="Answer:">
                            <pre style={{ fontFamily: 'inherit', overflow: 'auto' }}>{qna.answer}</pre>
                        </Accordion>
                        <p style={{ float: 'right' }}>{formatDistanceToNow(new Date(qna.createdAt), { addSuffix: true })}</p>
                    </div>
                ) : (<p></p>)
            }


        </div >
    )
}

export default QnaDetails