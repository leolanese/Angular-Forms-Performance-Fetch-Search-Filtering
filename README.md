# Angular Pagination, Fetch, Search and Real-time filtering

- This project serves as a comprehensive demonstration of Angular's flexibility in implementing the same core functionality through different patterns and approaches, each with its own trade-offs in terms of complexity, maintainability, and performance.

- We are going to follow the `reactive forms` input value changes to fetch data from API. Using a `pipe to filter` data based on search input term: The Filter will filter the `payload from API end-point`.

## Overall Project Goals

- Demonstrate different approaches to implement the same search functionality in Angular
- Compare various Angular patterns and best practices
- Show evolution from simple to complex implementations
- Warning Spoil: Solution13 is the recommendation!

## Form Handling Approaches
- Template-driven forms (Solutions 1, 8, 9)
- Reactive forms (Solutions 3, 4, 10)
- Manual event handling (Solution 2)
- Component-driven forms (Solution 11)

## Simple State:
- Two-way binding (Solution 1)
- Template reference variables (Solution 2)
- FormControl direct binding (Solution 3)

## Advanced State:
- Signals (Solutions 6, 7, 8, 9, 13)
- RxJS Streams (Solutions 10, 11)

## Pure Signal:
- Fully signal-based (Solution 13)

## Aditional API notes
- Filtering: The end-point is already filtering depending on the user-input, but including the filter pipe in our template (countries$ | async | filter:searchFilter), Angular will apply the FilterPipe's transform method to the countries$ observable's emitted values. This means, that each time the countries$ observable emits a new array of countries, Angular will filter those (can be multiple) countries based on the searchFilter string using the logic defined in the FilterPipe. To test: input `UK` it should return only `Ukraine` then check for the console. You must see: `Filter pipe triggered:  true` once 

---

## Demo

![demo](./src/assets/forms-playground.png)

---

## Different solutions to filter data based on search input

1) ✅ Uses:
- Template-driven forms with [(ngModel)] 2-way binding with ngModelChange
- Custom pipe filtering with filter pipe
- RxJS with takeUntilDestroyed pattern
- Reactive search with debounceTime and distinctUntilChanged

2) ✅ Uses:
- Template reference variables (#searchBox)
- Event binding with (input)
- Custom pipe filtering with filter pipe
- RxJS with takeUntilDestroyed pattern
- Reactive search with debounceTime and distinctUntilChanged
- Manual state management for search text

3) ✅ Uses:
- Reactive forms with FormControl and FormGroup
- Direct FormControl binding with [formControl]
- Custom pipe filtering
- RxJS with startWith and takeUntilDestroyed
- valueChanges observableformControl (directly binding the FormControl instance)

4) ✅ Uses:
- Material UI components
- Reactive forms with formControlName
- Custom pipe filtering with slice
- RxJS subscription management
- Typed form controls with interfaces formControlName (directly bind to specific - - input element within the template) 
- .get()

5) ✅ Uses:
- pipe Ng2SearchPipeModule for filtering
- Reactive forms with formControlName
- RxJS with takeUntilDestroyed
- Null safety with optional chaining
- RxJS error handling with map

6) ✅ Uses:
- Angular Signals with toSignal
- Reactive forms with FormGroup
- Effects for signal monitoring
- Custom pipe filtering
- RxJS with startWith and takeUntilDestroyed

7) ✅ Uses:
- Signals with toSignal (based on stable values & optimise for efficient rendering) 
- Reactive forms with FormGroup and formControlName
- Custom pipe filtering
- RxJS with debounceTime and takeUntilDestroyed
- Optimized for efficient rendering

8) ✅ Uses:
- Template-driven forms with [(ngModel)]
- Signals with signal, computed, and effect
- ViewChild for form access
- Custom pipe filtering
- Manual `onSearch` trigger with button

9) ✅ Uses:
- Template-driven forms with [(ngModel)]
- Signals with signal
- Simplified state management
- Custom pipe filtering
- Manual search trigger with button
- DestroyRef for cleanup

10) ✅ Uses:
- Reactive forms with validation
- FormBuilder service
- RxJS combineLatest for data streams
- Mock data with static countries
- Form validation error messages
- RxJS operators (startWith, distinctUntilChanged)
(based on https://github.com/leolanese/Angular-rxjs-filtering-list)

11) ✅ Uses:
- Component-driven architecture
- Separate components for Filter, Sort, List, and Pagination
- Advanced RxJS stream management
- FormBuilder with reactive forms
- Comprehensive data handling (filter, sort, paginate)
- SearchService integration
- Smart and presentational component pattern

> Solution 11 represents the most comprehensive RxJS Observable-based implementation, focusing on reactive programming patterns and stream manipulation.

12) ✅ Uses:
- Moving to pure signal
- Signal-based form value tracking
- Signal-based state management
- signal() for writable state, computed() Computed values for filtering, sorting, and pagination, effect() for side effects, toSignal() for converting RxJS
- Automatic dependency tracking between signals
- Performance optimization through Signal-based reactivity
- Reactive forms with FormGroup and FormControl (avoiding continuous re-evaluations caused by traditional getters)
- Component composition (reusing Solution11's child components)

> This represents a modern Angular implementation using Signals instead of RxJS Observables for state management, while maintaining the component-driven architecture from Solution 11.

13) ✅ Uses:
### State Management
- Uses a single state signal to manage all application state:

### Data Flow
- Parent component (Solution13Component):
- Manages all state through signals
- Uses computed signals for derived data
- Handles data transformation (filtering, sorting, pagination)
- Communicates with the service layer

## Child Components 
- SignalFilterComponent: Two-way binding with model() for -  filter text
- SignalSortComponent: Two-way binding with model() for sort direction
- SignalListComponent: Signal-based input for countries list
- SignalPaginationComponent: Two-way binding with model() for current page

## Service Layer 
SignalCountryService uses signals for: Data fetching, Loading states, Error handling

> Solution13 represents a modern, fully signal-based Angular application with: Clean architecture, Efficient state management, Type-safe components, Reactive data flow, Optimised performance, Clear separation of concerns

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17+

```js
ng new Angular-Search-Filtering

npm i
npm i bootstrap
```

```js
// package.json
"styles": [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "src/styles.scss"
]
```

```js
ng g s services/country
// later on exploring the Entity Pattern

ng g p pipes/filter
// reusable pipe to filter array based on search term
```

## API Service

We are using "https://restcountries.com" sometimes these services are not as fast as expected, I'm looking forward to replace (maybe with: https://countries.petethompson.net) it but for now it's good enough.

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---
### :100: <i>Thanks!</i>
#### Now, don't be an stranger. Let's stay in touch!

<a href="https://github.com/leolanese" target="_blank" rel="noopener noreferrer">
  <img src="https://scastiel.dev/api/image/leolanese?dark&removeLink" alt="leolanese’s GitHub image" width="600" height="314" />
</a>

##### :radio_button: Linkedin: <a href="https://www.linkedin.com/in/leolanese/" target="_blank">LeoLanese</a>
##### :radio_button: Twitter: <a href="https://twitter.com/LeoLanese" target="_blank">@LeoLanese</a>
##### :radio_button: Portfolio: <a href="https://www.leolanese.com" target="_blank">www.leolanese.com</a>
##### :radio_button: DEV.to: <a href="https://www.dev.to/leolanese" target="_blank">dev.to/leolanese</a>
##### :radio_button: Blog: <a href="https://www.leolanese.com/blog" target="_blank">leolanese.com/blog</a>
##### :radio_button: Questions / Suggestion / Recommendation: developer@leolanese.com
