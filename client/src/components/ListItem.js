import React,{useState} from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'
const ListItem = ({task ,getData}) => {
  const [showModal, setShowModal]=useState(false)

const deleteItem = async ()=>{
  try{
    const response= await fetch(`http://localhost:3001/todos/${task.id}`,{
      method: 'DELETE',

    })
    if (response.status===200){
      
      getData()
  }
  }
  catch(err){
    console.log(err)
  }
}

  return (
    <li className='w-[100%] my-[10px] mx-[0px] border-4 flex justify-between'>
        <div className='flex justify-evenly gap-3 py-1 px-1'>
        <div className='p-1'><TickIcon /></div>
        <p className='text-lg font-sans'>{task.title}</p>
        <div className='p-2'><ProgressBar progress={task.progress}/></div>
        </div>

        <div className='flex justify-between gap-2 p-1'>
            <button onClick={()=> setShowModal(true)} className='border-2 rounded-xl px-2 hover:bg-green-400'>Edit</button>
            <button onClick={deleteItem} className='border-2 rounded-xl px-2 hover:bg-green-400'>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
    </li>
  )
}

export default ListItem