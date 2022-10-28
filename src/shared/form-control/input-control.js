import {useCallback, useEffect, useState} from "react";
import controlHelper from "../helpers/control-helper";
import PropTypes from "prop-types";
import React from 'react'

const InputControl = ({
                          labelName = '',
                          initialValue = '',
                          onChange,
                          className = '',
                          regexInput,
                          isRequired = false,
                          minLength,
                          maxLength,
                          isErrorEvent
                      }) => {
    const [validationMessage, setValidationMessage] = useState(undefined);

    const validate = useCallback((newValue) => {
        if (!!isRequired && newValue.length <= 0) {
            return {
                isSuccess: false,
                message: `Please enter ${labelName}`
            }
        }

        if (minLength && minLength * 1 > newValue.length) {
            return {
                isSuccess: false,
                message: `${labelName} length must greater or equal than ${minLength}`
            }
        }

        if (maxLength && maxLength * 1 < newValue.length) {
            return {
                isSuccess: false,
                message: `${labelName} length must lower or equal than ${maxLength}`
            }
        }

        if (!!regexInput && !regexInput.test(newValue)) {
            return {
                isSuccess: false,
                message: `${labelName} is not qualified the rule`
            }
        }

        return {
            isSuccess: true,
            message: ''
        }
    }, [isRequired, regexInput, minLength, maxLength, labelName])

    useEffect(() => {
        const validationResult = validate(initialValue);
        setValidationMessage(validationResult.message);
        isErrorEvent(!validationResult.isSuccess);
    }, [initialValue, isErrorEvent, validate]);

    const onValueChange = (newValue) => {
        if (onChange) {
            onChange(newValue);
        }
        const validationResult = validate(newValue);
        setValidationMessage(validationResult.message);
        isErrorEvent(!validationResult.isSuccess);
    }


    return (
        <div className={className}>
            <label className="form-label">{labelName}</label>
            <input type="text" className={(!validationMessage ? 'is-valid' : 'is-invalid') + ' form-control'}
                   value={initialValue}
                   onChange={(event) => controlHelper.onChangeInputHandler(event, onValueChange)}
                   placeholder={labelName}/>
            {validationMessage && <div className="invalid-feedback">
                {validationMessage}
            </div>}
        </div>
    )
}

InputControl.propTypes = {
    labelName: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    regexInput: PropTypes.string,
    isRequired: PropTypes.bool,
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    isErrorEvent: PropTypes.func,
}

export default InputControl;
