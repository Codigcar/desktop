


import swal from 'sweetalert2';

const messageSuccess = (message:string = "¡Cambios guardados correctamente!") => {
    const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: message
    })
}
const messageError = (message:string = "ha ocurrido un error al guardar los cambios") => {
    const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'error',
        title: `Oops.. ${message}`
    })
}

export  {messageSuccess,messageError};