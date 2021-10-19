<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class UserMiddleware
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $data = $request->getParsedBody();
        $data['username'] = htmlentities(strip_tags((string)($data['username'] ?? "")));
        $data['password'] = htmlentities(strip_tags((string)($data['password'] ?? "")));
        $request = $request->withParsedBody($data);
        return $next($request, $response);
    }
}
