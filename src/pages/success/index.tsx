import { useCart } from '@/context/CartContext'
import { FC } from 'react'

interface indexProps {
  
}

const index: FC<indexProps> = ({}) => {

    const {resetCart} = useCart
  return <div>index</div>
}

export default index