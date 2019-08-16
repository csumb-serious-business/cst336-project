let cart;
$(document).ready(() => {
    // init shopping cart
    cart = new ShoppingCart();

    $('#sc-show-link').on('click', () => $('#sc-modal').modal('show'));

    // todo wire purchase items -> checkout -> clear items

    // add to cart from mi modal
    $('#sc-add').on('click', () => {
        // todo (won't) getting text is a hack, should use a hidden id field & AJAX call
        // gather values into a cart item
        let item = new CartItem(
            $('#mi-title').text(),
            $('#mi-artist').text(),
            $('#mi-price').text(),
            $('#mi-image').attr('src')
        );


        cart.addItem(item);

        $('#sc-modal').modal('show');
    });

    // todo wire remove from cart
});

// todo (won't) move cart to server-side
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(item) {
        console.log(`added cart item: ${JSON.stringify(item)}`);
        if (!this.items.includes(item)) {
            this.total += item.price;
            this.items.push(item);
        }
    };

    removeItem(item) {
        if (this.items.includes(item)) {
            this.total -= item.price;
            this.items.remove(item);
        }
    }

    clearItems() {
        this.items = []
    }

    totalAsString() {
        return this.total
            .toFixed(2) // 2 decimals
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
        // add $ & , every third digit preceding the decimal
    }
}

class CartItem {
    constructor(title, artist, price, imgURL) {
        this.title = title;
        this.artist = artist;
        this.price = this.parsePrice(price);
        this.priceStr = price;
        this.imgURL = imgURL;
    }

    parsePrice(priceString) {
        // replace all non-digit chars from string
        let price = priceString.replace(/\D/g, '');
        console.log(`price: ${price}`);
        if (price.length === 0) {
            return 0;
        } else {
            return parseInt(price)
        }
    }

}
