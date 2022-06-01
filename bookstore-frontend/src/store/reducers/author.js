const INITIAL_STATE = {
    authors: [],
    editAuthor: {}
}

export default function authorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_AUTHORS":
            return {...state, authors: action.payload};
        case "ADD_AUTHOR":
            return {...state, authors: [...state.authors, action.payload.author]};
        case "UPDATE_AUTHOR":
            state.authors.splice(action.payload.index, 1, action.payload.author);
            return state;
        case "DELETE_AUTHOR":
            return {...state, authors: state.authors.filter(c => c.id !== action.payload.id)};
        case "SET_EDIT_AUTHOR":
            return {...state, editAuthor: {index: action.payload.index, author: action.payload.author}};
        default:
            return state;
    }
}