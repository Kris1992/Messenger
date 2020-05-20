<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends BaseFixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder) {
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10, 'main_users', function($i) {
            $user = new User();
            $user
                ->setEmail(sprintf('user%d@messenger.com', $i))
                ->setLogin(sprintf('user%d', $i))
                ->setFirstName($this->faker->firstName)
                ->setSecondName($this->faker->lastName)
                ->setRoles(['ROLE_USER'])
                ->setLastActivity(new \DateTime())
                ->setBirthdate($this->faker->dateTime)
                ->setGender($this->faker->randomElement($array = array ('male','female')))
                ->agreeToTerms()
                ;

            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'Admin01'
            ));
            
            return $user;
        });

        //Admins
        $this->createMany(3, 'admin_users', function($i) {
            $user = new User();
            $user
                ->setEmail(sprintf('admin%d@messenger.com', $i))
                ->setLogin(sprintf('admin%d', $i))
                ->setFirstName($this->faker->firstName)
                ->setSecondName($this->faker->lastName)
                ->setRoles(['ROLE_ADMIN'])
                ->setLastActivity(new \DateTime())
                ->setBirthdate($this->faker->dateTime)
                ->setGender($this->faker->randomElement($array = array ('male','female')))
                ->agreeToTerms()
                ;

            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'Admin01'
            ));

            
            return $user;
        });

        $manager->flush();
    }
}