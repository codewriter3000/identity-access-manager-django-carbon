import users from '../public/users.json';

export async function getUsers() {
    return users['users']
}

export async function registerUser(user) {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

export async function updateUser(user) {
    return fetch(`/api/users/${user['username']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

export async function deleteUser(userID) {
    return fetch(`/api/users/${userID}`, {
        method: 'DELETE'
    }).then(res => res.json())
}