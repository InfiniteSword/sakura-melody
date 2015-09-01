/**
 * Created on 15/8/12.
 */

var musicOnplay = angular.module('musicOnplay',[]);

musicOnplay.controller('musicController', function($scope, $http){
    var nameNow = document.getElementById("song-name");
    var authorNow = document.getElementById("author");
    var player = document.getElementById("player");
    var prev = document.getElementById("prev");
    var mctr = document.getElementById("mctr");
    var next = document.getElementById("next");
    var download = document.getElementById("download");
    var btn_list = document.getElementById('list');
    var ctn_list = document.getElementById('music-list');
    var ctn = document.getElementById('ctn');
    var close = document.getElementById('close');
    var progress = document.getElementById("progress-line");
    var line = document.getElementById("progress");

    $scope.music = [];
    $scope.musicNow = {};
    $scope.musicPrev = {};

    $scope.musicNow.name = "Time after time〜花舞う街で〜";
    $scope.musicNow.author = "倉木麻衣";
    $scope.musicNow.src = "music/倉木麻衣 - Time after time〜花舞う街で〜.mp3";
    $scope.musicPrev.name = "Time after time〜花舞う街で〜";
    $scope.musicPrev.author = "倉木麻衣";
    $scope.musicPrev.src = "music/倉木麻衣 - Time after time〜花舞う街で〜.mp3";


    function musicControl() {
        mctr.addEventListener("click",function(){
           if(player.paused == true){
               player.play();
               mctr.innerHTML = "&#xe633;";
           } else {
               player.pause();
               mctr.innerHTML = "&#xf0001;";
           }
        });
        prev.addEventListener("click",function(){
            player.src = $scope.musicPrev.src;
            $scope.musicNow.name = $scope.musicPrev.name;
            $scope.musicNow.author = $scope.musicPrev.author;
            $scope.musicNow.src = $scope.musicPrev.src;
            nameNow.innerHTML = $scope.musicNow.name;
            authorNow.innerHTML = $scope.musicNow.author;
            player.play();
            mctr.innerHTML = "&#xe633;";
        });
        player.addEventListener("ended",function() {
            $scope.musicPrev.name = $scope.musicNow.name;
            $scope.musicPrev.author = $scope.musicNow.author;
            $scope.musicPrev.src = $scope.musicNow.src;
            var nextid = getRandomNum(0,34);
            $scope.musicNow.name = $scope.music[nextid].name;
            $scope.musicNow.author = $scope.music[nextid].author;
            $scope.musicNow.src = $scope.music[nextid].src;
            player.src = $scope.musicNow.src;
            nameNow.innerHTML = $scope.musicNow.name;
            authorNow.innerHTML = $scope.musicNow.author;
            player.play();
            mctr.innerHTML = "&#xe633;";
        });
        player.addEventListener("timeupdate",function() {
            var value = Math.round((Math.floor(player.currentTime) / Math.floor(player.duration)) * 100, 0);
            line.style.width = value * 5 + 'px';
        });
        progress.addEventListener('click', function(ev) {
            var ev = ev || window.event;
            var sx = ev.clientX;
            var lx = getLeft(progress);
            var w = sx - lx;
            var duration = player.duration;
            var ratio = w / 500;
            line.style.width = w + 'px';
            player.currentTime = ratio * duration;
        });
        next.addEventListener("click",function() {
            $scope.musicPrev.name = $scope.musicNow.name;
            $scope.musicPrev.author = $scope.musicNow.author;
            $scope.musicPrev.src = $scope.musicNow.src;
            var nextid = getRandomNum(0,34);
            $scope.musicNow.name = $scope.music[nextid].name;
            $scope.musicNow.author = $scope.music[nextid].author;
            $scope.musicNow.src = $scope.music[nextid].src;
            player.src = $scope.musicNow.src;
            nameNow.innerHTML = $scope.musicNow.name;
            authorNow.innerHTML = $scope.musicNow.author;
            player.play();
            mctr.innerHTML = "&#xe633;";
        });
        download.addEventListener("click",function(){
            window.open($scope.musicNow.src);
        })
    }

    function getRandomNum(Min,Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }

    function getLeft(obj) {
        var l = obj.offsetLeft;
        while (obj = obj.offsetParent) {
            l += obj.offsetLeft;
        }
        return l;
    }

    function addMusic() {
        var url = "js/info.json"; //储存歌曲信息的json文件
        $http.get(url).success(function(response){
            for(var i = 0; i < response.length; i++){
                $scope.music.push(response[i]);
            }
        })
    }


    function listShow (){

        btn_list.addEventListener('click',function(){
            ctn_list.style.marginLeft = '0';
            ctn.style.webkitTransform = 'scale(0.8,0.8)';
            ctn.style.MozTransform = 'scale(0.8,0.8)';
            ctn.style.msTransform = 'scale(0.8,0.8)';
            ctn.style.transform = 'scale(0.8,0.8)';

        });
        close.addEventListener('click',function(){
            ctn_list.style.marginLeft = '-100%';
            ctn.style.webkitTransform = 'scale(1,1)';
            ctn.style.MozTransform = 'scale(1,1)';
            ctn.style.msTransform = 'scale(1,1)';
            ctn.style.transform = 'scale(1,1)';
        });
    }


    window.onload = function() {
        function chooseMusic() {
            for(var i = 0; i < 34; i++){
                (function(i) {
                    var musicChosed = document.getElementsByClassName("music-lis")[i];
                    musicChosed.addEventListener("click", function () {
                        $scope.musicPrev.name = $scope.musicNow.name;
                        $scope.musicPrev.author = $scope.musicNow.author;
                        $scope.musicPrev.src = $scope.musicNow.src;
                        $scope.musicNow.name = $scope.music[i].name;
                        $scope.musicNow.author = $scope.music[i].author;
                        $scope.musicNow.src = $scope.music[i].src;
                        player.src = $scope.musicNow.src;
                        nameNow.innerHTML = $scope.musicNow.name;
                        authorNow.innerHTML = $scope.musicNow.author;
                        player.play();
                        mctr.innerHTML = "&#xe633;";
                        ctn_list.style.marginLeft = '-100%';
                        ctn.style.webkitTransform = 'scale(1,1)';
                        ctn.style.MozTransform = 'scale(1,1)';
                        ctn.style.msTransform = 'scale(1,1)';
                        ctn.style.transform = 'scale(1,1)';
                    });
                })(i);
            }
        }
        chooseMusic();
    };


    listShow();
    addMusic();
    musicControl();
});
