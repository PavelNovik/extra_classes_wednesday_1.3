import {addTodolistAC} from "./todolists-reducer";
import {isLoadingReducer, IsLoadingStateType} from "./isLoading-reducer";

let startState: IsLoadingStateType

beforeEach(()=> {
    startState = {}
})


test('Is Loading should be created', ()=> {
    const action = addTodolistAC('test1')

   const endState = isLoadingReducer(startState,action)


    expect(endState[action.todolistId].isLoading).toBe(false)


})