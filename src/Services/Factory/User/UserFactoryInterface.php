<?php

namespace App\Services\Factory\User;

use App\Entity\User;
use App\Model\User\UserModel;

/**
 *  Manage creating of users
 */
interface UserFactoryInterface
{   

    /**
     * create Create user 
     * @param UserModel $userModel Model with user data get from form
     * @param string $role String with role name [optional]
     * @return User
     */
    public function create(UserModel $userModel, ?string $role): User;

}
