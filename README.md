Playground: https://plnkr.co/edit/KTsPCuEoJMEjYGqw?preview

More examples: https://github.com/Lusito/box2d.ts/discussions/47

![drag-with-mouse-box2dcore-canvas2d-js](https://github.com/8Observer8/drag-with-mouse-box2dcore-canvas2d-js/assets/3908473/a12cb889-69f2-47d2-ac42-3ff354e81bd4)

Instruction for building and running the project in debug and release using Rollup:

- Install these packages globally with the command:

> npm i -g http-server rollup uglify-js

- Run http-server in the project directory:

> http-server -c-1

Note. The `-c-1` key allows you to disable caching.

- Start development mode with the following command:

> npm run dev

Note. Rollup will automatically keep track of saving changes to files and build a new index.js file ready for debugging. You can debug your project step by step in the browser by setting breakpoints.

- Go to the browser and type the address: localhost:8080/index.html

- Create a compressed file ready for publishing. Stop development mode, for example, with this command Ctrl + C in CMD, if it was launched before and enter the command:

> npm run release

Note. After this command, Rollup will create a compressed index.js file. Compression is done using the uglify-js package.

If you want to thank me: https://8observer8.github.io/donate.html
