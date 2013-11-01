'use strict';

angular.module('app', [
        'ngRoute',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers'
    ]).config(function ($routeProvider, menu) {

        function addRouteMenu(shortLabel, fullLabel, routeDef) {
            var menuItem = {
                index : menu.length,
                shortLabel: shortLabel,
                fullLabel: fullLabel
            };
            menu.push(menuItem);
            routeDef.resolve = {
                menuItem: function () {
                    return menuItem;
                }
            };
            $routeProvider.when('/' + menuItem.index, routeDef);
        }

        addRouteMenu('Small tree', 'Small tree with action on nodes (24 nodes)', {
            controller: 'TreeCtrlSmall',
            templateUrl: 'partials/treerepeat.html'
        });
        addRouteMenu('Medium tree', 'Medium tree with action on nodes (7 levels, 128 nodes)', {
            controller: 'TreeCtrlMedium',
            templateUrl: 'partials/treerepeat.html'
        });
        addRouteMenu('Deep tree', 'Deep tree with action on nodes (10 levels, 1024 nodes)', {
            controller: 'TreeCtrlDeep',
            templateUrl: 'partials/treerepeat.html'
        });
        addRouteMenu('Too big tree expanded', 'Too big tree expanded, with action on nodes (4 levels, 10000 nodes)', {
            controller: 'TreeCtrlBig',
            templateUrl: 'partials/treerepeat.html'
        });
        addRouteMenu('Big tree collapsed', 'Big tree collapsed, with action on nodes (4 levels, 10000 nodes)', {
            controller: 'TreeCtrlBigCollapsed',
            templateUrl: 'partials/treerepeat.html'
        });
        addRouteMenu('Drag&drop : medium tree', 'Medium tree with drag&drop (7 levels, 128 nodes)', {
            controller: 'TreeCtrlDragMedium',
            templateUrl: 'partials/treerepeat-drag.html'
        });
        addRouteMenu('Drag&drop : deep tree', 'Deep tree with drag&drop (10 levels, 1024 nodes)', {
            controller: 'TreeCtrlDragDeep',
            templateUrl: 'partials/treerepeat-drag.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/0'
        });
    });

