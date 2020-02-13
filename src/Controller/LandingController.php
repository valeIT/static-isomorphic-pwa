<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

/**
 * @Route("/")
 */
class LandingController extends AbstractController
{
    /**
     * @Route("/", name="landing_page", methods={"GET"})
     */
    public function landing_page(
        Request $request
    ): Response
    {
        try{
            return $this->render('landing.html.twig');
        } catch(\Exception $e){
            return new Response($e->getMessage(), 500);
        }
    }
    /**
     * @Route("/static", name="static_page", methods={"GET"})
     */
    public function static_page(
        Request $request
    ): Response
    {
        try{
            return new BinaryFileResponse(__DIR__ . '/../../templates/static.html');
        } catch(\Exception $e){
            return new Response($e->getMessage(), 500);
        }
    }
    /**
     * @Route("/test", name="api_test", methods={"GET"})
     */
    public function api_test(
        Request $request,
        JWTTokenManagerInterface $JWTManager
    ): Response
    {
        try{
            $user = $this->getUser();
            return new JsonResponse(array('ok' => true, 'token' => $JWTManager->create($user)), 200);
        } catch(\Exception $e){
            return new JsonResponse(array('ok' => false, 'error' => $e->getMessage()), 500);
        }
    }
}
