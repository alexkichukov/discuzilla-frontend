import { Button, Card, Container, Grid, Link, Row, Text } from '@nextui-org/react'
import { FaRegHeart, FaComment } from 'react-icons/fa'

const Post = () => (
  <Card isPressable>
    <Card.Header>
      <Text size='$lg' b>
        Post title here
      </Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body css={{ py: '$2' }}>
      <Grid.Container css={{ my: '$3' }} alignItems='center'>
        <Grid>
          <Link>alex</Link>
        </Grid>
        <Grid css={{ ml: 'auto' }}>
          <Text size='$sm' span color='$gray800'>
            21/02/2023
          </Text>
        </Grid>
      </Grid.Container>
      <Text span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend tortor lectus, sed
        venenatis urna mattis sed eget metus at ex congue vulputate...
      </Text>
    </Card.Body>
    <Card.Footer css={{ py: '$3' }}>
      <Row>
        <Button auto light color='gradient' css={{ mr: 'auto', px: '$5' }}>
          <Text b css={{ pr: '$3' }}>
            56 likes
          </Text>
          <FaRegHeart size={20} color='#ff006a' />
        </Button>
        <Button auto light color='gradient' css={{ px: '$5' }}>
          <Text b css={{ pr: '$3' }} span>
            8
          </Text>
          <Text css={{ mr: '$4' }} span>
            Comments
          </Text>
          <FaComment size={20} color='#ff006a' />
        </Button>
      </Row>
    </Card.Footer>
  </Card>
)

const Home = () => {
  return (
    <Container sm css={{ paddingTop: '$8' }}>
      <Text size='$3xl' css={{ marginBottom: '$10' }}>
        Latest posts
      </Text>

      <Grid.Container gap={3} css={{ padding: 0 }}>
        <Grid sm={6}>
          <Post />
        </Grid>
        <Grid sm={6}>
          <Post />
        </Grid>
        <Grid sm={6}>
          <Post />
        </Grid>
        <Grid sm={6}>
          <Post />
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default Home
