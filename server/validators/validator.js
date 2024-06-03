// TODO: aggiungere qui i nuovi attributi del db
const inquiliniValidKeys = [
    '_id',
    'name',
    'secondName',
    'country',
    'city',
    'address',
    'phone',
    'email',
    'hasDebit',
    'type'
];
const inquiliniRequiredKeys = [
    '_id',
    'name',
    'secondName',
    'country',
    'city',
    'address',
    'phone',
    'email',
    'hasDebit',
    'type'
];

const makeValidators = function () {
    const validateInquilino = (data) =>
        validate(data, inquiliniValidKeys, inquiliniRequiredKeys);
    return { validateInquilino };
};

const validate = (data, validKeys, requiredKeys) => {
    if (
        Array.isArray(data) ||
        !Array.isArray(validKeys) ||
        !Array.isArray(requiredKeys)
    )
        return false;

    // Controllo che includa le chiavi required
    for (let key of requiredKeys) {
        if (!Object.keys(data).includes(key)) return false;
    }

    // Controllo che le chiavi dell'oggetto siano contenute nelle validKeys
    for (let key of Object.keys(data)) {
        if (!validKeys.includes(key)) return false;
    }

    return true;
};

module.exports = makeValidators;
