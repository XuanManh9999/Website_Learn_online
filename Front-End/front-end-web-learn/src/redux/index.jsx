import { createStore } from "redux"
import { mainReducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Chọn công cụ lưu trữ của bạn 

const persistConfig = {
    key: 'auth',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['user', 'course'],
};
const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
