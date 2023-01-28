import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';


import { useProductsContext } from './products_context'
import GridView from '../components/GridView'

const initialState = {
  filtered_products:[],
  all_products:[],
  grid_view:true,
  sort_value:"price-lowest",
  filters:{
    text:'',
    category:"all",
    company:"all",
    colors:"all",
    max_price:0,
    min_price:0,
    price:0,
    shipping:false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products}= useProductsContext();
  const [state,dispatch]= useReducer(reducer,initialState);

  
  useEffect(()=>{
    dispatch({type:LOAD_PRODUCTS,payload:products});
  },[products]);

  useEffect(()=>{
    dispatch({type:FILTER_PRODUCTS})
    dispatch({type:SORT_PRODUCTS});
  },[products,state.sort_value,state.filters])

  
  const gridView=()=>{
    dispatch({type:SET_GRIDVIEW})
  }

  const listView=()=>{
    dispatch({type:SET_LISTVIEW});
  }

  const updateSort=(e)=>{
    const value= e.target.value;
    // console.log(value);
    dispatch({type:UPDATE_SORT,payload:value});
  }

  const updateFilter= (e)=>{
    let {name,value}= e.target;

    if(name==="category"){
      value= e.target.textContent;
    }
    if(name==="colors"){
      value= e.target.getAttribute("data-color");
      // value= e.target.dataset.color; this is also correct
    }
    if(name==="price"){
      value= +value;
    }

    if(name==="shipping"){
      value= e.target.checked;
    }
    dispatch({type:UPDATE_FILTERS,payload:{name,value}});
  }
  
  const clearFilter= ()=>{
    dispatch({type:CLEAR_FILTERS,payload:products});
  }



  return (
    <FilterContext.Provider value={{...state,gridView,listView,updateSort,updateFilter,clearFilter}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
