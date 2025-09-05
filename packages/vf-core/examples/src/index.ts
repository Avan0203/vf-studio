/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-05 11:28:13
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 14:55:06
 * @FilePath: \vf-studio\packages\vf-core\examples\src\index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Document, Element } from "../../src/";
console.log('vf core');
console.log('hello world');

const document = new Document();
console.log('document: ', document);
const element = document.create(Element);
console.log('element: ', element);
const element2 = document.create(Element);
const element3 = document.create(Element);

element.add(element2);
element2.add(element3);

console.log('element children: ', element.getChildren());
console.log('element parent: ', element.getParent());

console.log('element2 parent: ', element2.getParent());

console.log('element getAllChildren: ', element.getAllChildren());

const elements = document.getElementsByClass(Element);
console.log('elements: ', elements);




