export const convertDateToDDMMYYYY = (date: Date, split: string = '-') => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    if(split){
    return `${day}${split}${month}${split}${year}`;
   }else{
    return `${day}${month}${year}`;
   }
}

export const convertDDMMYYYYtoDate = (dateString: string, split: string = '-') => {
    if(split){
        const parts = dateString.split(split);
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed   
        const year = parseInt(parts[2], 10);

        return new Date(year, month, day);
    }else{
        const day = parseInt(dateString.slice(0,2), 10);
        const month = parseInt(dateString.slice(2,4), 10) - 1;
        const year = parseInt(dateString.slice(4,8), 10);

        return new Date(year, month, day);
    }
}
