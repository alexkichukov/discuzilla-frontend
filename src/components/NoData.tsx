import { CSS, Card, Text } from '@nextui-org/react'
import { TfiFaceSad } from 'react-icons/tfi'

interface Props {
  text: string
  css?: CSS
}

const NoData = ({ text, css }: Props) => {
  return (
    <Card
      css={{
        justifyContent: 'center',
        alignItems: 'center',
        w: 'full',
        minHeight: '200px',
        backgroundColor: 'transparent',
        ...css
      }}
    >
      <Card.Body
        css={{ textAlign: 'center', '@xs': { flexDirection: 'row', alignItems: 'center' } }}
      >
        <TfiFaceSad size={30} />
        <Text h3 css={{ m: 0, p: 0, ml: '$5' }}>
          {text}
        </Text>
      </Card.Body>
    </Card>
  )
}
export default NoData
