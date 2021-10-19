<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class isAdmin
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $body = $request->getParsedBody()??[];
        $data = $request->getCookieParams();
        $session_id = (string)($data['PHPSESSID'] ?? "");
        if (session_status() === PHP_SESSION_NONE) {
            session_id($session_id);
            session_start();
        }
        if (isset($_SESSION['role']) && ($_SESSION['role'] === 'admin' || $_SESSION['role'] === 'Sadmin')) {
            $request = $request->withParsedBody(['success' => true]+$body);
            return $next($request, $response);
        }
        $request = $request->withParsedBody(["error" => "user details not found", 'success' => false]+$body);
        return $next($request, $response);


    }

}