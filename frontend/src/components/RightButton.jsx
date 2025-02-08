import {FaArrowCircleRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'


 const RightButton = ({url}) => {

  return (
    <Link to={url} className='btn btn-reverse btn-back' >
        <FaArrowCircleRight/> Next Page
    </Link>
  )
}

export default BackButton
