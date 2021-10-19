<?php

class db
{
    private string $dbhost;
    private string $dbname;
    private string $dbuser;
    private string $dbpass;

    public function __construct()
    {
        $this->dbhost = $_ENV['DB_HOST'];
        $this->dbname = $_ENV['DB_DATABASE'];
        $this->dbuser = $_ENV['DB_USERNAME'];
        $this->dbpass = $_ENV['DB_PASSWORD'];
    }

    public function connect(): PDO
    {
        $mysql_connect_str = "mysql:host=$this->dbhost;dbname=$this->dbname;";
        $dbConnection = new PDO($mysql_connect_str, $this->dbuser, $this->dbpass);
        $dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $dbConnection->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
        $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $dbConnection;
    }
}

