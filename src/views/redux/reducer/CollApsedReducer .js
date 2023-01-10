let mydata={
    iscollapesed:false
} 
export default function Collapesed(state=mydata,action={}){
     switch(action.type){
        case 'change_collapsed':
            return{iscollapesed:!state.iscollapesed}
          default:
            return state  
     }
}