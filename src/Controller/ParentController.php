<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ParentController extends AbstractController
{
    public function renderStatic($filename){
        $root = __DIR__ . '/../../static/';
        $path = $root . $filename;
        if(!file_exists($path)){
            throw new Exception('Static file ' . $filename . ' not found.');
        }
        return new BinaryFileResponse($path);
    }
}
