import fetch from 'node-fetch';

/* 
    Implement a program which:
    1. Retrieves user, product and shopping cart data
    2. Creates a data structure containing all available product categories and the total value of
    products of a given category
    3. Finds a cart with the highest value, determines its value and full name of its owner
    4. Finds the two users living furthest away from each other
*/

const usersUrl = 'https://fakestoreapi.com/users'
const cartsUrl = 'https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07'
const productsUrl = 'https://fakestoreapi.com/products'

async function getUsers() {
    let res = await fetch(`https://fakestoreapi.com/users/`)

    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')

}

async function getUser(id) {
    let res = await fetch(`https://fakestoreapi.com/users/${id}`)

    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')

}

async function getProducts(id) {
    let res = await fetch(`https://fakestoreapi.com/products`)

    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')

}

async function getProduct(id) {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')

}

async function getCarts() {
    let res = await fetch('https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07');

    
    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')
}


async function retrieveData() {
    const persons = await getUsers();
    const products = await getProducts();

    const cart = await getCarts();

    return {
        'persons': persons.slice(0,3), 
        'products': products.slice(0,3),
        'cart': cart.slice(0,3)
        }
}

//const data = await retrieveData();


async function getAllCategories() {
    const products = await getProducts();
    const categories = [];

    for (let i = 0; i < products.length; i++) {
        if (!categories.includes(products[i].category)) {
            categories.push(products[i].category)
        }
    }

    return categories
}

async function getTotalValueForEachCategory() {
    const categories = await getAllCategories();
    const products = await getProducts();

    const totalCategoryPrices = [];

    for (let category of categories) {
        const categoryTotalPrice = products.reduce((total, product) => {
            if (product.category === category) {
              return total + product.price;
            }
            return total;
          }, 0);

        totalCategoryPrices.push({
            [category]: categoryTotalPrice
        })
    }


    return totalCategoryPrices;
}

async function getCategoriesAndTotalValuesOfProducts() {
    const categories = await getAllCategories();

    const totalCategoryPrices = await getTotalValueForEachCategory();

    return {
        'categories': categories,
        'totalCategoryPrices': totalCategoryPrices
    }
}


const result = await getCategoriesAndTotalValuesOfProducts();


// 3. Finds a cart with the highest value, determines its value and full name of its owner
async function  getCartWithHighestValue() {

    const carts = await getCarts();
    const sumsByCartId = {};

   for (let cart of carts) {
    for (let product of cart.products) {
        const productData = await getProduct(product.productId)
        // get the product price multiplied by its quantity
        let totalValue = productData.price * product.quantity
        if (sumsByCartId[cart.id]) {
            sumsByCartId[cart.id] += totalValue
        } else {
            sumsByCartId[cart.id] = totalValue;
        }
    }
   }

    // Get the cart id and summed value of products for a cart with highest value
   let maxCartKey = '';
   let maxCartValue = 0;

   for (let key in sumsByCartId) {
   if (sumsByCartId[key] > maxCartValue) {
       maxCartKey = parseInt(key);
       maxCartValue = sumsByCartId[key];
       }
   }

   const cartWithMaxValue = carts.filter((cart) => cart.id === maxCartKey)

   const {name} = await getUser(cartWithMaxValue[0].userId)

   const ownerFullName = name.firstname + ' ' + name.lastname

   let maxCartObj = {
    'cartId': maxCartKey, 
    'cartValue':maxCartValue,
    'fullName':ownerFullName
}

return maxCartObj

}

const highestValueCart = await getCartWithHighestValue();

console.log(highestValueCart)

// 4. Find two users living farthest away of each other

function haversine(lat1, lon1, lat2, lon2) {
    const r = 6371; // radius of the Earth in kilometers
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(delta_phi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(delta_lambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c; // distance in kilometers
    return d * 1000; // distance in meters
  }

async function findTwoFarthestUsers() {
    const users = await getUsers()
    let user1Name = ''
    let user2Name = ''
    let maxDistance = 0;

    for (let i = 0; i < users.length; i++) {
        let user1Lat = users[i].address.geolocation.lat
        let user1Long = users[i].address.geolocation.long
        for (let j = 1; j < users.length; j++) {
            let user2Lat = users[j].address.geolocation.lat
            let user2Long = users[j].address.geolocation.long

            let result = haversine(user1Lat, user1Long, user2Lat, user2Long)
            if (result  > maxDistance) {
                user1Name = users[i].name
                user2Name = users[j].name
                maxDistance = result
            }
        }
    }

    return {maxDistance, user1Name, user2Name}
}

const test = await findTwoFarthestUsers()

console.log(test)