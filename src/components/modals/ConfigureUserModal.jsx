import {
    Accordion,
    AccordionItem,
    Button,
    Modal,
    Stack,
    TextInput,
    Toggle
} from '@carbon/react'
import { useEffect, useState } from 'react'
import { updateUser, deleteUser } from '@/../lib'

const ConfigureUserModal = ({ user, open, setOpen }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)
    const [deleteStage, setDeleteStage] = useState('Delete Account')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setIsAdmin(user?.['is_admin'])
        setIsEnabled(user?.['is_enabled'])
        setDeleteStage('Delete Account')
        setFirstName(user?.['first_name'])
        setLastName(user?.['last_name'])
        setEmail(user?.['email'])
    }, [user])

    return (
        <Modal open={open}
               onRequestClose={() => setOpen(false)}
               modalHeading={`Configure ${user?.['username']}`}
               modalLabel='User configuration'
               secondaryButtonText='Cancel'
               primaryButtonText='Save Changes'
               onRequestSubmit={() => {
                   const updatedUserPayload = {
                       username: user['username'],
                       first_name: firstName,
                       last_name: lastName,
                       email: email,
                       is_admin: isAdmin,
                       is_enabled: isEnabled
                   }

                   updateUser(user['id'], updatedUserPayload).then(() => {
                       console.log('User successfully updated')
                   })

                   setOpen(false)
               }}
        >
            <Stack gap={7}>
                <p style={{
                    marginBottom: '1rem'
                }}>
                    This is where you can configure the user account status for a
                    particular user. You can change information about a user, change
                    their admin status, or even disable, enable, or delete their account.
                </p>
                <TextInput data-modal-primary-focus id="email-config"
                           labelText="Email"
                           defaultValue={user?.['email']}
                           value={email}
                           onChange={evt => setEmail(evt.target.value)}
                />
                <TextInput data-modal-primary-focus id="first-name-config"
                           labelText="First name"
                           defaultValue={user?.['first_name']}
                           value={firstName}
                           onChange={evt => setFirstName(evt.target.value)}
                />
                <TextInput data-modal-primary-focus id="last-name-config"
                           labelText="Last name"
                           defaultValue={user?.['last_name']}
                           value={lastName}
                           onChange={evt => setLastName(evt.target.value)}
                />
                <div className='grid grid-cols-2'>
                    <div>
                        <Toggle labelText='Is admin'
                                id='isAdmin-config'
                                labelA='Standard user'
                                labelB='Admin user'
                                toggled={isAdmin}
                                onClick={() => setIsAdmin(curr => !curr)}
                        />
                    </div>
                    <div>
                        <Toggle labelText='Is account enabled'
                                id='isDisabled-config'
                                labelB='Enabled account'
                                labelA='Disabled account'
                                toggled={isEnabled}
                                onClick={() => setIsEnabled(!isEnabled)}
                        />
                    </div>
                </div>
                <Accordion>
                    <AccordionItem title='Delete Account'>
                        <div className='flex'>
                            <div>
                                <Button kind='danger'
                                        onClick={() => {
                                            if (deleteStage === 'Confirm Delete') {
                                                deleteUser(user?.['id']).then(r => {
                                                    console.log('User successfully deleted')
                                                })
                                                setOpen(false)
                                                return
                                            }

                                            setDeleteStage('Confirm Delete')
                                        }}>
                                    {deleteStage}
                                </Button>
                            </div>
                            {deleteStage === 'Confirm Delete' && <div className='m-auto'>
                                Are you sure you want to delete this account?
                            </div>}
                        </div>
                    </AccordionItem>
                </Accordion>
            </Stack>
        </Modal>
    )
}

export default ConfigureUserModal