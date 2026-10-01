export function resolve(spec, ctx, next) {
  if (spec.endsWith('.css')) return { url: 'data:text/javascript,export default {}', shortCircuit: true };
  return next(spec, ctx);
}
