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

async function getProducts(id) {
    let res = await fetch(`https://fakestoreapi.com/products`)

    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')

}

async function getCart() {
    let res = await fetch('https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07');

    
    if (res.ok) {
        return res.json();
    } 
    
    throw new Error('Something went wrong...')
}


async function retrieveData() {
    const person = await getUsers();
    // const product = await getProduct(2);

    const cart = await getCart();

    return person
}


const data = await retrieveData();

console.log(data)
