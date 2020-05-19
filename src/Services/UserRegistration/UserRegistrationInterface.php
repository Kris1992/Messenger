<?php

namespace App\Services\UserRegistration;

use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Model\User\UserModel;

/**
 *  Realize user registration proccess
 */
interface UserRegistrationInterface
{   
    /**
     * register Realize process registration and return user
     * @param  Request   $request       Request object
     * @param  string   $captchaValue   Value of captcha
     * @param  UserModel $userModel     User model from form
     * @return User
     */
    public function register(Request $request, string $captchaValue, UserModel $userModel): User;
}
