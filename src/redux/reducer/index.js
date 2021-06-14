// import h from '../../assets/img/card-background.jpg'
const initialState={
    items:[
        {number:1, title:"ماشین ", stock:"در دسترس", Price:"678",images:'https://cdn01.zoomit.ir/2019/6/7f1f46b3-1217-405c-82ed-f2f9b2cae0d1.jpg' , totalWeight:"250",tare:"3",rebate:"150",discription:"yyyyy"},
        {number:2, title:"ایرپاد ", stock:"توقف تولید", Price:"300",images:'https://www.apple-nic.com/images/store/apple-airpods-pro-wireless-headphone.jpg',totalWeight:"250",tare:"3",rebate:"150",discription:"ttttttt"},
        {number:3, title:" موبایل", stock:"به زودی", Price:"400",images:'https://aftabnews.ir/files/fa/news/1399/8/28/504812_350.jpg', totalWeight:"250",tare:"3",rebate:"150",discription:"rrrrrrrrr"}
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
            let deleteItem=state.items.filter((item,index)=>index!==action.number)
             //delete when have search
            if(action.searchValue.length>0){
                let searchItem= deleteItem.filter(index=>index.title.includes(action.searchValue))
                return {...state,items:deleteItem,searched:searchItem} 
            }
            return {...state,items:deleteItem}  //delete when dont search


        case 'EDIT_ITEM':
            state.items.splice(action.id, 1,{number:action.number,title:action.name, stock:action.statuse, Price:action.cost,images:action.images,totalWeight:action.totalWeight,tare:action.tare,rebate:action.rebate,discription:action.discription} );
            return state       

        default:
            return state
    }
}
export default RootReducer