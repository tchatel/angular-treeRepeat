'use strict';

(function () {

    angular.module('app.controllers', [])

        .controller('MenuCtrl', ['$scope', '$route', 'menu', function($scope, $route, menu) {
            $scope.menu = menu;
            $scope.getCurrentMenuItem = function() {
                return $route.current && $route.current.locals && $route.current.locals.menuItem;
            }
        }])


        .controller('TreeCtrlSmall', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/smalltree.js").success(function (data) {
                $scope.treeData = data;
            });
            $scope.action = function(node) {
                alert("Action on node : " + node.label);
            };
        }])

        .controller('TreeCtrlMedium', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/mediumtree.js").success(function (data) {
                $scope.treeData = data;
            });
            $scope.action = function(node) {
                alert("Action on node : " + node.label);
            };
        }])

        .controller('TreeCtrlDeep', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/deeptree.js").success(function (data) {
                $scope.treeData = data;
            });
            $scope.action = function(node) {
                alert("Action on node : " + node.label);
            };
        }])

        .controller('TreeCtrlBig', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/bigtree.js").success(function (data) {
                $scope.treeData = data;
            });
            $scope.action = function(node) {
                alert("Action on node : " + node.label);
            };
        }])

        .controller('TreeCtrlBigCollapsed', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/bigtree.js").success(function (data) {
                $scope.treeData = data;
                $scope.collapseAll();
            });
            $scope.action = function(node) {
                alert("Action on node : " + node.label);
            };
        }])

        .controller('TreeCtrlDragMedium', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/mediumtree.js").success(function (data) {
                $scope.treeData = data;
            });
            $scope.drop = function (targetNode, sourceNode, sourceParentNode) {
                var children = sourceParentNode.children;
                for (var i = 0 ; i < children.length ; i++) {
                    if (children[i] == sourceNode) {
                        children.splice(i, 1);
                        if (!targetNode.children) {
                            targetNode.children = [];
                        }
                        targetNode.children.push(sourceNode);
                        break;
                    }
                }
            };
        }])

        .controller('TreeCtrlDragDeep', ['$scope', '$http', function($scope, $http) {
            addExpandAllCollapseAll($scope);
            $scope.treeData = null;
            $http.get("data/deeptree.js").success(function (data) {
                $scope.treeData = data;
            });
            $scope.drop = function (targetNode, sourceNode, sourceParentNode) {
                var children = sourceParentNode.children;
                for (var i = 0 ; i < children.length ; i++) {
                    if (children[i] == sourceNode) {
                        children.splice(i, 1);
                        if (!targetNode.children) {
                            targetNode.children = [];
                        }
                        targetNode.children.push(sourceNode);
                        break;
                    }
                }
            };
        }])


    function addExpandAllCollapseAll($scope) {
        function rec(nodes, action) {
            for (var i = 0 ; i < nodes.length ; i++) {
                action(nodes[i]);
                if (nodes[i].children) {
                    rec(nodes[i].children, action);
                }
            }
        }
        $scope.collapseAll = function () {
            rec($scope.treeData, function (node) {
                node.collapsed = true;
            });
        };
        $scope.expandAll = function () {
            rec($scope.treeData, function (node) {
                node.collapsed = false;
            });
        };
    }


    /* ---------- functions used to build the sample trees ------------- */

    function addChild(parent, label) {
        if (!parent.children) {
            parent.children = [];
        }
        var newNode = {
            label: label,
            collapsed: false
        };
        parent.children.push(newNode);
        return newNode;
    }
    function addChildren(parent, labels) {
        for (var i = 0 ; i < labels.length ; i++) {
            addChild(parent, labels[i]);
        }
    }

    function smallTree() {
        var root = {
            label: "root"
        };
        var folderA = addChild(root, "folder A");
        var folderB = addChild(folderA, "folder B");
        var folderC = addChild(root, "folder C");
        var folderD = addChild(folderC, "folder D");
        folderD.collapsed = true;
        var folderE = addChild(folderD, "folder E");
        var folderF = addChild(folderC, "folder F");
        var folderG = addChild(root, "folder G");
        var folderH = addChild(root, "folder H");
        addChildren(folderA, ["file A1", "file A2", "file A3", "file A4"]);
        addChildren(folderB, ["file B1", "file B2"]);
        addChildren(folderC, ["file C1"]);
        addChildren(folderE, ["file E1", "file E2", "file E3"]);
        addChildren(folderF, ["file F1", "file F2"]);
        addChildren(folderG, ["file G1", "file G2", "file G3", "file G4"]);
        addChildren(folderH, ["file H1", "file H2", "file H3"]);
        return [root];
    }

    function buildTree() {
        var maxLevel = 6;
        var size = 2;
        var root = {};
        recursiveAddChildren(maxLevel, 0, size, root, "A");
        return root.children;

        function recursiveAddChildren(maxLevel, currentLevel, size, parent, prefix) {
            for (var i = 0 ; i < size ; i++) {
                var label = (currentLevel < maxLevel ? "Folder" : "File")
                    + ' ' + prefix + i;
                var node = addChild(parent, label);
                if (currentLevel < maxLevel) {
                    recursiveAddChildren(maxLevel, currentLevel + 1, size, node, prefix + i);
                }
            }
        }
    }

})();