import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
    const { products, getActiveOffers } = useProducts();
    const activeOffers = getActiveOffers();
    const featuredProducts = products.filter(p => p.tags.includes('Best Seller') || p.tags.includes('New Arrival')).slice(0, 4);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background"></div>
                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="hero-subtitle">Pure Ayurvedic Alchemy</span>
                        <h1 className="hero-title">
                            Awaken Your <br />
                            <span className="text-highlight">Natural Radiance</span>
                        </h1>
                        <p className="hero-description">
                            Experience the timeless wisdom of Ayurveda blended with modern science.
                            100% Organic, sustainably sourced, and crafted for your inner balance.
                        </p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary">
                                Shop Collection <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </Link>
                            <Link to="/offers" className="btn btn-outline">
                                View Offers
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits / Trust Indicators */}
            <section className="section benefits-section">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <div className="benefit-icon"><Leaf size={32} /></div>
                            <h3>100% Organic</h3>
                            <p>Sourced directly from certified organic farms across India.</p>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon"><ShieldCheck size={32} /></div>
                            <h3>Clinically Proven</h3>
                            <p>Formulations backed by dermatological research.</p>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon"><Sparkles size={32} /></div>
                            <h3>Cruelty Free</h3>
                            <p>Ethical beauty that respects all living beings.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop by Category - Split Layout */}
            <section className="section categories-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">Curated For You</span>
                        <h2 className="section-title">Shop by Category</h2>
                    </div>
                    <div className="categories-split">
                        <Link to="/products?category=Men" className="category-card men">
                            <div className="category-content">
                                <h3>Men's Essentials</h3>
                                <span className="btn-link">Explore <ArrowRight size={16} /></span>
                            </div>
                            <div className="category-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1621609764095-6b2a4d34766b?q=80&w=1974" alt="Men's Collection" />
                            </div>
                        </Link>
                        <Link to="/products?category=Women" className="category-card women">
                            <div className="category-content">
                                <h3>Women's Beauty</h3>
                                <span className="btn-link">Explore <ArrowRight size={16} /></span>
                            </div>
                            <div className="category-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1974" alt="Women's Collection" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="section featured-section bg-soft">
                <div className="container">
                    <div className="section-header flex-between">
                        <div>
                            <span className="section-subtitle">Most Loved</span>
                            <h2 className="section-title">Signature Collection</h2>
                        </div>
                        <Link to="/products" className="btn btn-secondary hidden-mobile">View All Products</Link>
                    </div>

                    <div className="products-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="mobile-only text-center" style={{ marginTop: '32px' }}>
                        <Link to="/products" className="btn btn-secondary">View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Customer Love */}
            <section className="section reviews-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">Testimonials</span>
                        <h2 className="section-title">Stories of Transformation</h2>
                    </div>
                    <div className="reviews-grid">
                        <motion.div className="review-card" whileHover={{ y: -5 }}>
                            <div className="stars">★★★★★</div>
                            <p className="review-text">"I've used many products, but Ojasee's Hair Renewal Powder is unlike anything else. It feels so pure and effective."</p>
                            <div className="review-author">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya" />
                                <div>
                                    <span className="name">Priya Sharma</span>
                                    <span className="verified">Verified Buyer</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="review-card" whileHover={{ y: -5 }}>
                            <div className="stars">★★★★★</div>
                            <p className="review-text">"The Beard Cleansing Bar has completely changed my grooming routine. The scent is masculine and subtle."</p>
                            <div className="review-author">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rahul" />
                                <div>
                                    <span className="name">Rahul Khanna</span>
                                    <span className="verified">Verified Buyer</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="review-card" whileHover={{ y: -5 }}>
                            <div className="stars">★★★★☆</div>
                            <p className="review-text">"Packaging is luxurious, and the products deliver on their promise. A true premium ayurvedic brand."</p>
                            <div className="review-author">
                                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Anjali" />
                                <div>
                                    <span className="name">Anjali Menon</span>
                                    <span className="verified">Verified Buyer</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
