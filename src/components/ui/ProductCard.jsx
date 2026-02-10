import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    // Handle case where products might be missing
    if (!product) return null;

    return (
        <div className="product-card">
            <div className="product-image-container">
                <Link to={`/product/${product.id}`} className="image-placeholder" style={{ backgroundImage: `url(${product.image})`, display: 'block', textDecoration: 'none' }}>
                    {!product.image && <span>{product.name}</span>}
                </Link>
                <div className="product-overlay">
                    <button
                        className="add-to-cart-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-desc">{product.description.substring(0, 60)}...</p>
                <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <div className="product-rating">★ {product.rating}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
