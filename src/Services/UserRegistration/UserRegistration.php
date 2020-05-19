<?php

namespace App\Services\UserRegistration;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use App\Model\User\UserModel;
use ReCaptcha\ReCaptcha;
use App\Services\Factory\User\UserFactoryInterface;

class UserRegistration implements UserRegistrationInterface
{

    private $userFactory;
    private $secret_key;

    /**
     * UserRegistration Constructor
     * 
     * @param UserFactoryInterface $userFactory
     * @param string $secret_key
     */
    public function __construct(UserFactoryInterface $userFactory, string $secret_key) 
    {
        $this->userFactory = $userFactory;
        $this->secret_key = $secret_key;
    }

    public function register(Request $request, string $captchaValue, UserModel $userModel): User
    {
        if ($_ENV['APP_ENV'] !== 'test') { // In test env do not run captcha validation
            $isHuman = $this->checkCatchpa($request, $captchaValue);

            if (!$isHuman->isSuccess()) {
                throw new \Exception('ReCAPTCHA fails!');
            }
        }

        $user = $this->userFactory->create($userModel, null);
        return $user;
    }

    private function checkCatchpa(Request $request, string $captchaValue)
    {
        $recaptcha = new ReCaptcha($this->secret_key);
        return $isHuman = $recaptcha->setExpectedHostname($request->getHost())
                ->verify($captchaValue, $request->getClientIp());
    }
}
