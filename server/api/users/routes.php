<?php

require 'users.php';
require_once 'UserMiddleware.php';
require_once 'isAdmin.php';
require_once 'CSRF.php';



use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


$app->group('/user', function () {
    $this->post('/getAllUsers', function (Request $req, Response $res, array $args): Response {
        return getAllUsers($req, $res);
    })->add(new isAdmin())->add(new CSRF());
    $this->get('/details', function (Request $req, Response $res, array $args): Response {
        return getUserDetail($req, $res);
    })->add(new AuthMiddleware());
    $this->post('/isAdmin', function (Request $req, Response $res, array $args): Response {
        return getAdmin($req, $res);
    })->add(new isAdmin());
    $this->post('/login', function (Request $req, Response $res, array $args): Response {
        return loginUser($req, $res);
    })->add(new UserMiddleware());
    $this->post('/logout', function (Request $req, Response $res, array $args): Response {
        return logoutUser($req, $res);
    })->add(new UserMiddleware());
    $this->post('/register', function (Request $req, Response $res, array $args): Response {
        return postUser($req, $res);
    })->add(new UserMiddleware());
    $this->get('/session', function (Request $req, Response $res, array $args): Response {
        return sessionOpen($req, $res);
    });
    $this->put('/updateRole', function (Request $req, Response $res): Response {
        return updateUser($req, $res);
    })->add(new isAdmin())->add(new CSRF());
    $this->put('/update', function (Request $req, Response $res): Response {
        return updateUser($req, $res);
    })->add(new isAdmin());
    $this->delete('/delete/{user_id}', function (Request $req, Response $res, array $args): Response {
        return deleteUser($req, $res, $args['user_id']);
    });
});