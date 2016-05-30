angular.module('ionicIM.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("tabs", {
            url: "/tabs",
            abstract: true,
            templateUrl: "templates/tabs.html",
        })
        .state('tabs.message', {
            url: '/message',
            views: {
                'tabs-message': {
                    templateUrl: 'templates/tabs.message.html',
                   
                }
            }
        })
        .state('tabs.home', {
            url: '/home',
            views: {
                'tabs-home': {
                    templateUrl: 'templates/tabs.home.html', controller:"main"
                }
            }
        })
        .state('tabs.near', {
            url: '/near',
            views: {
                'tabs-near': {
                    templateUrl: 'templates/tabs.near.html',

                }
            },
        })
        .state('tabs.user', {
            url: '/user',
            views: {
                'tabs-user': {
                    templateUrl: 'templates/tabs.user.html',

                }
            }
        })
        
        .state("chat", {
            url: "/chat",
            templateUrl: "templates/chat.html",
            controller:"chat"
        })
        .state("setting", {
            url: "/setting",
            templateUrl: "templates/setting.html"
        })
        ;

    $urlRouterProvider.otherwise("/chat");
});