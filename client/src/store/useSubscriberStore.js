import {create} from 'zustand';

const useSubscriberStore = create((set)=>({
    subscribers : [],
    setSubscribed : (subscribers)=>{
        set((state)=>({
            subscribers : subscribers
        }))
    },
    addSubscriber : (subscriber)=>{
        set((state)=>({
            subscribers : [...state.subscribers, subscriber]
        }))
    },
    removeSubscriber : (subscriberId)=>{
        set((state)=>({
            subscribers : state.subscribers.filter((subscriber)=>subscriber.subscribedToUser !== subscriberId)
        }))
    }
}));

export default useSubscriberStore;