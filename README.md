# Project-Me

Welcome to Project-Me, your interactive portfolio where you can explore my gaming adventures, favorite music, personal insights, and creative projects all in one place. Discover my passions, experiences, and the stories that make me who I am. Whether you're here to connect or just curious, dive in and enjoy the journey!

## Creating a Project

If you're seeing this, you've probably already done this step. Congrats!

To create a new project in the current directory:

```bash
npx sv create
```

To create a new project in a folder called `my-app`:

```bash
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

Alternatively, you can start the server and open the app in a new browser tab:

```bash
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, and everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your project:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also, consider adding a `"license"` field and point it to a `LICENSE` file, which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

---

Enjoy your journey through Project-Me, and feel free to reach out if you have any questions or want to connect!
