export const initialProducts = [
    {
        "id": "p2",
        "name": "Luxury Hair Renewal Powder",
        "category": "Women",
        "subcategory": "Hair Care",
        "price": 899,
        "description": "Ayurvedic Renewal (200g). Revitalize your hair with this potent herbal blend. Reduces hair fall and adds shine.",
        "image": "/images/products/hair-renewal-powder.jpg",
        "rating": 5,
        "reviews": 210,
        "tags": [
            "Premium",
            "Best Seller"
        ]
    },
    {
        "id": "p3",
        "name": "Hair Mask Powder",
        "category": "Women",
        "subcategory": "Hair Care",
        "price": 499,
        "description": "For Dry Scalp. 5 Single Use Sachets (75g Net Wt). 100% Natural, Chemical Free.",
        "image": "/images/products/hair-mask-powder.jpg",
        "rating": 4.7,
        "reviews": 56,
        "tags": [
            "New Arrival"
        ]
    }
];

export const initialOffers = [
    {
        "id": "o1",
        "title": "Winter Sale",
        "description": "Flat 20% off on all beard care products.",
        "discount": 20,
        "startDate": "2026-01-01",
        "endDate": "2026-12-31",
        "productIds": [
            "p1"
        ],
        "active": true
    },
    {
        "id": "o2",
        "title": "New Launch Offer",
        "description": "Buy 1 get 1 free on Hair Renewal Powder.",
        "discount": 50,
        "startDate": "2026-01-01",
        "endDate": "2026-06-30",
        "productIds": [
            "p2"
        ],
        "active": true
    }
];
