import { Injectable } from '@angular/core';
import { Hero } from '../../common/hero';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/common/ErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/600/heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private _errorHandler: ErrorHandler,
  ) {}

  public getHeroes(userID: number): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}/?userId=${userID}`).pipe(
      tap((_) => this._errorHandler.log('fetched heroes')),
      catchError(this._errorHandler.handleError<Hero[]>('getHeroes', []))
    );
  }

  public getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this._errorHandler.log(`fetched hero id=${id}`)),
      catchError(this._errorHandler.handleError<Hero>(`getHero id=${id}`))
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this._errorHandler.log(`added hero w/ id=${newHero.id}`)),
      catchError(this._errorHandler.handleError<Hero>('addHero'))
    );
  }

  public updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero, this.httpOptions).pipe(
      tap((_) => this._errorHandler.log(`updated hero id=${hero.id}`)),
      catchError(this._errorHandler.handleError<any>('updateHero'))
    );
  }

  public deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this._errorHandler.log(`deleted hero id=${id}`)),
      catchError(this._errorHandler.handleError<Hero>('deleteHero'))
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}?name_like=${term}`).pipe(
      tap((x) =>
          x.length
          ? this._errorHandler.log(`found heroes matching "${term}"`)
          : this._errorHandler.log(`no heroes matching "${term}"`)
      ),
      catchError(this._errorHandler.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
