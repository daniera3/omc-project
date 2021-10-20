<?php
require 'favorites.php';
require_once 'AuthMiddleware.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


$app->group('/favorites', function () {
    $this->get('/getAllPerUser', function (Request $req, Response $res): Response {
        return getFavorite($req, $res);
    });
    $this->put('/', function (Request $req, Response $res): Response {
        return updateFavorite($req, $res);
    });

})->add(new AuthMiddleware());