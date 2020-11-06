import ActionTypes from '../constant/constant';
const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SHOPS:
            return ({
                ...state,
            })
        default:
            return state;
    }

}