import React,{useState} from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie'
const ListHeader = ({ listName ,getData}) => {
    const [cookies, setCookie, removeCookie] =useCookies(null)
    const [showModal, setShowModal]=useState(false)
    const signOut = () => {
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

    
    return (
        <div className='flex justify-between w-[100%]'>
            <h1 className=" px-6 py-4 text-3xl font-bold text-gray-700">
                {listName}
            </h1>
            <div className='flex items-center gap-2'>
                <button className='my-0 mx-[5px] px-2 text-md rounded-2xl bg-slate-300 border-2 border-gray-800' onClick={()=> setShowModal(true)}>ADD NEW</button>
                <button className='my-0 mx-[5px] px-2 text-md rounded-2xl bg-slate-300 border-2 border-gray-800' onClick={signOut}>SIGN OUT</button>
            </div>
            {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
        </div>
    )
}

export default ListHeader