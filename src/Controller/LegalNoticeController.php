<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LegalNoticeController extends AbstractController
{
    #[Route('/mentions-legales', name: 'legal_notice_page')]
    public function index(): Response
    {
        return $this->render('legal_notice/index.html.twig');
    }
}
