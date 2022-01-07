/* --- STATE --- */
export interface LoginState {
  responseLogin: Object;
  data: Object;
  stepLogin: number;
  openSuccessToast: boolean;
  openErrorToast: boolean;
  messageError: string;
}
