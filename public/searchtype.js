function searchMerchType() {
    //get the first name 
    var merch_type  = document.getElementById('type').value
    //construct the URL and redirect to it
    window.location = '/search/type/' + merch_type
}