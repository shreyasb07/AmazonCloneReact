import React from 'react'
import './Product.css';

function Product({id, title, image, price, rating}) {
  return (
    <div className='product'>
        <div className="product__info">
            <p className="">{title}</p>
            <p className="product__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
                {Array(rating)
                .fill()
                .map((_,i) =>(
                    <p className="">🌟</p>
                ))}
            </div>
        </div>
        <img src={image}
            alt='' />
        <button className="">Add To Basket</button>
    </div>
  )
}

export default Product