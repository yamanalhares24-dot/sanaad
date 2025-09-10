# Salinaka Eyewear - Clean Architecture

## Project Structure

```
src/
├── core/                    # Business Logic Layer
│   ├── entities/           # Business Entities
│   │   ├── Product.js
│   │   └── CartItem.js
│   └── usecases/          # Business Use Cases
│       └── CartUseCases.js
├── infrastructure/         # External Layer
│   ├── repositories/      # Data Access
│   │   └── CartRepository.js
│   └── services/         # External Services
│       └── LocalStorageService.js
├── presentation/          # Presentation Layer
│   ├── components/       # React Components
│   ├── hooks/           # Custom Hooks
│   │   ├── useCart.js
│   │   └── useDarkMode.js
│   └── styles/         # CSS Styles
└── shared/              # Shared Resources
    ├── constants/      # App Constants
    │   └── products.js
    └── utils/         # Utility Functions
```

## Clean Architecture Benefits

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Testability**: Business logic is isolated and easily testable
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features and modify existing ones
5. **Independence**: UI, Database, and External services are replaceable

## Layers Description

### Core Layer
- **Entities**: Business objects (Product, CartItem)
- **Use Cases**: Business rules and operations

### Infrastructure Layer
- **Repositories**: Data access abstraction
- **Services**: External service integrations

### Presentation Layer
- **Components**: React UI components
- **Hooks**: Custom React hooks for state management

### Shared Layer
- **Constants**: Application-wide constants
- **Utils**: Reusable utility functions

## Getting Started

```bash
yarn install
yarn dev
```