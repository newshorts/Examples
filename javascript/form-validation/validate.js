/* 
 * Snippets
 */

function validState(state) {
    var states = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DC2","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY");
    var didValidate = states.indexOf(state);
    if(didValidate > -1) {
        return true;
    } else {
        return false;
    }
}

function validZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/i.test(zip);
}
