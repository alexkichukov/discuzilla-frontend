import { Card, Loading as Spinner } from '@nextui-org/react'

const Loading = () => {
  return (
    <Card
      css={{
        justifyContent: 'center',
        alignItems: 'center',
        w: 'full',
        minHeight: '200px',
        backgroundColor: 'transparent'
      }}
    >
      <Card.Body>
        <Spinner />
      </Card.Body>
    </Card>
  )
}
export default Loading
