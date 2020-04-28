import initialState from '../../../constants/initialState'; 
import * as types from '../../../constants/types';


export function answersVolume(state = initialState.answersVolume, action) {
    switch (action.type) { 
        case types.answers.GETANSWERSVOLUME: { 
            const { answersVolume} = action; 
            let nextState = Object.assign({}, state);
            for (let element of answersVolume) {
                if (!nextState[element.answer]) {
                    nextState[element.answer] = element;
                }
            }
            return nextState;
        }
        default: 
            return state;
    }
}



