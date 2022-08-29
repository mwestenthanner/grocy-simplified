export interface Product {
    id: number
    name: string
    location: string
    locationId: number
    quantity?: number // Quantity should be optional
    unit: string
    expiry: Date
    mandatory: boolean
    onShoppingList: boolean
    quantityOnShoppingList?: number // also optional
    status: string
    stockIds?: Array<number> // exists if product is in stock
    nutritionalValue?: Array<KeyValuePair>
}

export interface Recipe {
    id: number
    name: string
    description: string
    img: string
    categories: Array<string>
    ingredients: Array<string>
    instructions: Array<string>
    nutritionalValue?: Array<KeyValuePair>
}

export interface KeyValuePair {
    key: string
    value: string | number
}