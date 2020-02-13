<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\AppUser;

class AppFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder
    ){
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new AppUser();

        $user->setUsername('basilesamel');
        $user->setEmail('basunako@gmail.com');
        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            'kitten'
        ));
        $manager->persist($user);
        $manager->flush();
    }
}
