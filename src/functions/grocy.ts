import { Product } from '@/types';
import dotenv from 'dotenv';
import store from '../store/index'

dotenv.config();

const headers = new Headers();
const apiKey = process.env.VUE_APP_GROCY_APIKEY ?? '';
headers.append("GROCY-API-KEY", apiKey);


const apiUrl = 'http://192.168.178.222:9080/api/'

async function getLocations() {

    const request = new Request(
        apiUrl + 'objects/locations',
        {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
      );

    await fetch(request)
    .then(response => response.text())
    .then(result => { 

        // handle response data here
        const json = JSON.parse(result);

        store.commit('setLocations', json);

    })
    .catch(error => console.log('error', error));

}

async function getProducts() {

    const request = new Request(
        apiUrl + 'objects/products',
        {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
      );

    await fetch(request)
    .then(response => response.text())
    .then(result => { 

        // handle response data here
        console.log(result) 

    })
    .catch(error => console.log('error', error));

}

async function getStock() {

    const request = new Request(
        apiUrl + 'stock',
        {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
      );

    await fetch(request)
    .then(response => response.text())
    .then(result => { 

        const productsInStock: Product[] = [];

        // handle response data here
        const json = JSON.parse(result);

        json.forEach((element: any) => {

            const product = {
                id: element.product.id,
                name: element.product.name,
                area: getLocationFromId(element.product.location_id),
                quantity: element.amount,
                unit: 'pcs',
                expiry: new Date(element.best_before_date),
                mandatory: isMandatory(element.product.min_stock_amount),
                onShoppingList: false,
                status: '',
                nutritionalValue: element.product.calories
            } as Product

            product.status = setStatus(product);
            
            productsInStock.push(product);
            
        });

        store.commit('setStock', productsInStock);

    })
    .catch(error => console.log('error', error));

}

function setStatus(product: Product) {
    let status = '';

    if (product.quantity == 0) {
        status = 'Not in stock';
    } else status = 'In stock';

    if (product.onShoppingList == true) {
        status = 'On shopping list';
    }

    /* check expiry status */
    const expiry = calculateExpiry(product.expiry);

    if (expiry < 5 && expiry > 0) {
        status = 'Use up in ' + expiry + ' days';  
    }

    if (expiry == 0) {
        status = 'Use up today';  
    }

    if (expiry < 0) {
        status = 'Expired ' + -expiry + ' days ago';
    }

    return status;
}

function calculateExpiry (expiry: Date) {

    const dateToday = new Date;

    const diffTime = expiry.valueOf() - dateToday.valueOf();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return diffDays;

}

function getLocationFromId (id: number) {

    const location = store.getters.getLocationFromId(id.toString());
    return location.name;
}

function isMandatory(minStockAmount: number) {
    if (minStockAmount != 0) {
        return true;
    } else return false;
}

export { getLocations, getProducts, getStock }