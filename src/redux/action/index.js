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
export const deletItem=(number,searchValue)=>({
    type:"DELET_ITEM",
    number,
    searchValue
})
export const editItem=({name,images, tare,totalWeight,cost, rebate,discription},statuse,id)=>{
    console.log(name)
    return { 
    type:"EDIT_ITEM",
    name,images, tare,totalWeight,cost, rebate,
    discription,
    statuse,id,
    number:id
}
}