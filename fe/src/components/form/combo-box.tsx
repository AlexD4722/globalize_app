import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ChevronLeft, Close, ErrorOutlineRounded, SuccessOutline } from '../svg'

export interface IOption {
    id: number | string,
    value: string
}

interface IComboBox {
    options: IOption[],
    placeholder?: string,
    autocomplete?: 'on' | 'off',
    onChange?: (value: string, id: number | string) => void,
    // name: value that submit with FormData
    resetButton?: boolean,
    name: string,
    width?: "fit" | "full",
    required? : {
        value: boolean,
        message: string
    },
    defaultValue?: string
}

const comboBoxStyles = cva([], {
    variants: {

    },
    defaultVariants: {

    }
})

interface ComboBoxProps extends IComboBox, VariantProps<typeof comboBoxStyles> {};


export const ComboBox = ({...props} : ComboBoxProps) => {

    const { 
        options, name, placeholder = 'Select Option', autocomplete = 'off', width = 'auto', resetButton = true,
        required, defaultValue, onChange
    } = props;
    const comboBoxRef = useRef<HTMLDivElement>(null);
    const [ isFocus, setIsFocus ] = useState<boolean>();
    const [ selectedOption, setSelectedOption ] = useState<string>('');
    const [ filteredOptions, setFilteredOptions ] = useState<Array<IOption>>(options);

    const { register, setValue, getValues, clearErrors, formState: { errors } } = useFormContext();

    const selectOption = (value : string, id: number | string) => {
        // implement logic to select an option
        setValue(name, value)
        setValue("id", id);
        setSelectedOption(value);
        setIsFocus(false);
        clearErrors(name);
        onChange && onChange(value, id);

    }

    const filterOption = (event: React.FormEvent<HTMLInputElement>) => {

        setIsFocus(true);

        let newOptions = options.map((x) => {
            if(x.value.toLowerCase().match(((event.target as HTMLInputElement).value).toLowerCase().trim())){
                return x as IOption;
            }
        }).filter(e => e !== undefined) as Array<IOption>;
    
        setFilteredOptions(newOptions);

    }

    const filterOptionNone = () => {
        setIsFocus(!isFocus);
        setFilteredOptions(options);
    }



    const validInput = () => {
        if(getValues(`root.${name}`) === selectedOption){
            return;
        }else if(selectedOption !== '') {
            setValue(name, selectedOption);
            clearErrors(name);
        }else {
            setValue(name, '');
        }
        
    }

    useEffect(() => {
        function handleClickOutside(event : any) {
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
                setIsFocus(false);
                setFilteredOptions(options);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[options])

    useEffect(() => {
        if(defaultValue){
            setSelectedOption(defaultValue);
        }
    },[defaultValue])

    return (
        <>  
           <div>
            <div ref={comboBoxRef} 
            className={clsx('relative', 
                width === 'fit' && 'w-fit',
                width === 'full' && 'w-full'
            )}>
                    <input type="hidden" {...register("id")}/>
                    <input
                    onFocus={() => {setIsFocus(true)}}
                    id={name} placeholder={placeholder} autoComplete={autocomplete}
                    type="text"
                    style={{width: '100%'}}
                    className={clsx('p-3 border border-borderDefault outline-0 rounded-md bg-white pr-[3.75rem]', 
                    isFocus && 'elevation-shadow-1',
                    errors[name] && '!border-red-500',
                    )} {...register(name, {onChange: filterOption, onBlur: validInput, required: required, value: defaultValue})}/>
                    
                    <div 
                    className={clsx('absolute flex right-3 top-1/2 -translate-y-1/2 ')}>
                        {(selectedOption && selectedOption !== defaultValue && resetButton) && 
                        <div 
                        onClick={() => {selectOption('', '')}}
                        className='rounded-full hover:cursor-pointer hover:elevation-color-3 scale-110 p-0.5 mr-1'><Close/></div>
                        }
                        <div
                        onClick={filterOptionNone} 
                        className={clsx('hover:cursor-pointer hover:elevation-color-3 rounded-full scale-110 p-0.5',  isFocus && 'elevation-color-3')}>
                            <ChevronLeft className='rotate-[270deg]'/>
                        </div>
                    </div>
                    
                    <div className={clsx('absolute top-full w-full text-textColor bg-white z-5')}>
                        <div className={clsx('rounded-md overflow-auto border',
                            !isFocus ? ' max-h-0 border-transparent' : 'max-h-[250px] grid-rows-[1fr] border-borderDefault elevation-shadow-1 mt-1.5'
                        )}>
                            <div className='overflow-hidden p-1'>
                            {filteredOptions.length > 0 && filteredOptions.map((option) => (
                                <div key={option.id} className={clsx('relative flex items-center w-full hover:elevation-color-2 hover:cursor-pointer p-1.5 rounded-sm', option.value === selectedOption && 'elevation-color-1')}
                                onClick={() => {selectOption(option.value, option.id)}}>
                                    <span className={clsx('inline-block mr-3', option.value !== selectedOption && 'invisible')}><SuccessOutline/></span>
                                    <span>{option.value}</span>
                                </div>
                                )
                            )}
                            {filteredOptions.length === 0 && 
                                <div className={"p-1.5"}>
                                <span>No result found!</span>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
                {errors[name] && 
                    <div className="flex items-center px-0.5 pt-1.5 text-red-500">
                        <span className="mr-1"><ErrorOutlineRounded className="text-red-500"/></span>
                        <span>{(errors[name]?.message as String)}</span>
                    </div>
                }
           </div>
        </>
    )
}
