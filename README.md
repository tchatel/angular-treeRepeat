# Recursive repeater for AngularJS
## or how to build a tree by hand

Demo is here : http://tchatel.github.io/angular-treeRepeat/


This `treeRepeat` directive is derived from `ngRepeat`, to perform a recursive repeat of an HTML element
on a hierarchical data structure.

_The idea is not to have a monolithic full tree component, but a low level recursive repeater which allow to build a
tree with any template, and any data structure type. Of course any sort of tree built with those low level directives may be
packaged itself in a ready to use directive._

There are 5 directives :

* `tree`, that only publishes a controller ; it must be set on an element containing those with the other directives
* `treeRepeat`, with exact same syntax as `ngRepeat`
* `treeInsertChildren`, with an AngularJS expression that evaluates to the collection of children nodes,
       used for next level of repeat
    * the same HTML element with `treeRepeat` directive is repeated against the children nodes
    * all the repeated elements are inserted into that element with `treeInsertChildren` directive
* `treeDraggable`, to mark an element as draggable
    * it takes an expression, evaluated on the dragged node, the value of which will be referenced as `$drag`
        in `tree-droppable` expression
* `tree-droppable`, to mark a drag and drop target
    * it takes an expression which will be evaluated as an action, and where `$drag` references the value
        of `treeDraggable` expression

Sample template, with an action when a node is clicked :

```HTML
<ul tree>
  <li tree-repeat="node in treeData">
      <div><span class="icon"
                 ng-class="{collapsed: node.collapsed, expanded: !node.collapsed}"
                 ng-show="node.children && node.children.length > 0"
                 ng-click="node.collapsed = !node.collapsed"></span>
         <a href="" ng-click="action(node)">
           <span class="label"
                 ng-class="{folder: node.children && node.children.length > 0}"
                 ng-bind="node.label"></span>
         </a>
      </div>
      <ul ng-if="!node.collapsed && node.children && node.children.length > 0"
          tree-insert-children="node.children || []"></ul>
  </li>
</ul>
```


Sample template, with drag and drop support :

```HTML
<ul tree>
  <li tree-repeat="node in treeData" tree-draggable="{node: node, parent: $parent.node}"
                                     tree-droppable="drop(node, $drag.node, $drag.parent)">
      <div><span class="icon"
                 ng-class="{collapsed: node.collapsed, expanded: !node.collapsed}"
                 ng-show="node.children && node.children.length > 0"
                 ng-click="node.collapsed = !node.collapsed"></span>
           <span class="label"
                 ng-class="{folder: node.children && node.children.length > 0}"
                 ng-bind="node.label"
                 ></span>
      </div>
      <ul ng-if="!node.collapsed && node.children && node.children.length > 0"
          tree-insert-children="node.children || []"></ul>
  </li>
</ul>
```


