import { Product } from '@/types';
import dotenv from 'dotenv';
import { computed } from 'vue';
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
        store.commit('setProducts', JSON.parse(result));

    })
    .catch(error => console.log('error', error));

}

async function getShoppingList() {

    const request = new Request(
        apiUrl + 'objects/shopping_list',
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
        store.commit('setShoppingList', JSON.parse(result));

    })
    .catch(error => console.log('error', error));

}

async function getStock() {

    const productsInStock: Product[] = [];

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

        // handle response data here
        const json = JSON.parse(result);

        json.forEach(async (element: any) => {

            const product = {
                id: element.product.id,
                name: element.product.name,
                location: '',
                locationId: element.product.location_id,
                quantity: element.amount,
                unit: 'pcs',
                expiry: new Date(element.best_before_date),
                mandatory: isMandatory(element.product.min_stock_amount),
                onShoppingList: false,
                status: '',
                nutritionalValue: element.product.calories
            } as Product

            product.location = getLocationFromId(element.product.location_id);
            product.onShoppingList = isOnShoppingList(element.product.id);
            product.status = setStatus(product);
            
            productsInStock.push(product);
            
        });

        store.commit('setStock', productsInStock);

    })
    .catch(error => console.log('error', error));

    getStockDetails(productsInStock);

}

async function addProductToStock(productId: number, quantity: number, locationId: number, bestBefore?: string) {

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const noExpiry = '2999-12-31';
    const expiryDate = bestBefore ?? noExpiry;

    const requestBody = {
        "amount": quantity,
        "best_before_date": expiryDate,
        "transaction_type": "purchase",
        "price": "0.00",
        "location_id": locationId
    }

    const productUrl = apiUrl + 'stock/products/' + productId + '/add'

    const request = new Request(
        productUrl,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        }
      );

    await fetch(request)
    .then(response => response.text())
    .catch(error => console.log('error', error));

    getStock();  

}

async function useUpProduct(productId: number) {

    setQuantity(productId, 0);

}

async function moveProduct(productId: number, quantity: number, locationIdFrom: number, locationIdTo: number) {

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    console.log(locationIdFrom);

    const requestBody = {
        "amount": quantity,
        "location_id_from": locationIdFrom,
        "location_id_to": locationIdTo
    }

    console.log(JSON.stringify(requestBody));

    const productUrl = apiUrl + 'stock/products/' + productId + '/transfer'

    const request = new Request(
        productUrl,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        }
      );

    await fetch(request)
    .then(response => response.text())
    .catch(error => console.log('error', error));

    setTimeout(() => {  getStock(); }, 1000);  

}

async function addProductToShoppingList(productId: number, quantity: number, note?: string) {

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const requestBody = {
        "product_id": productId,
        "product_amount": quantity,
        "note": note ?? ''
    }

    const request = new Request(
        apiUrl + 'stock/shoppinglist/add-product',
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        }
      );

    await fetch(request)
    .then(response => response.text())
    .catch(error => console.log('error', error));

}

async function editProductDetails(product: Product, expiry?: string, mandatory?: boolean, status?: string) {

    if (status) {

        if (status == "Not in stock") {
            useUpProduct(product.id);
        }

        else if (status == "In stock") {

            if (expiry) {
                addProductToStock(product.id, 999, product.locationId, expiry);
            } else addProductToStock(product.id, 999, product.locationId, '2099-12-31');

        }

    }

    if (expiry) {
        setExpiryDate(product, expiry);
    }

    if (mandatory != undefined) {
        setProductDetails(product.id, undefined, undefined, undefined, mandatory);
    }
    

}

async function setProductDetails(productId: number, name?: string, description?: string, locationId?: number, mandatory?: boolean) {

    interface productPayload {
        name?: string,
        description?: string,
        location_id?: number,
        min_stock_amount?: number
    }

    const requestBody: productPayload = {};

    if (name) {
        requestBody.name = name;
    }

    if (description) {
        requestBody.description = description;
    }

    if (locationId) {
        requestBody.location_id = locationId;
    }

    if (mandatory == true) {
        requestBody.min_stock_amount = 1
    } else if (mandatory == false) {
        requestBody.min_stock_amount = 0
    }

    const productUrl = apiUrl + 'objects/products/' + productId

    headers.append("Content-Type", "application/json");

    const request = new Request(
        productUrl,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
            redirect: 'follow'

        }
        );

    await fetch(request)
    .then(response => response.text())
    .catch(error => console.log('error', error));

    getProducts();
    getStock();
        
}

async function setQuantity(productId: number, quantity: number, expiry?: string) {

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    interface inventoryPayload {
        "new_amount": number;
        "best_before_date"?: string;
    }

    const requestBody: inventoryPayload = {
        "new_amount": quantity
    };

    if (expiry) {
        requestBody["best_before_date"] = expiry;
    }

    const productUrl = apiUrl + 'stock/products/' + productId + '/inventory'

    const request = new Request(
        productUrl,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        }
        );

    await fetch(request)
    .then(response => response.text())
    .catch(error => console.log('error', error));

    getStock();

}

async function setExpiryDate(product: Product, expiry: string) {

    headers.append('Content-Type', 'application/json');

    const requestBody = {
        "amount": product.quantity,
        "best_before_date": expiry,
        "open": false
    }

    if (product.stockIds) {

        const productUrl = apiUrl + 'stock/entry/' + product.stockIds[0];
        console.log(JSON.stringify(requestBody))

        const request = new Request(
            productUrl,
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(requestBody)
            }
            );

        await fetch(request)
        .then(response => response.text())
        .catch(error => console.log('error', error));

        getStock();

    }

}

async function getStockDetails(stock: Array<Product>) {

    stock.forEach(async product => {

        const productId = product.id

        const request = new Request(
            apiUrl + 'stock/products/' + productId + '/entries',
            {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            }
        );

        await fetch(request)
        .then(response => response.text())
        .then(result => { 

            const stockIds: Array<number> = []

            // handle response data here
            const json = JSON.parse(result);
            json.forEach((element: { id: number; }) => {
                stockIds.push(element.id);
            })

            const productLocation = json[0].location_id;

            if (productLocation) {
                const locationName = getLocationFromId(productLocation);
                store.commit('setProductLocation', { productId, productLocation, locationName});
            }

            store.commit('setStockIds', {productId, stockIds});

        })
        .catch(error => console.log('error', error));

    })


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

    if (expiry < 6 && expiry > 1) {
        status = 'Use up in ' + expiry + ' days';  
    }

    if (expiry == 1) {
        status = 'Use up in 1 day';  
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

function isOnShoppingList (productId: number) {

    return store.getters.productIsOnShoppingList(productId);

}

export { getLocations, getProducts, getShoppingList, getStock, useUpProduct, moveProduct, addProductToShoppingList, addProductToStock, editProductDetails }