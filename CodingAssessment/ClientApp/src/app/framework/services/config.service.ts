import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public configFile: string = "appsettings.json";
  public apiEndPoint: string;

  constructor(private http: HttpClient) {
  }

  public init(): (() => Promise<boolean>) {
    return this.loadSettings();
  }

  public loadSettings(): (() => Promise<boolean>) {

    return (): Promise<boolean> => {
      return new Promise<boolean>((resolve: (a: boolean) => void): void => {
        this.http.get(this.configFile)
          .pipe(
            map((x: any) => {
              this.apiEndPoint = x.Connections.apiEndPoint;
              console.info(this.apiEndPoint);
              if (this.apiEndPoint == undefined) {

                resolve(false);
              }
              else
                resolve(true);
            }),
            catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
              console.log('ERROR GETTING API URL');
              console.log(x);
              if (x.status !== 404) {
                resolve(false);
              }
              resolve(false);
              return of({});
            })
          ).subscribe();
      });
    };
  }
}
