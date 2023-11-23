import {AddTodolistActionType} from "./todolists-reducer";

export type CircularReducerType = ChangeProgressACType | ChangeIsWaitingDoneACType | AddTodolistActionType

export type  CircularStaticStateType = {
    [key: string]: CircularType
}
export type CircularType = {
    progress: number
    isWaitingDone: boolean
}

const initialState: CircularStaticStateType = {}

export const circularStaticReducer = (state = initialState, action: CircularReducerType): CircularStaticStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: {progress: 0, isWaitingDone: true}}

        case 'CHANGE_PROGRESS': {
            return {...state, [action.id]: {...state[action.id], progress: action.progress}}
        }

        case 'CHANGE_IS_WAITING_DONE': {
            return {...state, [action.id]: {...state[action.id], isWaitingDone: action.isWaitingDone}}
        }

        default:
            return state
    }
}

type ChangeProgressACType = ReturnType<typeof changeProgressAC>
export const changeProgressAC = (id: string, progress: number) => {
    return {
        type: 'CHANGE_PROGRESS',
        id,
        progress
    } as const
}

type ChangeIsWaitingDoneACType = ReturnType<typeof changeIsWaitingDoneAC>
export const changeIsWaitingDoneAC = (id: string, isWaitingDone: boolean) => {
    return {
        type: 'CHANGE_IS_WAITING_DONE',
        id,
        isWaitingDone
    } as const
}