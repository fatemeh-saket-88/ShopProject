const initialState={
    items:[
        {number:1, title:"ماشین ", stock:"در دسترس", Price:"678",images:"",totalWeight:"250",tare:"3",rebate:"150",discription:"yyyyy"},
        {number:2, title:"ایرپاد ", stock:"توقف تولید", Price:"300",images:"",totalWeight:"250",tare:"3",rebate:"150",discription:"ttttttt"},
        {number:3, title:" موبایل", stock:"به زودی", Price:"400",images:"",totalWeight:"250",tare:"3",rebate:"150",discription:"rrrrrrrrr"}
    ],
    searched:{}
}
const RootReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_ITEM':
            let item=[...state.items,{number:action.id,title:action.name, stock:action.statuse, Price:action.cost,images:action.images,totalWeight:action.totalWeight,tare:action.tare,rebate:action.rebate,discription:action.discription}]
            return {...state , items:item}       
        case 'SEARCH_ITEM':
            let searchItem= state.items.filter(index=>index.title.includes(action.value))
            if(action.value.length>0){
                return {...state,searched:searchItem}       
             }
            return state

        case 'DELET_ITEM':
            let deleteItem=state.items.filter(index=>index.number!==action.number)
            return {...state,items:deleteItem}
        case 'EDIT_ITEM':
            state.items.splice(action.id-1, 1,{number:action.number,title:action.name, stock:action.statuse, Price:action.cost,images:action.images,totalWeight:action.totalWeight,tare:action.tare,rebate:action.rebate,discription:action.discription} );

            return state       

        default:
            return state
    }
}
export default RootReducer


// case 'DELETE_NOTE':
//           return state.filter(temp=>temp.id!==action.id)