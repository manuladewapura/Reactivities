import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps {
    openCreatForm: () => void;
}

const NavBar : React.FC<IProps> = ({openCreatForm}) => {
    return (
        <Menu>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item name='friends' >
                    <Button onClick={openCreatForm} positive content="Create Activity" />
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default NavBar
