import React from 'react'
import useSubscribe from '../../hooks/subscribe/useSubscribe'
import useSubscriberStore from '../../store/useSubscriberStore'
import useGetSubscribed from '../../hooks/subscribe/useGetSubscribed.'



const FollowButton = ({authorID}) => {

  const {subscribeLoading ,subscribe} = useSubscribe()
  const {subscribers} = useSubscriberStore();
  useGetSubscribed();

  const handleSubscribe = async (e) => {
    await subscribe(authorID)
  }

  return (
      <button onClick={handleSubscribe} className={`btn  btn-info   `}>
        {subscribeLoading 
        ?
        <span className="loading loading-ring loading-lg"></span>
        :
        subscribers.some((sub)=>sub.subscribedToUser === authorID) ? "Subscribed" : "Subscribe"
        }
        
        </button>
  )
}

export const FollowButtonLink = ({authorID}) => {
  
  const {subscribeLoading, subscribe} = useSubscribe()
  const {subscribers} = useSubscriberStore();
  useGetSubscribed();



  const handleSubscribe = async (e) => {
    await subscribe(authorID);
  }  

  console.log(subscribers);

  return (
    <button onClick={handleSubscribe} className="btn  btn-link"> {subscribeLoading 
      ?
      <span className="loading loading-ring loading-lg"></span>
      :
      subscribers.some((sub)=>sub.subscribedToUser === authorID) ? "Subscribed" : "Subscribe"
      }</button>
  )
}

export default FollowButton
