import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../framework/base/base.component";
import { AllCriteria } from "../../framework/criteria/AllCriteria";

@Component({
  selector: 'book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

export class BookEditComponent extends BaseComponent implements OnInit {

  public model: any;
  ngOnInit() {

    this.IsLoading = true;
    this.Criteria = (<any>Object).assign(new AllCriteria(), { Page: 1, PageSize: 50 });
    this.loadUser(this.route.snapshot.paramMap.get('id'));
  }

  loadUser(id) {

    this.IsLoading = true;
    this.dc.get('api/Book/LoadBookItem', new HttpParams().set('id', id)).subscribe((response) => {

      this.model = response;
      console.log(this.model);
      this.IsLoading = false;

    },
      (error) => {
        console.error(error);
        this.somethingWentWrong();

        this.IsLoading = false;
      });
  }


  DeleteRecord(id) {

    this.IsLoading = true;
    this.dc.get('api/Book/DeleteRecord', new HttpParams().set('id', id)).subscribe((response) => {

      this.model = response;
      console.log(this.model);
      this.IsLoading = false;
      this.navigateBackUrl();
    },
      (error) => {
        console.error(error);

        this.somethingWentWrong();

        this.IsLoading = false;
      });
  }



  save() {

    this.IsLoading = true;
    this.dc.post('api/Book/PostBook', this.model).subscribe((response) => {

      this.model = response;
      console.log(this.model);
      this.navigateBackUrl();
      this.IsLoading = false;

    },
      (error) => {
        console.error(error);
        alert(error.error + ' ' + 'Please provide author name');
        this.somethingWentWrong();
        this.IsLoading = false;
      });
  }



}
