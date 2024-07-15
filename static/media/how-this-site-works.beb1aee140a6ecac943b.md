[//]: # "How this site works"

Once again, as I tend to do very often, I've gone and rebuilt my website. It's something I tinker with every now and then to improve my web presence or sometimes just to freshen up the look and feel. This time around, it's a pretty big redesign with **minimalism** as the main focus while adding much more functionality. The hope here is that this will be the last significant update to my website for a long time.

## Why This Design?

You can never go wrong with a classic serif font and a `#ffffff` background. I feel it's timeless and less distracting for the viewer.

I want my website to provide information straight to the point and avoid clutter. I also aimed for easy navigation.

The challenge I wanted to tackle with this website is maintaining features (like the blog, project links, etc.) while keeping it _minimalist_. I believe I've done a decent job here.

## How I Built This Site

### The Stack

`React`... Not complicated, just opinionated.

#### Tools

Posts are all presented in `markdown` files and rendered with custom styling using the `react-markdown` library. Each article has its own file, and images are rendered within the articles.

#### Hosting

Hosted on `GitHub Pages` because of my familiarity with it. It's mainly for ease of bug fixing and publishing new articles.

### Features

#### Blog

A metadata file assigns a slug to each article, located in the `blog-posts` folder. Each article's metadata includes details such as title, date, filename, and tags, facilitating a seamless workflow for writing and updating blogs in markdown.

The metadata file looks something like this:

```js
{
    id: 1,
    title: "How this site works",
    date: "2024-07-15",
    fileName: "how-this-site-works.md",
    tags: ["React"],
  },
```

This structure minimizes friction in my workflow, allowing me to focus more on content creation.

#### Projects Page

Perhaps the [page](https://danish.bio/projects) I want to get the most reach on. The 3D models were created in `Fusion 360` and optimized using Blender. They are rendered using `Three.js`. Other projects have their own standalone front-end static webpages, which are linked accordingly.

I've also aimed to keep this page minimal and straightforward. It feels sufficient for now.

#### Source Code

Find it [here](https://github.com/dan10ish/dan10ish.github.io).

## Conclusion

I explored various ways to facilitate more flexible online writing and ultimately decided to do it in my own way.

That said, there's still much work to be done to improve both the technical and content aspects of this site. Feel free to DM me on [X](https://x.com/dan10ish) or [Instagram](https://instagram.com/dan10ish) for quick feedback.
