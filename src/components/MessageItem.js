import {auth} from '../firebase.config'

const MessageItem = (props) => {

    if (!auth.currentUser) return

    const {text, uid, photoURL}= props.message
    const className = uid === auth.currentUser.uid ? "end" : "start"
    return ( 
        <>
            <div className={`chat chat-${className}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img src={photoURL} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50"></time>
                </div>
                <div className="chat-bubble">{text}</div>
            </div>
        </>
     );
}
 
export default MessageItem;