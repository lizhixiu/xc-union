import request from '@/scripts/request'

export function uuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

export function renderWhere(where) {
    let newWhere = {}
    for (let key in where) {
        if (where[key] instanceof Object) {
            if(where[key].value === null || where[key].value === undefined || where[key].value === '') {
                newWhere[key] = where[key]
            }else{
                newWhere[key] = where[key].value
            }
        } else {
            newWhere[key] = where[key]
        }
    }
    return newWhere
}

export function postJson(url, data) {
    return request.post(url, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export function notEmptyNot01(value) {
    if (value !== null && value !== undefined && value !== '') {
        return true
    }
    return false
}


