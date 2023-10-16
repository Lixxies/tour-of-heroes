import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero, HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-search',
  template: `
    <div class="searchContainer">
        <label for="search">Hero Search</label>
        <input 
            type="text"
            id="search" 
            name="search" 
            placeholder="Add name" 
            #searchInput
            (input)="search($event)"
        >

        <ul>
            <li *ngFor="let hero of heroes$ | async">
                <a routerLink="/detail/{{hero.id}}">{{hero.name}}</a>
            </li>
        </ul>
    </div>
  `,
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
    heroes$!: Observable<Hero[]>
    private searchQuery = new Subject<string>()

    constructor(private heroService: HeroService) { }

    search(event: Event): void {
        const name = (event.target as HTMLInputElement).value
        this.searchQuery.next(name)
    }

    ngOnInit(): void {
        this.heroes$ = this.searchQuery.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((name: string) => this.heroService.searchHero(name))
        )
    }
}
