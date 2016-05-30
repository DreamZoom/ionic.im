angular.module('ionicIM.services', [])
	.provider('$imConfig', function() {
		this.appKey = "dreamzoom#imchat";
		this.setAppKey = function(appKey) {
			this.appKey = appKey;
			localStorage.setItem("appKey", appKey);
		};

		this.setUserName = function(username) {
			localStorage.setItem("username", username);
		};

		this.setPassword = function(password) {
			localStorage.setItem("password", password);
		};

		this.getUserName = function() {
			return localStorage.getItem("username");
		};
		this.getPassword = function() {
			return localStorage.getItem("password");
		};
		
		
		this.currentUserName="";
		this.getCurrentUser = function() {
			return this.currentUserName;
		};
		this.setCurrentUser = function(username) {
			this.currentUserName = username;
		};

		this.$get = function($http) { // injectables go here
			var self = this;
			return self;
		}
	})
	.service('$localMessage', function() {

		this.pushMessage = function(username, message) {
			var messages = this.getMessages(username);
			messages.push(message);
			var arrString = JSON.stringify(messages);
			localStorage.setItem("message_" + username, arrString);
		}

		this.getMessages = function(username) {
			var arrString = localStorage.getItem("message_" + username);
			var messages = JSON.parse(arrString);
			return messages || [];
		}

	})
	.service('$imService', function($http, $imConfig, $localMessage,$rootScope) { // injectables go here

		console.log("service start")
		var conn = new Easemob.im.Connection(); 
		this.conn = conn;

		var that = this;
		conn.init({
			onOpened: function() {
				conn.setPresence();
			},
			onTextMessage: function(message) {
				$localMessage.pushMessage(message.to+"_"+message.from, message);
				$rootScope.$broadcast('im.recivemessage', message.data);
			}
		});
		
		

		var self = this; // Save reference

		this.appKey = "";
		this.setAppKey = function(appKey) {
			this.appKey = appKey;
			console.log(appKey);
		}

		this.sendTextMessage = function(username, message) {
			var options = {
				from:conn.context.userId,
				to: username,
				msg: message,
				type: "chat"
			};
			options.data = message;
			conn.sendTextMessage(options);
			$localMessage.pushMessage(options.from+"_"+options.to, options);
		}

		this.getMessages = function(username) {
			return $localMessage.getMessages(conn.context.userId+"_"+username);
		}


		this.login = function(username, password) {
			console.log($imConfig.appKey)
			conn.open({
				user: username,
				pwd: password,
				appKey: $imConfig.appKey
			});
		}

		return this;
	});