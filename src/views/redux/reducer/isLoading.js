let mydata={
    isLoading:false
}
export default function isLoading(state=mydata,action){
   switch(action.type){
    case 'change_loading':
        return{isLoading:action.payload}
        default:
            return state
   }
} 