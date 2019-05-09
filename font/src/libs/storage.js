import engine from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';
import cookieStorage from 'store/storages/cookieStorage';
import expire from 'store/plugins/expire';

// eslint-disable-next-line
let prefix = __webpack_public_path__.replace(/\//g, '_');
let storage = engine.createStore([localStorage, cookieStorage], [expire]);

function setToken(val) {
    return setItem('token', val);
}

function getToken() {
    return getItem('token');
}

function removeToken() {
    return removeItem('token');
}

function setItem(key, val, expire = 180) {
    expire = new Date().getTime() + expire * 1000 * 60;
    return storage.set(`${prefix}${key}`, val, expire);
}

function getItem(key) {
    return storage.get(`${prefix}${key}`);
}

function removeItem(key) {
    return storage.remove(`${prefix}${key}`);
}

export { storage, setToken, getToken, removeToken, setItem, getItem, removeItem };