import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {CustomErrorResponse} from "./custom-error-response";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private toaster: ToastrService
  ) { }

  public handleError(err: CustomErrorResponse) {
    if (err.errorCode !== undefined) {
      let message = err.errorCode;
      this.toaster.error(message, 'Error', {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    }
  }

  public handleSuccess(suc: string) {
    if (suc) this.toaster.success(suc);
  }

  public handleInformative(info: string) {
    if (info) this.toaster.info(info);
  }

}
