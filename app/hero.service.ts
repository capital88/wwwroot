import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Fcpoint }           from './fcpoint';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Fund }           from './fcpoint';
import { Todo }           from './fcpoint';
import { Jsonday}           from './fcpoint';

@Injectable()
export class HeroService {
  constructor (private http: Http) 
  {
    
    // this.getFunds().subscribe(
    //                            fcpoints => this.fcpoints = fcpoints, //Bind to view
    //                             err => {
    //                                 // Log errors if any
    //                                 console.log(err);
    //                             });
  }
  fcpoints:Fcpoint[];
  private commentsUrl = 'app/comment.json';
  //http://www.googledrive.com/host/0B9f9EFtLh7XcOG5ucDJtM1FQdDQ/comment.json';
  //http://578f454de2fa491100415d08.mockapi.io/api/Comment'; 
 
  private fundUrl = '';// 'app/SZASHR15,44.json';//'http://www.googledrive.com/host/0B9f9EFtLh7XcOG5ucDJtM1FQdDQ/txt/fcpoint/SZASHR15,44.json';
  public setfcopint(str:string):void{
    this.fundUrl = str;
  }
  //  setdataf(){
  //    this.getFunds().subscribe(
  //                              fcpoints => this.fcpoints = fcpoints, //Bind to view
  //                               err => {
  //                                   // Log errors if any
  //                                   console.log(err);
  //                               });
  //  }
   getFcpoint(fundUrl:string) : Observable<Fcpoint[]>{
         // ...using get request
         return this.http.get(fundUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }
   getJsonDay(fundUrl:string) : Observable<Jsonday[]>{
         // ...using get request
         return this.http.get(fundUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }
     getTodo(fundUrl:string) : Observable<Todo[]>{
         // ...using get request
         return this.http.get(fundUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }
     getFunds(fundUrl:string) : Observable<Fund[]>{
         // ...using get request
         return this.http.get(fundUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }
  getComments() : Observable<Comment[]>{
         // ...using get request
         return this.http.get(this.commentsUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }
  getHeroes(): Promise<Hero[]> {
    
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/