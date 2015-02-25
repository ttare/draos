app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl:'app/naslovna.html'
        })
        .state('menu', {
            url:'/menu',
            templateUrl:'app/menu.html'
        })
        .state('restaurants', {
            url:'/restaurants',
            templateUrl:'app/restaurants.html',
            controller:'restaurantsController'
        })
        .state('signin', {
            url:'/signin',
            templateUrl:'app/signin.html',
            controller:'userController'
        })
        .state('signup', {
            url:'/signup',
            templateUrl:'app/signup.html',
            controller:'userController'
        })
        .state('cart', {
            url:'/cart',
            templateUrl:'app/cart.html',
            controller:'cartController'
        });
    $urlRouterProvider.otherwise('/home');

    $translateProvider.translations('en', {
        welcome: 'Welcome visitor you can',
        login: 'login',
        or: 'or',
        register: 'create an account',
        welcome_user:'Welcome ',
        finish_order:'When you finish with ordering food you can ',
        logout:'logout',
        home: 'HOME',
        menu: 'MENU',
        restaurants: 'RESTAURANTS',
        sign_in: 'SIGN IN',
        sign_up: 'SIGN UP',
        search: 'Search',
        best: 'Best',
        seller: 'Seller',
        cart: 'Cart',
        order: 'Order',
        price:'PRICE',
        send_order: 'Send order',
        add_to_cart: 'Add to cart',
        sale: 'SALE',
        most: 'Most',
        viewed: 'Viewed',
        continue:'Continue',
        new_customer: 'NEW CUSTOMER',
        register_acc:'Register Account',
        register_text:'By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.',
        returning_cust:'RETURNING CUSTOMER',
        returning_text:'I am a returning customer',
        address:'Address',
        password:'Password',
        forgot_pwd:'Forgotten Password',
        login_page:'login page.',
        already:'If you already have an account with us, please login at the ',
        personal_details:'Your Personal Details',
        first_name:'First name',
        last_name:'Last name',
        telephone:'Telephone',
        fax:'Fax',
        your_address:'Your Address',
        company:'Company',
        region:'Region/State',
        your_pwd:'Your Password',
        confirm_pwd:'Password Confirm',
        accept:'I have read and agree to the ',
        privacy:'Privacy Policy'
    });
    $translateProvider.translations('bs', {
        welcome: 'Dobrodošao posjetioče, trenutno se mozete',
        login: 'prijaviti na sistem',
        or: 'ili',
        register: 'kreirati korisnički profil.',
        welcome_user:'Dobrodošao ',
        finish_order:'Kada završite sa naručivanjem možete se  ',
        logout:'odjaviti',
        home: 'HOME',
        menu: 'JELOVNIK',
        restaurants: 'RESTORANI',
        sign_in: 'PRIJAVA',
        sign_up: 'REGISTRACIJA',
        search: 'Pretraga',
        best: 'Najjj',
        seller: 'Prodavanije',
        cart: 'KOŠARICA',
        order: 'Narudžba',
        price:'CIJENA',
        send_order: 'Pošalji narudžbu',
        add_to_cart: 'Naruči',
        sale: 'POPUST',
        most: 'Najjj',
        viewed: 'Posjećeniji',
        continue:'Nastavi',
        new_customer: 'NOVI KORISNIK',
        register_acc:'Kreiraj korisnički račun',
        register_text:'Kreiranjem korisničkog računa imati ćete mogućnost brže kupovine, obavještavanja o novim ponudama i imati informacije o prethodnim narudžbama.',
        returning_cust:'POSTOJEĆI KORISNIK',
        returning_text:'Ja već imam registrovan korisnički račun',
        address:'Adresa',
        password:'Lozinka',
        forgot_pwd:'Zaboravljena lozinka',
        login_page:'stranica za prijavu na sistem.',
        already:'Ako već imate korisnički profil molimo da se prijavite na sistem ',
        personal_details:'Vaše lične informacije',
        first_name:'Ime',
        last_name:'Prezime',
        telephone:'Telefon',
        fax:'Faks',
        your_address:'Vaša adresa',
        company:'Kompanija',
        region:'Regija/Naselje',
        your_pwd:'Vaša lozinka',
        confirm_pwd:'Potvrda lozinke',
        accept:'Pročitao sam i slažem se sa ',
        privacy:'izjavom o privatnosti'
    });
    $translateProvider.preferredLanguage('en');

});