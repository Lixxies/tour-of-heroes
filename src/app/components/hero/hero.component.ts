import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from 'src/app/services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero',
  template: `
    <div *ngIf="hero">
        <h2>{{ hero.name | uppercase }} Details</h2>

        <div>ID: {{ hero.id }}</div>

        <div>
            <label for="name">Hero name:</label>
            <input type="text" id="name" placeholder="name" [(ngModel)]="hero.name">
        </div>

        <button type="button" (click)="handleSave()">Save</button>

        <button type="button" (click)="handleNavigateBack()">Go back</button>
    </div>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
    hero?: Hero

    constructor(
        private heroService: HeroService, 
        private route: ActivatedRoute, 
        private location: Location
    ) {}

    ngOnInit(): void {
        this.heroService.getHeroById(+this.route.snapshot.paramMap.get('id')!).subscribe(hero => this.hero = hero)
    }

    handleSave(): void {
        this.heroService.updateHero(this.hero!).subscribe(() => this.handleNavigateBack())
    }

    handleNavigateBack() {
        this.location.back()
    }
}
