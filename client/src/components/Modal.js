import React,{useState} from 'react'
import { useCookies } from 'react-cookie'

const Modal = ({mode, setShowModal ,task,getData}) => {

    const [cookies, setCookie, removeCookie]=useCookies(null)
    const editMode=mode=== 'edit'?true:false

    const [data, setData]=useState({
        user_email: editMode? task.user_email :cookies.Email,
        title:editMode? task.title : null,
        progress: editMode ? task.progress :50,
        date:editMode? "":new Date()
    })

    const handleChange=(e)=>{
        const {name, value}=e.target

        setData(data =>({
          ...data,
          [name] : value
        }))
        console.log(data)
    }
    
const postData = async(e)=>{
    e.preventDefault()
    try{
        const response=await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (response.status===200){
            console.log('WORKED!');
            setShowModal(false)
            getData()
        }
    }
    catch(err){
        console.log(err)
    }
}

const editData= async(e)=>{
    e.preventDefault()
    try{
        const response = await fetch(`http://localhost:3001/todos/${task.id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (response.status===200){
            console.log('WORKED!');
            setShowModal(false)
            getData()
        }
        
    }
    catch(err){
        console.log(err)
    }
}

  return (
    <div className='overlay'>
        <div className='bg-white rounded-xl py-1'>
            <div className='flex justify-between px-3 py-2'>
                <h3 className='text-lg font-sans'>Let's {mode} your task</h3>
                <button className='font-bold ' onClick={()=>setShowModal(false)}>X</button>
            </div>
            <form className='flex flex-col px-5 py-3 gap-3 items-center'>
                <input required maxLength={30} placeholder='Your task goes here' name='title' value={data.title} onChange={handleChange} className='border-2 px-1 w-[100%]'/>
                
                <label for="range">Drag to select your current progress</label>
                <input  required type='range' min="0" max="100" name="progress" value={data.progress} onChange={handleChange} />
                <input type='submit' onClick={editMode? editData: postData} className='border-2 rounded-xl hover:bg-green-500 w-1/2 cursor-pointer'/>
            </form>
        </div>
    </div>
  )
}

export default Modal