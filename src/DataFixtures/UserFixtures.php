<?php

namespace App\DataFixtures;

//use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;

//use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends BaseFixture
{
    /*private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder) {
        $this->passwordEncoder = $passwordEncoder;
    }*/

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10, 'main_users', function($i) {
            $user = new User();
            $user->setEmail(sprintf('user%d@messenger.com', $i)); 
            $user->setFirstName($this->faker->firstName);
            $user->setSecondName($this->faker->lastName);
            $user->setRoles(['ROLE_USER']);
            $user->setPassword('admin01');
            $user->setBirthdate($this->faker->dateTime);
            $user->setGender($this->faker->randomElement($array = array ('male','female')));
            $user->agreeToTerms(); 
            return $user;

            /*$user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'krakowdev01'
            ));*/
        });

        //Admins
        $this->createMany(3, 'admin_users', function($i) {
            $user = new User();
            $user->setEmail(sprintf('admin%d@messenger.com', $i));
            $user->setFirstName($this->faker->firstName);
            $user->setSecondName($this->faker->lastName);
            $user->setRoles(['ROLE_ADMIN']);
            /*$user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'admin01'
            ));*/
            $user->setPassword('admin01');
            $user->setBirthdate($this->faker->dateTime);
            $user->setGender($this->faker->randomElement($array = array ('male','female')));
            $user->agreeToTerms();
            
            return $user;
        });

        $manager->flush();
    }
}