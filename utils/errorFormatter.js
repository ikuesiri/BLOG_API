
//Function to format all joi error messsages
const joiErrorFormatter = (errorMessage) => {
  const details = errorMessage.details
  const errors = {}

  details.forEach(value => {
    errors[value.path] = [value.message]
    //  console.log(errors[value.path])
  });


  return errors

}


module.exports = joiErrorFormatter
