<?php

namespace App\Services;

use Symfony\Component\Form\FormInterface;

/**
 *  Transformer errors from form
 */
interface FormErrorTransformerInterface
{   
     /**
     * transformErrorsToArray return array tree with all errors from each field and childs 
     * @param FormInterface $form Object implements FormInterface (we will get errors from him after isValid method) 
     * @return array 
     */
    public function transformErrorsToArray(FormInterface $form): array;

    /**
     * prepareErrorsToJson returns array ready to json format with first error from each field of form
     * @param FormInterface $form Object implements FormInterface 
     * @return array
     */
    public function prepareErrorsToJson(FormInterface $form): array;
}