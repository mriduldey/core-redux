const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

//Action and action creator.....................

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake(numOfCakes) {
  return {
    type: BUY_CAKE,
    numOfCakesNeeded: numOfCakes
  };
}

function buyIceCream(numOfIceCreams) {
  return {
    type: BUY_ICECREAM,
    numOfIceCreamsNeeded: numOfIceCreams
  };
}

//.............................................

// reducer =(previousState, action) => newState

const initiaCakeState = {
  numOfCakes: 10
};

const initiaIceCreamState = {
  numOfIceCreams: 20
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

const iceCreamReducer = (state = initiaIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: {
      const neededIceCream = action.numOfIceCreamsNeeded;
      return {
        ...state,
        numOfIceCreams:
          neededIceCream <= state.numOfIceCreams
            ? state.numOfIceCreams - neededIceCream
            : state.numOfIceCreams
      };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

//...............................................

// store.........................................

const store = createStore(rootReducer);
console.log("Initia State: ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State: ", store.getState())
);
store.dispatch(buyCake(1));
store.dispatch(buyCake(6));
store.dispatch(buyCake(8));
store.dispatch(buyIceCream(1));
store.dispatch(buyIceCream(6));
store.dispatch(buyIceCream(8));
unsubscribe();

//..............................................
