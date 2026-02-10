export const initialProducts = [
    {
        id: 'p1',
        name: 'Beard Cleansing Bar',
        category: 'Men',
        subcategory: 'Beard Care',
        price: 349,
        description: 'Natural & Nourishing. Deep Clean & Condition. An activated charcoal-infused bar with essential oils.',
        image: '/images/products/beard-cleansing-bar.jpg',
        rating: 4.8,
        reviews: 124,
        tags: ['Best Seller', 'Natural']
    },
    {
        id: 'p2',
        name: 'Luxury Hair Renewal Powder',
        category: 'Women',
        subcategory: 'Hair Care',
        price: 899,
        description: 'Ayurvedic Renewal (200g). Revitalize your hair with this potent herbal blend. Reduces hair fall and adds shine.',
        image: '/images/products/hair-renewal-powder.jpg',
        rating: 5.0,
        reviews: 210,
        tags: ['Premium', 'Best Seller']
    },
    {
        id: 'p3',
        name: 'Hair Mask Powder',
        category: 'Women',
        subcategory: 'Hair Care',
        price: 499,
        description: 'For Dry Scalp. 5 Single Use Sachets (75g Net Wt). 100% Natural, Chemical Free.',
        image: '/images/products/hair-mask-powder.jpg',
        rating: 4.7,
        reviews: 56,
        tags: ['New Arrival']
    }
];

export const initialOffers = [
    {
        id: 'o1',
        title: 'Winter Sale',
        description: 'Flat 20% off on all beard care products.',
        startDate: '2023-11-01',
        endDate: '2024-03-31',
        active: true
    },
    {
        id: 'o2',
        title: 'New Launch Offer',
        description: 'Buy 1 get 1 free on Hair Renewal Powder.',
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        active: true
    }
];
