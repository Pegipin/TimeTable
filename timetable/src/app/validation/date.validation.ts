import { ValidatorFn, FormGroup } from "@angular/forms";

export function dateLessThan(
  firstDateField: string,
  secondDateField: string,

): ValidatorFn {
  return (form: FormGroup): { [key: string]: boolean } | null => {
    const firstDateValue = form.get(firstDateField).value;
    const secondDateValue = form.get(secondDateField).value;

    if (
      !firstDateValue || (!secondDateValue )

    ) {
      return { missing: true };
    }


    const myArray1 = firstDateValue.split(":");
    const firstDate = new Date();
    firstDate.setHours(+myArray1[0]);
    firstDate.setMinutes(+myArray1[1]);
    firstDate.setSeconds(0);

    const myArray2 = secondDateValue.split(":");
    const secondDate = new Date();
    secondDate.setHours(+myArray2[0]);
    secondDate.setMinutes(+myArray2[1]);
    secondDate.setSeconds(0);



      if (firstDate >= secondDate) {
      const err = { dateLessThan: true };
      form.get(firstDateField).setErrors(err);
      return err;
    } else {
      const dateLessError = form.get(firstDateField).hasError("dateLessThan");
      if (dateLessError) {
        delete form.get(firstDateField).errors["dateLessThan"];
        form.get(firstDateField).updateValueAndValidity();
      }



  }
  };

}
