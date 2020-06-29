import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

let middleware = [thunk, reduxImmutableStateInvariant()];
if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed: true
  });
  middleware = [...middleware, logger];
}

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
