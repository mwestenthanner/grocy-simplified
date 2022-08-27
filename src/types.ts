export interface Product {
    id: number
    name: string
    area: string
    quantity?: number // Quantity should be optional
    unit: string
    expiry: Date
    onShoppingList: boolean
    quantityOnShoppingList?: number // also optional
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