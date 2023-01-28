export const formatPrice = (num) => {
    const newNum= new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR',

    }).format(num/10);
    return newNum;
}

export const getUniqueValues = (data,type) => {
    let modifiedData= data.map(element=>element[type]);
    if(type==="colors"){
        let colors= modifiedData.flat(); //flat method removes the array
        return ["all",...new Set(colors)]
    }
    return ["all",...new Set(modifiedData)];
}
