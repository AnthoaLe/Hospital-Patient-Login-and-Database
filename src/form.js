export const patientFirstName = document.querySelector('#patientFirstName');
export const patientLastName = document.querySelector('#patientLastName');

export const radioMale = document.querySelector('#radioMale');
export const radioFemale = document.querySelector('#radioFemale');

export const checkboxMental1 = document.querySelector('#checkboxMental1');
export const checkboxMental2 = document.querySelector('#checkboxMental2');
export const checkboxMental3 = document.querySelector('#checkboxMental3');

export const checkboxHistory1 = document.querySelector('#checkboxHistory1');
export const checkboxHistory2 = document.querySelector('#checkboxHistory2');
export const checkboxHistory3 = document.querySelector('#checkboxHistory3');

export const checkboxMedication1 = document.querySelector('#checkboxMedication1');
export const checkboxMedication2 = document.querySelector('#checkboxMedication2');
export const checkboxMedication3 = document.querySelector('#checkboxMedication3');

export const patientAddress = document.querySelector('#patientAddress');

export const btnSignup = document.querySelector('#btnSignup');


const verifyNotEmpty = (field) => {
    let value = field.value;
    if (value.trim() === "") {
        console.log('verifyNotEmpty Error');
        throw {name: 'ValidationError', message: 'Field is empty.'};
    }
}


const returnRadioSelected = (radioOptions) => {
    const radioSelected = radioOptions.find(element => element.checked === true);
    console.log(radioSelected);
    if (radioSelected === undefined) {
        console.log('returnRadioSelected Error');
        throw {name: 'ValidationError', message: 'Radio option is not selected.'};
    } else {
        return radioSelected;
    }
}


const returnCheckboxesSelected = (checkboxOptions) => {
    const selectedCheckboxes = [];
    checkboxOptions.forEach(element => {
        if (element.checked) {
            selectedCheckboxes.push(element);
        }
    });
    return selectedCheckboxes;
}


const returnCheckboxesValues = (selectedCheckboxes) => {
    console.log('returnCheckboxesValues');
    console.log(selectedCheckboxes);
    const checkboxValues = [];
    selectedCheckboxes.forEach(element => checkboxValues.push(element.value));
    return checkboxValues;
}

export const returnFormData = () => {
    console.log('returnFormData');
    try {
        verifyNotEmpty(patientFirstName);
        verifyNotEmpty(patientLastName);
        const radioSelectedSex = returnRadioSelected([radioMale, radioFemale]);
        const checkboxSelectedMental = returnCheckboxesSelected([checkboxMental1, checkboxMental2, checkboxMental3]);
        const checkboxSelectedHistory = returnCheckboxesSelected([checkboxHistory1, checkboxHistory2, checkboxHistory3]);
        const checkboxSelectedMedication = returnCheckboxesSelected([checkboxMedication1, checkboxMedication2, checkboxMedication3]);
        verifyNotEmpty(patientAddress);

        const checkboxMentalValues = returnCheckboxesValues(checkboxSelectedMental);
        const checkboxHistoryValues = returnCheckboxesValues(checkboxSelectedHistory);
        const checkboxMedicationValues = returnCheckboxesValues(checkboxSelectedMedication);


        return {
            firstName: patientFirstName.value,
            lastName: patientLastName.value,
            sex: radioSelectedSex.value,
            mental: checkboxMentalValues,
            history: checkboxHistoryValues,
            medication: checkboxMedicationValues,
            address: patientAddress.value
        };
    } catch(error) {
        if (error.name === 'ValidationError') {
            console.log(error.message);
        } else {
            throw error;
        }
    }
}


export const returnEmptyFormData = () => {
    return {
        address: "",
        email: "",
        firstName: "",
        history: [],
        lastName: "",
        medication: [],
        mental: [],
        sex: ""
    };
}