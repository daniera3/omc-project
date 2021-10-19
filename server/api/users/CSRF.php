<?php


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class CSRF
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $body = $request->getParsedBody() ?? [];
        $data = $request->getCookieParams();
        $session_id = (string)($data['PHPSESSID'] ?? "");
        if (session_status() === PHP_SESSION_NONE) {
            session_id($session_id);
            session_start();
        }
        error_log('CSRF    '.json_encode($body['token']));
        if (isset($_SESSION['token'], $body['token']) && $body['token'] === $_SESSION['token']) {
            $request = $request->withParsedBody(['CSRF_success' => true] + $body);
            return $next($request, $response);
        }
        $request = $request->withParsedBody(["error" => "CSRF token not found", 'success' => false] + $body);
        return $next($request, $response);


    }

}