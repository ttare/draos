var app=angular.module('app', ['ui.router','ngDraggable', 'ngCookies', 'ngAnimate', 'toaster', 'pascalprecht.translate']);




app.run(function($rootScope, $timeout, $translate, stateService) {
    var loggedUser = stateService.getLoggedUser();
    if (loggedUser) {
        $rootScope.loggedUser = loggedUser;
        $rootScope.loggedUser.isAuth = true;
    } else {
        $rootScope.loggedUser ={isAuth: false};
    }
    $rootScope.logout=function () {
        stateService.removeLoggedUser();
        $rootScope.loggedUser ={isAuth: false};
    }

    $rootScope.centerAnchor = true;
    $rootScope.toggleCenterAnchor = function () {$rootScope.centerAnchor = !$rootScope.centerAnchor}

   $rootScope.bestSeller=[
       {
           title:'Cevapi',
           price:5,
           cartImage:'',
           image:'./images/cevapi.jpg'
       },
       {
           title:'Pljeskavica',
           price:5,
           cartImage:'',
           image:'./images/pljeskavica.jpg'
       },
       {
           title:'Pizza',
           price:5,
           cartImage:'',
           image:'./images/pizza.jpg'
       },
       {
           title:'Hamburger',
           price:5,
           cartImage:'',
           image:'./images/hamburger.jpg'
       },
	   {
		   title:'Omlet',
		   price:5,
		   cartImage:'',
		   image:'./images/omlet.jpg'
		},
		{
		   title:'Rolovana piletina',
		   price:5,
		   cartImage:'',
		   image:'./images/rolovana-piletina.jpg'
		},
		{
		   title:'Pileci file',
		   price:5,
		   cartImage:'',
		   image:'./images/pileci-file.jpg'
		},
		{
		   title:'Sudzukice',
		   price:5,
		   cartImage:'',
		   image:'./images/sudzukice.jpg'
		}
	   ];

    $rootScope.todayOffer = [
        {
           title:'Svarcvald visnja',
           price:5,
           cartImage:'',
           image:'./images/svarcvald visnja.jpg'
       },
       {
           title:'Kapri',
           price:5,
           cartImage:'',
           image:'./images/kapri.jpg'
       },
       {
           title:'Nugat',
           price:5,
           cartImage:'',
           image:'./images/nugat.jpg'
       },
       {
           title:'Jafa',
           price:5,
           cartImage:'',
           image:'./images/jafa.jpg'
       },
	   {
		   title:'Ness cafee',
		   price:5,
		   cartImage:'',
		   image:'./images/ness cafee.jpg'
		},
		{
		   title:'Cedevita',
		   price:5,
		   cartImage:'',
		   image:'./images/cedevita.jpg'
		},
		{
		   title:'Coca cola',
		   price:5,
		   cartImage:'',
		   image:'./images/cocacola.jpg'
		},
		{
		   title:'Cappy',
		   price:5,
		   cartImage:'',
		   image:'./images/capy.jpg'
		}
	   ];


    var otherOffer = [
        {
           title:'Coko trio',
           price:5,
           cartImage:'',
           image:'./images/coko trio.jpg'
       },
       {
           title:'Kesten',
           price:5,
           cartImage:'',
           image:'./images/kesten.jpg'
       },
       {
           title:'Malina plazma',
           price:5,
           cartImage:'',
           image:'./images/malina plazma.jpg'
       },
       {
           title:'Aleksandar',
           price:5,
           cartImage:'',
           image:'./images/aleksandar.jpg'
       },
	   {
		   title:'Cokoladni tart',
		   price:5,
		   cartImage:'',
		   image:'./images/cokoladni tart.jpg'
		},
		{
		   title:'Muffins',
		   price:5,
		   cartImage:'',
		   image:'./images/muffins.jpg'
		},
		{
		   title:'Cijedjena narandza',
		   price:5,
		   cartImage:'',
		   image:'./images/cijedjena narandza.jpg'
		},
		{
		   title:'Limunada',
		   price:5,
		   cartImage:'',
		   image:'./images/limunada.jpg'
		}
	   ];


    $rootScope.menu = otherOffer.concat($rootScope.todayOffer, $rootScope.bestSeller);


    $rootScope.filtered = $rootScope.bestSeller;

    $rootScope.query = {
        title: ''
    };


    $rootScope.sendCart=function() {
        $rootScope.cart.options.created=moment();

        $rootScope.timeout=moment().add(15,'seconds');
        timer();
    }

    var calculateTimeDifference = function() {
        var d = $rootScope.timeout.diff(moment());
        $rootScope.remaining=moment(d).format('mm:ss');
        if ($rootScope.remaining !='00:00') {
            timer();
        } else {
            alert("Vasa narudzba ne moze biti obradjena. molimo da odaberete drugi restoran za dostavu");
        }
    }

    function timer() {
        $timeout(calculateTimeDifference,1000);
    }





    function calculateTotal(cart) {
        $rootScope.cartTotal=0;
        angular.forEach(cart, function (item) {
            $rootScope.cartTotal+=item.price*item.count;
        });
    }
    var cart = stateService.getUserCart();
    $rootScope.cart=cart || {food:[], options:{}};
    calculateTotal($rootScope.cart.food);


    function saveCart() {
        stateService.setUserCart($rootScope.cart);
    }
    $rootScope.changeCount=function() {
        calculateTotal($rootScope.cart.food);
        saveCart();
    }
    $rootScope.removeFromCart=function (index) {
        $rootScope.cart.food.splice(index,1);
        calculateTotal($rootScope.cart.food);
        saveCart();
    }
    $rootScope.onDropComplete1=function(data,evt){
        var inside=inArray($rootScope.cart.food, data);
        if (inside && inside.isIn===true) {
            $rootScope.cart.food[inside.index].count +=1;
        } else {
            var article=angular.copy(data);
            article.count=1;
            article.total=article.price;
            $rootScope.cart.food.push(article);
        }
        calculateTotal($rootScope.cart.food);
        saveCart();
    }
    var inArray = function(array, obj) {
        var inside={isIn: false, index:-1};
        var i=0;
        angular.forEach(array, function(item) {
            if (item.title===obj.title) {
                inside.isIn=true;
                inside.index=i;
                return;
            }
            i=i+1;
        });
        return inside;
    }




    $rootScope.currencyCode='KM';
    $rootScope.changeCurrency=function(newCurrency) {
        $rootScope.currencyCode=newCurrency;
    }
    $rootScope.calculatePrice= function (price) {
        if ($rootScope.currencyCode=='KM')
            return price;
        else
            return price/1.95 ;
    }

    $rootScope.changeLanguage=function (key) {
        $translate.use(key);
    }
});


app.factory('stateService', function ($cookieStore) {
    return {
        setRegistrationUser: function (registrationModel) {
            $cookieStore.put('registrationModel', registrationModel);
        },
        getRegistrationUser: function () {
            return $cookieStore.get('registrationModel');
        },
        setLoggedUser: function (loginModel) {
            $cookieStore.put('loginModel', loginModel);
        },
        getLoggedUser: function () {
            return $cookieStore.get('loginModel');
        },
        removeLoggedUser: function() {
          $cookieStore.remove('loginModel');
        },
        setUserCart: function (userCart) {
            $cookieStore.put('userCart', userCart);
        },
        getUserCart: function () {
            return $cookieStore.get('userCart');
        }
    }
});


app.controller('restaurantsController', function ($rootScope, $scope, stateService, toaster, $state) {

    $scope.restaurants=[
        {
            title:'Mrkva',
            address:'Čurčiluk mali 15b',
            state:'Baščaršija',
            type:'Cevabdzinica',
            food: 'Rostilj, Salate',
            image:'./images/restaurants/mrkva.jpg'
        },
        {
            title:'Metropolis',
            address:'Čurčiluk mali 15b',
            state:'Baščaršija',
            type:'Slastičarna',
            food: 'Kolači, Torte',
            image:'./images/restaurants/metropolis.jpg'
        },
        {
            title:'Palma',
            address:'Čurčiluk mali 15b',
            state:'Pofalici',
            type:'Slastičarna',
            food: 'Kolači, Torte',
            image:'./images/restaurants/palma.jpg'
        },
        {
            title:'Vanni',
            address:'Čurčiluk mali 15b',
            state:'Baščaršija',
            type:'Fast food',
            food: 'Rostilj, Salate, Sendvici',
            image:'./images/restaurants/vanni.jpg'
        },
        {
            title:'Mutvak',
            address:'Čurčiluk mali 15b',
            state:'Marijin dvor',
            type:'Fast food',
            food: 'Doner, Sendvici',
            image:'./images/restaurants/mutvak.jpg'
        },
        {
            title:'Biban',
            address:'Saburina',
            state:'Baščaršija',
            type:'Restoran',
            food: 'Rostilj, Salate, Supe, Pecenje',
            image:'./images/restaurants/biban.jpg'
        },
        {
            title:'U2',
            address:'Čurčiluk mali 15b',
            state:'Pofalici',
            type:'Pizzeria',
            food: 'Pizza',
            image:'./images/restaurants/u2.jpg'
        },
    ]

});

app.controller('cartController', function ($rootScope, $scope, stateService, toaster, $state) {

    $scope.selectedOrder=$scope.cart;
    console.log(JSON.stringify($scope.selectedOrder));
    $scope.selectedOrder.status='In progress';

    $scope.previousOrders=[]
    $scope.previousOrders.push(JSON.parse({"food": [
        {"title": "Hamburger", "price": 5, "cartImage": "", "image": "./images/hamburger.jpg", "count": 1, "total": 5, "$$hashKey": "object:4"},
        {"title": "Cevapi", "price": 5, "cartImage": "", "image": "./images/cevapi.jpg", "count": 1, "total": 5, "$$hashKey": "object:5"}
        ], "options": {"created": "2015-01-18T21:15:34.993Z"}, "status": "In progress"}));

    $scope.previousOrders.push(JSON.parse({"food": [
            {"title": "Pizza", "price": 5, "cartImage": "", "image": "./images/pizza.jpg", "count": 2, "total": 5, "$$hashKey": "object:4"},
            {"title": "Pljeskavica", "price": 5, "cartImage": "", "image": "./images/pljeskavica.jpg", "count": 2, "total": 5, "$$hashKey": "object:5"}
        ], "options": {"created": "2015-01-18T19:35:12.104Z"}}));

});




app.controller('userController', function ($rootScope, $scope, stateService, toaster, $state, $translate, $timeout) {

    var regModel = stateService.getRegistrationUser();
     $scope.registrationModel = {first_name:'', last_name:'', password:'', email:'', address:'', phone:'', state:''};


    var fieldNames = {
       'first_name': $translate.instant('first_name'),
       'last_name': $translate.instant('last_name'),
       'password': $translate.instant('password'),
       'email': 'E-mail',
       'address': $translate.instant('address'),
       'phone': $translate.instant('telephone'),
       'state': $translate.instant('region')
    };


    function validateRegistration() {
        var isValid=true;
        var errors='';
        angular.forEach($scope.registrationModel, function (value, key) {
            if (value === '') {
                isValid=false;
                errors += fieldNames[key] + $translate.instant('field_required') + '<br>';
            } else {
                if (key === 'phone') {
                    var phoneno = /^\(?([0-9]{3})\)?[-./ ]?([0-9]{3})[-. ]?([0-9]{3})$/;
                    if (value.match(phoneno) === null) {
                        errors += $translate.instant('wrong_format') + ' <br>';
                    }
                }
            }
        });
        if (!isValid) {
            toaster.pop('error', 'Error', errors, 5000,  'trustedHtml');
        }
        return isValid;
    }

    $scope.registerUser=function () {
        if (validateRegistration()) {
            stateService.setRegistrationUser($scope.registrationModel);
            toaster.pop('success', 'Success', $translate.instant('registrationMsg'), 5000,  'trustedHtml');
            $timeout(function () {
                $state.go('signin');
            }, 4000);

        }
    };

    $scope.loginModel = {email:'', password:''};
    function validateLogin() {
        var isValid=true;
        var errors='';
        angular.forEach($scope.loginModel, function (value, key) {
            if (value === '') {
                isValid=false;
                errors += key + ' field is required <br>';
            }
        });
        if (!isValid) {
            toaster.pop('error', 'Error', errors, 2000,  'trustedHtml');
        }
        return isValid;
    }
    $scope.login=function () {
        if (validateLogin()) {
            if (regModel) {
                if ($scope.loginModel.email === regModel.email && $scope.loginModel.password === regModel.password) {
                    stateService.setLoggedUser (regModel);
                    $rootScope.loggedUser = regModel;
                    $rootScope.loggedUser.isAuth = true;
                    toaster.clear();
                    $state.go('home');
                } else {
                    toaster.pop ('error', 'Error', 'Wrong user name or password. <br> Try again with correct data', 5000, 'trustedHtml');
                    $scope.loginModel.password = '';
                    $ ('#input-password').focus ();
                }
            } else {
                alert ("nema registrovanih korisnika");
            }
        }
    }

    $scope.getPrivacyPolicy=function () {
        alert("PRIVAY POLICY NOT IMPLEMENTED");
    }


});
