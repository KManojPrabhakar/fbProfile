    let fbToken;
    let dataAvailable = true;
    $(document).ready(()=> {
        $(".card").hide();
        $("#feed").click(() =>{
            fbToken=    $("#token").val();
            if(fbToken == null || fbToken == undefined || fbToken =="") {
                alert("Provide Fb token to get info");
            }
            else {
                if(dataAvailable) {
                    getFacebookFeedInfo();
                }
            }
            
    });
})


    let getFacebookFeedInfo = () =>{
        $.ajax('https://graph.facebook.com/me/feed?access_token='+fbToken,{
                success: function(response) {
                       dataAvailable = false;
                        $(".card").show();
                         console.log("feedResponse:"+response);
                         response.data.forEach(function(data) {
                            if(data.message) {
                                  $("#feedData").append('<p>'+"Message: "+data.message+'</p>');
                            }
                            if(data.story) {
                                    $("#feedData").append('<p>'+"Story: "+data.story+'</p>');

                            }
                         });
                        


                },
                 error: function(err) {
                     console.log(err.responseJSON.error.message);
                    alert(err.responseJSON.error.message)
                }
            }
        );// end ajax call

    } 