<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Api\ApiRoute;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use App\Form\UserRegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use App\Services\UserRegistration\UserRegistrationInterface;
use App\Services\FormErrorTransformer\FormErrorTransformerInterface;
use App\Services\Checker\CheckerInterface;

/**
 * @ApiRoute()
 */
class SecurityController extends AbstractController
{
    
    /**
     * @Route("/login", name="app_login", methods={"POST"})
     */
    public function login(): void 
    {

    }

    /**
     * @Route("/logout", name="app_logout",  methods={"GET"})
     */
    public function logout(): void
    {

    }



    // API
    /**
     * @Route("/api/is_user_unique", name="api_isUserUnique")
     */
    public function isUserUniqueAction(Request $request, CheckerInterface $isUserUniqueChecker): Response
    {
        $fieldData = json_decode($request->getContent(), true);

        try {
            $isUserUnique = $isUserUniqueChecker->check($fieldData);
        } catch (\Exception $e) {
            $responseMessage = [
                'errorMessage' => $e->getMessage()
            ];
            return new JsonResponse($responseMessage, Response::HTTP_BAD_REQUEST);
        }

        if (!$isUserUnique) {
            $responseMessage = [
                'errorMessage' => 'Account with this '.$fieldData['fieldName'].' already exist!'
            ];
        
            return new JsonResponse($responseMessage, Response::HTTP_BAD_REQUEST);
        }
        
        $responseMessage = [
                'is_unique' => true
            ];

        return new JsonResponse($responseMessage, Response::HTTP_OK);
    }
    
    /**
     * @Route("/api/register", name="api_register")
     */
    public function registerAction(Request $request, EntityManagerInterface $entityManager, FormErrorTransformerInterface $formErrorTransformer, UserRegistrationInterface $userRegistration): Response
    {   
        
        $userData = json_decode($request->getContent(), true);

        //pop recaptcha key from array 
        if (array_key_exists('recaptcha', $userData)) {
            $recaptcha = $userData['recaptcha'];
            unset($userData['recaptcha']);
        }

        $form = $this->createForm(UserRegistrationFormType::class);
        $form->submit($userData);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $userModel = $form->getData();

            try {
                $user = $userRegistration->register(
                            $request,
                            $recaptcha,
                            $userModel
                        );
            } catch (\Exception $e) {
                //tymczasowo
                $errors[0]['fieldName'] = 'recaptcha';
                $errors[0]['message'] = $e->getMessage();

                return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
            }

            $entityManager->persist($user);
            $entityManager->flush();
        
            $responseMessage = [
                'message' => 'Account was created.'
            ];

            return new JsonResponse($responseMessage, Response::HTTP_OK);
        }

        $errors = $formErrorTransformer->prepareErrorsToJson($form);
        return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
    }

}
