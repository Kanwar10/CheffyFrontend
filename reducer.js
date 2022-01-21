// import {INCREMENT} from '../actions/types'
// import {DECREMENT} from '../actions/types'

const initialState = {
    value:0
};


const counter = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            let temp=initialState.value;
            temp++;
            return {
                value:state.value+1,
            };
        case 'DECREMENT':
            return {
                value:state.value-1,
            };
        default:
            return state;
    }
}

export default counter;