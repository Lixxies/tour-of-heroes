import { Component, Input, OnInit } from '@angular/core';

import { Hero, HeroService } from '../../services/hero.service';

@Component({
    selector: 'app-heroes',
    template: `
        <h2>{{title}}</h2>

        <div>
            <label for="name">Hero name:</label>
            <input type="text" id="name" placeholder="name" #heroName />
            <button 
                type="button" 
                (click)="handleAdd(heroName.value); heroName.value = ''"
                class="addHeroButton"
                >
            Add hero
            </button>
        </div>

        <ul class="heroesGrid">
            <li *ngFor="let hero of heroes">
                <button type="button" class="heroButton" routerLink="/heroes/{{hero.id}}">
                    <span class="badge">{{hero.id}}</span>
                    <div class="name">{{hero.name}}</div>
                    <button type="button" (click)="handleDelete(hero.id)">X</button>
                </button>
            </li>
        </ul>
    `,
    styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
    @Input() renderAll:boolean = true
    heroes: Hero[] = []
    title:string = ""

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.title = this.renderAll ? "My Heroes" : "Top Heroes"
        this.heroService.getAllHeroes().subscribe(heroes => this.heroes = this.renderAll ? heroes : heroes.slice(0, 4))
    }

    handleAdd(name: string): void {
        name = name.trim()
        if (!name) return

        this.heroService.addHero({ name } as Hero).subscribe(hero => this.heroes.push(hero))
    }

    handleDelete(id: number): void {
        this.heroes = this.heroes.filter(hero => hero.id !== id)
        this.heroService.deleteHero(id).subscribe()
    }
}
