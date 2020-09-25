function getDateInt() {
    var date = new Date();
    var newdate = date.toLocaleString().replace(/[a-z,/:" "]/g,"");
    return newdate;
};

module.exports = { getDateInt }

//Gender Enum
const GENDER = {
    Male: 'Male',
    Female: 'Female',
    Other: 'Other'
};

const NamePrefix = {
    Dean: 'Dean',
    Dr:'Dr',
    General:'Gen',
    Governor:'Gov',
    Honorable: 'Hon',

    //will complete later
}