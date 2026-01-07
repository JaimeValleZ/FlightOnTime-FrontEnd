import Swal from 'sweetalert2';

export class AlertUtil {

  static success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      background: '#1c1f27',
      color: '#ffffff',
      confirmButtonColor: '#2b6cee'
    });
  }

  static error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      background: '#1c1f27',
      color: '#ffffff',
      confirmButtonColor: '#ef4444'
    });
  }

  static warning(title: string, text?: string) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      background: '#1c1f27',
      color: '#ffffff',
      confirmButtonColor: '#f59e0b'
    });
  }

  static loading(title = 'Procesando...') {
    Swal.fire({
      title,
      background: '#1c1f27',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  static close() {
    Swal.close();
  }
}
