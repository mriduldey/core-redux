const redux = require("redux");
const createStore = redux.createStore;

//Action and action creator.....................

const BUY_CAKE = "BUY_CAKE";

function buyCake(numOfCakes) {
  return {
    type: BUY_CAKE,
    numOfCakesNeeded: numOfCakes
  };
}

//.............................................

// reducer =(previousState, action) => newState

const initiaCakeState = {
  numOfCakes: 10
};

const cakeReducer = (state = initiaCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: {
      const neededCakes = action.numOfCakesNeeded;
      return {
        ...state,
        numOfCakes:
          neededCakes <= state.numOfCakes
            ? state.numOfCakes - neededCakes
            : state.numOfCakes
      };
    }

    default:
      return state;
  }
};

//...............................................

// store.........................................

const store = createStore(cakeReducer);
console.log("Initia State: ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State: ", store.getState())
);
store.dispatch(buyCake(1));
store.dispatch(buyCake(6));
store.dispatch(buyCake(8));

unsubscribe();

//..............................................
