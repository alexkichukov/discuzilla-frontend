import { Button, CSS, Card, Container, Grid } from '@nextui-org/react'
import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Auth = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login')

  return (
    <Container lg>
      <Grid.Container justify='center' alignItems='center' css={{ height: '100vh' }}>
        <Card css={{ width: '320px' }}>
          <Card.Header css={{ padding: 0 }}>
            <Grid.Container>
              <Grid xs={6}>
                <Button
                  css={{
                    borderRadius: 0,
                    borderTopLeftRadius: '$lg',
                    width: '100%',
                    background: tab !== 'login' ? '$backgroundContrast' : undefined
                  }}
                  onPress={() => setTab('login')}
                  animated={false}
                  color='gradient'
                  bordered={tab !== 'login'}
                  auto
                >
                  Login
                </Button>
              </Grid>
              <Grid xs={6}>
                <Button
                  css={{
                    borderRadius: 0,
                    borderTopRightRadius: '$lg',
                    width: '100%',
                    background: tab !== 'signup' ? '$backgroundContrast' : undefined
                  }}
                  onPress={() => setTab('signup')}
                  color='gradient'
                  bordered={tab !== 'signup'}
                  animated={false}
                  auto
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Divider />
          <Card.Body>{tab === 'login' ? <LoginForm /> : <SignUpForm />}</Card.Body>
        </Card>
      </Grid.Container>
    </Container>
  )
}

export default Auth
