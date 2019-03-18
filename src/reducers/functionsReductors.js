export function login(state = [], action) {
    if (action.type === 'LOGIN/IN') { return action.login; }
    return state;
}

export function registerUser(state = [], action) {
    if (action.type === 'REGISTER') { return action.registerUser; }
    return state;
}

export function listemployees(state = [], action) {
    if (action.type === 'EMPLOYEES') { return action.listemployees; }
    return state;
}


export function listusers(state = [], action) {
    if (action.type === 'USERS') { return action.listusers; }
    return state;
}

export function addEmployee(state = [], action) {
    if (action.type === 'ADDEMPLOYEE') { return action.addEmployee; }
    return state;
}

export function listbots(state = [], action) {
    if (action.type === 'LISTBOTS') {return action.listbots; }
    return state;
}

export function addBot(state = [], action) {
    if (action.type === 'ADDBOT') { return action.addBot; }
    return state;
}

export function listmessages(state = [], action) {
    if (action.type === 'LISTMESSAGES') { return action.listmessages; }
    return state;
}

export function sendMessage(state = [], action) {
    if (action.type === 'SENDMESSAGE') { return action.sendMessage; }
    return state;
}

export function listgroups(state = [], action) {
    if (action.type === 'LISTGROUPS') {return action.listgroups; }
    return state;
}

export function removeMembers(state = [], action) {
    if (action.type === 'REMOVEMEMBERS') { return action.removeMembers; }
    return state;
}

export function messagesUser(state = [], action) {
    if (action.type === 'MESSAGESUSER') { return action.messagesUser; }
    return state;
}

export function reload(state = [], action) {
    if (action.type === 'RELOAD') { return action.reload; }
    return state;
}

export function loader(state = [], action) {
    if (action.type === 'LOADING') { return action.isLoading; }
    return state;
}
