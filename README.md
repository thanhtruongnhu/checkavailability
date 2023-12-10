## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example).

If you want to deploy on Netlify, use the following build command under site settings:

```bash
npm run build
```

You also want to make sure the publish directory is out.

## Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `npm install`   | Installs dependencies                        |
| `npm run dev`   | Starts local dev server at `localhost:3000`  |
| `npm run build` | Build your production site to `./next/`      |
| `npm run start` | Preview your build locally, before deploying |

## Update Site Metadata

```js
env: {
  siteTitle: 'Your Company',
  siteDescription: 'Your company description.',
  siteKeywords: 'your company keywords',
  siteUrl: 'https://exmaple.com/',
  siteImagePreviewUrl: '/images/preview.jpeg',
  twitterHandle: '@your_handle'
}
```

## Update Colors

You can update the colors in tailwind.config.js file.

## Update Favicon

Update the manifest.json file and the icons under the public/images/icons folder.

You can use free tools online such as https://realfavicongenerator.net/ to quickly generate all the different icon sizes and favicon.ico file.
