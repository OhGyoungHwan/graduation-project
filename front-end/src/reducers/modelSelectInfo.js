const MODEL_SELECT = "MODEL_SELECT"

const initialState = {
    idx: ''
};

export default function modelSelectInfo(state = initialState, action) {
    switch (action.type) {
        case MODEL_SELECT:
            return {
                ...state,
                idx: action.idx,
            }
        default:
            return {
                ...state,
            }
    }
}

export const setModelSelect = (idx) => {
    return {
        type: MODEL_SELECT,
        idx: idx,
    }
}