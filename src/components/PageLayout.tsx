import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const PageLayout = () => {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      initial='initial'
      animate='in'
      variants={{
        initial: {
          opacity: 0.5,
          translateX: -30
        },
        in: {
          opacity: 1,
          translateX: 0
        }
      }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3
      }}
    >
      <Outlet />
    </motion.div>
  )
}

export default PageLayout
