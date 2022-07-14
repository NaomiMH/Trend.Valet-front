import { database } from "./databaseUrl"

export const Log = {
    login: database + '/login',
    signup: database + '/signup',
    token: database + '/token'
}

export const Email = {
    getEmails: database + '/email',
    postEmail: database + '/email',
    putEmail: (email) => database + '/email/' + email,
    deleteEmail: (email) => database + '/email/' + email
}

export const Label = {
    getLabels: database + '/label',
    postLabel: database + '/label',
    deleteLabel: (date) => database + '/label/' + date
}

export const User = {
    getUsers: database + '/user',
    putUser: (user) => database + '/user/' + user,
    deleteUser: (user) => database + '/user/' + user
}

export const Scanner = {
    post: database + "/scanner"
}