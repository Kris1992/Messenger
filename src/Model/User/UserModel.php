<?php

namespace App\Model\User;

use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\UniqueUser;
use App\Validator\ContainsAlphanumeric;


/**
* @UniqueUser(
*     fields={"email", "login"}
*)
*/
class UserModel
{
    private $id;

    /**
     * @Assert\NotBlank(message="Please enter an email.")
     * @Assert\Email()
     */
    private $email;

    /**
     * @Assert\NotBlank(message="Please enter login.")
     */
    private $login;

     /**
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Your name cannot contain a number."
     * )
     */
    private $firstName;

    /**
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Your second name cannot contain a number."
     * )
     */
    private $secondName;

    /**
     * @Assert\NotBlank(message="Choose a password!", groups={"registration"})
     * @ContainsAlphanumeric()
     */
    private $plainPassword;

    private $role;

    /**
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Please enter gender not number."
     * )
     * @Assert\Length(
     *      min = 4,
     *      max = 10,
     *      minMessage = "Your gender must be at least {{ limit }} characters long",
     *      maxMessage = "Your gender cannot be longer than {{ limit }} characters"
     * )
     */
    private $gender;

    /**
     * @Assert\IsTrue(message="You must agree to our terms.")
     */
    private $agreeTerms;



    //additional options


    private $birthdate;



    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
    
    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): self
    {
        $this->login = $login;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function getSecondName(): ?string
    {
        return $this->secondName;
    }

    public function setSecondName(string $secondName): self
    {
        $this->secondName = $secondName;

        return $this;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    //additional options
    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getAgreeTerms(): ?bool
    {
        return $this->agreeTerms;
    }
    
    public function setAgreeTerms(bool $agreeTerms): self
    {
        $this->agreeTerms = $agreeTerms;

        return $this;
    }
}