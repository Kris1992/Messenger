<?php

namespace App\Services\FormErrorTransformer;

use Symfony\Component\Form\FormInterface;

/**
 * 
 */
class FormErrorTransformer implements FormErrorTransformerInterface
{   

    public function transformErrorsToArray(FormInterface $form): array
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->transformErrorsToArray($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }

    public function prepareErrorsToJson(FormInterface $form): array
    {   
        /* First get array with errors from form */
        $errorsArray = $this->transformErrorsToArray($form);
        $index = 0;
        /* Get only first error from each form field*/
        foreach ($errorsArray as $key => $value) 
        {   
            /* If field has error in child we must rewrite it to parent */
            if(isset($value[0])) {
                $errors[$index]['fieldName'] = $key;
                $errors[$index]['message'] = $value[0];
            } else if(isset($value['first'])) {
                $errors[$index]['fieldName'] = $key;
                $errors[$index]['message'] = $value['first'][0];
            }
            $index++;
        }
        
        return $errors;
    } 
}

       