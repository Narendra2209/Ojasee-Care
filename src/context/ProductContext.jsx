import { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialOffers } from '../data/initialData';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('ojasee_products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    const [offers, setOffers] = useState(() => {
        const savedOffers = localStorage.getItem('ojasee_offers');
        return savedOffers ? JSON.parse(savedOffers) : initialOffers;
    });

    useEffect(() => {
        localStorage.setItem('ojasee_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('ojasee_offers', JSON.stringify(offers));
    }, [offers]);

    const addProduct = (product) => {
        setProducts([...products, { ...product, id: Date.now().toString() }]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const addOffer = (offer) => {
        setOffers([...offers, { ...offer, id: Date.now().toString() }]);
    };

    const deleteOffer = (id) => {
        setOffers(offers.filter(o => o.id !== id));
    };

    const getActiveOffers = () => {
        const today = new Date().toISOString().split('T')[0];
        return offers.filter(offer => offer.startDate <= today && offer.endDate >= today);
    };

    const getFilteredProducts = (category) => {
        if (!category || category === 'All') return products;
        return products.filter(p => p.category === category);
    };

    return (
        <ProductContext.Provider value={{
            products,
            offers,
            addProduct,
            updateProduct,
            deleteProduct,
            addOffer,
            deleteOffer,
            getActiveOffers,
            getFilteredProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};
