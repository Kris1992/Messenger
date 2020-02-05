<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ContainsAlphanumericValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\ContainsAlphanumeric */
        if (!$constraint instanceof ContainsAlphanumeric) {
            throw new UnexpectedTypeException($constraint, ContainsAlphanumeric::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (!is_string($value)) {
            throw new UnexpectedValueException($value, 'string');
        }

        $hasLowerCase = '/[a-z]/';
        $hasUpperCase = '/[A-Z]/';
        $hasDigit = '/[0-9]/';


        if (
            strlen($value) < 5 ||
            !preg_match($hasLowerCase, $value) || 
            !preg_match($hasUpperCase, $value) || 
            !preg_match($hasDigit, $value)
        ) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }

        return;

    }
}
