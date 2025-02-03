const initialState = {
    is_updated: false,
    is_deleted: false,
    is_edit: false
};

const maineducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_DELETED":
            return { ...state, is_deleted: action.payload, };
        case "SET_UPDATED":
            return { ...state, is_updated: action.payload, };

        case "IS_EDIT":
            
            return { ...state, is_edit: action.payload }
        default:
            return state;
    }
};

export default maineducer;