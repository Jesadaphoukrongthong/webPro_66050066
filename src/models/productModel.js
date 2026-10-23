export const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 12900,
    icon: '💻',
    category: 'Computer',
    description: 'A lightweight laptop for study, work, and everyday use.',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Headphones',
    price: 1290,
    icon: '🎧',
    category: 'Audio',
    description: 'Wireless headphones with comfortable ear cushions and clear sound.',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Backpack',
    price: 890,
    icon: '🎒',
    category: 'Fashion',
    description: 'A practical backpack with space for daily essentials and a laptop.',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 2990,
    icon: '⌚',
    category: 'Gadget',
    description: 'A smart watch for notifications, activity tracking, and everyday use.',
    rating: 4.6,
  },
]

export function getAllProducts() {
  return products
}

export function getProductById(id) {
  return products.find((product) => product.id === Number(id))
}
