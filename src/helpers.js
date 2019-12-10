export const divideByThousands = (number) => {
    if (typeof number !== 'number') throw 'Not a number';
    
    const stringedNumber = number.toString();
    let changedArray = [];

    if (stringedNumber.length > 3) {
        let counter = 0;
        
        //Начинаем цикл с конца
        for (let i = stringedNumber.length - 1; i >= 0; i--) {
            //Если номер прохода делится на 3, то добавляем пробел
            if (counter % 3 === 0) {
                changedArray.unshift(' ');
                changedArray.unshift(stringedNumber[i])
            } else {
                changedArray.unshift(stringedNumber[i])
            }

            counter++
        }
        return changedArray.join('');
    } else {
        return stringedNumber
    }
};