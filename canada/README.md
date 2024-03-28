<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[British Software Development](https://www.britishsoftware.co)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- [UserInsights](https://userinsights.com)
- [Fragrantica](https://www.fragrantica.com)
- [SOFTonSOFA](https://softonsofa.com/)
- [User10](https://user10.com)
- [Soumettre.fr](https://soumettre.fr/)
- [CodeBrisk](https://codebrisk.com)
- [1Forge](https://1forge.com)
- [TECPRESSO](https://tecpresso.co.jp/)
- [Runtime Converter](http://runtimeconverter.com/)
- [WebL'Agence](https://weblagence.com/)
- [Invoice Ninja](https://www.invoiceninja.com)
- [iMi digital](https://www.imi-digital.de/)
- [Earthlink](https://www.earthlink.ro/)
- [Steadfast Collective](https://steadfastcollective.com/)
- [We Are The Robots Inc.](https://watr.mx/)
- [Understand.io](https://www.understand.io/)
- [Abdel Elrafa](https://abdelelrafa.com)
- [Hyper Host](https://hyper.host)
- [Appoly](https://www.appoly.co.uk)
- [OP.GG](https://op.gg)

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## video link
https://www.bilibili.com/video/BV1aE411g7Pa?p=16&spm_id_from=pageDriver


1. Lavarel configuration: How to Add Laravel to Path on Mac OSX
https://garywoodfine.com/add-laravel-to-path-on-mac-osx/#how-to-install-laravel-on-mac-osx
1. composer global require "laravel/installer"
2. nano ~/.bash_profile
3. export PATH="$PATH:$HOME/.composer/vendor/bin"
4. source ~/.bash_profile
或者
composer create-project --prefer-dist laravel/laravel blog "5.2.*"
composer create-project --prefer-dist laravel/laravel blog "6.*"
5. run laravel: php artisan serve
6. php artisan make:model Article
7. php artisan make:controller Api/ArticlesController


2 . 建立一个新的项目 https://learnku.com/docs/laravel/5.8/installation/3879
3. 最佳方式https://stackoverflow.com/questions/42445457/installing-laravel-using-composer-through-phpstorm

Using React- https://laravel.com/docs/6.x/frontend#using-react
composer require laravel/ui:^1.0 --dev
npm install
npm run dev
php artisan ui react
php artisan ui react –auth（可以不安装）
npm install && npm run dev
you should run the npm run dev command each time you change a Vue component. 
npm run watch command to monitor and automatically recompile your components each time they are modified.
You can install these dependencies using the Node package manager (NPM):

1. Php artisan make:model Contact
2. php artisan make:controller ContactsController
3. php artisan make:controller api/CategoryController –resource 会建立方法
Backend:编辑model->controller->router
(2) api.php routes
(3).env database配置
Frontend: welcome.blade.php入口文件连接resource 下面的
css和javascript->app.js->example.js
<div id="example"></div>
<script src="/js/app.js"></script>

（3.1）npm run watch
在js file里面建立前端index.js 管理前端routes
安装npm install react-router-dom –save
Npm install axios : to get data from backends
在index.js里面
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";



function Index() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Home}/>
                <Route path="/add" exact component = {Add}/>
                <Route path="/:id/edit" exact component = {Edit}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}

在web.php里面写
Route::get('{reactRoutes}',function(){
    return view('welcome');
});
https://www.bilibili.com/video/BV1dC4y187ij?p=2
https://www.bilibili.com/video/BV1aE411g7Pa?p=13
p13-delete
p14- update
p-15-pagenation: npm install react-js-pagination
p-16-router 部分


