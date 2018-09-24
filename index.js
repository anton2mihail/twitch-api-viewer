var channelNames = ['ESL_SC2', 'OgamingSC2', 'wintergaming', 'freecodecamp', 'shroud', 'summit1g', 'GauntletSC2', 'brunofin'];

$("document").ready(function () {
    $.when(
        $.ajax({//Query the api for all the streams at once as it will only return the live ones
            url: 'https://api.twitch.tv/kraken/streams?channel=ESL_SC2,OgamingSC2,wintergaming,freecodecamp,shroud,summit1g,GauntletSC2,brunofin',
            dataType: 'json',
            method: 'GET',
            async: true,
            headers: {
                'Client-ID': 'zkfg7kb9inodmdspe1bp1bljru1zc7'
            }
        })
    ).done(function (data) {//Use the live data to update the banner and the game info
        liveOrNah(data, null);
        channelInfo();//Once done query the api for each channel in order

    });
    function channelInfo() {//Query the api for the channel info sequentially because there is no option to query for all the channels at once
    for (var x = 0; x < channelNames.length; x++) {
        var curChannelName = channelNames[x];
        $.when(
            $.ajax({
                url: 'https://wind-bow.glitch.me/twitch-api/channels/' +
                    channelNames[x],
                dataType: 'json',
                async: true
            })


        ).done(function (data) {//Once done check if channel was found, if not pass the channel name anyways
            if(data.status !== 404){
                dataCleaner(data, curChannelName);
            }else{
            dataCleaner(data, curChannelName);
            }
        });
    }
}



    var streamObj = {//Setting up the stream objects with their individual properties
        'ESL_SC2': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'ESL_SC2',
            'profile_banner': '',
            'stream_status': '',
            'game':'None',
            'viewers': '',
            'url': ''
        },
        'OgamingSC2': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'OgamingSC2',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        },
        'FreeCodeCamp': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'FreeCodeCamp',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        },
        'wintergaming': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'wintergaming',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        },
        'shroud': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'shroud',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        },
        'summit1g': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'summit1g',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        },
        'GauntletSC2': {
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'GauntletSC2',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        },
        'brunofin':{
            'stream_type': 'Offline',
            'logo': '',
            'display_name': 'brunofin',
            'profile_banner': '',
            'stream_status': '',
            'game': 'None',
            'viewers': '',
            'url': ''
        }
    };


    function dataCleaner(data, channelName) {
        if(data.status !== 404){// If the channel exists set the object properties
            console.log(data);
        streamObj[data.display_name].logo = data.logo;
        streamObj[data.display_name].profile_banner = data.profile_banner;
        streamObj[data.display_name].stream_status = data.status;
        streamObj[data.display_name].url = data.url;
        liveOrNah(null, data, null);
        }else{// If it was not found pass it on anyways with the channel name
            liveOrNah(null, data , channelName);
        }
        
    }

    function displayElements(data) {//Function that displays the page elements if the channel exists
        $("body").append("<div class='uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin' uk-grid><div class='uk-card-media-left uk-cover-container'><img src='" + streamObj[data.display_name].logo + "'style='height:220px;width:220px;' alt='Image was not found' uk-cover><canvas width='600' height='400'></canvas></div><div><div class='uk-card-badge uk-label' id='status'>" + streamObj[data.display_name].stream_type + "</div><div class='uk-card-body'><h3 class='uk-card-title'>" + streamObj[data.display_name].display_name + "</h3><p>" + streamObj[data.display_name].stream_status + "<br/>Game: " + streamObj[data.display_name].game + "<br/><a class='uk-button-danger' style='padding-left:10px;padding-right:10px;' href='" + streamObj[data.display_name].url + "'>Visit</a></p></div></div></div>");
    }


    function liveOrNah(streamData, channelData, channelName) {
        if (streamData !== null) {//If the stream is live set its stream_type property to live
            for (var i = 0; i < streamData.streams.length; i++) {
                streamObj[streamData.streams[i].channel.display_name].stream_type = "Live";
                streamObj[streamData.streams[i].channel.display_name].game = streamData.streams[i].game;
            }
        }
        if (channelData !== null) {//If the channel info was passed in display the page elements
            if (channelData.status !== 404){// If the channel was found display the elements
            displayElements(channelData);
            }
            else if(channelName !== null){// Otherwise make sure that the channel name is not null and display page elements
                
                $("body").append("<div class='uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin' uk-grid><div class='uk-card-media-left uk-cover-container'><img src='' alt='Image was not found' uk-cover><canvas width='600' height='400'></canvas></div><div><div class='uk-card-badge uk-label' id='status'>" + "Removed" + "</div><div class='uk-card-body'><h3 class='uk-card-title'>" + streamObj[channelName].display_name + "</h3><p>" + 'The channel' + streamObj[channelName].display_name +' was removed by the user.'+ "<br/>Game: " + 'N/A' + "<br/><a class='uk-button-danger' style='padding-left:10px;padding-right:10px;' href='#'>Cannot Visit</a></p></div></div></div>");
            }else{
                //Do nothing
            }
        }
    }
});