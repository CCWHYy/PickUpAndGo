import {
    SET_ORDERS,
    MAKE_ORDER,
} from "./types";

const initialState = {
    items: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                items: [
                    ...action.payload,
                ],
            };
        case MAKE_ORDER:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload,
                ],
            };
        default:
            return state;
    }
};
