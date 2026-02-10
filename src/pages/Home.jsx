import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
    const { products, getActiveOffers } = useProducts();
    const activeOffers = getActiveOffers();
    const featuredProducts = products.filter(p => p.tags.includes('Best Seller') || p.tags.includes('New Arrival')).slice(0, 4);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <h1 className="hero-title">Nature's Essence,<br />Refined for You.</h1>
                    <p className="hero-tagline">Premium Ayurvedic Hair & Personal Care. <br />100% Organic. Scientifically Proven.</p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary">Discover Collection</Link>
                        <Link to="/offers" className="btn btn-outline">Exclusive Offers</Link>
                    </div>
                </motion.div>
            </section>

            {/* Category Section */}
            {/* <section className="categories container">
                <motion.div
                    className="category-card men"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="category-overlay">
                        <h2>men's rituals</h2>
                        <Link to="/products?category=Men" className="btn btn-light">Explore Men</Link>
                    </div>
                </motion.div>
                <motion.div
                    className="category-card women"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="category-overlay">
                        <h2>women's care</h2>
                        <Link to="/products?category=Women" className="btn btn-light">Explore Women</Link>
                    </div>
                </motion.div>
            </section> */}

            {/* Monthly Offers Section
            {activeOffers.length > 0 && (
                <section className="container">
                    <div className="offers">
                        <h2 className="section-title">Limited Time Privileges</h2>
                        <div className="offers-grid">
                            {activeOffers.map(offer => (
                                <div key={offer.id} className="offer-card">
                                    <h3>{offer.title}</h3>
                                    <p>{offer.description}</p>
                                    <span className="offer-validity">Valid until {new Date(offer.endDate).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )} */}

            <div className="collections-row container">
                {/* Featured Products Column */}
                <section className="collection-column">
                    <h2 className="section-title">Signature Collection</h2>
                    <div className="product-list-vertical">
                        {featuredProducts.slice(0, 3).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Top Rated Column */}
                <section className="collection-column">
                    <h2 className="section-title">Top Rated</h2>
                    <div className="product-list-vertical">
                        {products.sort((a, b) => b.rating - a.rating).slice(0, 3).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </div>

            {/* Customer Reviews */}
            <section className="reviews container">
                <h2 className="section-title">Stories of Transformation</h2>
                <div className="reviews-grid">
                    <motion.div
                        className="review-card"
                        whileHover={{ y: -10 }}
                    >
                        <div className="stars">★★★★★</div>
                        <p>"I've used many products, but Ojasee's Hair Renewal Powder is unlike anything else. It feels so pure and effective."</p>
                        <span>- Priya Sharma</span>
                    </motion.div>
                    <motion.div
                        className="review-card"
                        whileHover={{ y: -10 }}
                    >
                        <div className="stars">★★★★★</div>
                        <p>"The Beard Cleansing Bar has completely changed my grooming routine. The scent is masculine and subtle."</p>
                        <span>- Rahul Khanna</span>
                    </motion.div>
                    <motion.div
                        className="review-card"
                        whileHover={{ y: -10 }}
                    >
                        <div className="stars">★★★★☆</div>
                        <p>"Packaging is luxurious, and the products deliver on their promise. A true premium ayurvedic brand."</p>
                        <span>- Anjali Menon</span>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
