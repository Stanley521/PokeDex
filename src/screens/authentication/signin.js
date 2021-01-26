
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultButton from '../../components/buttons/DefaultButton';
import CenterContainer from "../../components/container/CenterContainer/CenterContainer";
import SimpleTextInput from '../../components/forms/inputs/SimpleTextInput';
import { signIn } from '../../services/authentications/mainAuthentication';

export default function Signin() {
    var userList = useSelector(state => state.userList?.data);
    const dispatch = useDispatch();

    const [name, setName] = useState('Jessica');
    const [password, setPassword] = useState('Developer1');
    
    function onClickSignIn() {
        const response = signIn(name, password, dispatch, userList);
        console.log(response.message)
    }

    return (
        <CenterContainer>
            <SimpleTextInput
                value={name} key="username" placeholder="User Name" onChange={(e) => { setName(e.target.value) }}
            />
            <SimpleTextInput
                value={password} type="password" key="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}
            />
            <DefaultButton
                primary={true}
                onClick={onClickSignIn}
                text="Sign in"
            />
        </CenterContainer>
    )
}