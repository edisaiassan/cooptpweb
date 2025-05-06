import React from "react";

export default function TextFormField({
    labelText,
    placeholder = '',
    name,
    leftIcon,
    rightIcon,
    textColor = 'text-black',
    textSize = 'text-base',
    rounded = 'rounded-2xl',
    type = 'text',
    enabled = true,
    regExp,
    value,
    onChange,
    error = false,
    autoComplete = false,
    multiline = false,
    onKeyDown,
    styles = {
        focusBackgroundColor: 'focus-within:bg-green-100',
        focusBackgroundLabelColor: 'peer-focus:bg-green-100',
        unfocusBackgroundColor: 'bg-gray-100',
        unfocusBorderColor: 'border-gray-400',
        focusBorderColor: 'focus-within:border-green-600',
        unfocusLabelColor: 'text-gray-400',
        focusLabelColor: 'peer-focus:text-green-600',
        unFocusIconColor: 'fill-gray-400',
        focusIconColor: 'group-focus-within:fill-green-600',
        focusLabelColorOutside: 'group-focus:text-green-600',
        focusLabelBackgroundOutside: 'group-focus:bg-green-100',
    },
}) {
    const {
        focusBackgroundColor,
        focusBackgroundLabelColor,
        unfocusBackgroundColor,
        unfocusBorderColor,
        focusBorderColor,
        unfocusLabelColor,
        focusLabelColor,
        unFocusIconColor,
        focusIconColor,
        focusLabelColorOutside,
        focusLabelBackgroundOutside,
    } = error ? {
        focusBackgroundColor: 'focus-within:bg-red-100',
        focusBackgroundLabelColor: 'peer-focus:bg-red-100',
        unfocusBackgroundColor: 'bg-red-100',
        unfocusBorderColor: 'border-red-400',
        focusBorderColor: 'focus-within:border-red-600',
        unfocusLabelColor: 'text-red-400',
        focusLabelColor: 'peer-focus:text-red-600',
        unFocusIconColor: 'bg-red-400',
        focusIconColor: 'group-focus-within:bg-red-600',
        focusLabelColorOutside: 'group-focus:text-red-600',
        focusLabelBackgroundOutside: 'group-focus:bg-red-100',
    } : styles;

    const handleChange = (e) => {
        const newValue = e.target.value;

        // Permitir borrar todo el valor, incluso si no coincide con la RegExp temporalmente
        if (newValue === '' || !regExp || regExp.test(newValue)) {
            onChange(e) // Llama a onChange siempre que se borre todo o pase la validación
        }
    }


    return (
        <div
            className={`w-full ${rounded} flex items-center border-2 transition-colors relative 
group ${unfocusBorderColor} ${unfocusBackgroundColor} ${focusBorderColor} ${focusBackgroundColor} ${!enabled && 'opacity-50 pointer-events-none'}`
            }
            tabIndex={0}
        >

            {leftIcon && (
                <div className='flex items-center pl-2'>
                    {React.isValidElement(leftIcon) &&
                        (leftIcon.type.displayName === 'IconButton' ||
                            leftIcon.type.name === 'IconButton' ||
                            leftIcon.type.displayName === 'Icon' ||
                            leftIcon.type.name === 'Icon') ?
                        React.cloneElement(leftIcon, {
                            iconColor: `${unFocusIconColor} ${focusIconColor}`,
                            background: 'bg-transparent'
                        }) : leftIcon}
                </div>
            )}

            <div className='relative w-full'>
                {multiline ? (
                    <textarea
                        id={labelText}
                        name={name}
                        className={`block py-[12px] px-2 w-full ${textColor} ${textSize} bg-transparent border-none 
focus:outline-none focus:ring-0 peer rounded-2xl`}
                        aria-describedby='outlined_success_help'
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        disabled={!enabled}
                        autoComplete={autoComplete ? 'on' : 'off'}
                        style={{ minHeight: '48px' }}  // Ajusta este valor según tus necesidades
                        onKeyDown={onKeyDown}
                    />

                ) : (
                    <input
                        type={type}
                        id={labelText}
                        name={name}
                        className={`block py-[12px] px-2 w-full ${textColor} ${textSize} bg-transparent border-none 
focus:outline-none focus:ring-0 peer rounded-2xl`}
                        aria-describedby='outlined_success_help'
                        placeholder={placeholder}
                        pattern={regExp}
                        value={value}
                        onChange={handleChange}
                        disabled={!enabled}
                        autoComplete={autoComplete ? 'on' : 'off'}
                        onKeyDown={onKeyDown}
                    />
                )}
                <label
                    htmlFor={labelText}
                    className={`absolute ${textSize} ${unfocusLabelColor} ${focusLabelColor} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] ${unfocusBackgroundColor} ${focusBackgroundLabelColor}
${focusLabelColorOutside} ${focusLabelBackgroundOutside} px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 transition-all rounded-2xl`}
                >
                    {labelText}
                </label>
            </div>

            {rightIcon && (
                <div className='flex items-center pr-2'>
                    {React.isValidElement(rightIcon) &&
                        (rightIcon.type.displayName === 'IconButton' ||
                            rightIcon.type.name === 'IconButton' ||
                            rightIcon.type.displayName === 'Icon' ||
                            rightIcon.type.name === 'Icon') ?
                        React.cloneElement(rightIcon, {
                            iconColor: `${unFocusIconColor} ${focusIconColor}`,
                            background: 'bg-transparent'
                        }) : rightIcon}
                </div>
            )}
        </div>
    )
}
