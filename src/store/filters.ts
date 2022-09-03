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

export function sortStockBy(list: Array<Product>, sortParam: string, sortUp: boolean) {

    switch (sortParam) {
        
        // Case 'name' as default
        default:

            if (sortUp == true) {
                list = list.sort(
                    (a, b) => { return a.name.localeCompare(b.name); });
            } else list = list.sort(
                (a, b) => { 
                    return b.name.localeCompare(a.name);
                });

            break;

        case 'location':

            if (sortUp == true) {
                list = list.sort(
                    (a, b) => { return a.location.localeCompare(b.location); });
            } else list = list.sort(
                (a, b) => { 
                    return b.location.localeCompare(a.location);
                });

            break;

        case 'status': 

            if (sortUp == true) {
                list = list.sort(
                    (a, b) => { return a.status.localeCompare(b.status); });
            } else list = list.sort(
                (a, b) => { 
                    return b.status.localeCompare(a.status);
                });

            break;

    }

    return list;
}