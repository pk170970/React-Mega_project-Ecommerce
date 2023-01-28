import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleProduct, single_product_loading: loading, single_product_error: error, single_product, products } = useProductsContext();



  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/")
      }, 3000);
    }
  }, [error]);


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  // Make sure don't call loading and error before useEffect since loading and error depends after the fetchSingleProduct function get runs.

  const { category, company, description, colors, images, name, price, reviews, shipping, stars, stock } = single_product;

  // console.log(stars, reviews);
  return (
    <Wrapper>
      <PageHero title={name} product={single_product} />
      <div className="section page section-center">
        <Link className='btn' to="/products">Back to Products</Link>
        <div className="product-center">
          <ProductImages images={images} />
        <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews} />
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{description}</p>
          <p className="info">
            <span>Available: </span>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="info">
            <span>SKU: </span>
            {id}
          </p>
          <p className="info">
            <span>Brand: </span>
            {company}
          </p>
          <hr />
          {stock > 0 && <AddToCart product={single_product} />}
        </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
