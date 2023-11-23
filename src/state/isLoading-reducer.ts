import {AddTodolistActionType} from "./todolists-reducer";

export type IsLoadingStateType = {
   [key: string]: IsLoadingType
}
export type IsLoadingType = {
    isLoading: boolean
}


const initialState: IsLoadingStateType = {}

export type IsLoadingReducerType = IsLoadingACType | AddTodolistActionType

export const isLoadingReducer = (state = initialState, action: IsLoadingReducerType): IsLoadingStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: {isLoading: false}}
        case 'IS-LOADING':
            return { ...state, [action.id]: {isLoading: action.isLoading} };
        default:
            return state;
    }
}

export type IsLoadingACType = ReturnType<typeof isLoadingAC>

export const isLoadingAC = (id: string,isLoading: boolean) => {
    return {
        type: 'IS-LOADING',
        id,
        isLoading
    } as const
}