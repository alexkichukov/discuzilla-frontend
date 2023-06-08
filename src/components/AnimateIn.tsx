import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

const AnimateIn = ({ children }: Props) => {
  return (
    <motion.div
      style={{ translateZ: 0 }}
      initial='initial'
      animate='in'
      variants={{
        initial: {
          opacity: 0.5,
          translateX: -30
        },
        in: {
          opacity: 1,
          translateX: 0,
          translateZ: 1
        }
      }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateIn
