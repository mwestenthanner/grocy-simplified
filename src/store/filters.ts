import { Product, Recipe } from '../types'

export function filterByLocation(list: Array<Product>, locationId: number) {
    if (locationId == 0) {
        return list;
    }

    else return list.filter(item => {

        if(locationId == item.locationId) {
            return true;
        } else return false;
      
    })
}