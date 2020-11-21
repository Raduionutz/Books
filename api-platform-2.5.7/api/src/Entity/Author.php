<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\AuthorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource
 * @ORM\Entity(repositoryClass=AuthorRepository::class)
 */
class Author
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @ApiProperty(identifier=true)
     */
    private $id;

    /**
     * @var string name
     *
     * @ORM\Column
     * @Assert\NotBlank
     */
    public $name = '';

    /**
     * @ORM\ManyToMany(targetEntity="Book", mappedBy="authors")
     */
    private $secondaryBooks;

    /**
     * @var Collection
     * @ORM\OneToMany(targetEntity="Book", mappedBy="main_author")
     */
    private $books;


    public function __construct() {
        $this->secondaryBooks = new \Doctrine\Common\Collections\ArrayCollection();
        $this->books = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Book[]
     */
    public function getSecondaryBooks(): Collection
    {
        return $this->secondaryBooks;
    }

    public function addSecondaryBook(Book $secondaryBook): self
    {
        if (!$this->secondaryBooks->contains($secondaryBook)) {
            $this->secondaryBooks[] = $secondaryBook;
            $secondaryBook->addAuthor($this);
        }

        return $this;
    }

    public function removeSecondaryBook(Book $secondaryBook): self
    {
        if ($this->secondaryBooks->contains($secondaryBook)) {
            $this->secondaryBooks->removeElement($secondaryBook);
            $secondaryBook->removeAuthor($this);
        }

        return $this;
    }

    /**
     * @return Collection|Book[]
     */
    public function getBooks(): Collection
    {
        return $this->books;
    }

    public function addBook(Book $book): self
    {
        if (!$this->books->contains($book)) {
            $this->books[] = $book;
            $book->setMainAuthor($this);
        }

        return $this;
    }

    public function removeBook(Book $book): self
    {
        if ($this->books->contains($book)) {
            $this->books->removeElement($book);
            // set the owning side to null (unless already changed)
            if ($book->getMainAuthor() === $this) {
                $book->setMainAuthor(null);
            }
        }

        return $this;
    }
}
