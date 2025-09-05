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




