<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Exception\Api\ApiBadRequestHttpException;
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
use App\Services\JsonErrorResponse\JsonErrorResponseFactory;
use App\Services\JsonErrorResponse\JsonErrorResponseTypes;

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
    public function isUserUniqueAction(Request $request, CheckerInterface $isUserUniqueChecker, JsonErrorResponseFactory $jsonErrorFactory): Response
    {
        $fieldData = json_decode($request->getContent(), true);
        
        if ($fieldData === null) {
            throw new ApiBadRequestHttpException('Invalid JSON.');
        }

        try {
            $isUserUnique = $isUserUniqueChecker->check($fieldData);
        } catch (\Exception $e) {
            return $jsonErrorFactory->createResponse(400, JsonErrorResponseTypes::TYPE_ACTION_FAILED, null, $e->getMessage());
        }

        if (!$isUserUnique) {
            return $jsonErrorFactory->createResponse(409, JsonErrorResponseTypes::TYPE_CONFLICT_ERROR, null, 'Account with this '.$fieldData['fieldName'].' already exist!');
        }

        return new JsonResponse(['is_unique' => true], Response::HTTP_OK);
    }
    
    /**
     * @Route("/api/register", name="api_register")
     */
    public function registerAction(Request $request, EntityManagerInterface $entityManager, FormErrorTransformerInterface $formErrorTransformer, UserRegistrationInterface $userRegistration, 
    JsonErrorResponseFactory $jsonErrorFactory): Response
    {   
        
        $userData = json_decode($request->getContent(), true);
        if ($userData === null) {
            throw new ApiBadRequestHttpException('Invalid JSON.');
        }

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
                throw new \Exception("Error Processing Request", 1);
                
                $user = $userRegistration->register(
                            $request,
                            $recaptcha,
                            $userModel
                        );
            } catch (\Exception $e) {
                $errors[0]['fieldName'] = 'recaptcha';
                $errors[0]['message'] = $e->getMessage();
                return $jsonErrorFactory->createResponse(
                    400, 
                    JsonErrorResponseTypes::TYPE_FORM_VALIDATION_ERROR, 
                    $errors
                );
            }

            $entityManager->persist($user);
            $entityManager->flush();
        
            $responseMessage = [
                'message' => 'Account was created.'
            ];

            return new JsonResponse($responseMessage, Response::HTTP_OK);
        }

        return $jsonErrorFactory->createResponse(
            400, 
            JsonErrorResponseTypes::TYPE_FORM_VALIDATION_ERROR, 
            $formErrorTransformer->prepareErrorsToJson($form)
        );
    }

}
