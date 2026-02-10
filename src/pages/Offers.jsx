
import { useProducts } from '../context/ProductContext';
import './Offers.css';

const Offers = () => {
    const { getActiveOffers } = useProducts();
    const offers = getActiveOffers();

    return (
        <div className="offers-page container">
            <h1 className="section-title">Exclusive Offers</h1>
            {offers.length > 0 ? (
                <div className="offers-list">
                    {offers.map(offer => (
                        <div key={offer.id} className="offer-item">
                            <div className="offer-content">
                                <h2>{offer.title}</h2>
                                <p>{offer.description}</p>
                                <div className="offer-dates">
                                    <span>Valid until: {new Date(offer.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-offers">
                    <p>No active offers at the moment. Please check back later!</p>
                </div>
            )}
        </div>
    );
};

export default Offers;
