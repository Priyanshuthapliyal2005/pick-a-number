// Random number generator
const label = document.getElementById("label");

document.getElementById("myButton").onclick = function () {
    const min = parseInt(document.getElementById("myText1").value);
    const max = parseInt(document.getElementById("myText2").value);
    const exceptionList = document.getElementById("myText3").value.split(",").map(num => parseInt(num.trim()));
    
    // Check if the input values are valid numbers
    if (!isNaN(min) && !isNaN(max)) {
        // Calculate the range size
        const rangeSize = max - min + 1;

        // Function to generate a random number within the specified range
        const generateRandomNum = () => {
            return Math.floor(Math.random() * rangeSize) + min;
        };

        // Function to check if the generated random number is in the exception list
        const isInExceptions = (num) => {
            return exceptionList.includes(num);
        };

        // Function to generate a random number recursively until it's not in the exception list
        const generateNonExceptionRandomNum = () => {
            let num = generateRandomNum();
            while (exceptionList.length && isInExceptions(num)) {
                num = generateRandomNum();
            }
            return num;
        };

        // Check if the exception list covers all numbers in the range
        const isAllNumbersException = exceptionList.length === rangeSize && exceptionList.every(num => num >= min && num <= max);

        if (isAllNumbersException) {
            // Display an error message if all numbers in the range are exceptions
            label.textContent = "Invalid input: All numbers in the range are exceptions";
        } else {
            // Generate a random number, checking for exceptions recursively
            const randomNum = generateNonExceptionRandomNum();

            // Update the label with the generated random number
            label.textContent = randomNum;
        }
    } else {
        // Display an error message if the input values are not valid numbers
        label.textContent = "Invalid input";
    }
};
