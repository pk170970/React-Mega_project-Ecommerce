import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products:products,grid_view}= useFilterContext();

  if(products.length < 1){
    return <h1>Sorry, No products found</h1>
  }

  if(grid_view){
    return (
      <GridView products= {products}/>
    )
  }
  
  return <ListView products= {products}/>
}

export default ProductList
