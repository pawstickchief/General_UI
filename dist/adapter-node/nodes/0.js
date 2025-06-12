import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CFLo5OhH.js","_app/immutable/chunks/disclose-version.CCpMAAFc.js","_app/immutable/chunks/runtime.BL0abR6R.js","_app/immutable/chunks/legacy.BWim2NN6.js","_app/immutable/chunks/slot.CGnX09gx.js"];
export const stylesheets = ["_app/immutable/assets/0.DnRmNoPh.css"];
export const fonts = [];
