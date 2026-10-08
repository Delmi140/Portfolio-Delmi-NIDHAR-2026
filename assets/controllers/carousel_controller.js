import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = [
        'carousel',
        'card',
        'counter',
        'modal',
        'modalTitle',
        'modalCategory',
        'modalDescription',
        'modalDetails',
        'modalTechnologies'
    ];

    connect() {
        this.currentIndex = 0;
        this.total = this.cardTargets.length;
        this.angle = 360 / this.total;
        this.radius = 420;

        this.previousFocusedElement = null;

        this.updateCarousel();

        this.handleKeydown = this.handleKeydown.bind(this);
        document.addEventListener('keydown', this.handleKeydown);
    }


    disconnect() {
        document.removeEventListener('keydown', this.handleKeydown);
    }


    next() {
        this.currentIndex++;

        if (this.currentIndex >= this.total) {
            this.currentIndex = 0;
        }

        this.updateCarousel();
    }


    previous() {
        this.currentIndex--;

        if (this.currentIndex < 0) {
            this.currentIndex = this.total - 1;
        }

        this.updateCarousel();
    }


    updateCarousel() {
        const rotation = -this.currentIndex * this.angle;

        this.carouselTarget.style.transform =
            `rotateY(${rotation}deg)`;

        this.cardTargets.forEach((card, index) => {

            const cardRotation = index * this.angle;

            card.style.transform =
                `rotateY(${cardRotation}deg) translateZ(${this.radius}px)`;
        });

        this.counterTarget.textContent =
            this.currentIndex + 1;
    }


    openModal(event) {

        event.preventDefault();
        event.stopPropagation();

        const button = event.currentTarget;

        this.modalTitleTarget.textContent =
            button.dataset.projectTitle;

        this.modalCategoryTarget.textContent =
            button.dataset.projectCategory;

        this.modalDescriptionTarget.textContent =
            button.dataset.projectDescription;

        this.modalDetailsTarget.textContent =
            button.dataset.projectDetails;


        this.modalTechnologiesTarget.innerHTML = '';

        const technologies =
            button.dataset.projectTechnologies
                .split('|');

        technologies.forEach((technology) => {

            const span = document.createElement('span');

            span.textContent = technology;

            this.modalTechnologiesTarget.appendChild(span);
        });


        this.previousFocusedElement = button;

        this.modalTarget.classList.add('is-open');

        this.modalTarget.setAttribute(
            'aria-hidden',
            'false'
        );

        document.body.classList.add('modal-open');

        this.modalTarget.querySelector(
            '.project-modal-close'
        ).focus();
    }


    closeModal(event) {

        if (event) {
            event.preventDefault();
        }

        this.modalTarget.classList.remove('is-open');

        this.modalTarget.setAttribute(
            'aria-hidden',
            'true'
        );

        document.body.classList.remove('modal-open');

        if (this.previousFocusedElement) {
            this.previousFocusedElement.focus();
        }
    }


    handleKeydown(event) {

        if (
            event.key === 'Escape' &&
            this.modalTarget.classList.contains('is-open')
        ) {
            this.closeModal();
        }
    }
}