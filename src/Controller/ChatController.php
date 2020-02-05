<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Api\ApiRoute;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;


/**
 * @ApiRoute()
 * @IsGranted("ROLE_USER")
 */
class ChatController extends AbstractController
{
    /**
     * @Route("/chatbox", name="app_chatbox")
     */
    public function index()
    {
        return $this->render('chat/index.html.twig', [
            
        ]);
    }
}
