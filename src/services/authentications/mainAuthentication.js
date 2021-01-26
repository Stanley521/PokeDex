import { useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import { addUser } from "../../redux/actions/userListAction";

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function signIn(userName, password, dispatch, userList = []) {
    if (userName == '' || password == '') {
        const response = { message: `User name and password must not be empty` }
        return response;
    }
    const index = userList.findIndex((value) => value.userName == userName);
    const userFound = userList[index];
    if (!userFound) {
        addUser({
            id: uuidv4(),
            userName: userName,
            password: password
        }, dispatch)
    }
    if (userFound && userFound.password !== password) {
        const response = { message: `Password is not correct` }
        return response;
    }
    updateUser(userFound, dispatch);
    const response = { message: `Successfully signed in as ${userName}` }
    return response;
}