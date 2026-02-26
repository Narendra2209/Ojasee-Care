import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialProducts, initialOffers } from '../data/initialData';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// ─── Persist changes back to initialData.js via the Vite dev-server API ──────
// In development: POST /api/sync-data → vite plugin writes src/data/initialData.js
// In production:  silently skipped (no file-system access in browser)
// ─────────────────────────────────────────────────────────────────────────────
const syncToFile = async (products, offers) => {
    if (import.meta.env.MODE !== 'development') return;
    try {
        const res = await fetch('/api/sync-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ products, offers }),
        });
        if (res.ok) {
            console.log('✅ initialData.js updated on disk');
        } else {
            console.warn('⚠️ sync-data API responded with', res.status);
        }
    } catch {
        // API not available (production build or network issue) — ignore silently
    }
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Keep a ref so syncToFile always has latest offers when called from product ops
    const offersRef = useRef([]);
    const productsRef = useRef([]);
    useEffect(() => { offersRef.current = offers; }, [offers]);
    useEffect(() => { productsRef.current = products; }, [products]);

    // Initialize from initialData — localStorage is only a runtime cache now
    useEffect(() => {
        try {
            // Always load from initialData.js (source of truth after admin edits)
            // localStorage is kept in sync but initialData is what the Vite plugin updates
            console.log(`📦 Loading ${initialProducts.length} products from initialData.js`);
            console.log(`🎁 Loading ${initialOffers.length} offers from initialData.js`);
            setProducts(initialProducts);
            setOffers(initialOffers);
            // Also keep localStorage in sync for fast re-reads within same session
            localStorage.setItem('products', JSON.stringify(initialProducts));
            localStorage.setItem('offers', JSON.stringify(initialOffers));
        } catch (error) {
            console.error('❌ Error loading initial data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // ── Helper: update state + localStorage + initialData.js ─────────────────
    const persist = (newProducts, newOffers) => {
        localStorage.setItem('products', JSON.stringify(newProducts));
        localStorage.setItem('offers', JSON.stringify(newOffers));
        syncToFile(newProducts, newOffers);   // writes initialData.js via Vite plugin
    };

    // ── Products ──────────────────────────────────────────────────────────────

    const addProduct = async (product) => {
        try {
            const newProduct = {
                ...product,
                id: product.id || `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };
            const updated = [...productsRef.current, newProduct];
            setProducts(updated);
            persist(updated, offersRef.current);
            console.log(`✓ Product "${newProduct.name}" added → initialData.js updated`);
            return { success: true, id: newProduct.id };
        } catch (error) {
            console.error('❌ Error adding product:', error);
            throw error;
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const updated = productsRef.current.map(p =>
                p.id === id ? { ...p, ...updatedProduct } : p
            );
            setProducts(updated);
            persist(updated, offersRef.current);
            console.log(`✓ Product "${id}" updated → initialData.js updated`);
            return { success: true, id };
        } catch (error) {
            console.error('❌ Error updating product:', error);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const updated = productsRef.current.filter(p => p.id !== id);
            setProducts(updated);
            persist(updated, offersRef.current);
            console.log(`✓ Product "${id}" deleted → initialData.js updated`);
            return true;
        } catch (error) {
            console.error('❌ Error deleting product:', error);
            throw error;
        }
    };

    // ── Offers ────────────────────────────────────────────────────────────────

    const addOffer = async (offer) => {
        try {
            const newOffer = {
                ...offer,
                id: offer.id || `o_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };
            const updated = [...offersRef.current, newOffer];
            setOffers(updated);
            persist(productsRef.current, updated);
            console.log(`✓ Offer "${newOffer.title}" added → initialData.js updated`);
            return { success: true, id: newOffer.id };
        } catch (error) {
            console.error('❌ Error adding offer:', error);
            throw error;
        }
    };

    const deleteOffer = async (id) => {
        try {
            const updated = offersRef.current.filter(o => o.id !== id);
            setOffers(updated);
            persist(productsRef.current, updated);
            console.log(`✓ Offer "${id}" deleted → initialData.js updated`);
            return true;
        } catch (error) {
            console.error('❌ Error deleting offer:', error);
            throw error;
        }
    };

    // ── Queries ───────────────────────────────────────────────────────────────

    const getActiveOffers = () => {
        if (!Array.isArray(offers)) return [];
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;
        return offers.filter(offer => offer.startDate <= today && offer.endDate >= today);
    };

    const getAllOffers = () => {
        if (!Array.isArray(offers)) return [];
        return offers;
    };

    const getFilteredProducts = (category) => {
        if (!category || category === 'All') return products;
        return products.filter(p => p.category === category);
    };

    return (
        <ProductContext.Provider value={{
            products,
            offers,
            loading,
            addProduct,
            updateProduct,
            deleteProduct,
            addOffer,
            deleteOffer,
            getActiveOffers,
            getAllOffers,
            getFilteredProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};
