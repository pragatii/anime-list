import {combineReducers} from 'redux';
import {SEARCH, SEARCH_COMPLETE, SEARCH_ERROR, SEARCH_MORE, SEARCH_MORE_COMPLETE} from "./actions";

const initialState = {
    isLoading: false,
    isLoadingMore: false,
    entities: [],
    error: null,
    page: 1
};

const animesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }

        case SEARCH_MORE: {
            return {
                ...state,
                isLoadingMore: true,
                error: null
            }
        }

        case SEARCH_COMPLETE: {
            return {
                ...state,
                isLoading: false,
                entities: action.payload,
                page: state.page + 1
            }
        }

        case SEARCH_MORE_COMPLETE: {
            return {
                ...state,
                isLoadingMore: false,
                page: state.page + 1,
                entities: [
                    ...state.entities,
                    ...action.payload
                ]
            }
        }

        case SEARCH_ERROR: {
            return {
                ...state,
                isLoading: false,
                isLoadingMore: false,
                error: action.payload
            }
        }

        default:
            return state;
    }
}

export default combineReducers({
    animes: animesReducer
});
