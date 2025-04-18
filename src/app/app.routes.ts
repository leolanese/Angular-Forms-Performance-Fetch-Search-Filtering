import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { 
      path: 'solution1', 
      loadComponent: () => import('./Components/solution1/solution1.component').then(m => m.Solution1Component) 
    },
    { 
        path: 'solution2', 
        loadComponent: () => import('./Components/solution2/solution2.component').then(m => m.Solution2Component) 
    },
    { 
        path: 'solution3', 
        loadComponent: () => import('./Components/solution3/solution3.component').then(m => m.Solution3Component) 
    },
    { 
        path: 'solution4', 
        loadComponent: () => import('./Components/solution4/solution4.component').then(m => m.Solution4Component) 
    },
    { 
        path: 'solution5', 
        loadComponent: () => import('./Components/solution5/solution5.component').then(m => m.Solution5Component) 
    },
    { 
        path: 'solution6', 
        loadComponent: () => import('./Components/solution6/solution6.component').then(m => m.Solution6Component) 
    },
    { 
        path: 'solution7', 
        loadComponent: () => import('./Components/solution7/solution7.component').then(m => m.Solution7Component) 
    },
    { 
        path: 'solution8', 
        loadComponent: () => import('./Components/solution8/solution8.component').then(m => m.Solution8Component) 
    },
    { 
        path: 'solution9', 
        loadComponent: () => import('./Components/solution9/solution9.component').then(m => m.Solution9Component) 
    },
    { 
        path: 'solution10', 
        loadComponent: () => import('./Components/solution10/solution10.component').then(m => m.Solution10Component) 
    },
    { 
        path: 'solution11', 
        loadComponent: () => import('./Components/solution11/solution11.component').then(m => m.Solution11Component) 
    },
    { 
        path: 'solution12', 
        loadComponent: () => import('./Components/solution12/solution12.component').then(m => m.Solution12Component) 
    },
    { 
        path: 'solution13', 
        loadComponent: () => import('./Components/solution13/solution13.component').then(m => m.Solution13Component) 
    },
    {   path: '', redirectTo: 'home', pathMatch: 'full' },
    {   path: '**', component: PageNotFoundComponent }
];

