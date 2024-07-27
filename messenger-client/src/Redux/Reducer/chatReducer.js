const initialState = {
    messages: [],
    error: null,
};

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case 'CHAT_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}