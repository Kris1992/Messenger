<?php
namespace App\Api;

use Symfony\Component\Routing\Annotation\Route;

/**
 * @Annotation
 */
class ApiRoute extends Route
{
    public function getDefaults()
    {
        return array_merge(
            ['is_api' => true],
            parent::getDefaults()
        );
    }
}