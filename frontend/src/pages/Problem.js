import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQnaContext } from '../hooks/useQnaContext'
import { useAuthContext } from '../hooks/useAuthContext'

import QnaDetails from '../components/QnaDetails'

const Problem = () => {
    const { qnas, dispatch } = useQnaContext()
    const { user } = useAuthContext()

    const [isQna, setIsQna] = useState(true)

    useEffect(() => {
        const fetchQnas = async () => {
            const response = await fetch('/api/qna/problemset', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_QNAS', payload: json })
            }
        }



        if (user) {
            fetchQnas()
        }
    }, [dispatch, user])


    useEffect(() => {
        if(qnas?.length === 0){
            setIsQna(false)
        }
    }, [qnas])


    return (
        <div className="problems">
            <Link to="/problem/new" style={{ textDecoration: 'none', color: 'inherit' }}> <button className='addd'>add a problem</button></Link>
            <h4>these are my problems:</h4>
            <div>   
                {
                    isQna ? qnas?.map(qna => (
                        <QnaDetails qna={qna} key={qna._id} />
                    )) : (
                        <p>yo no problimo is added here yet.</p>
                    )
                }
            </div>
        </div>
    )
}


export default Problem