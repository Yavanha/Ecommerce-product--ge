const body = document.querySelector('body');

// quantity

let quantity = 0;
const removeBtn = document.querySelector('.remove-btn');

const container = document.querySelector('.quantity-container');
const quantityHTML = container.querySelector('.quantity');

//carousel

const images = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
]

let currentImage = 0;

//add to cart
const addToCartBtn = document.querySelector('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const cartDetails = document.querySelector('.cart-details');

//  open cart
const cartContainer = document.querySelector('.cart-container');
let isOpenCart = false;

// open menu
const navBar = document.querySelector('.nav-bar');
let isOpenMenu = false;

// open modal

let isOpenModal = false;
const overlay = document.querySelector('.overlay');

//Function

// add or remove component

const changeQuantity = (val) => {



    quantity += val;
    quantityHTML.innerText = quantity;

}

const add = (event) => {

    changeQuantity(1);
    removeBtn.disabled = false;
    addToCartBtn.disabled = false;
    event.stopPropagation();
}

const remove = (event) => {
    changeQuantity(-1)
    if (quantity === 0) {
        addToCartBtn.disabled = true;
        removeBtn.disabled = true;

    }
    event.stopPropagation();
}


// carousel component

//desktop

const resetThumbnailState = () => {
    const actives = document.querySelectorAll(".active-thumbnail")
    for (let i = 0; i < actives.length; i++) {
        actives[i].classList.remove('active-thumbnail');
    }
}

const setNewThumbnailState = (img) => {
    if (img) {

        const src = img.getAttribute('src').split('/')[1];
        const i = Number(src.match(/\d+/)[0]) - 1
        img.classList.add('active-thumbnail');
        currentImage = i;
    }
}
const switchImg = (event) => {
    const imagesHTML = document.querySelectorAll('.carousel-img');
    const thumbnail = event.target;
    resetThumbnailState()
    setNewThumbnailState(thumbnail);
    if(thumbnail.classList.contains('overlay')) {
        const productThumnail = document.querySelectorAll('.product-container .carousel-thumbnail')[currentImage];
        setNewThumbnailState(productThumnail);
    }
  

    for (let i = 0; i < imagesHTML.length; i++) {
        imagesHTML[i].src = images[currentImage];
    }
}




//mobile
const changeImage = (val) => {
    const imagesHTML = document.querySelectorAll('.carousel-img');
    currentImage = (currentImage + val) % images.length;
    const thumbnail = document.querySelectorAll('.product-container .carousel-thumbnail')[currentImage];
    const overlayThumbnail = document.querySelectorAll('.overlay-active .carousel-thumbnail')[currentImage];
    resetThumbnailState()
    setNewThumbnailState(thumbnail);
    setNewThumbnailState(overlayThumbnail);

    for (let i = 0; i < imagesHTML.length; i++) {
        imagesHTML[i].src = images[currentImage];
    }

}


const prevImg = (event) => {
    if (currentImage === 0) {
        currentImage = images.length;
    }
    changeImage(-1);

    event.stopPropagation()

}
const nextImg = (event) => {
    console.log("next")
    changeImage(1);
    event.stopPropagation()
}


// addToCart 

const setCartDetails = () => {
    let view;
    if (quantity > 0) {
        view = `              
        <article class="cart-product flex center-items   col-gap--2 ">
            <img class="cart-thumbnail" src="images/image-product-1-thumbnail.jpg"
            alt="thumbnail of pair of shoes" />
            <div class="cart-text txt--d-grayish-blue">
            <p>Autumn Limited Edition...</p>
            <p class="cart-total">$125.00 x ${quantity} <strong class="txt--black">$${quantity * 125}.00</strong></p>
            </div>
            <button onclick="deleteItems(event)" class="delete-btn flex end-content">
            <img src="images/icon-delete.svg" alt="delete icon" />
            </button>
        </article> 
        <button class="bg--orange pa--2 txt--white radius--1">Checkout</button>
  `
    } else {
        view = `
                <p class="empty-cart txt--center txt--d-grayish-blue font-weight-700 ">Your cart is empty.</p>
        `
    }

    cartDetails.innerHTML = view;
}

const addToCart = (event) => {
    cartItems.innerText = quantity;
    cartItems.style.display = 'block';
    setCartDetails();

    changeQuantity(-quantity);
    addToCartBtn.disabled = true;
    removeBtn.disabled = true;
    event.stopPropagation()
}


const openCart = (event) => {
    if (!isOpenCart) {
        cartContainer.setAttribute('class', 'cart-container bg--white radius--1 cart-open');
        body.style.overflow = 'clip';
    }
    else {
        cartContainer.setAttribute('class', 'cart-container bg--white radius--1 cart-close');
        body.style.overflow = 'visible';


    }

    isOpenCart = !isOpenCart;
    event.stopPropagation();
}

//delete

const deleteItems = (event) => {
    cartItems.innerText = 0;
    cartItems.style.display = "";
    setCartDetails();
    event.stopPropagation();
}


// open menu

const openMenu = (event) => {
    if (!isOpenMenu) {
        navBar.setAttribute('class', 'nav-bar nav-open');
        overlay.classList.add('overlay-active');
    } else {
        overlay.classList.remove('overlay-active');

        navBar.setAttribute('class', 'nav-bar nav-close');
    }
    isOpenMenu = !isOpenMenu;
    event.stopPropagation();
}

// setWindow

const seWindowEventListener = () => {
    window.addEventListener('click', (event) => {
        if (isOpenCart) {
            openCart(event)
        }
    })
}


//open modal

const openModal = (event) => {
    if (!isOpenModal) {
        overlay.classList.add('overlay-active');
        overlay.innerHTML = `
        
                            <div class="product-carousel">
                            <!-- Place here for the position relative of the container -->
                            <div class="close-modal">
                                 <button onclick="openModal(event)"><img src="images/icon-close.svg" alt="close icon" /></button>
                            </div>
                            <button class="btn--circle btn-prev bg--white  flex center-items center-content" onclick="prevImg(event)">
                            <img src="images/icon-previous.svg" alt="previous icon" />
                            </button>
    
                            <img class="carousel-img" src="${images[currentImage]}"
                            alt="Image of brown and white shoes in orange background" loading="lazy" />
                            <div class="carousel-thumbnails flex col-gap--1">
                            <button class="radius--1" onclick="switchImg(event)">
                                <img class="overlay carousel-thumbnail radius--1 ${currentImage === 0 ? "active-thumbnail" : ""}" src="images/image-product-1-thumbnail.jpg"
                                alt="Image of brown and white shoes in orange background" loading="lazy" />
                            </button>
                            <button class="radius--1" onclick="switchImg(event)">
                                <img class="overlay carousel-thumbnail  radius--1 ${currentImage === 1 ? "active-thumbnail" : ""}" src="images/image-product-2-thumbnail.jpg"
                                alt="Image of brown and white shoes in orange background" loading="lazy" />
                            </button>
    
                            <button class="radius--1" onclick="switchImg(event)">
                                <img class="overlay carousel-thumbnail radius--1 ${currentImage === 2 ? "active-thumbnail" : ""}" src="images/image-product-3-thumbnail.jpg"
                                alt="Image of brown and white shoes in orange background" loading="lazy" />
                            </button>
                            <button class="radius--1" onclick="switchImg(event)">
                                <img class="overlay carousel-thumbnail radius--1 ${currentImage === 3 ? "active-thumbnail" : ""}" src="images/image-product-4-thumbnail.jpg"
                                alt="Image of brown and white shoes in orange background" loading="lazy" />
                            </button>
    
                            </div>
                            <button onclick="nextImg(event)" class="btn--circle btn-next bg--white flex  center-items center-content ">
                            <img src="images/icon-next.svg" alt="next icon" />
                            </button>
                        </div>
        `;

    } else {
        overlay.classList.remove('overlay-active');
        overlay.innerHTML = '';
    }
    isOpenModal = !isOpenModal;

    event.stopPropagation();
}
seWindowEventListener()
