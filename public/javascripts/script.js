function changeImageFile(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("imageFileButton").innerHTML = filename;
}

function changeImageCover(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("imageCoverButton").innerHTML = filename;
}


///////////////////////////////////////////////////////////////////////////

function changeVideoFile(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("videoFileButton").innerHTML = filename;
}

function changeVideoCover(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("videoCoverButton").innerHTML = filename;
}


///////////////////////////////////////////////////////////////////////////

function changeAudioFile(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("audioFileButton").innerHTML = filename;
}

function changeAudioCover(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("audioCoverButton").innerHTML = filename;
}

///////////////////////////////////////////////////////////////////////////

function changeHyperlinkCover(x) {
	var file = x.value;
	var filename = file.replace(/^.*\\/, "");
    document.getElementById("hyperlinkCoverButton").innerHTML = filename;
}


///////////////////////////////////////////////////////////////////////////

function validateFormImage() {

validateTitleImage();
validateDescriptionImage();
validateFileImage();
validateCoverImage();


if (validateTitleImage() == false || validateDescriptionImage() == false || validateFileImage() == false || validateCoverImage() == false) 
{
return false;
}
else
{
	return true;
}

}


function validateTitleImage() {

var x = document.forms["imageForm"]["myTitle"].value;

var re = /^(\S.{0,50})/;
if(re.test(x) == false)
{
document.forms["imageForm"]["myTitle"].style.borderColor = "red";


if(x.length > 50)
{
	document.getElementById("imageTitleError").innerHTML = "Length cannot exceed 50 characters";
}

if(x.charAt(0) == " ")
{
	document.getElementById("imageTitleError").innerHTML = "First letter cannot be whitespace";
}

if(x == "")
{
	document.getElementById("imageTitleError").innerHTML = "Title cannot be empty";
}

return false;
}
else
{
document.forms["imageForm"]["myTitle"].style.borderColor = "#283C4F";
document.getElementById("imageTitleError").innerHTML = "";
return true;
}

}

function validateDescriptionImage() {

var x = document.forms["imageForm"]["comments"].value;

var re = /^$|[^\n]{1,20000}$/;

if(re.test(x) == false)
{
document.forms["imageForm"]["comments"].style.borderColor = "red";

if(x.length > 20000)
{
	document.getElementById("imageCommentError").innerHTML = "Length cannot exceed 20000 characters";
}
else
{
	document.getElementById("imageCommentError").innerHTML = "Last character cannot be a newline";
}

return false;
}
else
{
	
document.forms["imageForm"]["comments"].style.borderColor = "#283C4F";
document.getElementById("imageCommentError").innerHTML = "";
return true;
}

}

function validateFileImage() {
var file = document.forms["imageForm"]["imageToUpload"].files[0];

if(file == undefined)
{
document.getElementById("imageFileButton").style.border = "solid red 1px";
document.getElementById("imageFileError").innerHTML = "Please enter a file";
return false;
}

var x = file.type;

var re = /^(\bimage.+)|(\bimage)$/;

if(re.test(x) == false)
{
document.getElementById("imageFileButton").style.border = "solid red 1px";
document.getElementById("imageFileError").innerHTML = "File must be an image type";
return false;
}
else
{
document.getElementById("imageFileButton").style.border = "none";
document.getElementById("imageFileError").innerHTML = "";
return true;
}

}


function validateCoverImage() {
var x = document.forms["imageForm"]["imageCoverToUpload"].files[0];

if(x != undefined && x.type != "image/png" && x.type != "image/jpeg")
{
document.getElementById("imageCoverButton").style.border = "solid red 1px";
document.getElementById("imageCoverError").innerHTML = "File must be an image type";
return false;
}
else
{
document.getElementById("imageCoverButton").style.border = "none";
document.getElementById("imageCoverError").innerHTML = "";
return true;
}

}

/////////////////////////////////////////////////////////////////////////////////



function validateFormAudio() {

validateTitleAudio();
validateDescriptionAudio();
validateFileAudio();
validateCoverAudio();

if (validateTitleAudio() == false || validateDescriptionAudio() == false || validateFileAudio() == false || validateCoverAudio() == false) 
{
return false;
}
else
return true;

}


function validateTitleAudio() {

var x = document.forms["audioForm"]["myTitle"].value;

var re = /^(\S.{0,50})/;
if(re.test(x) == false)
{
document.forms["audioForm"]["myTitle"].style.borderColor = "red";

if(x.length > 50)
{
	document.getElementById("audioTitleError").innerHTML = "Length cannot exceed 50 characters";
}

if(x.charAt(0) == " ")
{
	document.getElementById("audioTitleError").innerHTML = "First letter cannot be whitespace";
}

if(x == "")
{
	document.getElementById("audioTitleError").innerHTML = "Title cannot be empty";
}

return false;
}
else
{
document.forms["audioForm"]["myTitle"].style.borderColor = "#283C4F";
document.getElementById("audioTitleError").innerHTML = "";
return true;
}

}

function validateDescriptionAudio() {

var x = document.forms["audioForm"]["comments"].value;

var re = /^$|(.|\s){1,20000}$/;
if(re.test(x) == false)
{
document.forms["audioForm"]["comments"].style.borderColor = "red";

if(x.length > 20000)
{
	document.getElementById("audioCommentError").innerHTML = "Length cannot exceed 20000 characters";
}
else
{
	document.getElementById("audioCommentError").innerHTML = "Last character cannot be a newline";
}

return false;
}
else
{
document.forms["audioForm"]["comments"].style.borderColor = "#283C4F";
document.getElementById("audioCommentError").innerHTML = "";
return true;
}

}


function validateFileAudio() {
var file = document.forms["audioForm"]["audioToUpload"].files[0];

if(file == undefined)
{
document.getElementById("audioFileButton").style.border = "solid red 1px";
document.getElementById("audioFileError").innerHTML = "Please enter a file";
return false;
}

var x = file.type;

var re = /^(\baudio.+)|(\baudio)$/;

if(re.test(x) == false)
{
document.getElementById("audioFileButton").style.border = "solid red 1px";
document.getElementById("audioFileError").innerHTML = "File must be an audio type";
return false;
}
else
{
document.getElementById("audioFileButton").style.border = "none";
document.getElementById("audioFileError").innerHTML = "";
return true;
}

}


function validateCoverAudio() {
var x = document.forms["audioForm"]["audioCoverToUpload"].files[0];

if(x != undefined && x.type != "image/png" && x.type != "image/jpeg")
{
document.getElementById("audioCoverButton").style.border = "solid red 1px";
document.getElementById("audioCoverError").innerHTML = "File must be an image type";
return false;
}
else
{
document.getElementById("audioCoverButton").style.border = "none";
document.getElementById("audioCoverError").innerHTML = "";
return true;
}

}

/////////////////////////////////////////////////////////////////////////////////



function validateFormVideo() {

validateTitleVideo();
validateDescriptionVideo();
validateFileVideo();
validateCoverVideo();


if (validateTitleVideo() == false || validateDescriptionVideo() == false || validateFileVideo() == false || validateCoverVideo() == false) 
{
return false;
}
else
return true;

}


function validateTitleVideo() {

var x = document.forms["videoForm"]["myTitle"].value;

var re = /^(\S.{0,50})/;
if(re.test(x) == false)
{
document.forms["videoForm"]["myTitle"].style.borderColor = "red";

if(x.length > 50)
{
	document.getElementById("videoTitleError").innerHTML = "Length cannot exceed 50 characters";
}

if(x.charAt(0) == " ")
{
	document.getElementById("videoTitleError").innerHTML = "First letter cannot be whitespace";
}

if(x == "")
{
	document.getElementById("videoTitleError").innerHTML = "Title cannot be empty";
}

return false;
}
else
{
document.forms["videoForm"]["myTitle"].style.borderColor = "#283C4F";
document.getElementById("videoTitleError").innerHTML = "";
return true;
}

}

function validateDescriptionVideo() {

var x = document.forms["videoForm"]["comments"].value;

var re = /^$|(.){1,20000}$/;
if(re.test(x) == false)
{
document.forms["videoForm"]["comments"].style.borderColor = "red";

if(x.length > 20000)
{
	document.getElementById("videoCommentError").innerHTML = "Length cannot exceed 20000 characters";
}
else
{
	document.getElementById("videoCommentError").innerHTML = "Last character cannot be a newline";
}


return false;
}
else
{
document.forms["videoForm"]["comments"].style.borderColor = "#283C4F";
document.getElementById("videoCommentError").innerHTML = "";
return true;
}

}

function validateFileVideo() {
var file = document.forms["videoForm"]["videoToUpload"].files[0];

if(file == undefined)
{
document.getElementById("videoFileButton").style.border = "solid red 1px";
document.getElementById("videoFileError").innerHTML = "Please enter a file";
return false;
}

var x = file.type;

var re = /^(\bvideo.+)|(\bvideo)$/;

if(re.test(x) == false)
{
document.getElementById("videoFileButton").style.border = "solid red 1px";
document.getElementById("videoFileError").innerHTML = "File must be a video type";
return false;
}
else
{
document.getElementById("videoFileButton").style.border = "none";
document.getElementById("audioFileError").innerHTML = "";
return true;
}

}

function validateCoverVideo() {
var x = document.forms["videoForm"]["videoCoverToUpload"].files[0];

if(x != undefined && x.type != "image/png" && x.type != "image/jpeg")
{
document.getElementById("videoCoverButton").style.border = "solid red 1px";
document.getElementById("videoCoverError").innerHTML = "File must be an image type";
return false;
}
else
{
document.getElementById("videoCoverButton").style.border = "none";
document.getElementById("videoCoverError").innerHTML = "";
return true;
}

}


/////////////////////////////////////////////////////////////////////////////////



function validateFormHyperlink() {

validateTitleHyperlink();
validateDescriptionHyperlink();
validateLinkHyperlink();
validateCoverHyperlink();

if (validateTitleHyperlink() == false || validateDescriptionHyperlink() == false || validateLinkHyperlink() == false || validateCoverHyperlink() == false) 
{
return false;
}
else
return true;

}


function validateTitleHyperlink() {

var x = document.forms["hyperlinkForm"]["myTitle"].value;

var re = /^(\S.{0,50})/;

if(re.test(x) == false)
{
document.forms["hyperlinkForm"]["myTitle"].style.borderColor = "red";

if(x.length > 50)
{
	document.getElementById("hyperlinkTitleError").innerHTML = "Length cannot exceed 50 characters";
}

if(x.charAt(0) == " ")
{
	document.getElementById("hyperlinkTitleError").innerHTML = "First letter cannot be whitespace";
}

if(x == "")
{
	document.getElementById("hyperlinkTitleError").innerHTML = "Title cannot be empty";
}

return false;
}
else
{
document.forms["hyperlinkForm"]["myTitle"].style.borderColor = "#283C4F";
document.getElementById("hyperlinkTitleError").innerHTML = "";
return true;
}

}

function validateDescriptionHyperlink() {

var x = document.forms["hyperlinkForm"]["comments"].value;

var re = /^$|(.|\s){1,20000}$/;
if(re.test(x) == false)
{
document.forms["hyperlinkForm"]["comments"].style.borderColor = "red";


if(x.length > 20000)
{
	document.getElementById("hyperlinkCommentError").innerHTML = "Length cannot exceed 20000 characters";
}
else
{
	document.getElementById("hyperlinkCommentError").innerHTML = "Last character cannot be a newline";
}


return false;
}
else
{
document.forms["hyperlinkForm"]["comments"].style.borderColor = "#283C4F";
document.getElementById("hyperlinkCommentError").innerHTML = "";
return true;
}

}


function validateLinkHyperlink() {

var x = document.forms["hyperlinkForm"]["hyperlinkToUpload"].value;

var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
if(re.test(x) == false)
{
document.forms["hyperlinkForm"]["hyperlinkToUpload"].style.borderColor = "red";
document.getElementById("hyperlinkFileError").innerHTML = "Please enter a valid URL";
return false;
}
else
{
document.forms["hyperlinkForm"]["hyperlinkToUpload"].style.borderColor = "#283C4F";
document.getElementById("hyperlinkFileError").innerHTML = "";
return true;
}

}

function validateCoverHyperlink() {
var x = document.forms["hyperlinkForm"]["hyperlinkCoverToUpload"].files[0];

if(x != undefined && x.type != "image/png" && x.type != "image/jpeg")
{
document.getElementById("hyperlinkCoverButton").style.border = "solid red 1px";
document.getElementById("hyperlinkCoverError").innerHTML = "File must be an image type";
return false;
}
else
{
document.getElementById("hyperlinkCoverButton").style.border = "none";
document.getElementById("hyperlinkCoverError").innerHTML = "";
return true;
}

}





