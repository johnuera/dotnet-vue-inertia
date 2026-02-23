type ZiggyRoute = { uri: string; methods: string[] };
type Ziggy = { url: string; routes: Record<string, ZiggyRoute> };

declare global {
  interface Window {
    Ziggy?: Ziggy;
  }
}

function encode(v: any) {
  return encodeURIComponent(String(v));
}

export function route(name: string, params: Record<string, any> = {}, absolute = false) {
  const ziggy = window.Ziggy;
  if (!ziggy) throw new Error("window.Ziggy is not set. Load /ziggy first.");

  const def = ziggy.routes[name];
  if (!def) throw new Error(`Route '${name}' not found.`);

  let path = def.uri;

  // Replace {param} or {param?} (ignores constraints like :int in your pattern)
  path = path.replace(/\{([^}:?]+)(?::[^}?]+)?\??\}/g, (_, key: string) => {
    if (params[key] === undefined || params[key] === null) return "";
    const val = params[key];
    delete params[key];
    return encode(val);
  });

  // Clean double slashes from optional params removal
  path = path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

  const qs = Object.keys(params).length
    ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
    : "";

  return (absolute ? ziggy.url : "") + path + qs;
}
