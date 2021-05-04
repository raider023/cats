(() => {
    class RandomCat {
        constructor(selector, btnName) {
            this.selector = selector;
            this.btnName = btnName;
            this.element = document.querySelector(this.selector);

            this.renderButton();
        }

        makeBtn() {
            /**
             *
             * @type {HTMLButtonElement}
             */
            const button = document.createElement('button');
            button.type = 'button';
            button.innerText = this.btnName;
            button.addEventListener('click', () => this.getCat());

            return button;
        }

        renderButton() {
            /**
             *
             */
            this.element.append(this.makeBtn());
        }

        async getCat() {
            /**
             *
             * @type {boolean|Response}
             */
            const result = await this.fetchCat();
            const image = await this.parseImg(result);
            this.renderImage(image);
        }

        async fetchCat() {
            /**
             *
             * @type {string}
             */
            const url = 'https://cataas.com/cat';

            try {
                const response = await fetch(url);
                const { status } = response;

                if (status !== 200) {
                    console.warn(new Error('Произошла ошибка!'));
                }

                return response;
            } catch (e) {
                console.warn(e);
            }
        }

        async parseImg(response) {
            /**
             *
             * @type {string}
             */
            const base64Flag = 'data:image/jpeg;base64,';
            const buffer = await response.arrayBuffer();
            const imageStr = await this.arrayBufferToBase64(buffer);
            return `${base64Flag}${imageStr}`;
        }

        arrayBufferToBase64(buffer) {
            /**
             *
             * @type {*[]}
             */
            const bytes = [].slice.call(new Uint8Array(buffer));
            let binary = '';

            bytes.forEach((b) => binary += String.fromCharCode(b));

            return window.btoa(binary);
        };

        renderImage(image) {
            /**
             *
             * @type {HTMLImageElement}
             */
            const picture = document.createElement('img');
            picture.src = image;

            this.element.append(picture);
        }
    }

    new RandomCat('[data-app]', 'Получить');
})();