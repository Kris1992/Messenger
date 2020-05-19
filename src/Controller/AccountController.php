<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Api\ApiRoute;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Entity\User;


/**
 * @ApiRoute()
 * @IsGranted("ROLE_USER")
 */
class AccountController extends AbstractController
{
    /**
     * @Route("/account", name="account")
     */
    public function index()
    {
        return $this->render('account/index.html.twig', [
            'controller_name' => 'AccountController',
        ]);
    }



    // API
    /**
     * @Route("/api/get_logged_user", name="api_getLoggedUser")
     */
    public function getLoggedUserAction(): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        
        $userData = [
            'login' => $user->getLogin(),
            'roles' => $user->getRoles()
        ];

        return new JsonResponse($userData, Response::HTTP_OK);
    }
}
