import Axios from "axios";

export const SEARCH = 'search_action';
export const SEARCH_MORE = 'search_more_action';
export const SEARCH_MORE_COMPLETE = 'search_more_action_complete';
export const SEARCH_COMPLETE = 'search_complete';
export const SEARCH_ERROR = 'search_error';

const LIMIT = 20;

export const searchAction = (payload) => {
    return function (dispatch) {
        dispatch({
            type: SEARCH,
            payload
        });

        return Axios.get(process.env.REACT_APP_API_URL, {
            params: {
                q: payload,
                limit: LIMIT
            }
        }).then(resp => {
            dispatch(searchCompleteAction(resp.data.results));
        }).catch(err => {
            dispatch(searchErrorAction((err)));
        })
    }
};

export const searchMoreAction = (payload) => {
    return function (dispatch, getState) {
        dispatch({
            type: SEARCH_MORE,
            payload
        });

        const state = getState().animes;

        console.log(state);

        return Axios.get(process.env.REACT_APP_API_URL, {
            params: {
                q: payload,
                limit: LIMIT,
                page: state.page
            }
        }).then(resp => {
            dispatch(searchMoreCompleteAction(resp.data.results));
        }).catch(err => {
            dispatch(searchErrorAction((err)));
        })
    }
};

export const searchCompleteAction = (payload) => ({
    type: SEARCH_COMPLETE,
    payload
});

export const searchMoreCompleteAction = (payload) => ({
    type: SEARCH_MORE_COMPLETE,
    payload
});

export const searchErrorAction = (payload) => ({
    type: SEARCH_ERROR,
    payload
});
