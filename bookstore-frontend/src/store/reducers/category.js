const INITIAL_STATE = {
    categories: [],
    editCategory: {}
}

export default function categoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_CATEGORIES":
            return {...state, categories: action.payload};
        case "ADD_CATEGORY":
            const category = {
                id: action.payload.id,
                name: action.payload.name,
                countBooks: 0
            }
            return {...state, categories: [...state.categories, category]};
        case "UPDATE_CATEGORY":
            state.categories.splice(action.payload.index, 1, action.payload.category);
            return state;
        case "DELETE_CATEGORY":
            return {...state, categories: state.categories.filter(c => c.id !== action.payload.id)};
        case "SET_EDIT_CATEGORY":
            return {...state, editCategory: {index: action.payload.index, category: action.payload.category}};
        default:
            return state;
    }
}