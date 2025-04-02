import {
  RowOrColumnItemConfig,
  StackItemConfig,
  ComponentItemConfig,
} from "golden-layout";

export type ContentItemType = Array<
  RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig
>;

export type ContentType = Array<ContentItemType>;
