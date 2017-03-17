$(document).ready(function(){
    var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","JohnnyPark78","comster404","brunofin"];
    for(var i=0;i<users.length;i++){
        $.ajax({
            type: "GET",
            url: "https://wind-bow.gomix.me/twitch-api/channels/" + users[i],
            dataType: "jsonp",
            success: function(response1){
                if(response1.status !== 404){
                    $.ajax({
                        type: "GET",
                        url: "https://wind-bow.gomix.me/twitch-api/streams/" + response1.display_name,
                        dataType: "jsonp",
                        success: function(response2){
                            var status = "offline";
                            var logo = '<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png" class="logo">'; 
                            var preview = "";
                            var playing = "";
                            var gameStatus = "";
                            if(response1.logo !== null){
                                logo = '<img src="' + response1.logo + '" class="logo">';
                            }
                            if(response2.stream !== null){
                                preview = '<a href="' + response1.url + '" target="_blank"><img src="' + response2.stream.preview.medium + '" class="preview"></a>';
                                status = "online";
                                playing = '<p class="playing">Playing: ' + response2.stream.game + '</p>';
                                gameStatus = '<p class="game-status">' + response2.stream.channel.status + '</p>';
                            }
                            var streamDiv = '<div class="stream-info ' + status + '"><div class="logo-div">' + logo + '</div>' + preview + '<p class="username"><a href="'+ response1.url + '" target="_blank">' + response1.display_name + '</a></p><p class=" status status-' + status + '">' + status + '</p>' + playing + gameStatus + '</div>';
                            $(".streamers").prepend(streamDiv);
                            
                        }
                    })
                } else {
                    var errDiv = '<div class="stream-info not-streamer"><div class="no-response">' + response1.message + '</div></div>'
                    $(".errors").append(errDiv);
                }
            },
        })
    }
})