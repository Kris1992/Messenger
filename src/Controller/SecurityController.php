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
use App\Form\Model\UserRegistrationFormModel;
use Doctrine\ORM\EntityManagerInterface;


use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Services\FormErrorTransformerInterface;


use ReCaptcha\ReCaptcha;

/**
 * @ApiRoute()
 */
class SecurityController extends AbstractController
{
    
    /**
     * @Route("/login", name="app_login", methods={"POST"})
     */
    public function login()
    {

    }

    /**
     * @Route("/logout", name="app_logout",  methods={"GET"})
     */
    public function logout()
    {

    }



    // API
    /**
     * @Route("/api/is_user_unique", name="api_isUserUnique")
     */
    public function isUserUnique(Request $request, UserRepository $userRepository)
    {
        $fields = array('email', 'login');
        $fieldData = json_decode($request->getContent(), true);

        //Security
        if(!in_array($fieldData['fieldName'], $fields)) {   
            $responseMessage = [
                'errorMessage' => 'You cannot ask about that data!'
            ];

            return new JsonResponse($responseMessage, Response::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->findOneBy([ $fieldData['fieldName'] => $fieldData['fieldValue'] ]);

        if(!$user) {
            $responseMessage = [
                'is_unique' => true
            ];

            return new JsonResponse($responseMessage, Response::HTTP_OK);
        }

        $responseMessage = [
            'errorMessage' => 'Account with this '.$fieldData['fieldName'].' already exist!'
        ];
        
        return new JsonResponse($responseMessage, Response::HTTP_BAD_REQUEST);
        
    }
    
    /**
     * @Route("/api/register", name="api_register")
     */
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordEncoderInterface $passwordEncoder, FormErrorTransformerInterface $formErrorTransformer, string $secret_key
    ) {   
        
        $userData = json_decode($request->getContent(), true);

        //pop recaptcha key from array 
        if (array_key_exists('recaptcha', $userData)) {
            $recaptcha = $userData['recaptcha'];
            unset($userData['recaptcha']);
        }

        $form = $this->createForm(UserRegistrationFormType::class);
        $form->submit($userData);
        
        if ($form->isSubmitted() && $form->isValid()) {
            
            $isHuman = $this->isCatchpaValid($request, $recaptcha, $secret_key);
            
            if ($isHuman->isSuccess()) {
                /*@var UserRegistrationFormModel*/
                $userModel = new UserRegistrationFormModel();
                $userModel = $form->getData();

                $user = new User();
                $user->setEmail($userModel->getEmail());
                $user->setLogin($userModel->getLogin());
                $user->setRoles(['ROLE_USER']);
                $user->setPassword($passwordEncoder->encodePassword(
                    $user,
                    $userModel->getPlainPassword()
                ));

                if (true === $userModel->getAgreeTerms()) {
                    $user->agreeToTerms();
                }
            
                $entityManager->persist($user);
                $entityManager->flush();

                $responseMessage = [
                    'message' => 'Account was created.'
                ];

                return new JsonResponse($responseMessage, Response::HTTP_OK);
            }
            else {
                $errors[0]['fieldName'] = 'recaptcha';
                $errors[0]['message'] = 'ReCAPTCHA fails.';

                return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
            }

        }

        $errors = $formErrorTransformer->prepareErrorsToJson($form);

        return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    private function isCatchpaValid(Request $request, string $captchaValue, string $secret_key)
    {
        $recaptcha = new ReCaptcha($secret_key);
        return $isHuman = $recaptcha->setExpectedHostname($request->getHost())
                ->verify($captchaValue, $request->getClientIp());
    }

}
