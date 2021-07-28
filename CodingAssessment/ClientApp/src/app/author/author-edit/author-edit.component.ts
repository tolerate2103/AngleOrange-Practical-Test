import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../framework/base/base.component";
import { AllCriteria } from "../../framework/criteria/AllCriteria";

@Component({
  selector: 'author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})


export class AuthorEditComponent extends BaseComponent implements OnInit {

  public model: any;
  public showPass = false;
  public inpType = 'password';

  ngOnInit() {

    this.IsLoading = true;
    this.Criteria = (<any>Object).assign(new AllCriteria(), { Page: 1, PageSize: 50 });
    this.loadItem(this.route.snapshot.paramMap.get('id'));

  }

  loadItem(id) {

    this.IsLoading = true;
    this.dc.get('api/Author/LoadAuthorItem', new HttpParams().set('id', id)).subscribe((response) => {

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



  DeleteItem(id) {

    this.IsLoading = true;
    this.dc.get('api/Author/DeleteRecord', new HttpParams().set('id', id)).subscribe((response) => {

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
    this.dc.post('api/Author/PostAuthor', this.model).subscribe((response) => {

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

}
