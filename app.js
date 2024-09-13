(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .service('ShoppingListCheckOffService', function () {
            var service = this;

            // Initial items for "To Buy" list
            service.toBuyItems = [
                { name: "cookies", quantity: 10 },
                { name: "chips", quantity: 5 },
                { name: "soda", quantity: 2 },
                { name: "bread", quantity: 1 },
                { name: "milk", quantity: 3 }
            ];

            service.boughtItems = [];

            // Method to move item from "To Buy" to "Already Bought"
            service.buyItem = function (itemIndex) {
                var item = service.toBuyItems.splice(itemIndex, 1)[0];
                service.boughtItems.push(item);
            };

            // Method to get "To Buy" items
            service.getToBuyItems = function () {
                return service.toBuyItems;
            };

            // Method to get "Already Bought" items
            service.getBoughtItems = function () {
                return service.boughtItems;
            };
        })
        .controller('ToBuyController', ['ShoppingListCheckOffService', function (ShoppingListCheckOffService) {
            var toBuyCtrl = this;
            toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

            toBuyCtrl.buyItem = function (itemIndex) {
                ShoppingListCheckOffService.buyItem(itemIndex);
                toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems(); // Refresh list
            };
        }])
        .controller('AlreadyBoughtController', ['ShoppingListCheckOffService', function (ShoppingListCheckOffService) {
            var alreadyBoughtCtrl = this;
            alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
        }]);
})();
