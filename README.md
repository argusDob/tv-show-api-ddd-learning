# Domain-Driven Design (DDD) Refactoring - Learning Journey

## 🎯 Purpose of This Refactoring

This refactoring was done **for learning purposes** to understand Domain-Driven Design (DDD) principles and how they solve real-world architectural problems. The goal was not just to generate code, but to understand:

- **Why** DDD exists
- **What problems** it solves
- **How** to structure code following DDD principles
- **When** to use each layer and pattern

---

## 📚 What We Learned Today

### 1. **Layered Architecture**

We moved from a **service-oriented architecture** to a **DDD layered architecture**:

```
Old Architecture:
┌─────────────────┐
│   Components    │
│   (Vue Views)   │
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │ ← Mixed responsibilities
│ ShowsService    │   (API + Business Logic + State)
│ FiltersService  │
└─────────────────┘

New Architecture (DDD):
┌─────────────────────────────────┐
│   Presentation Layer            │ ← Vue Components, Stores, Composables
│   (UI Concerns)                 │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Application Layer             │ ← Use Cases (Orchestration)
│   (User Actions)               │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Domain Layer                  │ ← Business Logic, Entities, Domain Services
│   (Business Rules)              │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Infrastructure Layer          │ ← API Calls, Repositories, Mappers
│   (Technical Concerns)          │
└─────────────────────────────────┘
```

### 2. **Domain Layer - The Heart of Business Logic**

#### **Entities**
- **What**: Core business objects with identity and business rules
- **Example**: `Show` entity with methods like `getRating()`, `isCrimeShow()`, `isPopularShow()`
- **Key Insight**: Business rules live in the Domain, not in Services or Components

```typescript
// Domain Entity: Show
export type Show = {
  readonly id: number
  readonly name: string
  readonly genres: string[]
  readonly weight: number
  // ... other properties
}

// Business Rules as Pure Functions
export const getRating = (show: Show): number => {
  if (show.weight <= 20) return 1
  if (show.weight <= 40) return 2
  // ... business logic
}

export const isCrimeShow = (show: Show): boolean => {
  return show.genres.includes('Crime')
}
```

**Key Learning**: Domain functions should **never be exposed directly** to the Presentation Layer. They are accessed through Use Cases.

#### **Domain Services**
- **What**: Business logic that doesn't belong to a single Entity
- **Example**: `filterCrimeShows()`, `filterPopularShows()` - operations on collections
- **Key Insight**: When logic involves multiple entities or collections, use Domain Services

```typescript
// Domain Service: Operations on Collections
export const filterCrimeShows = (shows: Show[]): Show[] => {
  return shows.filter(isCrimeShow)
}
```

### 3. **Repository Pattern - Abstraction for Data Access**

#### **Repository Interface (Domain Layer)**
- **What**: Contract defining how data is accessed
- **Why**: Domain doesn't know about API, database, or file system
- **Key Insight**: Domain defines **what** it needs, Infrastructure implements **how**

```typescript
// Domain Repository Interface
export interface IshowRepository {
  findByPage(page: number): Promise<Show[]>
  search(query: string): Promise<Show[]>
  findById(id: number): Promise<Show | null>
}
```

#### **Repository Implementation (Infrastructure Layer)**
- **What**: Concrete implementation using TVMaze API
- **Key Insight**: Infrastructure handles technical concerns (HTTP, mapping, error handling)

```typescript
// Infrastructure Repository Implementation
export class ShowRepository implements IshowRepository {
  async findByPage(page: number): Promise<Show[]> {
    // API call + mapping to Domain Entity
    const apiData = await fetch(`${this.baseUrl}/shows?page=${page}`)
    return apiData.map(mapApiShowToDomain)
  }
}
```

**Key Learning**: Domain Layer **never imports** Infrastructure Layer. Dependency flows inward (Dependency Inversion Principle).

### 4. **Application Layer - Use Cases**

#### **What Are Use Cases?**
- **Purpose**: Orchestrate Domain logic to fulfill user actions
- **Pattern**: One Use Case = One User Action
- **Key Insight**: Use Cases are composable and follow Single Responsibility Principle

```typescript
// Use Case Pattern
export class GetShowsUseCase {
  constructor(private repository: IshowRepository) {}
  
  async execute(page: number): Promise<Show[]> {
    return await this.repository.findByPage(page)
  }
}
```

#### **Use Case Characteristics**
- ✅ **Single Responsibility**: Each Use Case does one thing
- ✅ **Simple Input/Output**: Takes inputs, returns simple outputs (not complex objects)
- ✅ **Composable**: Can combine multiple Use Cases
- ✅ **Framework-Agnostic**: No Vue/React dependencies

**Key Learning**: Use Cases orchestrate Domain logic. They don't contain business rules themselves.

### 5. **Dependency Injection in Vue.js**

#### **Problem**: How to inject Use Cases into Pinia Stores?

#### **Solution**: Pinia Plugin

```javascript
// main.js
const pinia = createPinia()

// Setup Use Cases
const useCases = setupUseCases()

// Pinia Plugin: Inject Use Cases into all stores
pinia.use(({ store }) => {
  store.useCases = useCases
})

app.use(pinia)
```

**Key Learning**: 
- Use Cases are initialized **once** at application startup
- Stores access Use Cases through `this.useCases`
- No direct imports of Use Cases in stores

### 6. **Separation of Concerns**

#### **What Goes Where?**

| Concern | Layer | Example |
|---------|-------|---------|
| Business Rules | Domain | `isCrimeShow()`, `getRating()` |
| User Actions | Application | `GetShowsUseCase`, `FilterShowsUseCase` |
| API Calls | Infrastructure | `ShowRepository`, `mapApiShowToDomain` |
| UI Logic | Presentation | Vue Components, Stores, Composables |
| Framework Config | Application | `RATING_OPTIONS` (framework-agnostic) |

#### **Key Rules We Learned**

1. **Domain Layer**:
   - ✅ Contains business logic only
   - ✅ No dependencies on other layers
   - ✅ Never imports Infrastructure or Presentation

2. **Application Layer**:
   - ✅ Orchestrates Domain logic
   - ✅ Can depend on Domain
   - ✅ Framework-agnostic constants go here

3. **Infrastructure Layer**:
   - ✅ Implements Domain interfaces
   - ✅ Handles technical concerns (HTTP, mapping)
   - ✅ Can depend on Domain

4. **Presentation Layer**:
   - ✅ Only interacts with Application Layer (Use Cases)
   - ✅ Never directly calls Domain functions
   - ✅ Handles UI concerns (state, events, rendering)

### 7. **Functional Programming Approach**

We used **functional programming** principles within DDD:

- ✅ **Pure Functions**: No side effects
- ✅ **Immutability**: `readonly` properties
- ✅ **Function Composition**: Small, composable functions
- ✅ **Factory Functions**: `createShow()` for entity creation

```typescript
// Pure Functions - No Side Effects
export const getRating = (show: Show): number => { ... }
export const isCrimeShow = (show: Show): boolean => { ... }

// Function Composition
export const filterCrimeShows = (shows: Show[]): Show[] => {
  return shows.filter(isCrimeShow)  // Composing functions
}
```

---

## 🏗️ Architecture Overview

### **Folder Structure**

```
src/
├── domain/                    # Business Logic (No Dependencies)
│   ├── entities/
│   │   └── show.ts           # Show Entity + Business Rules
│   ├── repositories/
│   │   └── iShowRepository.ts # Repository Interface
│   └── services/
│       └── showFilter.ts      # Domain Services
│
├── application/               # Use Cases (Orchestration)
│   ├── shows/
│   │   └── useCases/
│   │       ├── GetShowsUseCase.ts
│   │       ├── SearchShowsUseCase.ts
│   │       └── GetShowByIdUseCase.ts
│   ├── filters/
│   │   └── useCases/
│   │       ├── FilterCrimeShowsUseCase.ts
│   │       ├── FilterPopularShowsUseCase.ts
│   │       └── FilterShowsUseCase.ts
│   ├── compose/
│   │   └── shows/
│   │       └── useCases.ts   # Dependency Injection Setup
│   └── constants/
│       └── ratings.ts        # Framework-agnostic constants
│
├── infrastructure/            # Technical Implementation
│   └── show/
│       ├── repositories/
│       │   └── showRepository.ts  # API Implementation
│       └── mappers/
│           └── showMapper.ts      # API → Domain Mapping
│
└── presentation/             # UI Layer (Vue.js)
    ├── components/           # Vue Components
    ├── stores/               # Pinia Stores
    ├── views/                # Vue Views
    └── composables/          # Vue Composables
```

### **Data Flow**

```
User Action (Component)
    ↓
Pinia Store Action
    ↓
Use Case (Application Layer)
    ↓
Domain Service / Entity (Domain Layer)
    ↓
Repository Interface (Domain Layer)
    ↓
Repository Implementation (Infrastructure Layer)
    ↓
API Call (Infrastructure Layer)
    ↓
Mapping: API Response → Domain Entity
    ↓
Return Domain Entity
    ↓
Back through layers to Store
    ↓
Update UI
```

---

## 🔑 Key Concepts & Patterns

### **1. Dependency Inversion Principle**

- **High-level modules** (Domain) don't depend on **low-level modules** (Infrastructure)
- Both depend on **abstractions** (Interfaces)
- Domain defines interfaces, Infrastructure implements them

### **2. Single Responsibility Principle**

- Each layer has one responsibility
- Each Use Case does one thing
- Each function has one purpose

### **3. Separation of Concerns**

- **Business Logic** → Domain Layer
- **Orchestration** → Application Layer
- **Technical Details** → Infrastructure Layer
- **UI Logic** → Presentation Layer

### **4. Ubiquitous Language**

- Use business terms throughout the codebase
- `Show`, `Rating`, `Crime Show`, `Popular Show` are domain concepts
- Code reflects the business domain

---

## 🎓 Lessons Learned

### **What We Fixed**

1. **Mixed Responsibilities**: Old `ShowsService` mixed API calls, business logic, and state management
   - **Solution**: Separated into Domain (business logic), Infrastructure (API), Application (orchestration)

2. **Tight Coupling**: Components directly called services
   - **Solution**: Components → Stores → Use Cases → Domain

3. **Scattered Business Logic**: `weightToRating` logic was in `FiltersService`
   - **Solution**: Moved to Domain Entity (`getRating()`)

4. **No Abstraction**: Direct API calls in services
   - **Solution**: Repository Pattern with interfaces

### **What We Gained**

- ✅ **Testability**: Pure functions are easy to test
- ✅ **Maintainability**: Clear separation of concerns
- ✅ **Scalability**: Easy to add new features
- ✅ **Framework Independence**: Domain/Application layers work with any framework
- ✅ **Type Safety**: TypeScript ensures correctness

---

## 🚀 Next Steps

- [ ] Complete integration of Use Cases in all components
- [ ] Add more Domain Services if needed
- [ ] Consider Value Objects for `Rating`, `Genre`
- [ ] Add Domain Events if needed
- [ ] Write tests for Domain Layer
- [ ] Document Use Cases

---

## 📖 Resources

- **Domain-Driven Design** by Eric Evans
- **Clean Architecture** by Robert C. Martin
- **Functional Programming** principles

---

## 💡 Key Takeaways

1. **Domain Layer is the Core**: Business logic lives here, independent of frameworks
2. **Use Cases Orchestrate**: They don't contain business logic, they coordinate it
3. **Dependency Flow Inward**: Outer layers depend on inner layers, never the reverse
4. **Abstractions Matter**: Interfaces allow flexibility and testability
5. **Functional Programming Fits**: Pure functions work well with DDD

---

**Remember**: This refactoring was for **learning purposes**. The goal was to understand DDD principles, not just generate code. Every decision was discussed and explained to understand the "why" behind it.
