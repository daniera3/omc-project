<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class AuthMiddleware
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $parsedBody = $request->getParsedBody();
        $cookie = $request->getCookieParams();
        // data['id'] = user id from session
        $session_id = (string)($cookie['PHPSESSID'] ?? "");
        if (session_status() === PHP_SESSION_NONE) {
            session_id($session_id);
            session_start();
        }
        if (isset($_SESSION['id'])) {
            $parsedBody["id_login"] = $_SESSION['id'];
            $parsedBody["role_login"] = $_SESSION['role'];
            $request = $request->withParsedBody($parsedBody);
            return $next($request, $response);
        }
        return $response->withJson(['error' => 'Unauthorized'], 401);
    }
}


