import { identity } from 'lodash';
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let max_price_array = [...action.payload].map(p => p.price);
    let maxPrice = Math.max(...max_price_array);

    return { ...state, filtered_products: [...action.payload], all_products: [...action.payload], filters: { ...state.filters, price: maxPrice, max_price: maxPrice } }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort_value: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort_value } = state;

    if (sort_value === "price-lowest") {
      let tempProducts = state.filtered_products.sort((a, b) => b.price - a.price).reverse();
      return { ...state, filtered_products: tempProducts }
    }

    if (sort_value === "price-highest") {
      let tempProducts = state.filtered_products.sort((a, b) => b.price - a.price);
      return { ...state, filtered_products: tempProducts }
    }

    if (sort_value === "name-a") {
      let tempProducts = state.filtered_products.sort((a, b) => a.name.localeCompare(b.name));
      return { ...state, filtered_products: tempProducts }
    }

    if (sort_value === "name-z") {
      let tempProducts = state.filtered_products.sort((a, b) => a.name.localeCompare(b.name)).reverse();
      return { ...state, filtered_products: tempProducts }
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === CLEAR_FILTERS) {

    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: "all",
        company: "all",
        colors: "all",
        price: state.filters.max_price,
        shipping: false
      }
    }
  }


  if(action.type===FILTER_PRODUCTS){
    const {all_products}= state;
    const {text,company,category,price,colors,shipping}= state.filters;

    let tempProducts= [...all_products];

    if(text){
       tempProducts= tempProducts.filter(product=>product.name.toLowerCase().includes(text));
      //  return {...state, filtered_products:tempProducts};
    }

    if(category!=="all"){
        tempProducts= tempProducts.filter(product=>product.category===category);
        // console.log(category);
        //  return {...state, filtered_products:tempProducts};
    }

    if(company!=="all"){
        tempProducts= tempProducts.filter(product=>product.company===company);
        // console.log(tempProducts[0].colors);
        //  return {...state, filtered_products:tempProducts};
    }


      if(colors!=="all"){
          tempProducts= tempProducts.filter(product=>{
            return(
              product.colors.find(c=>c===colors)
            )
          })
          console.log(tempProducts);
           return {...state, filtered_products:tempProducts};
      }

      // shipping
      if(shipping){
        tempProducts= tempProducts.filter(product=>product.shipping===true);
      }

      // price
      tempProducts = tempProducts.filter(product=>product.price <= price);
    

    // console.log(tempProducts);
      return {...state,filtered_products:tempProducts}
    }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
