# Governance systems

## Overview

Each governance system has this structure:

```
+ ImplmentationName
|-+ events
|-+ fetchers
| |-- index.ts ( ? )
| |-+ fetchImplementation1
| | | |- useFetchHook1.ts
| | | |- useFetchHook2.ts
| | | |- useFetchHook3.ts
| | + fetchImplementation2
|-+ writers
| | |- useWriteHook.ts
|-- capabilities.ts
|-- index.ts

```

### Terminololgy

- **events**: folder containing event listeners
- **fetchers**: folder containing different fetching hooks
  - **index.ts**:
- **writers**: folder containing writing hooks
- **capabilities.ts**: file stating the capabilities of the implementation
- **index.ts**: file that will export the full set of hooks from the implementation

## Main folder

- **modules**: folder containing different governance implementations
- **mainStore.ts**: file that contains the logic to switch between governance implementations. It will export a `store` variable containing all the hooks of that governance system
- **types.ts**: common typings used in the modules

---

## Guides

### Migrating hooks to an existing governance system

1. Copy the hook file to folder, depending of it is a fetcher or writer:
   1. `[implementationName] > writers`
   2. `[implementationName] > fetchers > [fetchingImplementation]`
2. In `[implementationName] > index.ts`: Import the hook and add it to the exported implementation object
3. In `types.ts` add the new hook to `HooksInterface`, with the corresponding type
4. Find every file where the hook is used and:

   1. Delete the previous hook import
   2. Add

      ```javascript
      // Imports
      import { useHookStoreProvider } from 'stores/mainStore';

      // Inside the component
      const { useNameOfTheHook } = useHookStoreProvider();
      ```

5. Delete the old hook file
6. Run `yarn test` to check for broken tests due to lack of context setup
