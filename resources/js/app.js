$(document).ready(function() {
    $('.nav-togggler').each((_, navToggler) => {
        var target = $(navToggler).data('target');
        $(navToggler).on("click", () => {
            $(target).animate({
                height: "toggle"
            });
        });
    });

    let closeBtn = document.querySelector('.close-btn');
    if (closeBtn != undefined) {
        closeBtn.addEventListener('click', () => {
            let alert = document.querySelector('.alert');
            if (alert.classList.contains('show')) {
                alert.classList.remove('show');
                alert.classList.add('hide');
            }
        });
    }
});