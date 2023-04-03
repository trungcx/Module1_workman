// ***Window***//
window.onload = init();
function init() {
    logInCheck();
    displayItemInItemList();
}
//*** COMMON ***//
function logInCheck() {
    let whoIsLogIn = sessionStorage.getItem('whoIsLogIn');
    let logInId = sessionStorage.getItem('logInId');
    if (whoIsLogIn == 'admin') {
        alert('Have a nice day, boss!')
        return whoIsLogIn;
    }
    if (logInId) {
        document.getElementById('ti-user-icon').style.backgroundColor = 'green';
        return logInId;
    } else {
        // alert('Please Login to buy')
        document.getElementById('ti-user-icon').style.backgroundColor = '#F5F5F5';
        return false;
    }
}
// ****
function displayItemInItemList() {
    let mainContent = document.getElementById('main-content');
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let result = '';
    let displayedItemId = [];
    itemList.forEach((item, index) => {
        displayedItemId.push(item.itemId);
        result += `
            <div class="product">
            <img class="product-img infor" src="${item.imgSource}" alt="">
            <p class="product-name infor">${item.itemName}</p>
            <p class="product-rating infor">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </p>
            <p class="product-price infor">${item.price} $</p>
            <div class="product-add infor clear">
                <i class="ti-heart hover2" onclick="addItemToFavorite('${item.itemId}')"></i>
                <i class="ti-shopping-cart hover2" onclick="addItemToCart('${item.itemId}')"></i>
            </div>
            </div>
            `
    });
    mainContent.innerHTML = result;
    localStorage.setItem('displayedItemId', JSON.stringify(displayedItemId));
    //Show number of items to CART ICON
    let logInId = sessionStorage.getItem('logInId');
    if (logInId) {
        let itemsInCart = setItemsInCartToSessionStorage();
        document.getElementById('item-number').innerText = itemsInCart.length;
    }
}
function displayItemByCategory(category) {
    console.log(category);
    let mainContent = document.getElementById('main-content');
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let result = '';
    let displayedItemId = [];
    itemList.forEach((item) => {
        if (item.category == category) {
            displayedItemId.push(item.itemId);
            result += `
            <div class="product">
            <img class="product-img infor" src="${item.imgSource}" alt="">
            <p class="product-name infor">${item.itemName}</p>
            <p class="product-rating infor">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </p>
            <p class="product-price infor">${item.price} $</p>
            <div class="product-add infor clear">
                <i class="ti-heart hover2" onclick="addItemToFavorite('${item.itemId}')"></i>
                <i class="ti-shopping-cart hover2" onclick="addItemToCart('${item.itemId}')"></i>
            </div>
            </div>
            `
        }
    });
    mainContent.innerHTML = result;
    localStorage.setItem('displayedItemId', JSON.stringify(displayedItemId));

}
function addItemToCart(itemId) {
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let logInId = sessionStorage.getItem('logInId');
    let indexOfUser = getIndexOfUserInforInUserInforListById(logInId);
    if (logInId == null) {
        let message = 'Please login to buy';
        showSnackBar(message);
        setTimeout(() => {
            window.location.href = './html/login.html';
        }, 1000)
        return false;
    } else {
        let itemsInCart = userInforList[indexOfUser][1];
        if (itemsInCart == null) {
            itemsInCart = [];
        }
        if (itemsInCart.includes(itemId)) {
            return true;
        } else {
            itemsInCart.push(itemId);
            userInforList[indexOfUser][1] = itemsInCart;
            localStorage.setItem('userInforList', JSON.stringify(userInforList));
            document.getElementById('item-number').innerText = itemsInCart.length;
            setItemsInCartToSessionStorage();
        }
    }

}
function addItemToFavorite(itemId) {
    // Do it later. Optional
}
function sortItem(sortBy) {
    let mainContent = document.getElementById('main-content');
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let displayedItemId = JSON.parse(localStorage.getItem('displayedItemId'));
    let result = '';

    let displayedItemList = displayedItemId.map((id, index) => {
        return getItemObjectInItemListById(id);
    });
    switch (sortBy) {
        case 'lowToHigh':
            displayedItemList.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        case 'highToLow':
            displayedItemList.sort((a, b) => {
                return b.price - a.price;
            });
            break;
        case 'avgReview':
            // price.sort(avgReview); DO LATER
            break;
        default:
            break;
    }
    displayedItemList.forEach((item) => {
        // if (item.category == category) {
        // displayedItemId.push(item.itemId);
        result += `
            <div class="product">
            <img class="product-img infor" src="${item.imgSource}" alt="">
            <p class="product-name infor">${item.itemName}</p>
            <p class="product-rating infor">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </p>
            <p class="product-price infor">${item.price} $</p>
            <div class="product-add infor clear">
                <i class="ti-heart hover2" onclick="addItemToFavorite('${item.itemId}')"></i>
                <i class="ti-shopping-cart hover2" onclick="addItemToCart('${item.itemId}')"></i>
            </div>
            </div>
            `
        // }
    });
    mainContent.innerHTML = result;


}
//Session Storage
function setItemsInCartToSessionStorage() {
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let logInId = sessionStorage.getItem('logInId');
    let indexOfUser = getIndexOfUserInforInUserInforListById(logInId);
    let itemsInCart = userInforList[indexOfUser][1];
    if (itemsInCart == null) {
        itemsInCart = [];
    }
    sessionStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
    return itemsInCart;
}
//
function testme() {
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    userInforList[0].splice(1, 1);
    localStorage.setItem('userInforList', JSON.stringify(userInforList));

}