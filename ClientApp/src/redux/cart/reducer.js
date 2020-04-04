import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
} from "./types";

const initialState = {
    items: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload,
                ],
            };
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                items: state.items.filter(({ id }) => id !== action.payload.id),
            };
        default:
            return state;
    }
};
