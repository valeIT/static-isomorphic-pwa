<?php

namespace App\Security;

use App\Entity\AppUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class JWTAuthenticator extends AbstractGuardAuthenticator
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }


    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning false will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request)
    {
        return $request->headers->has('Authorization');
        // && 0 === strpos($request->headers->get('Authorization'), 'Bearer ')
    }

    /**
     * Called on every request. Return whatever credentials you want to
     * be passed to getUser() as $credentials.
     */
    public function getCredentials(Request $request)
    {
        $authorizationHeader = $request->headers->get('Authorization');
        $token = substr($authorizationHeader, 7);
        // if(){
        // } else {
        //     $token = $request->headers->get('X-AUTH-TOKEN');
        // }

        return [
            'token' => $token
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        // $apiToken = $credentials['token'];
        //
        // if (null === $apiToken) {
        //     return;
        // }
        //
        // // if a User object, checkCredentials() is called
        // return $this->em->getRepository(A0User::class)
        //     ->findOneBy(['apiToken' => $apiToken]);
        $jwt = $credentials['token'];

        $tokenParts = explode(".", $jwt);
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        // dump($tokenPayload);die;
        $jwtPayload = json_decode($tokenPayload, true)['username'];

        // dump($jwt['sub']);die;
        // $data = [ 'sub' => $jwt->sub ];
        $roles = array();
        $roles[] = 'ROLE_OAUTH_AUTHENTICATED';
        return $this->em->getRepository(AppUser::class)
            ->findOneBy(['username' => $jwtPayload]);
        // return new BouquinUser($jwtPayload, $roles);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        // check credentials - e.g. make sure the password is valid
        // no credential check is needed in this case

        // return true to cause authentication success
        return true;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        // on success, let the request continue
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_FORBIDDEN);
    }

    /**
     * Called when authentication is needed, but it's not sent
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = [
            // you might translate this message
            'message' => 'Authentication Required'
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
