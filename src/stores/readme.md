# Overview

The store exposes the governance implementation hooks so they're available to the components. The actual logic the hook uses to get that information will depend on the governance implementation.

Each implementation should expose the same hooks, and differ the logic to provide the information the component needs.

For example: the `useTotalLocked` hook returns the amount of tokens a DAO has. In the case of an ERC20Guild, that is the amount of tokens locked in the guild, obtained calling `getTokensLockedAt` to the guild contract; but in the case of a RepGuild, this value is obtained calling `useTotalSupplyAt` to the token contract. The component doesn't know about that logic, and only will care for the total amount of tokens.

The store supports fetching from two different data sources: default and fallback. It should have a `checkDataSourceAvailability` function, that handles the logic to switch between them.

The component doesn't care about the data source of the hook, since it'll always use `hooks: { fetchers: { useHook } }`. The store is the one switching the source of the hook.

An example of this could be: a subgraph in TheGraph as the main source, RPC calls for the fallback, and a call to TheGraph to check if it's online and available.

## Main folder

- **modules**: folder containing different governance implementations
  - **common**: folder containing common files, like hook implementations, that can be imported by multiple governance modules, to avoid code duplication
- **governanceInterfaces.ts**: file that exports an array of every governance interface supported. That array is made of all the governance interface objects of each governance module
- **index.tsx**:
  - Contains the logic to switch between governance implementations and data sources
  - Is a context
  - Exports the governance interface of the current guild
- **types.ts**: common typings used in the modules

## Exposed store interface

- **name**: name of the governance implementation
- **bytecodes**: array of compatible bytecodes
- **hooks**:
  - **fetchers**: set of fetcher hooks. From a component perspective, there's no "default" or "fallback", just fetchers
  - **writers**: set of writer hooks
- **capabilities**
  - **votingPower**
  - **tokenType**
  - **consensus**
  - **votingStyle**
  - **votingPowerTally**
- **checkDataSourceAvailability**: method for doing a health check on the default data source. Returns `true` if it's healty, and `false` if the store should switch to the fallback. Will always return true if there's only one data source
- **isLoading**: boolean that tracks wether the store is fully loaded or not. The components and hooks won't make use of this, it is tracked at the top-level components to trigger re-renders
- **daoId**: address of the current DAO

## Governance implementation module folder

### Structure

Each governance module has this structure:

```
+ GovernanceImplmentationName
|-+ events
|-+ fetchers
| |-+ defaultDataSource
| | | |- useFetchHook1.ts
| | | |- useFetchHook2.ts
| | | |- useFetchHook3.ts
| | + fallbackDataSource
| | | |- useFetchHook1.ts
| | | |- useFetchHook2.ts
| | | |- useFetchHook3.ts
|-+ writers
| | |- useWriteHook.ts
|-- checkDataSourceAvailability.ts
|-- index.ts

```

### Content

- **events**: folder containing hooks for event listeners. The events aren't exposed in the store, but used internally by the implementation' fetcher hooks
- **fetchers**: folder containing the fetcher hooks. The governance implementation must have a default data source and an optional fallback. The folders can have any name
  - **defaultDataSource**: folder containing fetchers for the default data source
  - **fallbackDataSource** _(optional)_: folder containing fetchers for the default data source
- **writers**: folder containing writing hooks
- **checkDataSourceAvailability.ts**: this file exports a function to check if the default data source is available or not, and returns a boolean. If the default data source isn't available it'll use the fallback source until the next check. If the governance implementation doesn't have a fallback data source, it should always return `true`
- **index.ts**: this file exports all the information needed for that governance type: the name, bytecode, available hooks, and all capabilities (features) this governance system has

---

# Guides

## Migrating a fetcher / writer hook to a supported governance system

1. Copy the hook file to the appropiate folder:
   - `[implementationName] > fetchers > [fetchingImplementation]`
   - `[implementationName] > writers`
2. Extract the events onto their own hook, with the name: `useListenToEventDescription`. Save it in the `[implementationName] > events` folder
3. Export the hook in the `index.ts` file
4. In `types.ts` add the new hook to `HooksInterfaceWithFallback`, with the corresponding type
5. In `[implementationName] > index.ts`: import the hook and add it to `hooks > fetchers > [default | fallback]` key of the exported governance interface
6. Find every file where the hook is used and:

   1. Delete the previous hook import
   2. Add

      ```javascript
      // Imports
      import { useHookStoreProvider } from 'stores';

      // Inside the component
      const {
        hooks: {
          fetchers | writers: {
             useHookName
          }
        },
      } = useHookStoreProvider();
      ```

7. Delete the old hook file
8. Run `yarn test` to check for broken tests due to lack of context setup

## Adding a new governance system

1. Copy an existing governance system from the `modules` folder. It helps to copy the most similar one
2. Rename the folder
3. In `types.ts` add the new governance system to `SupportedGovernanceSystem` type
4. In `[implementationName] > index.ts` change the data to configure the new governance implementation
5. Import and add the governance interface to the exported array in `governanceInterfaces.ts`
6. Add / modify / delete the hooks depending on the governance requirements
