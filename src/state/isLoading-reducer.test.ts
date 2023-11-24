import {addTodolistAC} from "./todolists-reducer";
import {isLoadingAC, isLoadingReducer, IsLoadingStateType} from "./isLoading-reducer";

let startState: IsLoadingStateType

beforeEach(() => {
    startState = {}
})


test('Is Loading should be created', () => {
    const action = addTodolistAC('test1')
    const endState = isLoadingReducer(startState, action)

    expect(endState[action.todolistId].isLoading).toBe(false)
    expect(Object.keys(endState)[0]).toBe(action.todolistId)
})

test('change isLoading', ()=> {
    const id = 'test'
    const action = isLoadingAC(id, true)
    const endState = isLoadingReducer(startState,action)

    expect(endState[id].isLoading).toBeTruthy()
})