const initialState = {
    user: null,
    loading: true,
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload, loading: false };
        case "LOGOUT":
            return { ...state, user: null, loading: false };
        default:
            return state;
    }
};

export default authReducer;