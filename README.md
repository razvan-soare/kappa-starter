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

In the root of the project create `.eslintrc` and copy/paste the content from our `.eslintrc`. Running `npm run lint` will show a bunch of errors. At this point we can go through every file and fix the errors or just run `npm run lint:fix`.

### Configure VScode to use eslint formatter and to format the files on save

In the root of the project create `.vscode/settings.json` and paste the settings from this repo.

### Setting up Husky

Create a new file called `.lintstagedrc` and copy/paste the file from this repo.

In `package.json` create a new script `"prepare": "husky install"`

- npm run prepare
- npx husky add .husky/pre-commit "npm run lint-staged npm run validate"

This will create a new directory `.husky` and we have our `pre-commit` where we can specify what script should be ran before the commit takes place. In our case `npm run lint-staged npm run validate`. After this we can remove the `prepare` script from `package.json`
