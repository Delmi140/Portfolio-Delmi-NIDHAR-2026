import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = [
        'carousel',
        'card',
        'counter'
    ];

    connect() {

        this.currentIndex = 0;

        this.total = this.cardTargets.length;

        /*
         * Angle entre chaque carte.
         *
         * 6 cartes = 360 / 6 = 60 degrés
         */
        this.angle = 360 / this.total;

        /*
         * Distance entre le centre et les cartes.
         */
        this.radius = 420;

        this.updateCarousel();

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

        /*
         * Rotation du cylindre.
         *
         * Chaque clic fait tourner le carousel
         * de 60 degrés.
         */
        const rotation =
            -this.currentIndex * this.angle;

        this.carouselTarget.style.transform =
            `rotateY(${rotation}deg)`;


        /*
         * Positionnement des cartes autour
         * du cylindre 3D.
         */
        this.cardTargets.forEach((card, index) => {

            const cardRotation =
                index * this.angle;

            card.style.transform =
                `rotateY(${cardRotation}deg)
                 translateZ(${this.radius}px)`;

        });


        /*
         * Numéro du projet affiché.
         */
        this.counterTarget.textContent =
            this.currentIndex + 1;

    }

}