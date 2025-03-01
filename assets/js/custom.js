(function () {
    setTimeout(() => {
        loadPageContent("homepage")
    }, 500);
})();

function loadPageContent(page) {
    if (page === "homepage") {
        insertSearchBar();
        insertTabContainer();
        insertPromotionsContainer();
        insertOrderHistoryProducts();
        insertFavouriteProducts();
        insertFilterBar();
        insertProducts(config.products);
        insertInnerProducts(config.products);
    }


    $('#search_input').on("input", function () {
        processChange(this);
    });

    $('.close__icon__box').click(function () {
        emptySearch(this);
    });

    $('.product-bottom-details').click(function () {
        addProducts(this)
    });

    $('.counter__minus').click(function () {
        updateCounter(this, "minus");
    });

    $('.counter__plus').click(function () {
        updateCounter(this, "add");
    });

    $('.item-drop').click(function () {
        updateDropDownMenu(this);
    });
}

function insertSearchBar() {
    document.getElementById("search_input").placeholder = config.search.placeholder;
}

function insertTabContainer() {
    $("#tab_container").prepend(`<p class="title">${config.tabs_section.tabs_title}</p>`)
    config.tabs_section.tabs.map((val, tabNum) => {
        let classname = val.active ? "'grid__item active'" : "'grid__item'";
        $("#griddy").append(`
            <div id=${"tab_grid_item" + tabNum} class=${classname} onclick="switchTabs(${tabNum})">
                <div class="icon__wrapper">
                    <img class="icon" src=${val.tab_icon} alt="Promotions & Products" />
                </div>
                <div class="detail">${val.tab_description}</div>
            </div>
        `)
    });
}

function removeTabContainer(id) {
    document.getElementById(id).remove();
}

function insertPromotionsContainer() {
    $("#promotions_container").prepend(`<p class="products__title">${config.promotions.promotions_title}</p>`)
    config.promotions.products.map((promotion) => {
        let isdisabled = promotion.quantity_available ? false : true;
        let btnName = isdisabled ? "Out of stock" : "ADD";
        $("#promotions_products_container").append(`
            <div class="product-card">
                <div class="product-tumb">
                    <div class="icon"></div>
                    <img class="img__wrapper" src=${promotion.icon} alt="">
                </div>
                <div class="product__details">
                    <div class="product__text__wrapper">
                        <p class="product__name">${promotion.name}</p>
                        <p class="product__quantity">${promotion.description}</p>
                        <p class="product__price">$${promotion.price}</p>
                    </div>
                    <div isdisabled=${isdisabled} class="product-bottom-details" id="promotions-add-${promotion.sku}" product="${encodeURIComponent(JSON.stringify(promotion))}">
                        <div class="btn" isdisabled=${isdisabled}>${btnName}</div>
                    </div>
                    <div class="counter__wrapper hide" id="promotions-counter-${promotion.sku}">
                        <div class="counter__container">
                            <div class="counter__box__container">
                                <div class="counter__minus" id="minus" product="${encodeURIComponent(JSON.stringify(promotion))}">
                                    <img src="/assets/images/png/minus.png" />
                                </div>
                            </div>
                        
                            <input id="counter_input_${promotion.sku}" class="counter__input home" type="text" value="1" size="1" maxlength="2" autocomplete="off" />
                            <div class="counter__box__container">
                                <div class="counter__plus" id="plus" product="${encodeURIComponent(JSON.stringify(promotion))}">
                                    <img src="/assets/images/png/plus.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    });
}

function insertOrderHistoryProducts() {
    $("#orderhistory_container").prepend(`<p class="products__title">${config.recent_order.title}</p>`)
    config.recent_order.products.map((product) => {
        $("#orderhistory_container__inner").append(`
            
            <div class="order__history__wrapper">
                <div class="history__details">
                    <div class="date">${product.order_date}</div>
                    <div class="price">$${product.order_amount}</div>
                </div>
                <div class="order__section">
                    <div class="details__section">
                        <div class="name">${product.name}</div>
                        <div class="units">SKU:&nbsp;${product.unit}</div>
                        <div class="discount__detail">${product.discount_detail}</div>
                        <div class="discount__detail__bar"><div class="description">${product.discount_description}</div><span>read more</span></div>
                    </div>
                    <div class="product__counter">
                        <div class="icon__wrapper">
                            <img src="/assets/images/png/product.png" />
                        </div>
                        <div class="repeat orderhistory" id="product-bottom-details" product="${encodeURIComponent(JSON.stringify(product))}">
                            <div class="btn">REPEAT</div>
                        </div>
                        <div class="counter__wrapper orderhistory hide" id="product-bottom-details-repeat" product="${encodeURIComponent(JSON.stringify(product))}">
                            <div class="btn">
                                ADDED 
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24px" height="24px">
                                        <g id="surface84587172">
                                        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 4.707031 3.292969 L 3.292969 4.707031 L 10.585938 12 L 3.292969 19.292969 L 4.707031 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.707031 L 19.292969 3.292969 L 12 10.585938 Z M 4.707031 3.292969 "/>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    });

    $(".counter__wrapper.orderhistory").click(function () {
        updateProductsBasedOnProducts(this, "minus");
    });
    $(".repeat.orderhistory").click(function () {
        updateProductsBasedOnProducts(this, "add");
    });
}

function insertFavouriteProducts() {
    config.favourites.items.map((item) => {
        let isdisabled = item.quantity_available ? false : true;
        let btnName = isdisabled ? "Out of stock" : "ADD";
        $("#favourites__container").append(`
            <div class="product-card">
                <div class="product-tumb favourite">
                    <div class="innerbox favourite">
                        <embed src=${item.icon} />
                    </div>
                </div>
                <div class="product__details inner">
                    <div class="product__text__wrapper">
                        <p class="product__name">${item.name}</p>
                        <p class="product__quantity">${item.description}</p>
                        <p class="product__price">$${item.price}</p>
                    </div>
                    <div isdisabled=${isdisabled} class="product-bottom-details" product="${encodeURIComponent(JSON.stringify(item))}">
                        <div class="btn" isdisabled=${isdisabled}>${btnName}</div>
                    </div>
                    <div class="counter__wrapper hide">
                        <div class="counter__container">
                            <div class="counter__box__container">
                                <div class="counter__minus" id="minus" product="${encodeURIComponent(JSON.stringify(item))}">
                                    <img src="/assets/images/png/minus.png" />
                                </div>
                            </div>
                        
                            <input id="counter_input" class="counter__input home" type="text" value="1" size="1" maxlength="2" autocomplete="off"/>
                            <div class="counter__box__container" product="${encodeURIComponent(JSON.stringify(item))}">
                                <div class="counter__plus" id="plus">
                                    <img src="/assets/images/png/plus.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}

function insertFilterBar() {
    if (!($("#product_header_bar").is(":visible"))) {
        $("#product_header_bar").css('display', 'flex');
    }
    $("#product_header_bar").prepend(`<p class="title">${config.filterbar.title}</p>`)
    config.filterbar.menu.map((item) => {
        $("#dropdown_items").append(`<li class="item-drop" item="${encodeURIComponent(JSON.stringify(item))}">${item.name}</li>`);
    });
}

function insertProducts(products) {
    products.map((product, index) => {
        $("#product_item_container").append(`
            <div class="faq-drawer">
                <input class="faq-drawer__trigger" id=${"faq-drawer" + "-" + index} type="checkbox" autocomplete="off"/>
                <label class="faq-drawer__title" for=${"faq-drawer" + "-" + index}>
                    ${product.volume}
                    <div class="product__bar__icon"><img src=${product.icon} /></div>
                </label>
                <div class="faq-drawer__content-wrapper">
                    <div class="faq-drawer__content">
                        <div class="products__container inner" id=${"products_container_inner" + index}>
                          
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    $(".faq-drawer__title").click(function() {
        let drawerContentBox = $(this).siblings(".faq-drawer__content-wrapper").children().children(".products__container.inner");
        let drawerContentBoxHeight = drawerContentBox[0].offsetHeight;
        if($(this).siblings(".faq-drawer__content-wrapper").hasClass("ashish")) {
            $($(this).siblings(".faq-drawer__content-wrapper")).css("max-height", 0);
            $(this).siblings(".faq-drawer__content-wrapper").removeClass("ashish");
        } else {
            $($(this).siblings(".faq-drawer__content-wrapper")).css("max-height", drawerContentBoxHeight + 32);
            $(this).siblings(".faq-drawer__content-wrapper").addClass("ashish");
        }
    });
}

function insertInnerProducts(products) {
    products.map((product, index) => {
        let listitem = "#products_container_inner" + index;
        product.items.map((item) => {
            let isdisabled = item.quantity_available ? false : true;
            let btnName = isdisabled ? "Out of stock" : "ADD";
            $(listitem).append(`
                <div class="product-card">
                    <div class="product-tumb inner">
                        <div class="innerbox">
                            <img class="img__wrapper inner" src=${item.icon} alt="">
                        </div>
                    </div>
                    <div class="product__details inner">
                        <div class="product__text__wrapper">
                            <p class="product__name">${item.name}</p>
                            <p class="product__quantity">${item.description}</p>
                            <p class="product__price">$${item.price}</p>
                        </div>
                        <div isdisabled=${isdisabled} class="product-bottom-details" product="${encodeURIComponent(JSON.stringify(item))}">
                            <div class="btn inner" isdisabled=${isdisabled}>${btnName}</div>
                        </div>
                        <div class="counter__wrapper hide">
                            <div class="counter__container">
                                <div class="counter__box__container">
                                    <div class="counter__minus" id="minus" product="${encodeURIComponent(JSON.stringify(item))}">
                                        <img src="/assets/images/png/minus.png"/>
                                    </div>
                                </div>
                            
                                <input id="counter_input" class="counter__input home" type="text" value="1" size="1" maxlength="2" autocomplete="off"/>
                                <div class="counter__box__container">
                                    <div class="counter__plus" id="plus" product="${encodeURIComponent(JSON.stringify(item))}">
                                        <img src="/assets/images/png/plus.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    });
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function saveInput(node) {
    var filter = "keywords";
    var keyword = node.value;
    var filteredData = getAllProducts.filter(function (obj) {
        if (obj[filter] != "") {
            return obj[filter].includes(keyword);
        }
    });
    searchProducts(filteredData)
}


let processChange = debounce((node) => saveInput(node));

function searchProducts(node) {
    $("#search_product_box").fadeIn().show();
    $(".product.searchproducts").remove();
    $('.close__icon__box').show();
    node.map((item) => {
        $("#search_product_wrap").append(`
            <div class="product searchproducts">
                <div class="left__wrapper">
                    <div class="name">${item.name}</div>
                    <div class="description">${item.description}</div>
                    <div class="price">$${item.price}</div>
                </div>
                <div class="right__wrapper">
                    <div class="product-bottom-details" product="${encodeURIComponent(JSON.stringify(item))}">
                        <div class="btn">ADD</div>
                    </div>
                    <div class="counter__wrapper hide">
                        <div class="counter__container checkout">
                            <div class="counter__box__container">
                                <div class="counter__minus" id="minus" product="${encodeURIComponent(JSON.stringify(item))}">
                                    <img src="/assets/images/png/minus.png" />
                                </div>
                            </div>
                        
                            <input id="counter_input" class="counter__input home" type="text" value="1" size="1" maxlength="2" autocomplete="off"/>
                            <div class="counter__box__container">
                                <div class="counter__plus" id="plus" product="${encodeURIComponent(JSON.stringify(item))}">
                                    <img src="/assets/images/png/plus.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
    if (node.length !== 0) {
        $('.product-bottom-details').click(function () {
            addProducts(this)
        });

        $('.counter__minus').click(function () {
            updateCounter(this, "minus");
        });

        $('.counter__plus').click(function () {
            updateCounter(this, "add");
        });
    }
}

function emptySearch(node) {
    $("#search_product_wrap").empty();
    $("#search_product_box").fadeIn().hide();
    $("#search_input").val("");
}

function switchTabs(id) {
    event.preventDefault();
    let siblings = $(event.target).siblings();
    let parsedSiblings = [...siblings]
    parsedSiblings.forEach(ele => {
        $(ele).removeClass("active");
    });

    let gridItem = [...$(`.grid__item`)];

    gridItem.map(item => {
        $(item).removeClass("active");
        $("#promotions_products_container").hide();
        $("#promotions_container").hide();
        $("#product_wrapper").hide();
        $("#orderhistory_container").hide();
    })

    switch (id) {
        case 0:
            $(`#tab_grid_item${id}`).toggleClass("active");
            $("#product_wrapper").show();
            $("#promotions_container").show();
            $("#promotions_products_container").show();
            break;
        case 1:
            $(`#tab_grid_item${id}`).toggleClass("active");
            $("#promotions_container").show();
            $("#promotions_products_container").show();
            $("#product_wrapper").hide();
            break;
        case 2:
            $(`#tab_grid_item${id}`).toggleClass("active");
            $("#promotions_products_container").hide();
            $("#promotions_container").hide();
            $("#product_wrapper").hide();
            $("#orderhistory_container").show();
            break;
        default:
            break;
    }
}



function addProducts(quantityInput) {
    let siblingWrapper = $(quantityInput).siblings(".counter__wrapper");
    let productData = $(quantityInput).attr("product");
    let decodedProductData = JSON.parse(decodeURIComponent(productData));
    $(quantityInput).hide();
    $(siblingWrapper).show();
    let numberCircleCount = $("#numberCircle").attr("value");
    let parseCount = Number(numberCircleCount)
    let updatedValue = parseCount + 1;
    $("#numberCircle").attr("value", updatedValue);
    $("#numberCircle").text(updatedValue);
    updateCheckoutCartData(decodedProductData, "add");
}


function updateCounter(counterInput, type, requestFrom) {
    let siblingWrapper = $(counterInput).parent().siblings(".counter__input");
    if (type === "add") {
        var $input = $(siblingWrapper);
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        let numberCircleCount = $("#numberCircle").attr("value");
        let parseCount = Number(numberCircleCount)
        let updatedValue = parseCount + 1;
        $("#numberCircle").attr("value", updatedValue);
        $("#numberCircle").text(updatedValue);
        let productData = $(counterInput).attr("product");
        let decodedProductData = JSON.parse(decodeURIComponent(productData));
        updateCheckoutCartData(decodedProductData, "add");
        return false;
    }

    if (type === "minus") {
        var $input = $(siblingWrapper);
        var count = parseInt($input.val()) - 1;
        if (count >= 0) {
            let productData = $(counterInput).attr("product");
            let decodedProductData = JSON.parse(decodeURIComponent(productData));
            if (count == 0) {
                let parentAddWrapper = $(counterInput).parent().parent().parent();
                let siblingAddWrapper = $(counterInput).parent().parent().parent().siblings(".product-bottom-details");
                $(parentAddWrapper).hide();
                $(siblingAddWrapper).show();
                let numberCircleCount = $("#numberCircle").attr("value");
                let parseCount = Number(numberCircleCount)
                let updatedValue = parseCount - 1;
                $("#numberCircle").attr("value", updatedValue);
                $("#numberCircle").text(updatedValue);
                if(requestFrom && requestFrom === "checkout") {
                    $(`#promotions-add-${decodedProductData.sku}`).show()
                    $(`#promotions-counter-${decodedProductData.sku}`).hide()
                }
            } else {
                $input.val(count);
                $input.change();
                let numberCircleCount = $("#numberCircle").attr("value");
                let parseCount = Number(numberCircleCount)
                let updatedValue = parseCount - 1;
                $("#numberCircle").attr("value", updatedValue);
                $("#numberCircle").text(updatedValue);
            }
            
            updateCheckoutCartData(decodedProductData, "minus");
            return false;
        }
        count = count < 1 ? 0 : count;
        /*  let parentAddWrapper = $(counterInput).parent().parent().parent();
         let siblingAddWrapper = $(counterInput).parent().parent().parent().siblings(".product-bottom-details");
         $(parentAddWrapper).hide();
         $(siblingAddWrapper).show(); */
    }
}

function updateDropDownMenu(dpItem) {
    $("#dpValue").text($(dpItem).text());
    $("#product_item_container").empty();
    let dpItemAttr = JSON.parse(decodeURIComponent($(dpItem).attr("item")));
    let products = sortProducts(config.products, dpItemAttr.sortBy);
    insertProducts(products);
    insertInnerProducts(products);
}

function sortProducts(products, sortBy) {
    if (sortBy === "name") {
        return products.sort(function (a, b) {
            const bandA = a[sortBy].toUpperCase();
            const bandB = b[sortBy].toUpperCase();

            let comparison = 0;
            if (bandA > bandB) {
                comparison = -1;
            } else if (bandA < bandB) {
                comparison = 1;
            }
            return comparison;
        });
    }
    return products.sort(function (a, b) {
        return parseFloat(a.sortBy) - parseFloat(b.sortBy);
    });
}

function updateCheckoutCartData(data, type) {
    if (Object.keys(cartData).length == 0) {
        cartData[data.sku] = {
            "product_data": data,
            "quantity": 1
        }
        insertSelectedCoupon(config.checkout.discounts[0]);
        processQ(cartData, data.sku);
        return;
    }

    for (const key in cartData) {
        if (data.sku === key) {
            let q = cartData[key]["quantity"];
            if (type === "add") {
                cartData[key] = {
                    "product_data": data,
                    "quantity": q + 1
                }
            }

            if (type === "minus") {
                cartData[key] = {
                    "product_data": data,
                    "quantity": q - 1
                }
            }
        } else {
            if (!cartData[data.sku]) {
                cartData[data.sku] = {
                    "product_data": data,
                    "quantity": 1
                }
            }
        }

    }
    processQ(cartData, data.sku);
}

function updateProductsBasedOnProducts(node, type) {
    let orderhistoryNode = "";
    let productData = $(node).attr("product");
    let decodedProductData = JSON.parse(decodeURIComponent(productData));
    if (type === "add") {
        orderhistoryNode = $(node).siblings(".counter__wrapper.orderhistory");
        let numberCircleCount = $("#numberCircle").attr("value");
        let parseCount = Number(numberCircleCount)
        let updatedValue = parseCount + 1;
        $("#numberCircle").attr("value", updatedValue);
        $("#numberCircle").text(updatedValue);


    }
    if (type === "minus") {
        orderhistoryNode = $(node).siblings(".repeat.orderhistory");
        let numberCircleCount = $("#numberCircle").attr("value");
        let parseCount = Number(numberCircleCount)
        let updatedValue = parseCount - 1;
        $("#numberCircle").attr("value", updatedValue);
        $("#numberCircle").text(updatedValue);
    }
    $(orderhistoryNode).show();
    $(node).hide();
    updateCheckoutCartData(decodedProductData, type);
}