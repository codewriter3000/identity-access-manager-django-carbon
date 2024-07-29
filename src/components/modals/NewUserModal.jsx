import {
    Modal,
    PasswordInput,
    Stack,
    TextInput,
    Toggle
} from '@carbon/react'
import { useEffect, useState } from 'react'
import { registerUser } from '@/../lib'

const NewUserModal = ({ open, setOpen }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [usernameInvalid, setUsernameInvalid] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const [firstNameInvalid, setFirstNameInvalid] = useState(false)
    const [lastNameInvalid, setLastNameInvalid] = useState(false)

    const [usernameInvalidText, setUsernameInvalidText] = useState('')
    const [passwordInvalidText, setPasswordInvalidText] = useState('')
    const [firstNameInvalidText, setFirstNameInvalidText] = useState('')
    const [lastNameInvalidText, setLastNameInvalidText] = useState('')

    useEffect(() => {
        setUsername('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }, [open])

    return (
        <Modal open={open}
               onRequestClose={() => setOpen(false)}
               onRequestSubmit={(evt) => {
                   // asdfsfssdfS5$
                   setUsernameInvalid(false)
                   setPasswordInvalid(false)
                   setFirstNameInvalid(false)
                   setLastNameInvalid(false)

                   registerUser({
                       username: username,
                       password: password,
                       first_name: firstName,
                       last_name: lastName,
                       is_admin: isAdmin,
                       is_enabled: isEnabled
                   }).then(res => {
                       // console.log(res)
                       if (res['detail']) {
                           const field = /^([A-Za-z]+)/.exec(res['detail'])[1].toLowerCase()

                           if (field === 'username') {
                               setUsernameInvalid(true)
                               setUsernameInvalidText(res['detail'])
                           } else if (field === 'password') {
                               setPasswordInvalid(true)
                               setPasswordInvalidText(res['detail'])
                           } else if (field === 'first') {
                               setFirstNameInvalid(true)
                               setFirstNameInvalidText(res['detail'])
                           } else if (field === 'last') {
                               setLastNameInvalid(true)
                               setLastNameInvalidText(res['detail'])
                           }
                       } else {
                           setOpen(false)
                       }
                   })
               }}
               modalHeading='New User'
               modalLabel='User creation'
               secondaryButtonText='Cancel'
               primaryButtonText='Create user'
        >
            <Stack gap={7}>
                <p style={{
                    marginBottom: '1rem'
                }}>
                    This is where you can create a new user for your application. You
                    can add their first name, last name, username, and whether or not you
                    want their account to be an admin or enabled.
                </p>
                <TextInput data-modal-primary-focus id="username"
                           labelText="Username"
                           value={username}
                           invalid={usernameInvalid}
                           invalidText={usernameInvalidText}
                           onChange={evt => setUsername(evt.target.value)}
                />
                <PasswordInput data-modal-primary-focus id="password"
                          labelText="Password"
                          value={password}
                          invalid={passwordInvalid}
                          invalidText={passwordInvalidText}
                          onChange={evt => setPassword(evt.target.value)}
                />
                <TextInput data-modal-primary-focus id="first-name"
                           labelText="First name"
                           value={firstName}
                           invalid={firstNameInvalid}
                           invalidText={firstNameInvalidText}
                           onChange={evt => setFirstName(evt.target.value)}
                />
                <TextInput data-modal-primary-focus id="last-name"
                           labelText="Last name"
                           value={lastName}
                           invalid={lastNameInvalid}
                           invalidText={lastNameInvalidText}
                           onChange={evt => setLastName(evt.target.value)}
                />
                <div className='grid grid-cols-2'>
                    <div>
                        <Toggle labelText='Is admin'
                                id='isAdmin'
                                labelA='Standard user'
                                labelB='Admin user'
                                toggled={isAdmin}
                                onClick={() => setIsAdmin(curr => !curr)}
                        />
                    </div>
                    <div>
                        <Toggle labelText='Is account enabled'
                                id='isDisabled'
                                labelB='Enabled account'
                                labelA='Disabled account'
                                toggled={isEnabled}
                                onClick={() => setIsEnabled(!isEnabled)}
                        />
                    </div>
                </div>
            </Stack>
        </Modal>
    )
}

export default NewUserModal