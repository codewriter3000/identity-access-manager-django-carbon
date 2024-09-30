import users from '../public/users.json'

const baseURL = 'http://localhost:8080'

const convertClojureMapToJSON = (clojureMap) => {
    // Parse the clojure map like {:name "Bob" :country "US" :age 40} (string) into a JSON object like {"name": "Bob", "country": "US", "age": 40}
    // This is a very simple implementation that only works for the specific format of the clojure map string
    // It will not work for nested maps or maps with more complex values

    // move the colons in the clojure map string to the right of the key
    let json = clojureMap.replace(/:([^ ]*)/g, '"$1":')

    // put a comma in between } and {
    json = json.replace(/}{/g, '},{')

    // add [ and ] to the beginning and end of the string
    json = '[' + json + ']'

    // replace nil with empty string
    json = json.replace(/nil/g, '""')

    return JSON.parse(json)
}

export async function getUsers() {
    const response = await fetch(baseURL + '/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    let done = false;

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        result += decoder.decode(value, { stream: true });
    }

    const data = convertClojureMapToJSON(result)//JSON.parse(result);

    return data;
}

export async function getUserByID(userID) {
    const response = await fetch(baseURL + '/user/' + userID, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    let done = false;

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        result += decoder.decode(value, { stream: true });
    }

    const data = convertClojureMapToJSON(result)//JSON.parse(result);

    return data;
}

export async function registerUser(user) {
    const response = await fetch(baseURL + '/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user['username'],
            password: user['password'],
            first_name: user['first_name'] || '',
            last_name: user['last_name'] || '',
            email: user['email'],
        })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    let done = false;

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        result += decoder.decode(value, { stream: true });
    }

    return result;
}

export async function updateUser(userID, payload) {
    return fetch(baseURL + `/user/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}

export async function deleteUser(userID) {
    return fetch(baseURL + `/user/${userID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
}