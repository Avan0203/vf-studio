import {
  RowOrColumnItemConfig,
  StackItemConfig,
  ComponentItemConfig,
} from "golden-layout";
import type { Component } from "vue";

export type ContentItemType = Array<
  RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig
>;

export type ContentType = Array<ContentItemType>;

export type ComponentMap = Record<string, () => Promise<Component>>;
