# sortable-post-list

Awesome sortable post list made with Vue 3 and TailwindCss. Now live [here!](https://aspl1.netlify.app/)

## Functional Requirements

- [x] Only the first 5 posts should be displayed.
- [x] Cell titles should be named as `Post id`, where `id` is set by the `id` of a post on [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts), e.g. `Post 1`.
- [x] The order of the posts can be changed by clicking the up/down arrows.
- [x] When a user changes the order of the posts, the action should be added to the top of the “List of actions committed” component on the right.
  - e.g. When a user moves the `Post 1` below `Post 2`, then an action card saying “Moved `Post 1` from `index 0` to `index 1`” should be added to the top of the list.
- [x] Users can can click on the “Time travel” button on one of the action cards, which rewinds the order of the posts as it was before that action was taken. This action should also remove the clicked action card and the action cards above that.

## Folder Structure

```sh
cypress/
├───fixtures
│   ├───postsList.json # Posts mock data
│   ├───timeline.json # Timeline mock data
├───support
│   ├───commands.ts # Custom commands for testing
src/
├───api # Call to api functions
├───assets
│   ├───css # Font Awesome CSS
│   └───webfonts # Font Awesome webfonts
│   ├───base.css
│   └───main.css
│   └───tailwind.css
├───components
│   └───__tests__ # Tests for each component
│   └───ListItem.vue # Single post
│   └───LisLoader.vue # Loader for the posts list
│   └───SortableList.vue # Posts list
│   └───Timeline.vue # List of actions committed
│   └───TimelineItem.vue # Single action committed
├───types
└───views
    └───__tests__ # Tests for main view
    └───Home.vue # Main view

```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev
```
