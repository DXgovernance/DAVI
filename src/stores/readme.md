# Overview

## Main folder

- **modules**: folder containing different governance implementations
- **governanceInterfaces.ts**: file that exports an array of every governance interface supported. That array is made of all the governance interface objects of each governance module
- **index.tsx**:
  - Contains the logic to switch between governance implementations
  - Is a context
  - Exports the governance interface of the current guild
- **types.ts**: common typings used in the modules

## Governance module folder

### Structure

Each governance module has this structure:

```
+ GovernanceImplmentationName
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

### Contents

- **events**: folder containing event listeners
- **fetchers**: folder containing different fetching hooks
  - **index.ts**:
- **writers**: folder containing writing hooks
- **index.ts**: this file exports all the information needed for that governance type: the name, bytecode, available hooks, and all capabilities (features) this governance system has

---

# Guides

## Migrating a hook to a supported governance system

1. Copy the hook file to folder, depending of it is a fetcher or writer:
   1. `[implementationName] > writers`
   2. `[implementationName] > fetchers > [fetchingImplementation]`
2. In `types.ts` add the new hook to `HooksInterface`, with the corresponding type
3. In `[implementationName] > index.ts`: import the hook and add it to the `hooks` key of the exported governance interface
4. Find every file where the hook is used and:

   1. Delete the previous hook import
   2. Add

      ```javascript
      // Imports
      import { useHookStoreProvider } from 'stores';

      // Inside the component
      const {
        hooks: { useHookName },
      } = useHookStoreProvider();
      ```

5. Delete the old hook file
6. Run `yarn test` to check for broken tests due to lack of context setup

## Adding a new governance system

1. Copy an existing governance system from the `modules` folder. It helps to copy the most similar one
2. Rename the folder
3. In `types.ts` add the new governance system to `SupportedGovernanceSystem` type
4. In `[implementationName] > index.ts` change:
   1. Exported object name
   2. name
   3. bytecode
   4. hooks
   5. adjust the capabilities
5. Import and add the governance interface to the exported array in `governanceInterfaces.ts`
6. Add / modify / delete the hooks depending on the governance requirements
