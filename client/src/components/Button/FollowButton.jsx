import React, {useCallback} from 'react'
import useSubscribe from '../../hooks/subscribe/useSubscribe'
import useSubscriberStore from '../../store/useSubscriberStore'
import LoginModal from '../Modal/LoginModal'
import useAuthContext from '../../context/authContext/useAuthContext'


const FollowButton = ({authorID, type="follow"}) => {
  const {auth} = useAuthContext();
  const {subscribeLoading ,subscribe} = useSubscribe()
  const {subscribers} = useSubscriberStore();


  const handleSubscribe = async (e) => {
    await subscribe(authorID)
  }

  return (
    <>
      <button onClick={auth ? handleSubscribe : ()=>{document.getElementById("my_modal_3").showModal()}} className={`${type === "link" ? "btn btn-link" :  "btn btn-info "}   m-2 `}>
        {subscribeLoading 
        ?
        <span className="loading loading-ring loading-lg"></span>
        :
        subscribers.some((sub)=>sub.subscribedToUser === authorID) ? "Subscribed" : "Subscribe"
        }
      </button>
      <LoginModal/>
    </>
  )
}

export default FollowButton
