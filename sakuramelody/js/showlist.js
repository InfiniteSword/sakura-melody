/**
 * Created on 15/8/12.
 */
function listShow (){
    var btn_list = document.getElementById('list');
    var ctn_list = document.getElementById('music-list');
    var ctn = document.getElementById('ctn');
    var close = document.getElementById('close');
    btn_list.addEventListener('click',function(){
        ctn_list.style.marginLeft = '0';
        ctn.style.width = '80%';
        ctn.style.height = '80%';
    });
    close.addEventListener('click',function(){
        ctn_list.style.marginLeft = '-100%';
        ctn.style.width = '100%';
        ctn.style.height = '100%';
    })
}

listShow();

