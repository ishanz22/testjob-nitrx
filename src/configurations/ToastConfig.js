import Snackbar from "react-native-snackbar";

const config = {
    numberOfLines: 2,
    duration: 3000
}

const isObject = (objValue) => {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}

export const showToast = (data) => {
    if (data.code === 500) {
        config['backgroundColor'] = '#DC3545';
    } else if (data.code === 203 || data.code === 205) {
        config['backgroundColor'] = '#28A745';
    } else if (data.code === -1) {
        config['textColor'] = 'black';
        config['backgroundColor'] = '#e6b800';
    }

    config['text'] = isObject(data.result) ? data.result.message : data.result;
    Snackbar.show(config);
}
