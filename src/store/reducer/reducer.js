import ActionTypes from '../constant/constant';
var today = new Date;
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
const INITIAL_STATE = {
    isLoader: false,
    isError: "",
    thankYou: false,
    dateChange: today,
    shops: [],
    favoriteShops: [],
    currentUser: [],
    currentShop: [],
    bookings: [],
    currentUserBooking: [],
    currentBarberBooking: [],
    availBleSlots: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SHOPS:
            return ({
                ...state,
                shops: action.payload
            })
        case ActionTypes.FAVORITESHOPS:
            return ({
                ...state,
                favoriteShops: action.payload
            })
        case ActionTypes.CURRENTSHOP:
            return ({
                ...state,
                currentShop: action.payload
            })
            case ActionTypes.THANKYOUFORORDER:
                return ({
                    ...state,
                    thankYou: action.payload
                })
            case ActionTypes.CURRENTUSER:
                return ({
                    ...state,
                    currentUser: action.payload
                })
        case ActionTypes.AVAILBLESLOTS:
            return ({
                ...state,
                availBleSlots: action.payload
            })
        case ActionTypes.BOOKINGS:
            return ({
                ...state,
                bookings: action.payload
            })
        case ActionTypes.CURRENTUSERBOOKING:
            return ({
                ...state,
                currentUserBooking: action.payload
            })
        case ActionTypes.CURRENTBARBERBOOKING:
            return ({
                ...state,
                currentBarberBooking: action.payload
            })
        case ActionTypes.ISLOADER:
            return ({
                ...state,
                isLoader: action.payload
            })
        case ActionTypes.ISERROR:
            return ({
                ...state,
                isError: action.payload
            })
        case ActionTypes.DATECHANGE:
            return ({
                ...state,
                dateChange: action.payload
            })
        default:
            return state;
    }

}