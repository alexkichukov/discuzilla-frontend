import { getUser } from '@/requests/users'
import { Container } from '@nextui-org/react'
import { useEffect } from 'react'

const TestPage = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const user = await getUser('alex')
        console.log(user)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  return <Container sm>TestPage</Container>
}
export default TestPage
