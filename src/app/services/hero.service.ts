import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

export interface Hero {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private heroesUrl = 'api/heroes';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private messageService: MessageService) { }

    getAllHeroes(): Observable<Hero[]> {
        this.log("all heroes are fetched")
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(_ => this.log("all heroes are fetched")),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            )
    }

    getHeroById(id: number): Observable<Hero|undefined> {
        return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
            .pipe(
                tap(_ => this.log("selected hero is fetched")),
                catchError(this.handleError<Hero>(`getHeroById - ${id}`))
            )
            
    }

    updateHero(hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap(_ => this.log(`hero updated, id - ${hero.id}`)),
                catchError(this.handleError<any>(`updateHero - ${hero.id}`))
            )
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap(_ => this.log(`new hero added - ${hero.name}`)),
                catchError(this.handleError<any>("addHero"))
            )
    }

    deleteHero(id: number): Observable<Hero> {
        return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
            .pipe(
                tap(_ => this.log(`hero deleted - id ${id}`)),
                catchError(this.handleError<any>(`deleteHero - ${id}`))
            )
    }

    searchHero(name: string): Observable<Hero[]> {
        if (!name.trim()) return of([])

        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`)
            .pipe(
                tap(x => x.length
                    ? this.log(`found heroes matching "${name}"`)
                    : this.log(`no heroes matching "${name}"`)
                ),
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            )
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`)
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error)
            this.log(`${operation} failed: ${error.message}`)
            return of(result as T)
        }
    }
}
