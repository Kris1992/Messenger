<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 * @Target({"CLASS", "ANNOTATION"})
 */
class UniqueUser extends Constraint
{
    public $fields = [];
    
    public function getRequiredOptions()
    {
        return ['fields'];
    }

    public function getDefaultOption()
    {
        return 'fields';
    }

    /**
    * {@inheritdoc}
    */
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'User with this {{ fieldName }} already exist.';
}
