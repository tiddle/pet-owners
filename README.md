# AGL Pet Test
By Carlo Cruz

Usage:
* `npm i`
* `npm run dev` for webserver
* `npm test` for unit tests

Notes:
* Didn't add any css in, but could've added SCSS to webpack build
* Accessed the JSON feed directly, but normally would have had to use express or similar to access the data, then pass to application to avoid CORS issues
* Using Jest for unit tests
* Error handling on fetch would normally be thrown to sentry, but just console'd it out for simplicity
* Build on node v12
