# AGENTS.md

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

This file contains guidelines and commands for agentic coding agents working in this Angular repository.

## Project Overview

This is a modern Angular 21.0.0 project demonstrating a generic table system with Material Design components. The project uses standalone components, Angular signals, and follows current best practices.

## Available Commands

### Development

```bash
npm start                 # Start development server (ng serve)
ng serve                  # Start dev server on http://localhost:4200
```

### Build

```bash
npm build                 # Production build (ng build)
ng build                  # Creates production build in /dist
npm run watch             # Watch mode for development
```

### Testing

```bash
npm test                  # Run all unit tests (ng test)
ng test                   # Run Vitest unit tests
```

### Running Individual Tests

```bash
# Run specific test file
ng test -- --include="**/table.spec.ts"

# Run tests matching pattern
ng test -- --grep="should create"

# Run tests in watch mode for specific file
ng test -- --watch --include="**/table.spec.ts"
```

### Code Generation

```bash
ng generate component <name>     # Generate new component
ng generate service <name>       # Generate new service
ng generate directive <name>    # Generate new directive
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled with comprehensive strict options
- **Target**: ES2022
- **Module**: ESNext
- **Imports**: Organized by category (Angular core, Material, third-party, relative)

### Import Organization

```typescript
// 1. Angular core imports
import { Component, OnInit, signal, input } from '@angular/core';

// 2. Angular Material/CDK imports
import { MatTableModule } from '@angular/material/table';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

// 3. Third-party libraries
import { Observable } from 'rxjs';

// 4. Relative imports
import { Column } from '../column/column';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Table`, `Column`, `PredefinedTemplate`)
- **Methods**: camelCase (e.g., `ngAfterContentInit`, `dropColumn`, `updateData`)
- **Interfaces/Types**: PascalCase (e.g., `PeriodicElement`, `TableData`)
- **Variables/Properties**: camelCase (e.g., `displayedColumns`, `dataSource`)
- **Selectors**: kebab-case (e.g., `app-table`, `app-column`)

### Component Structure

```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [
    /* Dependencies */
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentName<T> implements AfterContentInit {
  // 1. Inputs and signals
  data = input<T[]>([]);

  // 2. ViewChild/ContentChildren
  @ViewChild(MatTable) table!: MatTable<T>;

  // 3. Internal state
  private dataSource = signal(new MatTableDataSource<T>());

  // 4. Constructor (minimal, prefer inject())
  constructor() {}

  // 5. Lifecycle hooks
  ngAfterContentInit(): void {}

  // 6. Public methods
  public updateData(): void {}

  // 7. Private methods
  private handleDrop(event: CdkDragDrop<T[]>): void {}
}
```

## Angular Best Practices

### Standalone Components

- All components must be standalone
- Use `imports` array for dependencies
- No NgModule declarations required

### Signals and Reactivity

- Use `signal()` for reactive state management
- Use `input()` for component inputs
- Use `effect()` for side effects
- Prefer signals over traditional properties

### Change Detection

- Default strategy: `ChangeDetectionStrategy.OnPush`
- Use signals for automatic change detection
- Manually trigger updates when needed with `markForCheck()`

### Dependency Injection

- Prefer `inject()` function over constructor injection
- Example: `const cdr = inject(ChangeDetectorRef);`

### Generic Components

- Use generics for type-safe components
- Example: `export class Table<T> implements AfterContentInit`
- Maintain type safety throughout the component hierarchy

## Testing Guidelines

Do not make test for this project

## File Organization

### Directory Structure

```
src/
├── app/
│   ├── table/
│   │   ├── table.component.ts
│   │   ├── table.component.html
│   │   ├── table.component.scss
│   │   └── table.component.spec.ts
│   ├── column/
│   └── app.component.ts
├── main.ts
└── styles.scss
```

### File Naming

- Components: `component-name.component.ts`
- Templates: `component-name.component.html`
- Styles: `component-name.component.scss`
- Tests: `component-name.component.spec.ts`

## Material Design Integration

### Available Modules

- MatTableModule for table functionality
- MatPaginatorModule for pagination
- DragDropModule for drag-and-drop
- Use consistent Material Design patterns

### Styling

- Follow Material Design guidelines
- Use Angular Material theming
- Maintain consistent spacing and typography

## Development Workflow

1. **Before coding**: Run `npm test` to ensure tests pass
2. **During development**: Use `npm start` for hot reload
3. **After changes**: Run `npm test` to verify no regressions
4. **Before commit**: Run `npm build` to ensure production build works

## Linting and Formatting

### Prettier Configuration

- Print width: 100 characters
- Single quotes: true
- HTML parser: angular for templates

### Recommended Lint Rules

- Use Angular ESLint rules
- Enforce strict TypeScript mode
- Require explicit return types
- Enforce consistent import organization

## Git Workflow

### Commit Guidelines

- Use conventional commit messages
- Focus on "why" rather than "what"
- Keep commits atomic and focused

### Branch Strategy

- Main branch for production
- Feature branches for new development
- Ensure tests pass before merging
