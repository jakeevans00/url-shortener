# url-shortener

take home project for Leland!

### Implementation Details

I implemented this project using Next/React using the newer App router paradigm.

> npx create-next-app@latest

Styling is handled through Tailwind CSS utility classes, and routing is managed through the framework. I used Typescript throughout the app, except in my `seed.js` script.

I don't know how much detail to go into here, so I'll just go over some of the details I'm more proud of...

##### Things to note:

- Persistent data: I originally initialized my database class inside of my `RootLayout` but kept getting my data overriden, which made developing a real pain. I decided to instead create a `.json` file which I could seed with data through an npm script `npm run seed`
- Alias generation: I've been reading "Grokking the System design interview" and a URL shortener is actually one of the examples they use. In the book, they discuss the value of having an offline system generate valid aliases (avoiding hash collisions, preventing overflow, etc). If this app were scaled and multiple app servers were running, this architecture would make it easier to protect the shared resource by wrapping the alias pool access in a `synchronized` utility
- I used the singleton pattern to for the `FileDatabse` class
- I use `try/catch` blocks and pass error messages up the call stack to be handled appropriately
- Use of Next's API routes and dynamic routing using [alias] slugs
- Client side components, with React hooks like `useState`

AI Usage:
I used AI for a few things that I didn't want to waste time trying to do myself.

- Writing the regular expression to validate links
- Writing the seed.js file

Additionally, I'll use it for Typescript type completion (I don't always remember the syntax for `React.FormEvent<HTMLFormElement>` and it's variants haha)

### How to Run

1. Clone the repo
   > git clone https://github.com/jakeevans00/url-shortener.git
2. Install deps
   > cd url-shortener && npm i
3. Seed the data
   > npm run seed
4. Build the project
   > npm run build
5. Start the development server
   > npm start

### Testing

I really want to start writing tests, but I crossed the 2 hour mark and want to show you where I left off.
My next steps would have been to install Jest and it's types, then make a mock of my `FileDatabase` class. I would have tested the regex expressions, and the behavior when there are no more usable aliases.

Other things I would have tested:

- Rendering (using react `testing-library`)
- All my error conditions
- Navigation and redirects

### Tools Used

- Next / React
- Typescript
- TailwindCSS
- Server-side libraries (fs, path)
