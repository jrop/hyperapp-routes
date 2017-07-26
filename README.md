# hyperapp-routes

> A router that supports both hash-based and history-API-based routing

# Installation

```sh
$ npm install --save hyperapp-routes
```

# Usage

```js
const {h, app} = require('hyperapp')
const routes = require('hyperapp-routes')

const $r = routes({ hash: true })
	.path('/', (state, actions) => (
			<div>
				<h1>Home</h1>,
				<a onclick={() => actions.router.go('/about')} href="javascript: void(0)">About</a>
			</div>
		)
	)

	.path('/about', (state, actions) => (
			<div>
				<h1>About</h1>,
				<a onclick={() => actions.router.go('/')} href="javascript: void(0)">Home</a>
			</div>
		)
	)
	
	.path('/hello/:name?', (state, actions) => (
			<div>
				<h1>Hello {state.router.params.name || 'World'}!</h1>,
				<a onclick={() => actions.router.go('/')} href="javascript: void(0)">Home</a>
			</div>
		)
	)

app({
	mixins: [$r]
})
```

## UMD

If you are using script tags to import your code, you may include this lib like the following:

```html
<script src="https://unpkg.com/hyperapp-routes"></script>
<script>
	// routes function available as 'routes'
	const $r = routes({hash: true})
		.path(...)
</script>
```

# License (ISC)

ISC License (ISC)
Copyright 2017 <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
