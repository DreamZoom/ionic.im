angular.module('ionicIM.controllers', [])
	.controller('main', function($scope, $state) {
		$scope.items = [];
		for (var i = 0; i < 100; i++) {
			$scope.items.push("item" + i);
		}
	})
	.controller('chat', function($scope, $state, $ionicScrollDelegate, $imService) {
//		      var username = "dreamzoom";
//		      $imService.login("wxllzf","123456"); 
		var username = "wxllzf";
		$imService.login("dreamzoom", "123456");

		var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');


		$scope.messages = $imService.getMessages(username);

		$scope.$on('im.recivemessage', function(d, data) {
			console.log(data)

			$scope.$apply(function() {
				$scope.messages = $imService.getMessages(username);
				viewScroll.scrollBy(0, -100, true);
				setTimeout(function() {
					viewScroll.scrollBottom(true);
				}, 100)
			});




		});

		$scope.doRefresh = function() {
			$scope.messages = $imService.getMessages(username);
			$scope.$broadcast('scroll.refreshComplete');
		}


		$scope.isMe = function(user) {
			return username == user;
		}
		$scope.messageText = "";

		$scope.sendMessage = function() {

			if (!$scope.messageText) return;

			$imService.sendTextMessage(username, $scope.messageText);
			$scope.doRefresh();
			$scope.messageText = "";
			viewScroll.scrollBottom(true);
		}
		window.addEventListener("native.keyboardshow", function(e) {
			viewScroll.scrollBottom(true);
		});
	})