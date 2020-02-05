<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class LoginFormAuthenticator extends AbstractGuardAuthenticator
{

    private $userRepository;
    private $passwordEncoder;
    private $em;
    private $router;

    public  function __construct(
        UserRepository $userRepository,
        RouterInterface $router,
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManagerInterface $em
    )
    {
        $this->userRepository = $userRepository;
        $this->router = $router;
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
    }

    public function supports(Request $request)
    {
        //handle ajax request here
        return $request->attributes->get('_route') === 'app_login' && $request->isMethod('POST');
    }

    public function getCredentials(Request $request)
    {
        $credentials = json_decode($request->getContent(), true);

        return $credentials;
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $this->userRepository->findOneBy(['email' => $credentials['email']]);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        $isPasswordValid = $this->passwordEncoder->isPasswordValid($user, $credentials['plainPassword']);
        
        return $isPasswordValid;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $data = [
            'errorMessage' => strtr($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_BAD_REQUEST);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return new JsonResponse(['url' => $this->router->generate('app_chatbox')]);
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new RedirectResponse($this->router->generate('app_homepage'));
    }

    public function supportsRememberMe()
    {
        // todo
    }
}
