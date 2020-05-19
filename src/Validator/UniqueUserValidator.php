<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\UserRepository;

class UniqueUserValidator extends ConstraintValidator
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\UniqueUser */
        if (!$constraint instanceof UniqueUser) {
            throw new UnexpectedTypeException($constraint, UniqueUser::class);
        }

        if (null === $value || '' === $value) {
            return;
        }


        $existingEmail = $this->userRepository->findOneBy([
            'email' => $value->getEmail()
        ]);

        if($existingEmail && $existingEmail->getId() != $value->getId()) {
            $this->context->buildViolation($constraint->message)
            ->atPath('email')
            ->setParameter('{{ fieldName }}', 'email')
            ->addViolation();  
        }

        $existingLogin = $this->userRepository->findOneBy([
            'login' => $value->getLogin()
        ]);

        if($existingLogin && $existingLogin->getId() != $value->getId()) {
            $this->context->buildViolation($constraint->message)
            ->atPath('login')
            ->setParameter('{{ fieldName }}', 'login')
            ->addViolation();  
        }

        return;
    }
}
