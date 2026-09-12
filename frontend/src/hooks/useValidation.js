import { useEffect, useState } from 'react';
export const useValidation = (value, validations) =>{
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [matchError, setMatchError] = useState(false);


  useEffect(()=>{
    for (const validation in validations){
      switch(validation){
         case 'isEmpty':
          
          value ? setEmpty(false): setEmpty(true)
        
        
          break;


        case 'minLength':

          value.length < validations[validation] ? setMinLengthError(true): setMinLengthError(false)
          
          
          
        break;


        case 'isMatch': 
          value !== validations[validation] ? setMatchError(true) : setMatchError(false);
        
        
          break;

       
      }
    }
  }, [value])

  return{
    isEmpty,
    minLengthError,
    matchError,
  } 

}


export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) =>{
    setDirty(true)

  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid

  }
}