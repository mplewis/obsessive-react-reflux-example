/* This is one of the coolest and most magic parts of this app!
 *
 * This is the JS entry point for the single-page app. When Webpack compiles the
 * app, builds the dependency graph, and figures out what to include, this is
 * where it starts. If it isn't eventually referred to by index.js, it is
 * stripped from the production build.
 */
var React = require('react');
var Layout = require('./components/layout')

/* This is when the JS app injects itself into the HTML skeleton, straight into
 * the element with ID "app". The reason index.html is so sparse is because ALL
 * the app functionality is pooped into the page in one giant blob, right here.
 * And that's why index.js is the entry point for the app.
 */
React.render(<Layout />, document.getElementById('app'))
