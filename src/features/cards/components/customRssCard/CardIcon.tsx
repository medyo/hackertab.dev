import { BsRssFill } from 'react-icons/bs'

const CardIcon = (props: { url?: string }) => {
  const { url } = props
  return url ? <img src={url} alt="" /> : <BsRssFill />
}

export default CardIcon
