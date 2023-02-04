import { useEffect, useRef, useState } from "react"
import {db, auth} from '../firebase.config';
import MessageItem from "./MessageItem";
import {useCollection} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth'
import Navbar from './Navbar';
import {collection, addDoc, serverTimestamp,orderBy, limit, query} from 'firebase/firestore'


const ChatMessage = () => {
    
    const messageRef = collection(db, "message")

    const queryRef = query(messageRef, orderBy("createdAt", "desc"), limit(20))
    const [messages] = useCollection(queryRef,{idField:"id"})
    const scrollTo = useRef(null)
    const[user] = useAuthState(auth)
    const [formValue, setFormValue] = useState('')

    const sendMessage = async(e) =>{
        e.preventDefault()
    
        if(!user || !formValue) return
    
        const payload = {text: formValue, createdAt: serverTimestamp(), uid: user.uid, photoURL: user.photoURL}
        await addDoc(messageRef, payload)
        setFormValue('')
    }


    useEffect(()=>{
        if (!auth.currentUser) return
        scrollTo.current.scrollIntoView({behavior: "smooth"})

    },[messages])
    
    return (
        <>
        <Navbar />
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                <div>
                    <div className="card w-56 bg-gray-100 shadow-lg items-center">
                        <div className="card-body items-center text-center">
                        <div className="avatar pb-2">
                            <div className="w-20">
                                <img className="mask mask-squircle" src={user.photoURL} />
                            </div>
                        </div>
                            <h2 className="card-title">{auth.currentUser.displayName}</h2>
                            <div className="card-actions justify-end">
                                <div className="badge badge-success">Online</div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">Chat Members</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                    {/* Here goes chat members */}
                    <div className="avatar-group -space-x-6">
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral text-neutral-content">
                                <span>S</span>
                            </div>
                        </div>
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral text-neutral-content">
                                <span>O</span>
                            </div>
                        </div>
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral text-neutral-content">
                                <span>A</span>
                            </div>
                        </div>
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral text-neutral-content">
                                <span>M</span>
                            </div>
                        </div>
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral text-neutral-content">
                                <span>Z</span>
                            </div>
                        </div>
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral-focus text-neutral-content">
                            <span>+10</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div ref={scrollTo}></div>
                        {messages && messages.docs.map(msg => <MessageItem key={msg.id} message={msg.data()}/>)}
                    </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div>
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input value={formValue} onChange={e=>setFormValue(e.target.value)} type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"/>
                            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="ml-4">
                        <button onClick={(e)=>sendMessage(e)} className="flex items-center justify-center bg-primary hover:bg rounded-xl text-white px-4 py-1 flex-shrink-0">
                            <span>Send</span>
                            <span className="ml-2">
                                <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
     );
}
 
export default ChatMessage;