let id=4
export const addItem=({name,images, tare,totalWeight,cost, rebate,discription},statuse)=>{
    return { 
    type:"ADD_ITEM",
    id:id++,
    name,images, tare,totalWeight,cost, rebate,
    discription,
    statuse
}
}
export const searchTitle=(value)=>({
    type:"SEARCH_ITEM",
    value
})
export const deletItem=(number)=>({
    type:"DELET_ITEM",
    number
})
export const editItem=({name,images, tare,totalWeight,cost, rebate,discription},statuse,id)=>{
    // console.log(statuse)
    return { 
    type:"EDIT_ITEM",
    name,images, tare,totalWeight,cost, rebate,
    discription,
    statuse,id,
    number:id
}
}