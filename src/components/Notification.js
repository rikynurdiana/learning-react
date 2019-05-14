import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)

const notification = async (title, text, type, callFunction) => {
  return(
    await MySwal.fire({
      title: title,
      text: text,
      type: type,
      confirmButtonText: 'OK'
    })
  )
}

export default notification;