export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["cert.pem","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.D-3uaZ8R.js","app":"_app/immutable/entry/app.Dyd7SHRV.js","imports":["_app/immutable/entry/start.D-3uaZ8R.js","_app/immutable/chunks/entry.CRC5oQyB.js","_app/immutable/chunks/runtime.BL0abR6R.js","_app/immutable/chunks/index-client.C2hQeMyM.js","_app/immutable/entry/app.Dyd7SHRV.js","_app/immutable/chunks/runtime.BL0abR6R.js","_app/immutable/chunks/render.CxwJUUM4.js","_app/immutable/chunks/disclose-version.CCpMAAFc.js","_app/immutable/chunks/store.DfRPK0Rh.js","_app/immutable/chunks/2.7IsobFCL.js","_app/immutable/chunks/index-client.C2hQeMyM.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/dashboard",
				pattern: /^\/api\/dashboard\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/dashboard/_server.ts.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/login/_server.ts.js'))
			},
			{
				id: "/api/menu",
				pattern: /^\/api\/menu\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/menu/_server.ts.js'))
			},
			{
				id: "/api/users",
				pattern: /^\/api\/users\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/users/_server.ts.js'))
			},
			{
				id: "/api/users/add",
				pattern: /^\/api\/users\/add\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/users/add/_server.ts.js'))
			},
			{
				id: "/api/users/delete",
				pattern: /^\/api\/users\/delete\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/users/delete/_server.ts.js'))
			},
			{
				id: "/api/users/update",
				pattern: /^\/api\/users\/update\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/users/update/_server.ts.js'))
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/settings/details",
				pattern: /^\/settings\/details\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/settings/menu",
				pattern: /^\/settings\/menu\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/settings/purview",
				pattern: /^\/settings\/purview\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/settings/role",
				pattern: /^\/settings\/role\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/users",
				pattern: /^\/users\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/users/profile",
				pattern: /^\/users\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
