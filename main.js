var imgsTag = '';
var len = 0;
var col = 0;
var row = 0;

$(function () {
    // community2
    list.forEach(function (data, index) {
        imgsTag = imgsTag + '<div class="community_imgWrap" " data-tag="' + data.tag.join(' ') + '"><img src="' + data.path + '"/></div>';
    });
    $('.community_list').append(imgsTag);

    $('.community nav > a').on('click', function (e) {
        var targetTag = $(this).data('label');
        // console.log(targetTag);
        imgsTag = '';
        $('.community_imgWrap').remove();
        $(".community_submenu").remove();
        if (targetTag === 'all') {
            list.forEach(function (data, index) {
                imgsTag = imgsTag + '<div class="community_imgWrap" data-href="' + data.path + '" data-tag="' + data.tag.join(' ') + '"><img src="' + data.path + '"/></div>';
            });
        } else {
            list.forEach(function (data, index) {
                for (i = 0; i < data.tag.length; i++) {
                    // console.log(targetTag + ", " + index + ", " + data.tag + ", " + data.tag[i].indexOf(targetTag))
                    if (data.tag[i].indexOf(targetTag) > -1) {
                        imgsTag = imgsTag + '<div class="community_imgWrap" data-href="' + data.path + '" data-tag="' + data.tag.join(' ') + '"><img src="' + data.path + '"/></div>';
                        break;
                    }
                }
            });
        }
        $('.community_list').append(imgsTag);

        //set variable
        len = $(".community_imgWrap").length;
        row = Math.ceil(len / col);
        imgWragClick();
    });

    //set variable
    len = $(".community_imgWrap").length;
    if ($(window).width() >= 1008) {
        // console.log("desktop:" + $(window).width());
        col = 6;
    } else {
        // console.log("phone:" + $(window).width());
        col = 2;
    }
    row = Math.ceil(len / col);
    imgWragClick();

    //reset variable
    $(window).resize(function () {
        if ($(window).width() >= 1008) {
            // console.log("resize_desktop:" + $(window).width());
            col = 6;
        } else {
            // console.log("resize_phone:" + $(window).width());
            col = 2;
        }
        row = Math.ceil(len / col);
    });

});

function imgWragClick() {
    $(".community_imgWrap").click(function () {
        $(".community_submenu").remove();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(".community_imgWrap").removeClass("active");
            $(this).addClass("active");

            //open submenu
            var target_index = $(this).index() + 1;
            var target_row = Math.ceil(target_index / col);
            // console.log("len:" + len + ", col: " + col + ", row: " + row + ", target_index: " + target_index + ", target_row:" + target_row);
            var target_tag = "";
            if (target_row == row) {
                //為最後一行
                // console.log("last row");
                target_tag = ".community_imgWrap:nth-child(" + len + ")";
            } else {
                target_tag = ".community_imgWrap:nth-child(" + (col * target_row) + ")";
                // console.log(target_row + ", " + target_tag);
            }
            // 更新submenuList
            submenuList.ImgUrl = $(this).find("img").attr("src");
            drawSubmenu(target_tag, target_index, submenuList);
        }
    });
}

function drawSubmenu(tag, info_index, info_data) {
    var html_header =
        '<div class="community_submenu">' +
        '<a href="javascript: void(0);" class="community_submenu_esc">X</a>' +
        '<a href="javascript: void(0);" class="community_submenu_arrowPrev"></a>' +
        '<div class="community_submenu_mainCnt">';
    var html_footer =
        '</div>' +
        '<a href="javascript: void(0);" class="community_submenu_arrowNext"></a>' +
        '</div>';
    var mainImg =
        '<div class="community_submenu_mainImg">' +
        '<img src=' + info_data.ImgUrl + ' alt="">' +
        '</div>';
    var pdlist = '<div class="community_submenu_pdList clearfix">';
    var pdBox = '';
    if (info_data.CommunityProductList.length > 0) {
        for (var i = 0; i < info_data.CommunityProductList.length; i++) {
            var html_template =
                '<div class="community_submenu_pdBox">';
            var html_template_img = '';
            if (info_data.CommunityProductList[i].MaxQuantity == 0) {
                html_template_img =
                    '<a href="https://www.lurehsu.com/zh-TW/Lure/product?SaleID=' + info_data.CommunityProductList[i].SaleID + '&ColorID=' + info_data.CommunityProductList[i].ColorID + '">' +
                    '<img src=' + info_data.CommunityProductList[i].ProductPhoto.URL + ' alt="" class="pdBox_img">' +
                    '<div class="sold_out_wrap"><div class="sold_out"> SOLD OUT</div></div>' +
                    '</a>';
            } else {
                html_template_img =
                    '<a href="https://www.lurehsu.com/zh-TW/Lure/product?SaleID=' + info_data.CommunityProductList[i].SaleID + '&ColorID=' + info_data.CommunityProductList[i].ColorID + '">' +
                    '<img src=' + info_data.CommunityProductList[i].ProductPhoto.URL + ' alt="" class="pdBox_img">' +
                    '</a>';
            }
            var html_template_info =
                '<div class="pdBox_info">' +
                '<p class="pdBox_code">' + info_data.CommunityProductList[i].ProductID + '</p>' +
                '<p class="pdBox_name">' + info_data.CommunityProductList[i].ProductTitle + '</p> ' +
                '<div class="pdBox_subinfo">';
            var html_template_price = "";
            if (info_data.CommunityProductList[i].OriginalPrice == info_data.CommunityProductList[i].SalePrice) {
                html_template_price =
                    '<p class="pdBox_price">NTD.' + info_data.CommunityProductList[i].OriginalPrice + '</p>';
            } else {
                html_template_price =
                    '<p class="pdBox_price">NTD.' +
                    '<span class="pdBox_originalPrice">' + info_data.CommunityProductList[i].OriginalPrice + '</span>' +
                    '<span class="pdBox_salePrice redTxt">' + info_data.CommunityProductList[i].SalePrice + '</span>' +
                    '</p>';
            }

            var html_template_color = '<div class="pdBox_color">';
            for (var j = 0; j < info_data.CommunityProductList[i].ColorList.length; j++) {
                html_template_color = html_template_color +
                    '<img src=' + info_data.CommunityProductList[i].ColorList[j].ColorImage.URL + ' alt="">';
            }
            html_template_color = html_template_color + '</div>';
            pdBox = pdBox + html_template + html_template_img + html_template_info + html_template_price + html_template_color + '</div> </div> </div>';
        }
    }

    pdlist = pdlist + pdBox + '</div>';
    var html = html_header + mainImg + pdlist + html_footer;
    $(html).insertAfter(tag);

    // $('.community_submenu_mainImg > a').magnificPopup({
    //     type: 'image',
    //     mainClass: 'community_submenu_mainImgPop',
    // });

    //arrow position
    // console.log($(window).width());
    if (col == 2) {
        // console.log(("window: " + $(window).width() / 2) + "px");
        $(".community_submenu_arrowPrev").addClass("community_submenu_arrow_phone");
        $(".community_submenu_arrowNext").addClass("community_submenu_arrow_phone");
        $(".community_submenu_arrowPrev.community_submenu_arrow_phone").css("top", ($(window).width() / 2) + "px");
        $(".community_submenu_arrowNext.community_submenu_arrow_phone").css("top", ($(window).width() / 2) + "px");
    } else {
        // console.log("desktop");
        $(".community_submenu_arrowPrev").removeClass("community_submenu_arrow_phone");
        $(".community_submenu_arrowNext").removeClass("community_submenu_arrow_phone");
    }

    //esc btn
    $(".community_submenu_esc").click(function () {
        $(".community_submenu").remove();
        $(".community_imgWrap").removeClass("active");
    });

    //prev btn
    $(".community_submenu_arrowPrev").click(function () {
        var currentIndex;
        if (info_index == 1) {
            currentIndex = len;
        } else {
            currentIndex = info_index - 1;
        }
        changeSubmenu(currentIndex);
        // console.log("click_prev");
    });

    //next btn
    $(".community_submenu_arrowNext").click(function () {
        var currentIndex;
        if (info_index == len) {
            currentIndex = 1;
        } else {
            currentIndex = info_index + 1;
        }
        changeSubmenu(currentIndex);
        // console.log("click_next");
    });

}

function changeSubmenu(index) {
    //clear all
    $(".community_submenu").remove();
    $(".community_imgWrap").removeClass("active");
    $(".community_imgWrap:nth-child(" + index + ")").addClass("active");

    //change submenu-open submenu
    var target_index = index;
    var target_row = Math.ceil(target_index / col);
    // var target_img = $(".community_imgWrap:nth-child(" + target_index + ")").find("img").attr("src");
    // console.log("len:" + len + ", col: " + col + ", row: " + row + ", target_index: " + target_index + ", target_row:" + target_row);

    if (target_row == row) {
        //為最後一行
        // console.log("last row");
        var target_tag = ".community_imgWrap:nth-child(" + len + ")";
    } else {
        var target_tag = ".community_imgWrap:nth-child(" + (col * target_row) + ")";
        // console.log(target_row + ", " + target_tag);
    }
    // 更新submenuList
    submenuList.ImgUrl = $(".community_imgWrap:nth-child(" + index + ")").find("img").attr("src");
    drawSubmenu(target_tag, target_index, submenuList);
}