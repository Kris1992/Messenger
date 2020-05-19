<?php

namespace App\Services\Checker;

/**
 *  Checker interface
 */
interface CheckerInterface
{   

    /**
     * check Check is data is valid
     * @param  mixed $data Data to check
     * @return bool
     */
    public function check($data): bool;

}
