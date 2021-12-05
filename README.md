# Starter For Kappa.london

### Create a new typescript project

```
npx create-react-app kappa-starter --template typescript
```

### Create a couple of useful scripts

Inside `package.json`, under `scripts` add the following lines

```
 "test:no-watch": "react-scripts test --watchAll=false",
 "check-types": "tsc",
 "lint": "eslint --ignore-path .gitignore --ext .js,.jsx,.ts,.tsx .",
 "lint:fix": "npm run lint -- --fix ",
 "validate": "npm-run-all --parallel check-types test:no-watch",
 "lint-staged": "lint-staged"
```

1. We will create a new script for testing but also passing the `--watchAll=false`. This will run the tests only once during the pre-commit and validate scripts.

2. `check-types` will be used to run the typescript compiler. If the code has any typescript errors the script execution will stop.

3. `lint` will run a lint check on our code. Using `--ignore-path` we can specify a path that will be used instead of `.eslintignore`. In order not to duplicate entries we will ignore the same files we have in `.gitignore`. Also specify the files extensions that we will be running eslint for.

4. `lint-fix` Just like the `lint` script but it will also try to fix the rules that can be fixed. (Will format the code)

5. `validate` we will be using this script to run before we do a git commit. In here we will be running in paralel.

6. `lint-staged` will be used to run linters against staged git files

### Install dependencies

```
npm install --save-dev eslint
```

After installing eslint -> probably you will be facing an error: `The react-scripts package provided by Create React App requires a dependency: "eslint": "^7.11.0"`. (After eslint install run `npm start` and if the project breaks then scroll up and get the right version of eslint. In our case is 7.11.0).

```
npm install --save-dev eslint@7.11.0
```

Now everything will work just fine 🎉. Lets install a bunch of other dependencies:

```
npm install --save-dev npm-run-all lint-staged husky @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb eslint-config-airbnb-typescript
```

### Install eslint extension and create eslint setup files

Go to extensions tab on VScode and search for eslint. Install. Enjoy.

!!Extra: Install another extension called `prettier`. This will help us format the code in .css/.json etc.

In the root of the project create `.eslintrc` and copy/paste the content from our `.eslintrc`. Running `npm run lint` will show a bunch of errors. At this point we can go through every file and fix the errors or just run `npm run lint:fix`.

### Configure VScode to use eslint formatter and to format the files on save

In the root of the project create `.vscode/settings.json` and paste the settings from this repo.

### Setting up Husky

Create a new file called `.lintstagedrc` and copy/paste the file from this repo.

In `package.json` create a new script `"prepare": "husky install"`

- npm run prepare
- npx husky add .husky/pre-commit "npm run lint-staged"
- npx husky add .husky/pre-commit "npm run validate"

This will create a new directory `.husky` and we have our `pre-commit` where we can specify what script should be ran before the commit takes place. In our case `npm run lint-staged npm run validate`. After this we can remove the `prepare` script from `package.json`

To test it out we can commit the changes.

```
git add .
git commit -m "Testing pre-commit script"
```

## TYPESCRIPT

Going over to `App.tsx` we will find two problems.

1. React is not used. This is because since React 17 you no longer need to import react when writing JSX/TSX. Amazing 🎉 we can just remove this line.

2. We have an eslint warning over the function. If we hover we will see `Missing return type on function`. This is because we are using typescript and we need to specify what is the return type of our function. Change the line with:

```
const App = function (): JSX.Element {
```

Same thing we can do it for `reportWebVitals.ts` file. But we will add the return type of `void`

```
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
```

### Starting with Typescript

Best place to start with typescript will be the official documentation: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html

!TODO add custom examples with tricky uses of typescript

### Testing coverage

We can add a new script to our `package.json`. This will run the test without watch and pass the coverage parameter.

```
"test:coverage": "npm run test:no-watch -- --coverage",
```

In addition to the console result we can access the html page found at `PROJECT_PATH/coverage/lcov-report/reportWebVitals.ts.html`. Here we can have a visual indicator of what parts of the app are not tested.

We can add a treshhold for our coverage tests to ensure the new code does not drop the coverage average under a certain value. For this add the following code in `package.json` and run the `npm run test:coverage` again

```
"jest": {
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  }
}
```

We can also provide a path to a file to specify custom treshholds. Most likely there are some parts of the code that are not as important. A folder like `Utils` where we have a bunch of functions that are reused everywhere in the app might need higher treshold to ensure everything works good.

```
"./src/index.tsx": {
  "branches": 20,
  "functions": 20,
  "lines": 20,
  "statements": 20
}
```

Some file can also be ignored using:

```
"coveragePathIgnorePatterns": [
  "./src/index.tsx"
],
```

### Better control using jest

If we want to add custom config files we need to intall jest directly (instead of using the react-script)

```
npm install --save-dev @emotion/react @emotion/babel-preset-css-prop @babel/preset-typescript @babel/preset-env identity-obj-proxy
```

This will provide us with more control over the files that we are testing. Using directly Jest we are able to create 2 configs, first for normal tests that require the JestDom and the second for server tests (functions that can be ran using only node).

For this we will need to add a directory `test` and add the following files

- `jest-common.js` - will hold the shared settings between the configs
- `jest.client.js` - all the settings for client side
- `jest.server.js` - all the settings for server side
- `jest.svg.jsx` - a little workaround to help jest render the svgs
- `style-mock.js` - mock file for styles (it will be returned when we import css files)

Create a `.babelrc.js` file that will help jest render the typescript elements
And finally we need `jest.config.js`. We can add the custom settings for jest like `coverage` and will also provide the client/server settings.

### Absolute path

// https://medium.com/@mikecripps/absolute-imports-with-create-react-app-d70fb65ea012
