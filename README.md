# Dynamic-Context-Provider

  With the context api  some familiar patterns began popping up. Create a Context, Provider, a reducer and state objects. This is fine, but say you have multiple     pages and want each to have their own context, you can easily find yourself in boilerplate land. Luckily, with this package you won't have that issue!
  
> This package utilizes Reacts context API, if you're not familiar with it, [here's some good ole' docs!](https://reactjs.org/docs/context.html)

  ```import { ContextStateProvider, useContextState } from 'dynamic-context-provider'```

## Use
  Instead of creating multiple contexts, reducers etc, we simply reuse the same Provider and pass it a different ```stateConfig```. The provider will create a reducer and state objects based off the config and the state will be accessible in the ```useContextState``` hook.
  
```bash
import * as React from 'react';
import { ContextStateProvider, useContextState } from '../.';

const exampleConfig ={
  first: 'Megaman', last: 'isTheBest'
}
const exampleConfig2 ={
  count: 0
}
const App = () => {
  return (
    <div>
      <ContextStateProvider stateConfig={exampleConfig}>
        <Example />
      </ContextStateProvider>
      <ContextStateProvider stateConfig={exampleConfig2}>
        <Example2 />
      </ContextStateProvider>
    </div>
  );
};

const Example = () => {
  const {first, last} = useContextState()
  return(
    <div>
      {first} {last}
    </div>
  )
}
const Example2 = () => {
  const {count} = useContextState()
  return(
    <div>
      {count}
    </div>
  )
}
```

  Updating each individual instance of the dynamic context is also simple with the ```updateContextState``` function, that's accessible from ```useContextState```.
  ```bash
  import { useContextState } from '../.';

  const Example2 = () => {
  const { count, updateContextState } = useContextState()
  function increaseCount(){
    let newCount = count
    updateContextState({count: newCount+=1 })
  }
  return(
    <div>
      {count}
      <button onClick={increaseCount}>+</button>
    </div>
  )
}
// you can also update multiple states at once, example: updateContextState({first: 'new', last: 'name'})
  ```
  This project also supports caching via sessionStorage, so if you ever want to store your state you can add a ```cacheStateKey``
  ```bash
  <ContextStateProvider cacheStateKey="homePageCache" stateConfig={homePageConfig}>
        <HomePage />
      </ContextStateProvider>
  ```
  ## Provider props
  ```bash
  ContextStateProvider {
      children: React.ReactNode,
      stateConfig: object,
      cacheStateKey?: string
  ```  
  
  This was bootstrapped using TSDX, here's some of the wonderful features that comes along with their excellent project: 

## Commands
TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/example
  index.html
  index.tsx       # test your component here in a demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

#### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

A simple action is included that runs these steps on all pushes:

- Installs deps w/ cache
- Lints, tests, and builds

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Example Playground

The Playground is just a simple [Parcel](https://parceljs.org) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

## Usage with Lerna

When creating a new package with TSDX within a project set up with Lerna, you might encounter a `Cannot resolve dependency` error when trying to run the `example` project. To fix that you will need to make changes to the `package.json` file _inside the `example` directory_.

The problem is that due to the nature of how dependencies are installed in Lerna projects, the aliases in the example project's `package.json` might not point to the right place, as those dependencies might have been installed in the root of your Lerna project.

Change the `alias` to point to where those packages are actually installed. This depends on the directory structure of your Lerna project, so the actual path might be different from the diff below.

```diff
   "alias": {
-    "react": "../node_modules/react",
-    "react-dom": "../node_modules/react-dom"
+    "react": "../../../node_modules/react",
+    "react-dom": "../../../node_modules/react-dom"
   },
```

An alternative to fixing this problem would be to remove aliases altogether and define the dependencies referenced as aliases as dev dependencies instead. [However, that might cause other problems.](https://github.com/palmerhq/tsdx/issues/64)
