import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if(action.type===ADD_TO_CART){
    const{id,product,amount,color}= action.payload;
    const tempItem= state.cart.find(c=>c.id===id+color);

    if(tempItem){
      //if user selects the item which is already present in cart page so only amount changes
      console.log("same id");
      console.log(tempItem);
      const tempCart= state.cart.map(item=>{
        if(item.id=== id+color){
          let newAmount= item.amount + amount;
          if(newAmount>item.max){
            newAmount= item.max;
          }
          return {...item,amount:newAmount}
        }else{
          return item;
        }
      });
      console.log(tempCart);
      return {...state,cart:tempCart}

    }
    else{
      console.log("creating new");
      const newItem= {
        id:id+color,
        name:product.name,
        color,
        amount,
        image:product.images[0].url,
        price:product.price,
        max:product.stock
      }
      return {...state,cart:[...state.cart,newItem]}
    }
  }

  if(action.type===CLEAR_CART){
    return {...state,cart:[]}
  }

  if(action.type===REMOVE_CART_ITEM){
    const tempCart= state.cart.filter(element=>element.id !== action.payload)

    return {...state,cart:tempCart}
  }

  if(action.type===TOGGLE_CART_ITEM_AMOUNT){
    const {id,value}= action.payload;
    const tempCart= state.cart.map(item=>{
      if(item.id===id){

        if(value==="inc"){
          let newAmount= item.amount + 1;
          if(newAmount>item.max){
            newAmount=item.max;
          }
          return {...item,amount:newAmount}
        }

        if(value==="dec"){
          let newAmount= item.amount - 1;
          if(newAmount<1){
            newAmount=1;
          }
          return {...item,amount:newAmount}
        }
      }
      else{
        return item;
      }
    })

    return {...state,cart:tempCart};
  }

  if(action.type===COUNT_CART_TOTALS){
    const {total_amount,total_items}= state.cart.reduce((acc,curr)=>{
      acc.total_items += curr.amount;
      acc.total_amount += curr.amount * curr.price;

      return acc;
    },{total_amount:0,total_items:0})

    return{...state,total_amount,total_items}
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
