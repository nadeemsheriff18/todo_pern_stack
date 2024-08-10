import React,{useState,useEffect} from 'react';
import './index.css';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App=()=> {
  const [cookies, setCookie, removeCookie]=useCookies(null)
const userEmail=cookies.Email
const [tasks, setTasks]=useState(null)
const AuthToken=cookies.AuthToken
  const getData=async()=>{
    
    try{
      const response=await fetch(`http://localhost:3001/todos/${userEmail}`)
      const data=await response.json()
      setTasks(data)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    if(AuthToken){
    getData()
    }}
,[])
  return (
    
    <div className="flex flex-col bg-white w-[620px] mt-[50px] p-[10px] rounded-xl">
    {!AuthToken && <Auth/>}
    {AuthToken &&
    <>
      <ListHeader listName={"Holiday Tick list"} getData={getData}/>
      <p>Welcome Back {userEmail}</p>
      {tasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/>)}
    </>
    }
    </div>
  );
}

export default App;
