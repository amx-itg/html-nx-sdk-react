export const getOptions = (configuration) => {
  // eslint-disable-next-line prefer-const

  configuration = configuration ?? {};
  const defaultOptions = {
    ...(configuration ?? {}),
    port: configuration.port ?? 1,
    level: configuration.level ?? 1,
    level_1: configuration.level_1 ?? 1,
    level_2: configuration.level_2 ?? 2,
    id:
      configuration.id ??
      `slider_${Math.floor(Math.random() * Math.random() * 10000)}`,
    type: configuration.type ?? 'single',
    skin: configuration.skin ?? 'flat',
    color: configuration.color ?? 'bg-primary',
    min: configuration.min ?? 0,
    max: configuration.max ?? 255,
    from: configuration.from ?? 128,
    step: configuration.step ?? 1,
    grid: configuration.grid ?? true,
    grid_num: configuration.grid_num ?? 4,
    grid_snap: configuration.grid_snap ?? true,
    force_edges: configuration.force_edges ?? true,
    hide_min_max: configuration.hide_min_max ?? false,
    hide_from_to: configuration.hide_from_to ?? false,
    prefix: configuration.prefix ?? '',
    postfix: configuration.postfix ?? '',
    decorate_both: configuration.decorate_both ?? true,
    values_separator: configuration.values_separator ?? '-',
    prettify: configuration.prettify ?? true,
    separator: configuration.separator ?? ',',
    onchange: configuration.onchange ?? false,
    onfinish: configuration.onfinish ?? true,
    sliding: configuration.sliding ?? false,
  };
  defaultOptions.oldVal = {
    from: defaultOptions.min,
    to: defaultOptions.max,
  };

  return defaultOptions;
};
