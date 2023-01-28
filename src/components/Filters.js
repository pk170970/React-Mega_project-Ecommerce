import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const { all_products, filters, updateFilter, clearFilter } = useFilterContext();

  const { max_price, min_price, price, category, text, company, colors: single_color,shipping } = filters;


  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  // console.log(all_products);
  //   console.log(formatPrice(price), formatPrice(max_price));
  return (
    <Wrapper>
      <div className="content">
        <form>

          {/* search */}
          <div className="form-control">
            <input type="text" name="text" placeholder='search' className='search-input' value={text} onChange={updateFilter} />
          </div>

          {/* category */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    className={`${c.toLowerCase() === category ? "active" : null}`}
                    type='button'
                    name="category"
                    onClick={updateFilter}>
                    {c}
                  </button>
                )
              })}
            </div>
          </div>

          {/* company */}
          <div className="form-control">
            <h5>company</h5>
            <select name="company" className='company' value={company} onChange={updateFilter}>
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}  >{c}</option>
                )
              })}
            </select>
          </div>

          {/* color */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return <button
                    key={index}
                    onClick={updateFilter}
                    data-color="all"
                    type="button"
                    name="colors"
                    className={single_color === "all" ? 'all-btn active' : "all-btn"}>All</button>
                } else {

                  return (
                    <button
                      type='button'
                      key={index}
                      style={{ backgroundColor: c }}
                      className={single_color === c ? 'color-btn active' : "color-btn"}
                      name="colors"
                      data-color={c}
                      onClick={updateFilter} >
                      {single_color === c ? <FaCheck /> : ""}
                    </button>
                  )
                }
              })}
            </div>
          </div>

          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input type="range" name="price" min={(min_price)} max={(max_price)} value={(price)} onChange={updateFilter} />
          </div>

          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input type="checkbox" name="shipping" id="shipping" checked={shipping} onChange={updateFilter} />
          </div>

        </form>
        <button onClick={clearFilter} type='button' className='clear-btn'>clear filters</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
