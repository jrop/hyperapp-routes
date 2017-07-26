import * as matcher from 'path-to-re'

export type Options = {hash?: boolean}

const hasPushState = () => Boolean(window.history && window.history.pushState)

export default /** mixin **/ (options?: Options) => {
	options = options || {}
	options.hash =
		typeof options.hash == 'undefined' ? !hasPushState() : options.hash

	const location = () =>
		(options.hash
			? window.location.hash.replace(/^#/, '')
			: window.location.pathname) || '/'

	const routes: {matcher; renderer}[] = []
	const factory: any = emit => ({
		state: {
			router: {
				location: location(),
			},
		},
		actions: {
			router: {
				go(state, actions, loc) {
					if (options.hash) window.location.hash = `#${loc}`
					else window.history.pushState(null, null, loc)
					return actions.router.__go(loc)
				},
				__go(state, actions, loc) {
					let renderer: any = () => 'Not Found'
					let params
					for (const route of routes) {
						params = route.matcher(location())
						if (!params) continue
						renderer = route.renderer
						break
					}
					return {
						router: {
							renderer,
							params,
							location: loc,
						},
					}
				},
			},
		},
		events: {
			loaded(state, actions) {
				const responder = () => actions.router.__go(location())
				window.addEventListener('hashchange', responder)
				window.addEventListener('popstate', responder)
				responder()
			},
			render(state, actions) {
				return state.router.renderer || (() => 'Not Found')
			},
		},
	})
	factory.path = (path, renderer) => {
		routes.push({
			matcher: matcher(path),
			renderer,
		})
		return factory
	}
	return factory
}
