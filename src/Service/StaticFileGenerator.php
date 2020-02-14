<?php
namespace App\Service;

use Twig\Environment as TemplatingService;

class StaticFileGenerator {

    private $templating;
    private $version;
    private $folder;

    public function __construct(
        TemplatingService $templating
    ){
        $this->templating = $templating;
        $this->version = time();
        $this->folder = __DIR__ . '/../../static/';
    }

    public function render($template_filename, $filename, $args = []){
        $args['version'] = $this->version;
        
        file_put_contents(
            $this->folder . $filename,
            $this->templating->render(
                $template_filename,
                $args
            )
        );

        return $filename;
    }

}

// how to generate a random filename:
//
// $original_filename = pathinfo($template_filename, PATHINFO_FILENAME);
// $safe_filename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $original_filename);
// $extension = pathinfo($original_filename, PATHINFO_EXTENSION);
// $filename = $safe_filename.'-'.uniqid().'.'.$extension;
