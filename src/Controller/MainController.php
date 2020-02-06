<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Api\ApiRoute;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;



/**
 * @ApiRoute()
 */
class MainController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function index()
    {   
        /* If user is not anonymous redirect to chatbox*/
        if (!$this->isGranted('ROLE_ANONYMOUS')) {
            return $this->redirectToRoute('app_chatbox');
        }

        return $this->render('main/index.html.twig');
    }
}
