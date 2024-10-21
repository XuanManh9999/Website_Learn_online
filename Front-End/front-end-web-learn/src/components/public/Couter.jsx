import React from 'react'
import { couterSelector } from '../../redux/selector'
import { useDispatch, useSelector } from 'react-redux'
import { up, down } from '../../redux/action/couterActions';
export default function Couter() {
    const state = useSelector(couterSelector);
    const dispatch = useDispatch()
    const handleUp = () => {
        dispatch(up())
    }
    const handleDown = () => {
        dispatch(down())
    }
    return (
        <main>
            <h1>{state?.value || 0}</h1>
            <button onClick={handleUp}>Up</button>
            <button onClick={handleDown}>Down</button>
        </main>
    )
}
