<?php

namespace App\Services\Factory\User;

use App\Entity\User;
use App\Model\User\UserModel;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFactory implements UserFactoryInterface 
{
    private $passwordEncoder;

    /**
     * UserFactory Constructor
     * 
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)  
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    
    public function create(UserModel $userModel, ?string $role): User
    {
        if (!$role) {
            $role = 'ROLE_USER';
        }

        $user = new User();
        $user
            ->setEmail($userModel->getEmail())
            ->setLogin($userModel->getLogin())
            ->setRoles([$role])
            ;
        
        $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                $userModel->getPlainPassword()
            ));

        if (true === $userModel->getAgreeTerms()) {
            $user->agreeToTerms();
        } else {
            throw new \Exception("Agree the terms.");
        }

        return $user;
    }
}
