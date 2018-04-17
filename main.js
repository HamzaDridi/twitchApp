var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const card = ({ imagSrc, displayName, game, followers, url,state, status}) => `
    <div class="col-sm-6 col-lg-4 card-${state}">
         <div class="card ">
           <div class="card-body text-center">
              <p><img class="img-fluid" src="${imagSrc}" alt="User Logo"></p>
              <h4 class="card-title"> <a href="${url}">${displayName}</a></h4>
              <h5>${game}</h5>
              <p class="card-text">${status}</p>
              <div>
                 <span class="followers"> <small> <span id="follower-number">${followers}</span> followers</small> </span> 
                 <div class="status"> <small> <i class="fas fa-signal ${state}"></i></small> </div>
              </div>
           </div>
        </div>  
</div>
`;

$('#pills-All-tab').on('click', function (e) {
    $(".arrow").css("left", "15%");
    $('.card-Online, .card-Offline').show();
});
$('#pills-online-tab').on('click', function (e) {
    $(".arrow").css("left", "48%");
    $('.card-Online').show();
    $('.card-Offline').hide();
    
});
$('#pills-offline-tab').on('click', function (e) {
    $(".arrow").css("left", "81%");
    $('.card-Online ').hide();
    $('.card-Offline ').show();
});

function getStreamsStatus(user) {
    var state = "Online";
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?", function (data) {
            if (data.stream === null || data.stream === undefined)
                state = "Offline";
    });
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + user + "?callback=?", function (data) {  
        if (data.game === null) 
            data.game = "No game for the moment !";
        if (data.status === null)
            data.status = "";
        
    $('#pills-All').append([
    {   imagSrc: data.logo,
        displayName: data.display_name,
        game: data.game,
        followers: data.followers,
        url: data.url,
        state: state,
        status: data.status
        }
].map(card).join(''));
        });
}
users.forEach(function (user) {
    getStreamsStatus(user);
});