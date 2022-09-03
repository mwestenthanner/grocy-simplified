import { Product } from '../types'

export function filterByLocation(list: Array<Product>, locationId: number): Array<Product> {
    if (locationId == 0) {
        return list;
    }

    else return list.filter(item => {

        if(locationId == item.locationId) {
            return true;
        } else return false;
      
    })
}

export function filterByStatus(list: Array<Product>, status: string): Array<Product> {
    if (status == '' || !status) {
        return list;
    }

    else return list.filter(item => {

        switch (status) {

            case 'On shopping list':

                if (item.status.includes('On shopping list')) {
                    return true;
                } else return false;

                break;

            case 'Use up in < 5 days':

                if (item.status.includes('Use up') && !item.status.includes('today')) {
                    return true;
                } else return false;

                break;

            case 'Use up today':

                if (item.status.includes('Use up today')) {
                    return true;
                } else return false;

                break;

            case 'Expired':

                if (item.status.includes('Expired')) {
                    return true;
                } else return false;

            // In stock as default
            default: 

                if (item.status.includes('In stock')) {
                    return true;
                } else return false;

        }


      return true;
    })
}

export function sortStockBy(list: Array<Product>, sortParam: string, sortUp: boolean): Array<Product> {

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

export function search(list: Array<Product>, searchText: string) {

    if (searchText == '' || !searchText) {
        return list;
    }

    else return list.filter(item => {

        const itemString = JSON.stringify(item).toLowerCase();

        console.log(itemString);

        if (itemString.includes(searchText.toLowerCase())) {
            return true;
        } else return false;
      
    })

}