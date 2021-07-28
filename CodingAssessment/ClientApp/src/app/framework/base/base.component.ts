import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, Directive } from '@angular/core';
import { DataService } from '../services/data.service';
import * as url from 'url'
import { DomSanitizer } from '@angular/platform-browser';


//@Directive()
@Injectable()
export class BaseComponent {

  public IsLoading: boolean;
  public CurrentUrl: any;
  public loginResult: any;
  public Criteria: any;

  constructor(public dc: DataService, public route: ActivatedRoute, public router: Router, private _DomSanitizationService: DomSanitizer) {

    this.CurrentUrl = url.parse(this.router.url).path;
    this.checkModuleAccess();

    this.loginResult = JSON.parse(localStorage.getItem('user')).LoginResult;
    console.log(this.loginResult);

  }

  showValidation(ar: any[]) {
  }

  handleActionResult(ar: any) {
  }

  handleActionResult2(response: any) {
  }

  handleHttpError(error) {
    this.debugLog(error, 'Error');
  }

  showSuccess(message: string) {
  }

  showError(message: string) {
  }

  showWarning(message: string) {
    console.log(message);
  }

  somethingWentWrong(error?: any) {
    console.log(error);
  }

  closeModal() {
    console.log("Made it here");
  }


  navigateBackUrl() {
    window.history.back();
  }

  selectedId() {
    return this.route.snapshot.paramMap.get('id');
  }

  getCurrentUser() {
    let vm: any = new Object();
    vm = JSON.parse(localStorage.getItem('user'));

    return vm.LoginResult;
  }


  checkModuleAccess() {
    let vm: any = new Object();
    vm = JSON.parse(localStorage.getItem('user'));
  }

  focusElementById_Delay(id) {
    setTimeout(function () { this.ocusElementById(id); }, 500);
  }

  /*=================================================================
  Debug Handling
  ================================================================*/
  debugEnabled: boolean = false;
  debugLogPage: String = "Undefined Page";

  debugLog(obj: any, description: string = null) {

    if (this.debugEnabled == true) {
      console.group(this.debugLogPage + " - " + description);
      console.log(obj);
      console.groupEnd();
    }
  }

}
