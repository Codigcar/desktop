import { darshanaApi } from '@api/darshanaApi';
import Swal from 'sweetalert2';

export const modalFinishCheckout = async (styles: any, tc: any) => {
  return Swal.fire({
    iconHtml: '<Image src="/images/icons/megaphone.svg" alt="error icon"/>',
    title: `<h1 >${tc('modal-verify-success-title')}</h1>`,
    html: ` <h2 >${tc('modal-verify-success-body')}</h2>`,
    confirmButtonText: tc('understand'),
    showCancelButton: false,
    background: '#FAFAFA',
    customClass: {
      icon: `${styles.modalIcon}`,
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.buttonQuit}`,
      cancelButton: `${styles.buttonReturn}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};

export const modalDelete = async (styles: any, tc: any) => {
  return Swal.fire({
    iconHtml: '<Image src="/images/icons/error.svg" alt="error icon"/>',
    title: `<h1 >${tc('delete-post')}</h1>`,
    html: ` <h2 >${tc('lose-progress')}</h2>`,
    confirmButtonText: tc('delete'),
    showCancelButton: true,
    cancelButtonText: tc('cancel'),
    background: '#FAFAFA',
    customClass: {
      icon: `${styles.modalIcon}`,
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.buttonQuit}`,
      cancelButton: `${styles.buttonReturn}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};
export const modalDeleteAccount = async (tc: any) => {
  return Swal.fire({
    iconHtml: '<Image src="/images/icons/error.svg" alt="error icon"/>',
    title: `${tc('delete-user')}`,
    confirmButtonText: tc('delete'),
    showCancelButton: true,
    cancelButtonText: tc('cancel'),
    background: '#FAFAFA',
    customClass: {
      icon: `modalIcon`,
      popup: `modalContainer`,
      confirmButton: `buttonQuit`,
      cancelButton: `buttonReturn`,
      actions: `ActionContainer`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};
export const modalDeleteFile = async (styles: any, tc: any) => {
  return Swal.fire({
    iconHtml: '<Image src="/images/icons/error.svg" alt="error icon"/>',
    title: `<h1 >${tc('delete-file')}</h1>`,
    confirmButtonText: tc('delete'),
    showCancelButton: true,
    cancelButtonText: tc('cancel'),
    background: '#FAFAFA',
    customClass: {
      icon: `${styles.modalIcon}`,
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.buttonQuit}`,
      cancelButton: `${styles.buttonReturn}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};
export const ModalSendPropose = async (styles: any, tc: any) => {
  return Swal.fire({
    title: `<h1 >${tc('modal-edit-title')}</h1>`,
    html: ` <h2 >${tc('modal-edit-body')}</h2>`,
    confirmButtonText: tc('modal-edit-button-send'),
    showCancelButton: true,
    cancelButtonText: tc('cancel'),
    background: '#FAFAFA',
    customClass: {
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.sendButton}`,
      cancelButton: `${styles.returnButton}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};
export const ModalChangeStatusApplication = async (
  styles: any,
  tc: any,
  fullName: string,
  label: string | undefined,
) => {
  return Swal.fire({
    iconHtml:
      '<Image src="/images/icons/Alert.svg" alt="Alert Icon" width={33} height={34}/>',
    title: `<h1 class=${styles.modalTitle}>${tc(
      'modal-change-status-postulation',
      { talent_name: fullName, new_state: label },
    )}</h1>`,
    html: ` <h2 class=${styles.modalDescription}>${tc(
      'modal-change-status-postulation-body',
    )}</h2>`,
    confirmButtonText: tc('accept'),
    showCancelButton: true,
    cancelButtonText: tc('cancel'),
    background: '#FAFAFA',
    customClass: {
      icon: `${styles.modalIcon}`,
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.buttonQuit} `,
      cancelButton: `${styles.buttonReturn}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};
export const handlerClickValidate = (
  styles: any,
  tv: any,
  tc: any,
  jobTitle: string,
  idWorkplace: string | number,
  lang: string,
  getUSerWorkplace: () => Promise<void>,
) => {
  Swal.fire({
    title: `<h1 class=${styles.modalTitle}>${tv('new-job-validation-modal', {
      jobTitle,
    })}</h1>`,
    confirmButtonText: tc('yes'),
    showCancelButton: true,
    cancelButtonText: tc('no'),
    background: '#FAFAFA',
    customClass: {
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.buttonYes}`,
      cancelButton: `${styles.buttonNo}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await darshanaApi.post('/user_workplaces/verify', {
        workplace_id: idWorkplace,
        lang,
      });
      getUSerWorkplace();
      Swal.fire({
        title: `<h1 class=${styles.modalTitle}>${tv(
          'job-validation-yes-message',
        )}</h1>`,
        html: `<p class=${styles.modalBody}>${tv(
          'job-validation-yes-message-body',
        )}</p>`,
        confirmButtonText: tc('yes'),
        showCancelButton: false,
        background: '#FAFAFA',
        customClass: {
          popup: `${styles.modalContainer}`,
          confirmButton: `${styles.buttonQuit}`,
          cancelButton: `${styles.buttonReturn}`,
          actions: `${styles.ActionContainer}`,
        },
        buttonsStyling: false,
      });
    }
  });
};

export const handlerClickValidateEducation = (
  styles: any,
  tv: any,
  tc: any,
  jobTitle: string,
  idStudy: string | number,
  lang: string,
  getUSerWorkplace: () => Promise<void>,
) => {
  Swal.fire({
    title: `<h1 class=${styles.modalTitle}>${tv('new-job-validation-modal', {
      jobTitle,
    })}</h1>`,
    confirmButtonText: tc('yes'),
    showCancelButton: true,
    cancelButtonText: tc('no'),
    background: '#FAFAFA',
    customClass: {
      popup: `${styles.modalContainer}`,
      confirmButton: `${styles.buttonYes}`,
      cancelButton: `${styles.buttonNo}`,
      actions: `${styles.ActionContainer}`,
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await darshanaApi.post('/user_study_centres/verify', {
        study_id: idStudy,
        lang,
      });
      getUSerWorkplace();
      Swal.fire({
        title: `<h1 class=${styles.modalTitle}>${tv(
          'job-validation-yes-message',
        )}</h1>`,
        html: `<p class=${styles.modalBody}>${tv(
          'job-validation-yes-message-body',
        )}</p>`,
        confirmButtonText: tc('yes'),
        showCancelButton: false,
        background: '#FAFAFA',
        customClass: {
          popup: `${styles.modalContainer}`,
          confirmButton: `${styles.buttonQuit}`,
          cancelButton: `${styles.buttonReturn}`,
          actions: `${styles.ActionContainer}`,
        },
        buttonsStyling: false,
      });
    }
  });
};
