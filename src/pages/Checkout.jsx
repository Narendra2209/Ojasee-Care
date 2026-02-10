
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, getCartTotal, getDeliveryCharge, getFinalTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        pincode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct WhatsApp Message
        const productsList = cart.map(item => `- ${item.name} x ${item.quantity}`).join('%0A');
        const totalAmount = getFinalTotal();
        const deliveryStatus = getDeliveryCharge() === 0 ? 'Free' : `₹${getDeliveryCharge()}`;

        const message = `*New Order - Ojasee Care*%0A%0A` +
            `*Name:* ${formData.name}%0A` +
            `*Mobile:* ${formData.mobile}%0A` +
            `*Address:* ${formData.address}%0A` +
            `*Pincode:* ${formData.pincode}%0A%0A` +
            `*Products:*%0A${productsList}%0A%0A` +
            `*Total Amount:* ₹${totalAmount}%0A` +
            `*Delivery:* ${deliveryStatus}`;

        // Redirect to WhatsApp
        const whatsappUrl = `https://wa.me/919876543210?text=${message}`; // Replace with actual number
        window.open(whatsappUrl, '_blank');

        // Clear cart (optional, maybe wait for confirmation but for this flow we assume sent)
        clearCart();
    };

    if (cart.length === 0) {
        return <div className="checkout-page container">Cart is empty. Redirecting...</div>;
    }

    return (
        <div className="checkout-page container">
            <h1 className="section-title">Checkout</h1>
            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Full Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary place-order-btn">
                        Place Order on WhatsApp
                    </button>
                </form>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="total-row">
                        <span>Total</span>
                        <span>₹{getFinalTotal()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
