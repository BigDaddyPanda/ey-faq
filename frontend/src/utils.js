import {
    backend_entry_point
} from "./_vuex/_services";
/**
 * generates the URI to access certain service
 * http://localhost:8080/service/1
 * @param {String} e entry poin
 * @param {any} i next path router
 */
export const apiRes = (e="", i="") => {
    return `${backend_entry_point+e}/${i}`;
}