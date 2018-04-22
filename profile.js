let fbToken;
let dataAvailable = true;
$(document).ready(()=> {
	$(".card").hide();
	$("#profile").click(() =>{
		fbToken=	$("#token").val();
		if(fbToken == null || fbToken == undefined || fbToken =="") {
			alert("Provide Fb token to get info");
		}
		else {
			if(dataAvailable) {
				getProFileInfo();
			}
		}
		
	});
})

let getProFileInfo = () => {
		$.ajax({
			type:'GET',
			datatype:'json',
			async:true,
			url:'https://graph.facebook.com/me?fields=name,birthday,email,quotes,cover,picture.type(large)&access_token=' + fbToken,
			success: (response) => {
				dataAvailable = false;
				$(".card").show();
				if(response && response.picture && response.picture.data && response.picture.data.url) {
					$("#image").html(`<img src=${response.picture.data.url}  class="img-fluid" alt="images"/>`);
				}
				if(response && response.cover && response.cover.source) {
					$("#cover").css('background-image', 'url(' + response.cover.source + ')');
				}
				$("#name").append(response.name);
				$("#email").append(response.email);
				$("#dob").append(response.birthday)



			},
			error: (err) => {
					 console.log(err.responseJSON.error.message);
            		alert(err.responseJSON.error.message)
			}
		})
}