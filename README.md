# ionic-searchable-text
An ionic plugin for text search and highlight

requires ionic framework and jquery

![alt text](http://i.imgur.com/w4tfUjR.gif)


## How to use..

1. add jQuery and `ionic-searchable-text.bundle.min.js` to index.html
2. include `'searchable-text'` in module

```
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'searchable-text'])
```

3
. in page template, add 

```
    <searchable-text text="{{text}}" show-input="showSearchInput" input="input"></searchable-text>
```

and in controller, define text (string) and showSearchInput(bool).

```
.controller('DashCtrl', function($scope) {
    $scope.showSearchInput = true;
    $scope.text = 'Last night I went to see a showing at the Tribeca Film Festival of the new movie about Ramanujan, The Man Who Knew Infinity. It was extremely good, infinitely better than the most recent high profile film about a mathematician, the one about Turing (see here). The story of Ramanujan is one of the great romantic stories of mathematics, with a large part played in it by the Cambridge mathematician G. H. Hardy. The filmmaker was inspired by Robert Kanigel’s excellent 1991 biography of the same name (he says his mother gave it to him to read, she had it through her book club). The book is an excellent source for the story of Ramanujan’s life, and Hardy’s A Mathematician’s Apology is something everyone should read (for one thing, it’s short). For some more about the film from an expert on Ramanujan’s work, the AMS Notices have this from George Andrews. Some dramatic license was taken, for instance in having Jeremy Irons play Hardy as a much older man than he actually was when he met Ramanujan. After the film there was a panel discussion, with filmmaker and screenwriter Matt Brown explaining that it took 10 years to get the film made, largely because of the difficulty of financing it. He claimed that he could have gotten the financing much earlier if he had been willing to go along with certain plot changes the financiers wanted: in particular they wanted the story to revolve around a love affair of Ramanujan with a (white) nurse, to be played by a high-profile starlet. Also at the panel discussion were two mathematicians: Princeton’s Manjul Bhargava and my Columbia colleague Ina Petkova. One reason the film is so true to the real story of the mathematics and mathematicians involved in it is the involvement of Ken Ono and Bhargava. Ono was heavily involved in the filming (and he has a memoir from Springer, My Search for Ramanujan, about to appear). Bhargava was involved in the editing, in particular in helping choose among the many takes of the actors acting out a mathematical discussion those which seemed true to life. The film is supposed to be released here in the US on April 29, I can’t recommend it enough. '
})

```