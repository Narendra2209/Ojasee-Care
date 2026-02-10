
import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const { products, offers, addProduct, updateProduct, deleteProduct, addOffer, deleteOffer } = useProducts();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('products');
    const [isEditing, setIsEditing] = useState(false);

    // Product Form State
    const [productForm, setProductForm] = useState({
        id: '',
        name: '',
        category: 'Men',
        price: '',
        description: '',
        mainImage: '', // URL input
        images: [], // Array for multiple uploaded images
        tags: ''
    });

    const [username, setUsername] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const dynamicPassword = `${day}${month}${year}`;

        if (username.toLowerCase() === 'pawan' && password === dynamicPassword) {
            setIsAuthenticated(true);
        } else {
            alert(`Invalid Credentials. Please use username 'pawan' and today's date (DDMMYYYY) as password.`);
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const combinedImages = [
            ...(productForm.mainImage ? [productForm.mainImage] : []),
            ...(productForm.images || [])
        ];

        const productData = {
            ...productForm,
            // Ensure price is number
            price: Number(productForm.price),
            // Legacy support: 'image' is the first available image
            image: combinedImages.length > 0 ? combinedImages[0] : '',
            // New field: store all images
            images: combinedImages,
            tags: productForm.tags.split(',').map(tag => tag.trim())
        };

        if (isEditing) {
            updateProduct(productForm.id, productData);
        } else {
            addProduct({ ...productData, rating: 0, reviews: 0 }); // New products start with 0 rating
        }
        resetForm();
    };

    const handleEditProduct = (product) => {
        setProductForm({
            ...product,
            tags: product.tags.join(', ')
        });
        setIsEditing(true);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const resetForm = () => {
        setProductForm({
            id: '',
            name: '',
            category: 'Men',
            price: '',
            description: '',
            image: '',
            tags: ''
        });
        setIsEditing(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login container">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Owner Login</h2>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '10px' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="password"
                            placeholder="Password (DDMMYYYY)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-dashboard container">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-tabs">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
                    <button className={activeTab === 'offers' ? 'active' : ''} onClick={() => setActiveTab('offers')}>Offers</button>
                </div>
            </header>

            {activeTab === 'products' && (
                <div className="admin-section">
                    <div className="admin-actions">
                        <h2>Manage Products</h2>
                        <button className="btn btn-primary" onClick={resetForm}>
                            <Plus size={18} /> Add New
                        </button>
                    </div>

                    {/* Product Form */}
                    <form className="admin-form" onSubmit={handleProductSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Images (URL or Upload)</label>
                            <input
                                type="text"
                                placeholder="Image URL (e.g., https://...)"
                                value={productForm.mainImage || ''}
                                onChange={(e) => setProductForm({ ...productForm, mainImage: e.target.value })}
                            />
                            <div className="image-uploads">
                                <label className="upload-btn">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            files.forEach(file => {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setProductForm(prev => ({
                                                        ...prev,
                                                        images: [...(prev.images || []), reader.result]
                                                    }));
                                                };
                                                reader.readAsDataURL(file);
                                            });
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{ cursor: 'pointer', color: 'var(--color-primary)', border: '1px dashed var(--color-primary)', padding: '10px', borderRadius: '8px' }}>+ Upload Images</span>
                                </label>
                            </div>
                            <div className="image-preview-list" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                {(productForm.images || []).map((img, index) => (
                                    <div key={index} style={{ position: 'relative', width: '60px', height: '60px' }}>
                                        <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newImages = productForm.images.filter((_, i) => i !== index);
                                                setProductForm({ ...productForm, images: newImages });
                                            }}
                                            style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                {productForm.mainImage && (
                                    <div style={{ position: 'relative', width: '60px', height: '60px', border: '2px solid var(--color-primary)' }}>
                                        <img src={productForm.mainImage} alt="Main URL" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Tags (comma separated)</label>
                            <input type="text" value={productForm.tags} onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })} />
                        </div>
                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-secondary">{isEditing ? 'Update Product' : 'Add Product'}</button>
                    </form>

                    {/* Product List */}
                    <div className="admin-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td>{p.category}</td>
                                        <td>₹{p.price}</td>
                                        <td>
                                            <button onClick={() => handleEditProduct(p)} className="icon-btn"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteProduct(p.id)} className="icon-btn delete"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'offers' && (
                <div className="admin-section">
                    <h2>Manage Offers (Feature Coming Soon)</h2>
                    <p>Offer management logic to be implemented similar to products.</p>
                </div>
            )}
        </div>
    );
};

export default Admin;
