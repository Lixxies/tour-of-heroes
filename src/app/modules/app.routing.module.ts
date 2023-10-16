import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HeroesComponent } from "../components/heroes/heroes.component";
import { HeroComponent } from "../components/hero/hero.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";

const routes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "heroes", component: HeroesComponent },
    { path: "heroes/:id", component: HeroComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
