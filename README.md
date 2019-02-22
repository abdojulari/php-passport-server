<div align="center">
	<img src="https://www.google.com/search?q=laravel+angular+logo&source=lnms&tbm=isch&sa=X&ved=0ahUKEwijvcD75M7gAhVl9YMKHVTgCt0Q_AUIDigB&biw=1370&bih=675#imgrc=5be99xDgnD7VnM:" width="400" alt="Laravel + Angular Logo"/>
</div>

# Laravel + Angular Boilerplate
Quick start for Laravel 5.7 + Angular 7.0 projects with passport auth.

## Includes:

### Front-end:
- Angular CLI boilerplate files
- JWT authentication service
- Login/Register components (Angular Material)  
- Password reset components

### Back-end:
- Composer build file
- Boilerplate files
- JWT authentication
- Password reset functionality

## Server
- Install [PHP](http://fi2.php.net/downloads.php) and one of the following Databases: [MySQL](https://www.mysql.com/downloads/), [PostgreSQL](https://www.postgresql.org/download/), [MS SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or [SQL Lite](https://www.sqlite.org/download.html).
- Install [Composer](https://getcomposer.org/) and [nodeJS](https://nodejs.org).
- Go to `Server` folder and run `composer install` to install dependencies.
- Set your DB connections in `.env`: DB_CONNECTION (mysql, pgsql, sqlsrv, sqlite), DB_DATABASE, DB_PORT, DB_USERNAME, DB_PASSWORD. For email sending make sure that you have in your .env file next keys set: `MAIL_DRIVER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ENCRYPTION`. Fou production build change environment to production: `APP_ENV=production`.
- To update your DB to current version go to `Server` folder and run `php artisan migrate`. If you want to rollback old migration use `php artisan migrate:rollback`.
- (optional) If you want to change `APP_KEY` run `php artisan key:generate` to generate app key. If you get any error on key generation, check if line `APP_KEY=` exists in `.env`, then rerun command. Make sure that apache has access to write into `Server/bootstrap/cache` and `Server/storage` folders. 
- (optional) If you want to change JWT secret run `php artisan jwt:generate` to generate secret for API.

## Client
- Install [nodeJS](https://nodejs.org)
- Globally install [Angular CLI](https://cli.angular.io/) using command `npm install -g @angular/cli@latest`
- Open *Client* folder in terminal/console and run `npm i` to install all dependencies
- Add URL to your local server to  `/Client/src/environments/environment.ts`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- If you want to generate a new component run `ng generate component component-name`. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- Run `ng build -prod` in `Client` directory to build angular client. The build artifacts will be stored in the `dist/` directory.

![Screenshot](./img1.jpg)

## License: [MIT](https://opensource.org/licenses/MIT)# flavour_vote
# flavour_vote

# Create API Rest with Laravel 5.7 Passport Authentication 
# Learning to create a new project following this documentation
# Author: Abdulkabir Ojulari
# Laravel Passport 
Laravel Passport is definitely the best option for api token authentication in Laravel based apps. It automatically generates api token in Laravel apps. This make it easy to configure and efficient to use in your apps.

# Get Started 
Open your terminal and type the command below to install a new Laravel on your system 
```laravel new myApp ```

Laravel Passport provides full 0Auth2 server authentication which makes it a great deal 
``` composer require laravel/passport ```

Run Migration to generate the tables to store client and access token 
```php artisan migrate
```

# Generate Keys 
However, there are two important keys needed by the application to generate secure access token; "Personal Access" and "Password Grant"

```php
php artisan passport:install
```
Or 
```php
 php artisan passport:client --personal

```
This creates client ID and Client secret. 

NOTE:  add the **Laravel\Passport\HasApiTokens** trait to your **App\Usermodel**. This trait will provide a few helper methods to your model which allows you to inspect the authenticated user's token and scopes

```php <?php
namespace App;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use Notifiable, HasApiTokens;
}

```
Next, you should call the **Passport::routes()** method within the boot method of your **AuthServiceProvider**. This method will register the routes necessary to issue access tokens and revoke access tokens, clients, and personal access tokens:


```php
<?php
namespace App\Providers;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];
    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
    }
}
```
Open **config/auth.php** configuration file, you should set the driver option of the api authentication guard to passport. This will tell your application to use Passport's TokenGuard when authenticating incoming API requests:

```
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],

```

Open routes/api.php file to write web services route. 

``` <?php
use Illuminate\Http\Request;
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
```

# Create a controller

**php artisan make:controller AuthController**

```php

<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
```
# Confirm account and notification 

Let's start by adding some columns in users table as follows;

we add two columns *active* and *activation_token* also we add the *softDeletes trait in database/migrations/xxxx_create_users_table.php migration file.

```php
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('active')->default(false);
            $table->string('activation_token');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }
...

```

we add SoftDeletes trait, fillable and hidden attributes in your App\User model.

```php
<?php
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name', 'email', 'password', 'active', 'activation_token'
    ];
    protected $hidden = [
        'password', 'remember_token', 'activation_token'
    ];
}

```

Run **php artisan migrate:refresh** to migrate 

Run *php artisan make:notification SignupActivate* to create a signup notification and confirmation 
-> app/Notifications/SignupActivate.php will be created, then open it and replace **toMail function** with this 

```php 
   public function toMail($notifiable)
		{
		    $url = url('/api/auth/signup/activate/'.$notifiable->activation_token);
		    return (new MailMessage)
			->subject('Confirm your account')
			->line('Thanks for signup! Please before you begin, you must confirm your account.')
			->action('Confirm Account', url($url))
			->line('Thank you for using our application!');
		}
 ```
 
 In your app/Http/Controllers/AuthController.php controller, let’s update AuthController and put the code below
 
```
<?php
...
use App\Notifications\SignupActivate;
class AuthController extends Controller
{
...
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'activation_token' => str_random(60)
        ]);
        $user->save();
        $user->notify(new SignupActivate($user));
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }
}
```

Add this to the routes;   Route::get('signup/activate/{token}', 'AuthController@signupActivate');

Add this function to your AuthController 

```php
public function signupActivate($token)
{
    $user = User::where('activation_token', $token)->first();
    if (!$user) {
        return response()->json([
            'message' => 'This activation token is invalid.'
        ], 404);
    }
    $user->active = true;
    $user->activation_token = '';
    $user->save();
    return $user;
}

```

To validate that account is active and has not been deleted we update login method of app/Http/Controllers/AuthController.php controller.

```php 

public function login(Request $request)
{
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
        'remember_me' => 'boolean'
    ]);
    $credentials = request(['email', 'password']);
    
    $credentials['active'] = 1;        //added to validate
    $credentials['deleted_at'] = null; //added to validate 
    
    if(!Auth::attempt($credentials))
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    $user = $request->user();
    $tokenResult = $user->createToken('Personal Access Token');
    $token = $tokenResult->token;
    if ($request->remember_me)
        $token->expires_at = Carbon::now()->addWeeks(1);
    $token->save();
    return response()->json([
        'access_token' => $tokenResult->accessToken,
        'token_type' => 'Bearer',
        'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
    ]);
}

```

You will need to do some settings on your account, especially if you want to use SMTP and besides gmail account. Go to your gmail account to enable **2-verification** and generate **app password**. Then go to .env 

MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=yourusername@gmail.com
MAIL_PASSWORD=<app password>
MAIL_ENCRYPTION=tls
	
	
**config/mail.php**

```php 

return [

'driver' => env('MAIL_DRIVER', 'smtp'),

'host' => env('MAIL_HOST', 'smtp.gmail.com'),

'port' => env('MAIL_PORT', 587),

'from' => [
    'address' => env('MAIL_FROM_ADDRESS', 'username@gmail.com'),
    'name' => env('MAIL_FROM_NAME', 'Payne Curtis'),
],

'encryption' => env('MAIL_ENCRYPTION', 'tls'),

'username' => env('MAIL_USERNAME'),

'password' => env('MAIL_PASSWORD'),


'sendmail' => '/usr/sbin/sendmail -bs',

'markdown' => [
    'theme' => 'default',

    'paths' => [
        resource_path('views/vendor/mail'),
    ],
],

'log_channel' => env('MAIL_LOG_CHANNEL'),
];

```

