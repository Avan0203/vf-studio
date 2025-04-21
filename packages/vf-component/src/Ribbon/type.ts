export type RibbonMenuItem = {
  name: string;
  icon?: string;
  disabled?: boolean;
  label: string;
  divider?: boolean;
  visible?: boolean;
  children?: Array<RibbonMenuItem>;
};

export type VisibleMethod = (
  item: RibbonMenuItem,
  brother: Array<RibbonMenuItem>,
  ancestors: Array<RibbonMenuItem>
) => boolean;
